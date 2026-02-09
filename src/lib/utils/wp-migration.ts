/**
 * Utility to clean dirty WordPress HTML strings
 * Removes inline styles, unnecessary classes, and cleans up tags
 */

export function cleanWpHtml(html: string): string {
    if (!html) return '';

    return html
        // Remove WP classes like wp-block-*, aligncenter, etc.
        .replace(/class="wp-block-[^"]*"/g, '')
        .replace(/class="align[^"]*"/g, '')

        // Remove inline styles
        .replace(/style="[^"]*"/g, '')

        // Remove empty paragraphs
        .replace(/<p>&nbsp;<\/p>/g, '')
        .replace(/<p><\/p>/g, '')

        // Remove data-attributes
        .replace(/data-[a-z0-9-]+="[^"]*"/g, '')

        // Clean up excessive whitespace
        .replace(/\s+/g, ' ')
        .trim();
}

/**
 * Maps WordPress local URLs to Next.js optimized paths
 * Assuming public/wp-content/uploads/ structure
 */
export function mapWpUrl(url: string): string {
    if (!url) return '';

    // If it's a relative WP path
    if (url.startsWith('/wp-content/uploads/')) {
        return url;
    }

    // If it's an absolute WP path from the old domain
    const wpDomainRegex = /https?:\/\/(?:www\.)?fertilitycentercancun\.com\/wp-content\/uploads\/(.+)/i;
    const match = url.match(wpDomainRegex);

    if (match) {
        return `/wp-content/uploads/${match[1]}`;
    }

    return url;
}
