from upstash_vector import Index
from dotenv import load_dotenv

load_dotenv()

try:
    index = Index.from_env()
    info = index.info()
    print(f'Vector count: {info.vector_count if hasattr(info, "vector_count") else "N/A"}')
except Exception as e:
    print(f'Error: {str(e)}')
