import os
import sys

# Change to the backend directory so we can import app modules properly
backend_dir = r"c:\Users\DELL\Downloads\Fennec-Admin\FennecAdminPanel\fennec-backend"
sys.path.insert(0, backend_dir)
os.chdir(backend_dir)

try:
    from app.config import Settings
    print("Attempting to load Settings...")
    settings = Settings()
    print("Settings loaded successfully!")
    print(f"DATABASE_URL: {settings.DATABASE_URL}")
except Exception as e:
    print(f"An error occurred: {e}")
