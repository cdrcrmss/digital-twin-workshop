"""
MCP Server for Digital Twin RAG Application
Implements the MCP protocol for VS Code integration using Redis
"""

import os
import json
import asyncio
from typing import Dict, Any, List, Optional
from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from digitaltwin_rag import (
    setup_redis_client,
    load_profile_data,
    initialize_redis_data,
    search_redis,
    setup_groq_client,
    generate_response
)

# Initialize FastAPI app
app = FastAPI(title="Digital Twin MCP Server")

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize global clients
groq_client = setup_groq_client()
redis_client = setup_redis_client()

# Load and initialize profile data
try:
    profile_data = load_profile_data()
    initialize_redis_data(redis_client, profile_data)
    print("✅ Profile data loaded and initialized in Redis")
except Exception as e:
    print(f"❌ Failed to initialize profile data: {str(e)}")
    redis_client = None

# MCP Protocol Models
class MCPRequest(BaseModel):
    method: str
    jsonrpc: str = "2.0"
    params: Optional[Dict[str, Any]] = None
    id: Optional[int] = None

class MCPResponse(BaseModel):
    jsonrpc: str = "2.0"
    result: Optional[Any] = None
    error: Optional[Dict[str, Any]] = None
    id: Optional[int] = None

# MCP Protocol Handlers
async def handle_initialize(params: Dict[str, Any]) -> Dict[str, Any]:
    """Handle initialization request"""
    return {
        "capabilities": {
            "completionProvider": {},
            "executeCommandProvider": {
                "commands": ["digitaltwin.query"]
            }
        }
    }

async def handle_execute_command(params: Dict[str, Any]) -> Any:
    """Handle execute command request"""
    command = params.get("command")
    args = params.get("arguments", [{}])[0] if params.get("arguments") else {}
    
    if command == "digitaltwin.query":
        if not redis_client:
            raise HTTPException(
                status_code=500,
                detail="Redis client not initialized"
            )
            
        query = args.get("query", "")
        if not query:
            return {"error": "No query provided"}
            
        # Search Redis for relevant chunks
        results = search_redis(redis_client, query)
        if not results:
            return {"result": "I don't have specific information about that topic."}
            
        # Generate response using Groq
        context = "\n\n".join([r["metadata"].get("content", "") for r in results])
        response = generate_response(groq_client, query, context)
        return {"result": response}
        
    return {"error": f"Unknown command: {command}"}

# MCP Protocol Endpoint
@app.post("/mcp")
async def handle_mcp(request: Request):
    """Handle MCP protocol requests"""
    try:
        # Parse request
        data = await request.json()
        mcp_request = MCPRequest(**data)
        
        # Route request to appropriate handler
        if mcp_request.method == "initialize":
            result = await handle_initialize(mcp_request.params or {})
        elif mcp_request.method == "workspace/executeCommand":
            result = await handle_execute_command(mcp_request.params or {})
        else:
            result = {"error": f"Unsupported method: {mcp_request.method}"}
        
        # Return response
        return MCPResponse(
            jsonrpc="2.0",
            result=result,
            id=mcp_request.id
        )
        
    except Exception as e:
        return MCPResponse(
            jsonrpc="2.0",
            error={"code": -32603, "message": str(e)},
            id=request.get("id") if isinstance(request, dict) else None
        )

# Health Check Endpoint
@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {
        "status": "ok",
        "service": "digital-twin-mcp",
        "redis_connected": bool(redis_client and redis_client.ping())
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=3000)