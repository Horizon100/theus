<script lang="ts">
    import { createEventDispatcher } from 'svelte';

    import { slide, fade, fly } from 'svelte/transition';


  const dispatch = createEventDispatcher();

  let isExpanded = false;
  let overlayVisible = false;

  // Toggle side buttons
  function toggleButtons() {
    isExpanded = !isExpanded;
  }

  // Open overlay from bottom
  function openOverlay() {
    overlayVisible = true;
  }

  // Close overlay when the close button is clicked
  function closeOverlay() {
    overlayVisible = false;
  }

  function handleClickOutside(event: MouseEvent) {
    if (event.target === event.currentTarget) {
      overlayVisible = false;
    }
  }

</script>

<div class="taskbar">
  <div class="taskbar-content">
    <div class="buttons-container">
      <div class="buttons-left">
        {#if isExpanded}
          <button class="toggle-button" 
            on:click={openOverlay}
            transition:fly="{{ y: 300, duration: 300 }}">
            <span class="icon">🛠</span>
            <span class="text">Tool 1</span>
          </button>
          <button class="toggle-button" 
            on:click={openOverlay}
            transition:fly="{{ y: 300, duration: 300 }}">              
            <span class="icon">⚙️</span>
            <span class="text">Tool 2</span>
          </button>
        {/if}
      </div>

      <div class="plus-button-container" on:click={toggleButtons} 
      >
        <button class="plus-button"
        transition:fade="{{ duration: 300 }}"
        >
          {#if isExpanded}
            ✖️
          {:else}
            ➕
          {/if}
        </button>
      </div>

      <div class="buttons-right">
        {#if isExpanded}
          <button class="toggle-button" 
            on:click={openOverlay}
            transition:fly="{{ y: 300, duration: 300 }}">
            <span class="icon">🔧</span>
            <span class="text">Tool 3</span>
          </button>
          <button class="toggle-button"           
            on:click={openOverlay}
            transition:fly="{{ y: 300, duration: 300 }}">
            <span class="icon">🔨</span>
            <span class="text">Tool 4</span>
          </button>
        {/if}
      </div>
    </div>
  </div>

  {#if overlayVisible}
    <div class="overlay" on:click|self={handleClickOutside} transition:fly="{{ y: 300, duration: 300 }}">

      <div class="overlay-content">
        <p>Overlay Content</p>
        <button class="close-overlay" on:click={closeOverlay}>Close</button>
      </div>
    </div>
  {/if}
</div>

<style lang="scss">
  .taskbar {
    position: fixed;
    bottom: 5rem;
    // height: var(--header-height);
    // color: var(--text-color);
    // font-family: var(--font-family);
    z-index: 1000;
    width: 100%;

    justify-content: center;
    align-items: center;
    display: flex;
  }
    .taskbar-content {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      
    }

    .buttons-container {
      display: flex;
      justify-content: space-between;
      align-items: center;
      // background: var(--bg-gradient);
      padding: 0.5rem;
      border-radius: 2rem;
      gap: 1rem;


    }

    .buttons-left, .buttons-right {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      gap: 1rem;
      width: 100%;
      align-items: center;
    }

    .plus-button-container {
      display: flex;
      justify-content: center;
      align-items: center;

    }

    button.plus-button {
      height: 60px;
      width: 60px;
      font-size: 20px;
      background-color: var(--primary-color);
      color: var(--text-color);
      border-radius: 50%;
      border: none;
      cursor: pointer;
    }

    button.toggle-button {
      height: 60px;
      width: 60px;
      background-color: var(--secondary-color);
      color: var(--text-color);
      padding: 10px;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 5px;
      border-radius: 50%;
      transition: all 0.3s ease-in-out;
    }


    button.toggle-button:hover {
      transform: scale(1.1);
    }

    .icon {
      font-size: 20px;

    }

    .text {
      font-size: 12px;
    }

    .overlay {
      position: fixed;
      bottom: 90px;
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 2000;
      left:  30%;
      width: 42%;
      height: 50%;
    }

    .overlay-content {
      background: var(--bg-gradient-r);
      padding: 20px;
      width: 80%;
      height: 50%;
      max-width: 400px;
      position: absolute;
      bottom: 0;
    }

    .close-overlay {
      background-color: #ff5252;
      color: white;
      padding: 10px;
      border: none;
      border-radius: 5px;
      cursor: pointer;
    }
  
</style>