<script lang="ts">
  // import { signal } from "svelte";

  let activeTab = $state(0); // Tracks the active tab index

  const tabs = [
    { name: "Tab 1", content: "This is the content of Tab 1" },
    { name: "Tab 2", content: "This is the content of Tab 2" },
    { name: "Tab 3", content: "This is the content of Tab 3" },
  ];

  function setActiveTab(index: number) {
    activeTab = index;
  }
</script>

<div class="tabs">
  {#each tabs as tab, index}
    <button
      class:active={$activeTab === index}
      onclick={() => setActiveTab(index)}
    >
      {tab.name}
    </button>
  {/each}
</div>

<div class="pane">
  <p>{tabs[$activeTab].content}</p>
</div>

<style>
  .tabs button {
    padding: 10px;
    cursor: pointer;
    border: none;
    background: none;
    margin-right: 4px;
    border-radius: 4px 4px 0 0;
    border: 1px solid #ccc;
    border-bottom: none;
  }

  .tabs button:hover {
    background-color: #f5f5f5;
  }

  .active {
    background-color: #fff !important;
    font-weight: bold;
    position: relative;
  }

  .active::after {
    content: "";
    position: absolute;
    bottom: -1px;
    left: 0;
    right: 0;
    height: 1px;
    background-color: white;
  }

  .pane {
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 0 4px 4px 4px;
    background-color: white;
  }

  .tabs {
    display: flex;
    gap: 2px;
    margin-bottom: -1px;
  }
</style>
