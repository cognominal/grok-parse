import { JSDOM } from 'jsdom';
import { storeWordData, getWordData } from './db';

export async function findRussianWords(text: string): Promise<string[]> {
    const russianPattern = /[а-яёА-ЯЁ]+/g;
    const matches = text.match(russianPattern) || [];
    return matches;
}

function rmBySel(doc: Document, selector: string): void {
    doc.querySelectorAll(selector).forEach(el => el.remove());
}

export async function fetchWiktionaryContent(word: string): Promise<string | null> {
    try {
        const response = await fetch(
            `https://en.wiktionary.org/wiki/${encodeURIComponent(word)}`
        );
        if (!response.ok) return null;

        const html = await response.text();
        const dom = new JSDOM(html);
        const doc = dom.window.document;

        // Remove all edit section elements and SVGs
        rmBySel(doc, '.mw-editsection');
        rmBySel(doc, 'svg');

        const russianSection = doc.querySelector("#Russian");
        if (!russianSection) return null;

        let content = "";
        let currentElement: HTMLElement | null = russianSection.parentElement;
        while ((currentElement = currentElement?.nextElementSibling as HTMLElement | null)) {
            if (currentElement.tagName === "H2") break;
            content += currentElement.outerHTML;
        }

        return content;
    } catch (error) {
        console.error(`Error fetching Wiktionary content for ${word}:`, error);
        return null;
    }
}

function delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export async function processContent(html: string, fetchDefinitions: boolean = false) {
    const dom = new JSDOM(html);
    const doc = dom.window.document;
    const uniqueWords = new Set<string>();
    const wordIndices: Map<string, number[]> = new Map();

    // Process text nodes and wrap Russian words with spans
    function processNode(node: Node) {
        if (node.nodeType === 3) { // Text node
            const text = node.textContent || '';
            const russianPattern = /[а-яёА-ЯЁ]+/g;
            let match;

            while ((match = russianPattern.exec(text)) !== null) {
                const word = match[0].toLowerCase();
                uniqueWords.add(word);

                // Store the index for this occurrence
                if (!wordIndices.has(word)) {
                    wordIndices.set(word, []);
                }
                wordIndices.get(word)?.push(match.index);
            }

            // Create spans for visual highlighting
            const words = text.match(russianPattern) || [];
            if (words.length > 0) {
                const fragment = doc.createDocumentFragment();
                let lastIndex = 0;

                words.forEach(word => {
                    const index = text.indexOf(word, lastIndex);

                    if (index > lastIndex) {
                        fragment.appendChild(
                            doc.createTextNode(text.slice(lastIndex, index))
                        );
                    }

                    const wrapper = doc.createElement('span');
                    wrapper.className = 'russian-word';
                    wrapper.setAttribute('data-word', word);
                    wrapper.textContent = word;
                    fragment.appendChild(wrapper);

                    lastIndex = index + word.length;
                });

                if (lastIndex < text.length) {
                    fragment.appendChild(
                        doc.createTextNode(text.slice(lastIndex))
                    );
                }

                node.parentNode?.replaceChild(fragment, node);
            }
        } else {
            Array.from(node.childNodes).forEach(processNode);
        }
    }

    processNode(doc.body);

    // Only fetch and store Wiktionary content if fetchDefinitions is true
    if (fetchDefinitions) {
        // Store all found words in the database with their Wiktionary content
        for (const word of uniqueWords) {
            const indices = wordIndices.get(word) || [];

            // Check if the word already exists in the database
            // Add special logging for the problematic word
            if (word === 'сегодняшней') {
                console.log(`Found the problematic word: '${word}'`);
                console.log(`Word type: ${typeof word}`);
                console.log(`Word length: ${word.length}`);
                console.log(`Word character codes: ${Array.from(word).map(c => c.charCodeAt(0))}`);
            }

            const existingWordData = getWordData(word);

            if (existingWordData && existingWordData.wiktionary) {
                // Word already exists with Wiktionary content, just update indices if needed
                console.log(`Word '${word}' already in database, skipping fetch.`);

                // Update indices if they've changed
                if (JSON.stringify(existingWordData.indices) !== JSON.stringify(indices)) {
                    storeWordData(word, indices, existingWordData.wiktionary);
                    console.log(`Updated indices for word '${word}'.`);
                }
            } else {
                // Word doesn't exist or has no Wiktionary content, fetch it
                console.log(`Fetching definition for word '${word}'...`);
                const wiktionaryContent = await fetchWiktionaryContent(word);
                storeWordData(word, indices, wiktionaryContent);

                // Optional: Add some logging to track progress
                console.log(`Processed word: ${word}`);

                // Add a small delay to avoid overwhelming the Wiktionary API
                // Only delay for words that needed to be fetched
                await delay(1000);
            }
        }
    }

    return {
        html: doc.body.innerHTML,
        words: Array.from(uniqueWords)
    };
}
