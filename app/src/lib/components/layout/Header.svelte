<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    import { fade } from 'svelte/transition';

    export let title: string = " Theus";
    export let currentTheme: string = "default";
    export let showThemeSelector: boolean = true;
    export let userName: string | null = null;

    const dispatch = createEventDispatcher();
    
    const themes = [
      { id: 'default', name: 'Default' },
      { id: 'dark', name: 'Dark' },
      { id: 'light', name: 'Light' },
      { id: 'sunset', name: 'Sunset' },
      { id: 'focus', name: 'Focus' },
      { id: 'bold', name: 'Bold' },
      { id: 'turbo', name: 'Turbo' }
    ];
  
    function handleThemeChange(event: Event) {
      const target = event.target as HTMLSelectElement;
      dispatch('themeChange', target.value);
    }
  
    function handleProfileClick() {
      dispatch('profileClick');
    }
  
    let isScrolled = false;
  
    function handleScroll() {
      isScrolled = window.scrollY > 0;
    }
  
    // Add scroll listener
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', handleScroll);
    }
  </script>
  
  <header class:scrolled={isScrolled}>
    <div class="header-content">
      <div class="left-section">
        <h1 class:scrolled={isScrolled}>{title}</h1>
      </div>
      
      <div class="right-section">


        {#if showThemeSelector}
          <select 
            value={currentTheme} 
            on:change={handleThemeChange}
            class="theme-selector"
          >
            {#each themes as theme}
              <option value={theme.id}>{theme.name}</option>
            {/each}
          </select>
        {/if}
        
        {#if userName}
          <button 
            class="profile-button" 
            on:click={handleProfileClick}
            transition:fade
          >
            <span class="avatar">{userName[0].toUpperCase()}</span>
            <span class="user-name">{userName}</span>
          </button>
        {/if}
      </div>
    </div>
  </header>
  
  <style lang="scss">
    header {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      height: var(--header-height);
      background: var(--bg-gradient);
      color: var(--text-color);
      font-family: var(--font-family);
      z-index: 1000;
      transition: all var(--transition-speed) ease-in-out;
      
      &.scrolled {
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        backdrop-filter: blur(10px);
        background: rgba(var(--bg-color), 0.8);
        height: 20px;
      }
    }
  
    .header-content {
      max-width: var(--breakpoint-xl);
      margin: 0 auto;
      padding: 0 var(--spacing-md);
      height: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    h1 {
        font-size: var(--font-size-lg);
        font-weight: bold;
        margin: 0;

        &.scrolled {
          font-size: var(--font-size-base);

      }
      }
  
    .left-section {



    }
  
    .right-section {
      display: flex;
      align-items: center;
      gap: var(--spacing-md);
    }
  
    .theme-selector {
      padding: var(--spacing-xs) var(--spacing-sm);
      border: 1px solid var(--secondary-color);
      border-radius: var(--border-radius);
      background: transparent;
      color: var(--text-color);
      font-family: var(--font-family);
      cursor: pointer;
      transition: all var(--transition-speed);
  
      &:hover {
        background: var(--secondary-color);
      }
  
      option {
        background: var(--bg-color);
        color: var(--text-color);
      }
    }


  
    .profile-button {
      display: flex;
      align-items: center;
      gap: var(--spacing-sm);
      padding: var(--spacing-xs) var(--spacing-sm);
      background: transparent;
      border: 1px solid var(--secondary-color);
      border-radius: var(--border-radius);
      color: var(--text-color);
      cursor: pointer;
      transition: all var(--transition-speed);
  
      &:hover {
        background: var(--secondary-color);
      }
    }
  
    .avatar {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      background: var(--tertiary-color);
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
    }
  
    .user-name {
      font-size: var(--font-size-sm);
    }
  
    @media (max-width: var(--breakpoint-sm)) {
      .header-content {
        padding: 0 var(--spacing-sm);
      }
  
      .user-name {
        display: none;
      }
  
      h1 {
        font-size: var(--font-size-base);
      }
    }
  </style>