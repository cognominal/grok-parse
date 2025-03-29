this is an app currently under development generated using the vscode extension augment.
So far it displays html content generated from grok. Some logic is there to get the wiktionary entry
associated to a russian word but something is missing.x

# Grok Parse

A web application that helps users understand Russian text by making words interactive and providing instant translations and definitions.

## Features

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

1. Install dependencies:
```bash
npm install
# or
pnpm install
# or
yarn install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser to `http://localhost:5173`

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
