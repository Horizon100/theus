<script lang="ts">
	import { onMount } from 'svelte';
	import Header from '$lib/components/layout/Header.svelte';
	import Taskbar from '$lib/components/layout/Taskbar.svelte';
	import Sidebar from '$lib/components/layout/Sidebar.svelte';
	// import { currentUser } from '$lib/pocketbase';
	import '../global.scss';
  
	let currentTheme = 'default';
	let mounted = false;
	let isGridView = true;
	let sidebarExpanded = false;
  
	// Placeholder for user data
	let userName: string | null = null;
	// TODO: Implement actual user authentication
	// $: userName = $currentUser?.username || $currentUser?.email || null;
  
	onMount(() => {
	  const savedTheme = localStorage.getItem('theme') || 'default';
	  setTheme(savedTheme);
	  mounted = true;
	});
  
	function setTheme(theme: string) {
	  currentTheme = theme;
	  document.documentElement.setAttribute('data-theme', theme);
	  localStorage.setItem('theme', theme);
	}
  
	function handleThemeChange(event: CustomEvent<string>) {
	  setTheme(event.detail);
	}
  
	function handleViewChange(event: CustomEvent<{ isGridView: boolean }>) {
	  isGridView = event.detail.isGridView;
	}
  
	function handleSubscribe(event: CustomEvent<{ email: string }>) {
	  console.log('Newsletter subscription:', event.detail.email);
	  // Handle newsletter subscription
	}
  
	function handleSidebarToggle() {
	  sidebarExpanded = !sidebarExpanded;
	}
  </script>
  
  {#if mounted}
	<div class="app-root" data-theme={currentTheme}>
	  <Header 
		{currentTheme}
		{userName}
		on:themeChange={handleThemeChange}
	  />
	  
	  <div class="content-wrapper" class:sidebar-expanded={sidebarExpanded}>
		<Sidebar
		  expanded={sidebarExpanded}
		  {isGridView}
		  on:viewChange={handleViewChange}
		  on:toggle={handleSidebarToggle}
		/>
		
		<main class="main-content">
		  <slot />
		</main>
	  </div>
  
	  <!-- <Taskbar 
	  /> -->
	</div>
  {/if}
  
  <style lang="scss">

	main {
		width: 100%;
	}
	.app-root {
	  display: flex;
	  flex-direction: column;
	  min-height: 100vh;
	  background: var(--bg-gradient);
	  color: var(--text-color);
	  font-family: var(--font-family);
	}
  
	.content-wrapper {
	  display: flex;
	  flex: 1;
	  position: relative;
	  transition: padding-left var(--transition-speed);
	  padding-left: 60px; // Width of collapsed sidebar
  
	  &.sidebar-expanded {
		padding-left: 280px; // Width of expanded sidebar
	  }
	}
  
	.main-content {
	  flex: 1;
	  padding: calc(var(--header-height) + var(--spacing-md)) var(--spacing-md) var(--spacing-md);
	  width: 100%;
	  margin: 0 auto;
	  box-sizing: border-box;
	  min-height: calc(100vh - var(--header-height));
	}
  
	@media (max-width: var(--breakpoint-lg)) {
	  .content-wrapper {
		padding-left: 0;
		
		&.sidebar-expanded {
		  padding-left: 60px;
		}
	  }
	}
  
	@media (max-width: var(--breakpoint-sm)) {
	  .main-content {
		padding: calc(var(--header-height) + var(--spacing-sm)) var(--spacing-sm) var(--spacing-sm);
	  }
	}
  </style>