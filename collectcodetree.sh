#!/bin/bash

# Exclude directories (add to this array as needed)
EXCLUDE_DIRS=("node_modules" ".git" ".next" "dist" "build")

# Default directory to process is current directory
TARGET_DIR="."
# Default output files
TREE_OUTPUT_FILE="File_Directory_tree.txt"
CODE_OUTPUT_FILE="Combined_Code_Collection.txt"
# Default file patterns to include
FILE_PATTERNS=("*.tsx" "*.py")

# Function to check if a directory should be excluded
should_exclude_dir() {
    local dir_name="$1"
    for exclude in "${EXCLUDE_DIRS[@]}"; do
        if [[ "$dir_name" == "$exclude" ]]; then
            return 0  # Exclude
        fi
    done
    return 1  # Do not exclude
}

# Parse command-line arguments
while [[ "$#" -gt 0 ]]; do
    case $1 in
        -d|--directory) TARGET_DIR="$2"; shift ;;
        -t|--tree-output) TREE_OUTPUT_FILE="$2"; shift ;;
        -c|--code-output) CODE_OUTPUT_FILE="$2"; shift ;;
        -p|--pattern) FILE_PATTERNS+=("$2"); shift ;;  # Append to the array
        -h|--help)
            echo "Usage: $0 [options]"
            echo "Options:"
            echo "  -d, --directory       Directory to process (default: current directory)"
            echo "  -t, --tree-output     File to save directory tree (default: File_Directory_tree.txt)"
            echo "  -c, --code-output     File to save combined code (default: Combined_Code_Collection.txt)"
            echo "  -p, --pattern         File pattern to include (can specify multiple patterns)"
            echo "  -h, --help            Show this help message"
            exit 0
            ;;
        *) echo "Unknown parameter passed: $1"; exit 1 ;;
    esac
    shift
done

# Check if 'tree' command is available
if ! command -v tree &> /dev/null; then
    echo "'tree' command is not found. Please install it first."
    echo "On macOS, you can install it using Homebrew: brew install tree"
    exit 1
fi

# Generate directory tree and save to file
tree "$TARGET_DIR" > "$TREE_OUTPUT_FILE"
echo "Directory tree saved to $TREE_OUTPUT_FILE"

# Initialize the code output file
echo "# Combined Code Collection" > "$CODE_OUTPUT_FILE"
echo "" >> "$CODE_OUTPUT_FILE"

# Function to collect code from the directories
collect_code() {
    local dir="$1"

    # Get the base name of the current directory
    local dir_name=$(basename "$dir")

    # Check if current directory should be excluded
    if should_exclude_dir "$dir_name"; then
        return
    fi

    # Find files matching each pattern in the current directory
    for pattern in "${FILE_PATTERNS[@]}"; do
        for file in "$dir"/$pattern; do
            if [ -f "$file" ]; then
                local base_file=$(basename "$file")
                echo "## File: $file" >> "$CODE_OUTPUT_FILE"
                echo "" >> "$CODE_OUTPUT_FILE"
                echo '```tsx' >> "$CODE_OUTPUT_FILE"
                cat "$file" >> "$CODE_OUTPUT_FILE"
                echo '```' >> "$CODE_OUTPUT_FILE"
                echo "" >> "$CODE_OUTPUT_FILE"
            fi
        done
    done

    # Recursively collect code from subdirectories
    for item in "$dir"/*; do
        if [ -d "$item" ]; then
            local base_item=$(basename "$item")
            if should_exclude_dir "$base_item"; then
                continue
            fi
            collect_code "$item"
        fi
    done
}

# Start collecting code from the target directory
collect_code "$TARGET_DIR"
echo "Combined code saved to $CODE_OUTPUT_FILE"