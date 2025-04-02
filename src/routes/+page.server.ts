import { error } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';
import { getWordData, storeWordData } from '$lib/db';
import { fetchWiktionaryContent } from '$lib/processor';
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

export const actions: Actions = {
    getDefinition: async ({ request }) => {
        try {
            const data = await request.formData();
            const word = data.get('word')?.toString();

            if (!word) {
                throw error(400, 'Word is required');
            }

            // Check if the word exists in the database
            let wordData = getWordData(word);

            // If the word doesn't exist in the database or has no Wiktionary content
            if (!wordData || !wordData.wiktionary) {
                console.log(`Word '${word}' not found in database. Fetching from Wiktionary...`);

                // Fetch the definition from Wiktionary
                const wiktionaryContent = await fetchWiktionaryContent(word);

                // Store the word data in the database
                // If wordData exists but has no Wiktionary content, preserve its indices
                const indices = wordData ? wordData.indices : [];
                storeWordData(word, indices, wiktionaryContent);

                // Update wordData with the new Wiktionary content
                wordData = {
                    word,
                    indices,
                    wiktionary: wiktionaryContent
                };

                console.log(`Stored definition for '${word}' in database.`);
            }

            return {
                definition: wordData.wiktionary || 'Definition not found'
            };
        } catch (e) {
            const errorMessage = e instanceof Error ? e.message : String(e);
            console.error('Error in getDefinition action:', errorMessage);
            throw error(500, `Error fetching definition: ${errorMessage}`);
        }
    }
};
