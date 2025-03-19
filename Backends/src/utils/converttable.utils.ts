export const convertTable = (input: string): string  => {
    return input
        .toLowerCase()                    // Convert to lowercase
        .replace(/\s+/g, '_')              // Replace spaces with underscores
        .replace(/[^\w_]+/g, '')           // Remove non-alphanumeric characters (optional)
        + '_table';                        // Append '_table' at the end
}