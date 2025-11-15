"""
Embed Digital Twin profile data into Upstash Vector database
"""
import os
import json
from dotenv import load_dotenv
from upstash_vector import Index

# Load environment variables
load_dotenv()

def main():
    print("🤖 Digital Twin Embedding Script")
    print("=" * 50)
    
    # Initialize Upstash Vector
    try:
        index = Index.from_env()
        print("✅ Connected to Upstash Vector successfully!")
        
        # Check current vector count
        info = index.info()
        current_count = getattr(info, 'vector_count', 0)
        print(f"📊 Current vectors in database: {current_count}")
        
        # Ask user if they want to reset
        if current_count > 0:
            reset = input(f"\n⚠️  Database has {current_count} vectors. Reset and re-embed? (yes/no): ")
            if reset.lower() == 'yes':
                print("🗑️  Resetting database...")
                index.reset()
                print("✅ Database reset complete!")
        
        # Load profile data
        print("\n📝 Loading digitaltwin.json...")
        with open("digitaltwin.json", "r", encoding="utf-8") as f:
            profile_data = json.load(f)
        
        content_chunks = profile_data.get('content_chunks', [])
        if not content_chunks:
            print("❌ No content chunks found in profile data!")
            return
        
        print(f"✅ Loaded {len(content_chunks)} content chunks")
        
        # Prepare vectors for upload
        print("\n🔄 Preparing vectors for upload...")
        vectors = []
        
        for chunk in content_chunks:
            # Create enriched text for better semantic search
            title = chunk.get('title', '')
            content = chunk.get('content', '')
            chunk_type = chunk.get('type', '')
            
            # Combine title and content for embedding
            enriched_text = f"{title}: {content}"
            
            # Create vector entry
            vectors.append((
                chunk['id'],
                enriched_text,
                {
                    "title": title,
                    "content": content,
                    "type": chunk_type,
                    "category": chunk.get('metadata', {}).get('category', ''),
                    "tags": str(chunk.get('metadata', {}).get('tags', []))
                }
            ))
        
        # Upload vectors in batches
        print(f"\n📤 Uploading {len(vectors)} vectors to Upstash...")
        batch_size = 100
        
        for i in range(0, len(vectors), batch_size):
            batch = vectors[i:i+batch_size]
            index.upsert(vectors=batch)
            print(f"  ✓ Uploaded batch {i//batch_size + 1} ({len(batch)} vectors)")
        
        print(f"\n✅ Successfully embedded {len(vectors)} content chunks!")
        
        # Verify upload
        info = index.info()
        final_count = getattr(info, 'vector_count', 0)
        print(f"📊 Final vector count: {final_count}")
        
        # Test search
        print("\n🔍 Testing semantic search...")
        test_query = "What are the technical skills?"
        results = index.query(
            data=test_query,
            top_k=3,
            include_metadata=True
        )
        
        print(f"\nTest Query: '{test_query}'")
        print(f"Found {len(results)} results:")
        for i, result in enumerate(results, 1):
            print(f"\n  {i}. {result.metadata.get('title', 'Unknown')} (Score: {result.score:.3f})")
            print(f"     {result.metadata.get('content', '')[:100]}...")
        
        print("\n🎉 Embedding complete! Your Digital Twin is ready!")
        
    except Exception as e:
        print(f"\n❌ Error: {str(e)}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    main()
