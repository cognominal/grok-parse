import sqlite3 from 'sqlite3';
import { promisify } from 'util';

interface WordData {
    word: string;
    indices: number[];
}

async function analyzeWords() {
    const db = new sqlite3.Database('words.db');
    
    // Promisify the all method
    const getAllAsync = promisify(db.all.bind(db));
    
    try {
        // Get all words and their indices from the database
        const rows = await getAllAsync('SELECT word, indices FROM words') as Array<{word: string, indices: string}>;
        
        // Convert indices from JSON string to array and count them
        const wordCounts: WordData[] = rows.map(row => ({
            word: row.word,
            indices: JSON.parse(row.indices)
        }));
        
        // Sort by number of indices (descending)
        wordCounts.sort((a, b) => b.indices.length - a.indices.length);
        
        // Print results
        console.log('Words sorted by frequency (most frequent first):');
        console.log('----------------------------------------');
        console.log('Count | Word');
        console.log('----------------------------------------');
        
        wordCounts.forEach(({ word, indices }) => {
            console.log(`${indices.length.toString().padEnd(5)} | ${word}`);
        });
        
        console.log('----------------------------------------');
        console.log(`Total unique words: ${wordCounts.length}`);
        
        const totalOccurrences = wordCounts.reduce((sum, { indices }) => sum + indices.length, 0);
        console.log(`Total word occurrences: ${totalOccurrences}`);
        
    } catch (error) {
        console.error('Error analyzing words:', error);
    } finally {
        db.close();
    }
}

analyzeWords();