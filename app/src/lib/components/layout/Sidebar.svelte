<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { FilterIcon, Grid, BarChart2, SortAsc, SortDesc, MessageSquare } from 'lucide-svelte';
  import Filters from '$lib/components/common/Filters.svelte';
  import Threads from '$lib/components/common/Navigation/Threads.svelte';
  import { viewStore, toggleView } from '$lib/stores/viewStore';

  const dispatch = createEventDispatcher();

  let isFiltersExpanded = false;
  let isThreadsExpanded = false;
  let isSortAscending = true;
  let isScrolled = false;

  function handleScroll() {
    isScrolled = window.scrollY > 0;
  }

  if (typeof window !== 'undefined') {
    window.addEventListener('scroll', handleScroll);
  }

  function toggleFilters() {
    isFiltersExpanded = !isFiltersExpanded;
    if (isFiltersExpanded) isThreadsExpanded = false;
  }

  function toggleThreads() {
    isThreadsExpanded = !isThreadsExpanded;
    if (isThreadsExpanded) isFiltersExpanded = false;
  }

  function handleToggleView() {
    toggleView();
  }

  function toggleSort() {
    isSortAscending = !isSortAscending;
    dispatch('sortChange', { isSortAscending });
  }

  function handleFilterChange(event: CustomEvent) {
    dispatch('filterChange', event.detail);
  }

  function handleThreadChange(event: CustomEvent) {
    dispatch('threadChange', event.detail);
  }
</script>

<div class="sidebar" class:scrolled={isScrolled}>
  <div class="sidebar-controls">
    <button
      class="control-btn"
      class:active={isFiltersExpanded}
      on:click={toggleFilters}
      title="Toggle Filters"
    >
      <FilterIcon size={24} />
    </button>

    <button
      class="control-btn"
      class:active={isThreadsExpanded}
      on:click={toggleThreads}
      title="Toggle Threads"
    >
      <MessageSquare size={24} />
    </button>

    <button
      class="control-btn"
      on:click={handleToggleView}
      title="Toggle View"
    >
      {#if $viewStore.isGridView}
        <BarChart2 size={24} />
      {:else}
        <Grid size={24} />
      {/if}
    </button>

    <button
      class="control-btn"
      on:click={toggleSort}
      title={isSortAscending ? 'Sort Descending' : 'Sort Ascending'}
    >
      {#if isSortAscending}
        <SortAsc size={24} />
      {:else}
        <SortDesc size={24} />
      {/if}
    </button>
  </div>

  <div class="filters-panel">
    <Filters
      isExpanded={isFiltersExpanded}
      on:filterChange={handleFilterChange}
    />
  </div>

  <div class="threads-panel">
    <Threads
      isExpanded={isThreadsExpanded}
      on:threadChange={handleThreadChange}
      on:close={() => isThreadsExpanded = false}
    />
  </div>
</div>

<style lang="scss">
  .sidebar {
    display: flex;
    position: fixed;
    left: 0;
    top: var(--header-height);
    bottom: 0;
    z-index: 900;
    transition: width var(--transition-speed);

    &.scrolled {
      top: 20px;
    }
  }

  .sidebar-controls {
    display: flex;
    flex-direction: column;
    padding: var(--spacing-sm);
    gap: var(--spacing-sm);
    width: 40px;
  }

  .control-btn {
    background: transparent;
    border: none;
    color: var(--text-color);
    padding: var(--spacing-sm);
    border-radius: var(--border-radius);
    cursor: pointer;
    transition: all var(--transition-speed);

    &:hover, &.active {
      background: var(--secondary-color);
      color: var(--tertiary-color);
    }
  }

  .filters-panel, .threads-panel {
    height: 100%;
    overflow: hidden;
  }
</style>