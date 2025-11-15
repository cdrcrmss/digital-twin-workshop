from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional, Dict, Any
import os
from dotenv import load_dotenv
from upstash_vector import Index
from groq import Groq
import json

# Load environment variables
load_dotenv()

app = FastAPI(title="Digital Twin RAG API")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Constants
JSON_FILE = "digitaltwin.json"
DEFAULT_MODEL = "llama-3.1-8b-instant"

# Initialize Groq client
groq_client = None
try:
    groq_client = Groq(api_key=os.getenv('GROQ_API_KEY'))
    print("✅ Groq client initialized successfully!")
except Exception as e:
    print(f"❌ Error initializing Groq client: {str(e)}")

# Initialize Upstash Vector
vector_index = None
try:
    vector_index = Index.from_env()
    print("✅ Connected to Upstash Vector successfully!")
except Exception as e:
    print(f"❌ Error connecting to Upstash Vector: {str(e)}")

class QueryRequest(BaseModel):
    question: str
    top_k: int = 3

class QueryResponse(BaseModel):
    answer: str
    sources: List[Dict[str, Any]]

@app.get("/api/health")
async def health_check():
    return {
        "status": "ok",
        "services": {
            "groq": bool(groq_client),
            "vector_db": bool(vector_index)
        }
    }

def query_vectors(index: Index, query_text: str, top_k: int = 3):
    """Query Upstash Vector for similar vectors"""
    if not index:
        raise HTTPException(status_code=500, detail="Vector database not initialized")
    
    try:
        results = index.query(
            data=query_text,
            top_k=top_k,
            include_metadata=True
        )
        return results
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error querying vectors: {str(e)}")

def generate_response_with_groq(prompt: str, model: str = DEFAULT_MODEL):
    """Generate response using Groq"""
    if not groq_client:
        raise HTTPException(status_code=500, detail="Groq client not initialized")
    
    try:
        completion = groq_client.chat.completions.create(
            model=model,
            messages=[
                {
                    "role": "system",
                    "content": "You are an AI digital twin. Answer questions as if you are the person, speaking in first person about your background, skills, and experience."
                },
                {
                    "role": "user",
                    "content": prompt
                }
            ],
            temperature=0.7,
            max_tokens=500
        )
        
        return completion.choices[0].message.content.strip()
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error generating response: {str(e)}")

@app.post("/api/query", response_model=QueryResponse)
async def process_query(request: QueryRequest):
    """Process RAG query"""
    if not vector_index:
        raise HTTPException(status_code=500, detail="Vector database not initialized")
    
    try:
        # Step 1: Query vector database
        results = query_vectors(vector_index, request.question, request.top_k)
        
        if not results or len(results) == 0:
            return QueryResponse(
                answer="I don't have specific information about that topic.",
                sources=[]
            )
        
        # Step 2: Extract relevant content
        sources = []
        top_docs = []
        
        for result in results:
            metadata = result.metadata or {}
            title = metadata.get('title', 'Information')
            content = metadata.get('content', '')
            score = result.score
            
            sources.append({
                "title": title,
                "content": content,
                "score": score,
                "type": metadata.get('type', ''),
                "category": metadata.get('category', '')
            })
            
            if content:
                top_docs.append(f"{title}: {content}")
        
        if not top_docs:
            return QueryResponse(
                answer="I found some information but couldn't extract details.",
                sources=[]
            )
        
        # Step 3: Generate response with context
        context = "\n\n".join(top_docs)
        prompt = f"""Based on the following information about yourself, answer the question.
Speak in first person as if you are describing your own background.

Your Information:
{context}

Question: {request.question}

Provide a helpful, professional response:"""
        
        answer = generate_response_with_groq(prompt)
        
        return QueryResponse(
            answer=answer,
            sources=sources
        )
    
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing query: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
