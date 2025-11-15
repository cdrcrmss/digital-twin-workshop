import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

def main():
    print("Digital Twin Embedding Script")
    print("Environment variables loaded successfully!")
    print(f"Upstash URL: {'*' * 8 + os.getenv('UPSTASH_VECTOR_REST_URL')[-4:] if os.getenv('UPSTASH_VECTOR_REST_URL') else 'Not set'}")
    print(f"GROQ API Key: {'*' * 8 + os.getenv('GROQ_API_KEY')[-4:] if os.getenv('GROQ_API_KEY') else 'Not set'}")

if __name__ == "__main__":
    main()
