import sqlite3 from 'sqlite3';
import { promisify } from 'util';

interface WordData {
    word: string;
    indices: number[];
    wiktionary: string | null;
}

const db = new sqlite3.Database('words.db');

// Promisify database operations
const runAsync = promisify(db.run.bind(db));
const getAsync = promisify(db.get.bind(db));

// Create table if it doesn't exist
db.run(`
    CREATE TABLE IF NOT EXISTS words (
        word TEXT PRIMARY KEY,
        indices TEXT,
        wiktionary TEXT
    )
`);

export async function storeWordData(word: string, indices: number[], wiktionary: string | null): Promise<void> {
    await runAsync(
        'INSERT OR REPLACE INTO words (word, indices, wiktionary) VALUES (?, ?, ?)',
        [word, JSON.stringify(indices), wiktionary]
    );
}

export async function getWordData(word: string): Promise<WordData | null> {
    const result = await getAsync('SELECT * FROM words WHERE word = ?', [word]);
    if (result) {
        return {
            word: result.word,
            indices: JSON.parse(result.indices),
            wiktionary: result.wiktionary
        };
    }
    return null;
}
