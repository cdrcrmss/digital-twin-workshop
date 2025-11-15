import os
import json
from typing import List, Dict, Any, Optional
from dotenv import load_dotenv
import redis
from groq import Groq

# Load environment variables
load_dotenv()

def setup_redis_client():
    """Initialize and return a Redis client."""
    try:
        url = os.getenv('UPSTASH_REDIS_REST_URL')
        token = os.getenv('UPSTASH_REDIS_REST_TOKEN')
        
        if not url or not token:
            raise ValueError("Missing Redis URL or token in .env file")
            
        # Connect to Redis
        r = redis.Redis(
            host=url.replace('https://', '').split(':')[0],
            port=6379,
            password=token,
            ssl=True,
            ssl_cert_reqs=None
        )
        
        # Test connection
        if not r.ping():
            raise ConnectionError("Failed to connect to Redis")
            
        print("✅ Successfully connected to Redis!")
        return r
        
    except Exception as e:
        print(f"❌ Error setting up Redis: {str(e)}")
        raise

def load_profile_data(file_path: str = "digitaltwin.json") -> Dict[str, Any]:
    """Load profile data from JSON file."""
    try:
        with open(file_path, 'r') as f:
            data = json.load(f)
            if 'content_chunks' not in data:
                raise ValueError("No content_chunks found in profile data")
            return data
    except Exception as e:
        print(f"❌ Error loading profile data: {str(e)}")
        raise

def initialize_redis_data(redis_client, profile_data: Dict[str, Any]):
    """Initialize Redis with profile data if not already present."""
    try:
        # Check if data already exists
        if redis_client.exists("digital_twin:initialized"):
            print("✅ Redis already initialized with profile data")
            return
            
        print("📝 Loading profile data into Redis...")
        
        # Store each content chunk
        for i, chunk in enumerate(profile_data.get('content_chunks', [])):
            chunk_id = f"chunk:{i}"
            redis_client.hset(f"digital_twin:chunks", chunk_id, json.dumps(chunk))
            
        # Mark as initialized
        redis_client.set("digital_twin:initialized", "true")
        print(f"✅ Loaded {len(profile_data.get('content_chunks', []))} chunks into Redis")
        
    except Exception as e:
        print(f"❌ Error initializing Redis data: {str(e)}")
        raise

def search_redis(redis_client, query: str, top_k: int = 3) -> List[Dict[str, Any]]:
    """Search for relevant content chunks in Redis."""
    try:
        # In a real implementation, you would use Redis Search or another
        # search mechanism. For now, we'll do a simple keyword search.
        results = []
        for chunk_id in redis_client.hkeys("digital_twin:chunks"):
            chunk = json.loads(redis_client.hget("digital_twin:chunks", chunk_id))
            content = f"{chunk.get('title', '')} {chunk.get('content', '')}".lower()
            if query.lower() in content:
                results.append({
                    "id": chunk_id.decode() if isinstance(chunk_id, bytes) else chunk_id,
                    "score": 1.0,  # Simple match score
                    "metadata": chunk
                })
        
        # Sort by score (descending) and limit to top_k
        results.sort(key=lambda x: x["score"], reverse=True)
        return results[:top_k]
        
    except Exception as e:
        print(f"❌ Error searching Redis: {str(e)}")
        raise

def setup_groq_client():
    """Initialize and return a Groq client."""
    try:
        api_key = os.getenv('GROQ_API_KEY')
        if not api_key or api_key == 'your_groq_api_key':
            print("⚠️  GROQ_API_KEY not set or using default value")
            return None
        return Groq(api_key=api_key)
    except Exception as e:
        print(f"❌ Error setting up Groq client: {str(e)}")
        return None

def generate_response(groq_client: Optional[Groq], query: str, context: str) -> str:
    """Generate a response using Groq's language model."""
    if not groq_client:
        return "I'm sorry, I couldn't process your request. The AI service is not configured."
    
    try:
        chat_completion = groq_client.chat.completions.create(
            messages=[
                {
                    "role": "system",
                    "content": "You are a helpful assistant that answers questions based on the provided context."
                },
                {
                    "role": "user",
                    "content": f"Context: {context}\n\nQuestion: {query}\n\nAnswer:"
                }
            ],
            model="mixtral-8x7b-32768",
            temperature=0.7,
            max_tokens=1024,
            top_p=1
        )
        return chat_completion.choices[0].message.content
    except Exception as e:
        print(f"❌ Error generating response: {str(e)}")
        return "I'm sorry, I encountered an error while processing your request."

def main():
    """Main function to test the RAG functionality."""
    try:
        # Initialize clients
        redis_client = setup_redis_client()
        groq_client = setup_groq_client()
        
        # Load and initialize data
        profile_data = load_profile_data()
        initialize_redis_data(redis_client, profile_data)
        
        # Interactive loop
        print("\n🔍 Digital Twin RAG System")
        print("Type 'exit' to quit\n")
        
        while True:
            query = input("Ask me something about the profile: ").strip()
            if query.lower() in ['exit', 'quit']:
                break
                
            # Search for relevant chunks
            results = search_redis(redis_client, query)
            
            if not results:
                print("I couldn't find any relevant information about that topic.")
                continue
                
            # Generate response
            context = "\n\n".join([r["metadata"].get("content", "") for r in results])
            response = generate_response(groq_client, query, context)
            
            print("\n" + "="*50)
            print(f"📝 Response:")
            print(response)
            print("="*50 + "\n")
            
    except KeyboardInterrupt:
        print("\n👋 Goodbye!")
    except Exception as e:
        print(f"\n❌ An error occurred: {str(e)}")
    finally:
        if 'redis_client' in locals():
            redis_client.close()

if __name__ == "__main__":
    main()