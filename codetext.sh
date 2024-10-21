# Exclude directories (add to this array as needed)
EXCLUDE_DIRS=("node_modules" ".git" ".next" "dist" "build" "components")

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

# Initialize the main readme file
echo "# Project Code Overview" > code_readme.md
echo "" >> code_readme.md

# Function to collect code from the directories
collect_code() {
    local dir="$1"
    local indent="$2"

    # Get the base name of the current directory
    local dir_name=$(basename "$dir")

    # Check if current directory should be excluded
    if should_exclude_dir "$dir_name"; then
        return
    fi

    # Add directory header to the readme
    echo "${indent}## Directory: $dir" >> code_readme.md
    echo "" >> code_readme.md

    # Find 'page.tsx' and 'layout.tsx' files in the current directory
    for file in "$dir"/*.tsx; do
        if [ -f "$file" ]; then
            local base_file=$(basename "$file")
            if [[ "$base_file" == "page.tsx" ]] || [[ "$base_file" == "layout.tsx" ]]; then
                echo "${indent}### File: $file" >> code_readme.md
                echo "" >> code_readme.md
                echo '```tsx' >> code_readme.md
                cat "$file" >> code_readme.md
                echo '```' >> code_readme.md
                echo "" >> code_readme.md
            fi
        fi
    done

    # Recursively collect code from subdirectories
    for item in "$dir"/*; do
        if [ -d "$item" ]; then
            local base_item=$(basename "$item")
            if should_exclude_dir "$base_item"; then
                continue
            fi
            collect_code "$item" "$indent"
        fi
    done
}

# Start collecting code from the current directory
collect_code "." ""

echo "code_readme.md file generated successfully."
