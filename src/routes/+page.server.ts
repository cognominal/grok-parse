import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { getWordData } from '$lib/db';
import { processContent } from '$lib/processor';
import fs from 'fs/promises';
import path from 'path';

export const load: PageServerLoad = async () => {
    try {
        const htmlContent = await fs.readFile(
            path.join(process.cwd(), 'static', 't.html'),
            'utf-8'
        );

        const { html, words } = await processContent(htmlContent);

        // Ensure we're only returning the body content
        const bodyMatch = html.match(/<body[^>]*>([\s\S]*)<\/body>/i);
        const processedHtml = bodyMatch ? bodyMatch[1] : html;

        return {
            processedHtml,
            words
        };
    } catch (e) {
        const errorMessage = e instanceof Error ? e.message : String(e);
        console.error('Error in load function:', errorMessage);
        throw error(500, `Error processing content: ${errorMessage}`);
    }
};

export const actions = {
    getDefinition: async ({ request }) => {
        try {
            const data = await request.formData();
            const word = data.get('word')?.toString();

            if (!word) {
                throw error(400, 'Word is required');
            }

            const wordData = await getWordData(word);
            return {
                definition: wordData?.wiktionary || 'Definition not found'
            };
        } catch (e) {
            const errorMessage = e instanceof Error ? e.message : String(e);
            console.error('Error in getDefinition action:', errorMessage);
            throw error(500, `Error fetching definition: ${errorMessage}`);
        }
    }
};
