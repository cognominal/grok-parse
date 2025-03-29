import { JSDOM } from 'jsdom';
import { storeWordData } from './db';

export async function findRussianWords(text: string): Promise<string[]> {
    const russianPattern = /[а-яёА-ЯЁ]+/g;
    const matches = text.match(russianPattern) || [];
    return matches;
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

export async function processContent(html: string) {
    const dom = new JSDOM(html);
    const doc = dom.window.document;
    const uniqueWords = new Set<string>();

    // Process text nodes and wrap Russian words with spans
    function processNode(node: Node) {
        if (node.nodeType === 3) { // Text node
            const text = node.textContent || '';
            const russianPattern = /[а-яёА-ЯЁ]+/g;
            const words = text.match(russianPattern) || [];

            if (words.length > 0) {
                const fragment = doc.createDocumentFragment();
                let lastIndex = 0;

                words.forEach(word => {
                    uniqueWords.add(word.toLowerCase());
                    const index = text.indexOf(word, lastIndex);

                    if (index > lastIndex) {
                        fragment.appendChild(
                            doc.createTextNode(text.slice(lastIndex, index))
                        );
                    }

                    const wrapper = doc.createElement('span');
                    wrapper.className = 'russian-word';
                    wrapper.setAttribute('data-word', word.toLowerCase());
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

    return {
        html: doc.body.innerHTML, // Only return the body content
        words: Array.from(uniqueWords)
    };
}
