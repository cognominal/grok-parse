import Database from 'better-sqlite3';

interface WordData {
    word: string;
    indices: number[];
}

async function analyzeWords() {
    const db = new Database('words.db');
    
    try {
        // Get all words and their indices from the database
        const rows = db.prepare('SELECT word, indices FROM words').all();
        
        // Convert indices from JSON string to array and count them
        const wordCounts: WordData[] = rows.map(row => ({
            word: row.word,
            indices: JSON.parse(row.indices)
        }));

        // Your analysis logic here...
        
    } finally {
        db.close();
    }
}

analyzeWords().catch(console.error);
