import glob
import re
import os

files = glob.glob('src/**/*.tsx', recursive=True)

# List of specific font suffixes found
suffixes = [
    'bold', 'geist-mono', 'geist-sans', 'inter', 'light', 
    'medium', 'michroma', 'normal', 'sans', 'semibold'
]

# Construct regex pattern
# matches font-<suffix> OR font-[...]
# AND is not followed by "not-italic" (ignoring whitespace)
pattern_str = r'\b(font-(?:' + '|'.join(suffixes) + r'|\[[^\]]+\]))\b(?!\s*not-italic)'
pattern = re.compile(pattern_str)

modified_count = 0

for filepath in files:
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # We perform the substitution
        # \1 is the matched font class
        new_content = pattern.sub(r'\1 not-italic', content)
        
        if new_content != content:
            print(f"Updating {filepath}")
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(new_content)
            modified_count += 1
    except Exception as e:
        print(f"Error processing {filepath}: {e}")

print(f"Finished. Modified {modified_count} files.")
