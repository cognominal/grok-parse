import sqlite3 from 'sqlite3';
import { promisify } from 'util';

interface WordData {
    word: string;
    indices: number[];
    wiktionary: string | null;
}

const db = new sqlite3.Database('words.db');

// Correctly promisify database operations
const runAsync = (sql: string, params: any[] = []): Promise<void> => {
    return new Promise((resolve, reject) => {
        db.run(sql, params, (err) => {
            if (err) reject(err);
            else resolve();
        });
    });
};

const getAsync = (sql: string, params: any[] = []): Promise<any> => {
    return new Promise((resolve, reject) => {
        db.get(sql, params, (err, row) => {
            if (err) reject(err);
            else resolve(row);
        });
    });
};

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
