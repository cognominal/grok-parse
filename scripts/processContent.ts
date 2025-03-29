import fs from 'fs/promises';
import path from 'path';
import { processContent } from '../src/lib/processor';

async function main() {
    try {
        console.log('Reading HTML content...');
        const htmlContent = await fs.readFile(
            path.join(process.cwd(), 'static', 't.html'),
            'utf-8'
        );

        console.log('Processing content and fetching Wiktionary definitions...');
        const { html, words } = await processContent(htmlContent, true); // Set fetchDefinitions to true

        // Ensure we're only returning the body content
        const bodyMatch = html.match(/<body[^>]*>([\s\S]*)<\/body>/i);
        const processedHtml = bodyMatch ? bodyMatch[1] : html;

        console.log(`Processed ${words.length} unique Russian words`);

        // Save the processed content
        await fs.writeFile(
            path.join(process.cwd(), 'static', 'processed.html'),
            processedHtml,
            'utf-8'
        );

        console.log('Content processed and saved successfully');
    } catch (e) {
        const errorMessage = e instanceof Error ? e.message : String(e);
        console.error('Error processing content:', errorMessage);
        process.exit(1);
    }
}

main();
