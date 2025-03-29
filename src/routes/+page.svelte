<script lang="ts">
  import type { PageData } from "./$types";

  export let data: PageData;

  let selectedWord: string | null = null;
  let wordDefinition: string | null = null;

  async function showDefinition(word: string) {
    selectedWord = word;
    const form = new FormData();
    form.append("word", word);

    try {
      const response = await fetch("?/getDefinition", {
        method: "POST",
        body: form,
      });
      const result = await response.json();
      // The server returns { definition: string }, not { data: { definition: string } }
      wordDefinition = result.definition;
    } catch (error) {
      console.error("Error fetching definition:", error);
      wordDefinition = "Error loading definition";
    }
  }

  function closeDefinition() {
    selectedWord = null;
    wordDefinition = null;
  }

  function handleClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (target.classList.contains("russian-word")) {
      const word = target.getAttribute("data-word");
      if (word) {
        showDefinition(word);
      }
    }
  }
</script>

<main>
  {#if data?.processedHtml}
    <div on:click={handleClick}>
      {@html data.processedHtml}
    </div>
  {/if}

  {#if selectedWord && wordDefinition}
    <div class="definition-popup-overlay" on:click={closeDefinition}></div>
    <div class="definition-popup">
      <h3>Definition for "{selectedWord}"</h3>
      <div class="definition-content">
        {@html wordDefinition}
      </div>
      <button class="close-button" on:click={closeDefinition}>Close</button>
    </div>
  {/if}
</main>

<style>
  main {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
  }

  :global(.russian-word) {
    cursor: pointer;
    border-bottom: 1px dashed #999;
    display: inline-block;
    padding: 0 2px;
  }

  :global(.russian-word:hover) {
    background-color: #f0f0f0;
  }

  .definition-popup {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    max-width: 80%;
    max-height: 80vh;
    overflow-y: auto;
    z-index: 1000;
  }

  .definition-popup-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 999;
  }

  .definition-content {
    margin: 15px 0;
  }

  .close-button {
    background: #f0f0f0;
    border: none;
    padding: 8px 16px;
    border-radius: 4px;
    cursor: pointer;
  }

  .close-button:hover {
    background: #e0e0e0;
  }
</style>
