<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { XCircle } from 'lucide-svelte';

  export let isExpanded = false;

  const dispatch = createEventDispatcher();

  let filters = {
      status: [] as string[],
      priority: [] as string[],
      date: null as string | null,
      tags: [] as string[]
  };

  const statusOptions = ['Active', 'Pending', 'Completed'];
  const priorityOptions = ['High', 'Medium', 'Low'];

  function handleFilterChange() {
      dispatch('filterChange', filters);
  }

  function clearFilters() {
      filters = {
          status: [],
          priority: [],
          date: null,
          tags: []
      };
      handleFilterChange();
  }

  let searchQuery = '';

  function handleSearchChange(e: Event) {
      const input = e.target as HTMLInputElement;
      searchQuery = input.value;
      dispatch('searchChange', searchQuery);
  }
</script>

<div class="filters" class:expanded={isExpanded}>
  <!-- Search input at the top -->


  <div class="filters-header">
      <h3>Filters</h3>
      <button class="clear-btn" on:click={clearFilters}>
          <XCircle size={16} />
          Clear
      </button>
  </div>

  <div class="search-section">
    <input
        type="text"
        placeholder="Search filters..."
        bind:value={searchQuery}
        on:input={handleSearchChange}
        class="search-input"
    />
</div>

  <div class="filter-section">
      <h4>Status</h4>
      {#each statusOptions as status}
          <label>
              <input
                  type="checkbox"
                  bind:group={filters.status}
                  value={status}
                  on:change={handleFilterChange}
              />
              {status}
          </label>
      {/each}
  </div>

  <div class="filter-section">
      <h4>Priority</h4>
      {#each priorityOptions as priority}
          <label>
              <input
                  type="checkbox"
                  bind:group={filters.priority}
                  value={priority}
                  on:change={handleFilterChange}
              />
              {priority}
          </label>
      {/each}
  </div>

  <div class="filter-section">
      <h4>Date</h4>
      <input
          type="date"
          bind:value={filters.date}
          on:change={handleFilterChange}
      />
  </div>

  <div class="filter-section">
      <h4>Tags</h4>
      <input
          type="text"
          placeholder="Add tags (comma separated)"
          on:change={(e) => {
              const input = e.target as HTMLInputElement;
              filters.tags = input.value.split(',').map(t => t.trim());
              handleFilterChange();
          }}
      />
  </div>
</div>
<style lang="scss">
  .filters {
      background: var(--bg-color);
      padding: var(--spacing-md);
      width: 0;
      overflow: hidden;
      opacity: 0;
      transition: all var(--transition-speed);

      &.expanded {
          width: 250px;
          height: 100%;
          opacity: 1;
      }
  }

  .search-section {
      margin-bottom: var(--spacing-md);

      .search-input {
          width: 96%;
          padding: var(--spacing-sm);
          border: 1px solid var(--secondary-color);
          border-radius: var(--border-radius);
          background: transparent;
          color: var(--text-color);

          &::placeholder {
              color: var(--placeholder-color);
          }
      }
  }

  .filters-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: var(--spacing-md);

      h3 {
          margin: 0;
      }
  }

  .clear-btn {
      display: flex;
      align-items: center;
      gap: var(--spacing-xs);
      background: transparent;
      border: none;
      color: var(--text-color);
      cursor: pointer;
      padding: var(--spacing-xs);
      border-radius: var(--border-radius);
      transition: background var(--transition-speed);

      &:hover {
          background: var(--secondary-color);
      }
  }

  .filter-section {
      margin-bottom: var(--spacing-md);

      h4 {
          margin-bottom: var(--spacing-sm);
      }

      label {
          display: flex;
          align-items: center;
          gap: var(--spacing-sm);
          margin-bottom: var(--spacing-xs);
          cursor: pointer;
      }

      input[type="text"],
      input[type="date"] {
          width: 100%;
          padding: var(--spacing-sm);
          border: 1px solid var(--secondary-color);
          border-radius: var(--border-radius);
          background: transparent;
          color: var(--text-color);

          &::placeholder {
              color: var(--placeholder-color);
          }
      }
  }
</style>