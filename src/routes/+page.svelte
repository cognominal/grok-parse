<script lang="ts">
	/* @tailwind */
	import { SplitPane } from "@rich_harris/svelte-split-pane";

	// let { data } = { data: PageData } = $props();
	let { data } = $props();

	let selectedWord: string | null = $state(null);
	let wordDefinition: string | null = $state(null);

	async function showDefinition(word: string) {
		selectedWord = word;
		const form = new FormData();
		form.append("word", word);

		try {
			const response = await fetch("?/getDefinition", {
				method: "POST",
				body: form
			});
			const result = await response.json();
			// The server returns { definition: string }
			wordDefinition = result.data;
			// console.log(result);

			if (wordDefinition) {
				wordDefinition = wordDefinition.replace(/\\u003C/g, "<");
				wordDefinition = wordDefinition.replace(/\\n/g, "");
			} else {
				wordDefinition = "Definition not found";
			}

			console.log(wordDefinition);
		} catch (error) {
			console.error("Error fetching definition:", error);
			wordDefinition = "Error loading definition";
		}
	}

	function handleClick(event: MouseEvent | KeyboardEvent) {
		const target = event.target as HTMLElement;
		if (target.classList.contains("russian-word")) {
			const word = target.getAttribute("data-word");
			if (word) {
				showDefinition(word);
			}
		}
	}
</script>

<main class="w-full h-screen mx-auto p-5 flex flex-col">
	<SplitPane
		type="vertical"
		id="main-split"
		min="200px"
		max="-200px"
		pos="50%"
		--color="#e5e7eb"
		--thickness="4px"
	>
		{#snippet a()}
			<section class="overflow-y-auto bg-white p-4 h-full">
				{#if data?.processedHtml}
					<div
						class="w-full"
						onclick={handleClick}
						onkeydown={(e) => e.key === "Enter" && handleClick(e)}
						role="textbox"
						tabindex="0"
						aria-label="Russian text with clickable words"
					>
						{@html data.processedHtml}
					</div>
				{/if}
			</section>
		{/snippet}

		{#snippet b()}
			<section class="overflow-y-auto bg-white p-4 h-full">
				{#if selectedWord && wordDefinition}
					<div class="bg-white p-5 rounded-lg shadow-lg overflow-y-auto">
						<h3>Definition for "{selectedWord}"</h3>
						<div class="my-4">
							{@html wordDefinition}
						</div>
					</div>
				{:else}
					<div class="bg-white p-5 rounded-lg shadow-lg overflow-y-auto">
						<h3>Select a word to see its definition</h3>
					</div>
				{/if}
			</section>
		{/snippet}
	</SplitPane>
</main>

<style>
	:global(.russian-word) {
		cursor: pointer;
		border-bottom: 1px dashed #9ca3af;
		display: inline-block;
		padding-left: 0.125rem;
		padding-right: 0.125rem;
	}

	:global(.russian-word:hover) {
		background-color: #f3f4f6;
	}
</style>
