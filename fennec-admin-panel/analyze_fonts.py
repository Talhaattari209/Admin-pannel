import glob
import re
import os

files = glob.glob('src/**/*.tsx', recursive=True)
font_tokens = set()

for filepath in files:
    try:
        with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
            content = f.read()
            # Find all words starting with font-
            tokens = re.findall(r'\bfont-[\w\[\]\-]+', content)
            font_tokens.update(tokens)
    except Exception as e:
        print(f"Error reading {filepath}: {e}")

print("\n".join(sorted(font_tokens)))
