import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { getWordData } from '$lib/db';
import fs from 'fs/promises';
import path from 'path';

export const load: PageServerLoad = async () => {
    try {
        const processedHtml = await fs.readFile(
            path.join(process.cwd(), 'static', 'processed.html'),
            'utf-8'
        );

        return {
            processedHtml,
            words: [] // You might want to store and load the words list separately
        };
    } catch (e) {
        const errorMessage = e instanceof Error ? e.message : String(e);
        console.error('Error in load function:', errorMessage);
        throw error(500, `Error loading processed content: ${errorMessage}`);
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
