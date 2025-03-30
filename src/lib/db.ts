import Database from 'better-sqlite3';

interface WordData {
    word: string;
    indices: number[];
    wiktionary: string | null;
}

// Open database with better-sqlite3
const db = new Database('words.db');

// Enable foreign keys and WAL mode for better performance
db.pragma('foreign_keys = ON');
db.pragma('journal_mode = WAL');

// Create table if it doesn't exist
db.exec(`
    CREATE TABLE IF NOT EXISTS words (
        word TEXT PRIMARY KEY,
        indices TEXT,
        wiktionary TEXT
    )
`);

// Prepare statements for better performance
const insertStmt = db.prepare(`
    INSERT OR REPLACE INTO words (word, indices, wiktionary)
    VALUES (?, ?, ?)
`);

const getWordStmt = db.prepare(`
    SELECT word, indices, wiktionary
    FROM words
    WHERE word = ?
`);

const getAllWordsStmt = db.prepare(`
    SELECT word, indices, wiktionary
    FROM words
`);

export function storeWordData(word: string, indices: number[], wiktionary: string | null): void {
    insertStmt.run(word, JSON.stringify(indices), wiktionary);
}

export function getWordData(word: string): WordData | undefined {
    const row = getWordStmt.get(word);
    if (!row) return undefined;

    return {
        word: row.word,
        indices: JSON.parse(row.indices),
        wiktionary: row.wiktionary
    };
}

export function getAllWords(): WordData[] {
    const rows = getAllWordsStmt.all();
    return rows.map(row => ({
        word: row.word,
        indices: JSON.parse(row.indices),
        wiktionary: row.wiktionary
    }));
}

// Clean up when the application exits
process.on('exit', () => db.close());
