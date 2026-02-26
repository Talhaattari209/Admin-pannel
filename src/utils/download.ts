/**
 * Downloads a file from a given URL by fetching it as a blob and triggering a browser download.
 * This ensures the file is saved to the local system instead of being opened in a new tab.
 * 
 * @param url The URL of the file to download (e.g., S3 URL)
 * @param defaultFilename The filename to use if one cannot be extracted from the URL
 */
export const downloadFileFromUrl = async (url: string, defaultFilename: string) => {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Failed to fetch file: ${response.statusText}`);

        const blob = await response.blob();
        const blobUrl = window.URL.createObjectURL(blob);

        // Extract filename from URL or use default
        const urlFilename = url.split('/').pop();
        const filename = urlFilename ? decodeURIComponent(urlFilename) : defaultFilename;

        const link = document.createElement('a');
        link.href = blobUrl;
        link.setAttribute('download', filename);
        document.body.appendChild(link);
        link.click();

        // Cleanup
        link.remove();
        window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
        console.error('[Download Utility] Error downloading file:', error);
        // Fallback to window.open if fetch fails (e.g., CORS issues)
        window.open(url, '_blank');
    }
};
