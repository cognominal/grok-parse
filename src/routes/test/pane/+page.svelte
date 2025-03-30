<script lang="ts">
  import ResizablePanes from "$lib/ResizablePanes.svelte";
</script>

<div class="container">
  <!-- Horizontal split example -->
  <div class="pane-wrapper">
    <h2>Horizontal Split</h2>
    <div class="demo-pane">
      <ResizablePanes direction="horizontal">
        <div class="content left" slot="first">Left Panel</div>
        <div class="content right" slot="second">Right Panel</div>
      </ResizablePanes>
    </div>
  </div>

  <!-- Vertical split example -->
  <div class="pane-wrapper">
    <h2>Vertical Split</h2>
    <div class="demo-pane">
      <ResizablePanes direction="vertical">
        <div class="content top" slot="first">Top Panel</div>
        <div class="content bottom" slot="second">Bottom Panel</div>
      </ResizablePanes>
    </div>
  </div>
</div>

<style>
  .container {
    padding: 2rem;
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

  .pane-wrapper {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .demo-pane {
    height: 300px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }

  .content {
    padding: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f5f5f5;
  }

  .left,
  .right {
    height: 100%;
  }

  .top,
  .bottom {
    width: 100%;
  }
</style>
