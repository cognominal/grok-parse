<script>
  let activeTab = 0; // Tracks the active tab index

  const tabs = [
    { name: "Tab 1", content: "This is the content of Tab 1" },
    { name: "Tab 2", content: "This is the content of Tab 2" },
    { name: "Tab 3", content: "This is the content of Tab 3" },
  ];
</script>

<div class="tabs">
  {#each tabs as tab, index}
    <button
      class:active={activeTab === index}
      on:click={() => (activeTab = index)}
    >
      {tab.name}
    </button>
  {/each}
</div>

<div class="pane">
  <p>{tabs[activeTab].content}</p>
</div>

<style>
  .tabs button {
    padding: 10px;
    cursor: pointer;
  }
  .active {
    background-color: #ddd;
    font-weight: bold;
  }
  .pane {
    padding: 20px;
    border: 1px solid #ccc;
  }
</style>
