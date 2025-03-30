<script lang="ts">
  let isDragging = $state(false);
  let startX = $state(0);
  let startY = $state(0);
  let leftWidth = $state(50); // percentage
  let topHeight = $state(50); // percentage

  let {
    direction = "horizontal",
    first,
    second,
  } = $props<{
    direction?: "horizontal" | "vertical";
    first?: any;
    second?: any;
  }>();

  function startDragging(e: MouseEvent) {
    isDragging = true;
    startX = e.clientX;
    startY = e.clientY;

    document.addEventListener("mousemove", onDragging);
    document.addEventListener("mouseup", stopDragging);
  }

  function onDragging(e: MouseEvent) {
    if (!isDragging) return;

    if (direction === "horizontal") {
      const delta = e.clientX - startX;
      const containerWidth = document.body.clientWidth;
      const percentageDelta = (delta / containerWidth) * 100;
      leftWidth = Math.min(Math.max(leftWidth + percentageDelta, 20), 80);
      startX = e.clientX;
    } else {
      const delta = e.clientY - startY;
      const containerHeight = document.body.clientHeight;
      const percentageDelta = (delta / containerHeight) * 100;
      topHeight = Math.min(Math.max(topHeight + percentageDelta, 20), 80);
      startY = e.clientY;
    }
  }

  function stopDragging() {
    isDragging = false;
    document.removeEventListener("mousemove", onDragging);
    document.removeEventListener("mouseup", stopDragging);
  }
</script>

<div class="pane-container" class:vertical={direction === "vertical"}>
  <div
    class="pane pane-first"
    style={direction === "horizontal"
      ? `width: ${leftWidth}%`
      : `height: ${topHeight}%`}
  >
    {@render first?.()}
  </div>

  <div
    class="resizer"
    class:vertical={direction === "vertical"}
    onmousedown={startDragging}
  />

  <div
    class="pane pane-second"
    style={direction === "horizontal"
      ? `width: ${100 - leftWidth}%`
      : `height: ${100 - topHeight}%`}
  >
    {@render second?.()}
  </div>
</div>

<style>
  .pane-container {
    display: flex;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  .vertical {
    flex-direction column;
  }

  .pane {
    overflow: auto;
    min-width: 0;
    min-height: 0;
  }

  .resizer {
    background-color: #eee;
    width: 4px;
    cursor: col-resize;
    transition background-color 0.2s;
  }

  .resizer:hover, .resizer:active {
    background-color: #ccc;
  }

  .resizer.vertical {
    width: 100%;
    height: 4px;
    cursor: row-resize;
  }
</style>
