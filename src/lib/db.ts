import Database from 'better-sqlite3';

interface WordData {
    word: string;
    indices: number[];
    wiktionary: string | null;
}

import path from 'path';

// Open database with better-sqlite3 using an absolute path
const dbPath = path.resolve(process.cwd(), 'words.db');
console.log(`Using database at: ${dbPath}`);
const db = new Database(dbPath);

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
    // Normalize the word to ensure consistent storage
    const normalizedWord = word.toLowerCase().trim();

    console.log(`Storing word in database: '${normalizedWord}'`);
    insertStmt.run(normalizedWord, JSON.stringify(indices), wiktionary);
}

export function getWordData(word: string): WordData | undefined {
    // Normalize the word to ensure consistent lookup
    const normalizedWord = word.toLowerCase().trim();

    // Debug log to track lookups
    console.log(`Looking up word in database: '${normalizedWord}'`);

    const row = getWordStmt.get(normalizedWord);

    if (!row) {
        console.log(`Word '${normalizedWord}' not found in database`);
        return undefined;
    }

    console.log(`Found word '${normalizedWord}' in database`);
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

// Function to check if the database is working correctly
export function checkDatabase(): void {
    try {
        // Check if we can execute a simple query
        const count = db.prepare('SELECT COUNT(*) as count FROM words').get();
        console.log(`Database check: Found ${count.count} words in the database`);

        // Try to insert and retrieve a test word
        const testWord = 'test_word_' + Date.now();
        storeWordData(testWord, [0], 'Test definition');
        const retrieved = getWordData(testWord);

        if (retrieved && retrieved.word === testWord) {
            console.log('Database check: Successfully inserted and retrieved a test word');
        } else {
            console.error('Database check: Failed to retrieve the test word');
        }
    } catch (error) {
        console.error('Database check failed:', error);
    }
}

// Run the database check when the module is loaded
checkDatabase();

// Clean up when the application exits
process.on('exit', () => db.close());
