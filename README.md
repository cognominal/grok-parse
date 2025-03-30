# Grok Parse

A web application that helps users understand Russian text by making words interactive and providing instant translations and definitions.


## In transitional state

this is an app currently under development generated with thr help of the vscode extension augment. It augments russian text with its traduction generated with
grok. When clicking on a russian word, the corresponding wiktionary page is
displayed. The wikitonary pages are cached in a db.
Eventually : 
  * spaced repetition learning will be possible
  * to do so a better UI will be developped
  * more text beside the 1978 Solzhenitsyn address will be supported.


Currently the db should be filled in advance with the following command:

```bash
  pnpm run process-content
```
So far it displays html content generated from grok. Some logic is there to get the wiktionary entry
associated to a russian wor.

## Features as per augment :)

- Processes HTML content containing Russian text
- Automatically detects and highlights Russian words
- Click on any Russian word to see its definition from Wiktionary
- Clean, modern interface with popup definitions
- SQLite database integration for storing word definitions

## Technical Stack

- SvelteKit 2.0+ with Svelte 5.0
- TypeScript for type safety
- SQLite3 for local database storage
- JSDOM for HTML processing
- Vite for building and development

## Development

Use `npm` or `pnpm`. 

1. Install dependencies:
```bash
npm install
# or
pnpm install
# or
yarn install
```

2. Initialize the database by fetching the wiktionary data:
```bash
npm run process-content
```


3. Start the development server:
```bash
npm run dev
```

4. Open your browser to `http://localhost:5173`

## Building

Create a production version:
```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

## Project Structure

- `/src/routes` - SvelteKit routes and components
- `/src/lib` - Shared utilities and components
- `/static` - Static assets and sample HTML files
- `/src/lib/db` - Database interactions and word processing

## License

MIT
