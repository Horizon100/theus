<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    import { MessageSquare, Plus, X, Search } from 'lucide-svelte';
    import type { Thread } from '$lib/types/thread.types';
    
    export let isExpanded = false;
    const dispatch = createEventDispatcher();
  
    let searchQuery = '';
    let threads: Thread[] = [
      {
        id: '1',
        title: 'Main Discussion',
        lastMessage: 'Latest update on the project',
        timestamp: new Date(),
        unreadCount: 3
      },
      {
        id: '2',
        title: 'Technical Issues',
        lastMessage: 'Server maintenance scheduled',
        timestamp: new Date(Date.now() - 3600000),
        unreadCount: 0
      }
    ];
  
    $: filteredThreads = threads.filter(thread => 
      thread.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      thread.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
    );
  
    function createThread() {
      const newThread = {
        id: crypto.randomUUID(),
        title: 'New Thread',
        lastMessage: '',
        timestamp: new Date(),
        unreadCount: 0
      };
      threads = [...threads, newThread];
    }
  
    function handleClose() {
      dispatch('close');
    }
  
    function selectThread(threadId: string) {
      dispatch('selectThread', { threadId });
    }
  </script>
  
  <div class="threads" class:expanded={isExpanded}>
    <div class="threads-header">
      <MessageSquare size={24} />
      <h3>Threads</h3>
      {#if isExpanded}
        <button class="close-btn" on:click={handleClose}>
          <X size={20} />
        </button>
      {/if}
    </div>
  
    {#if isExpanded}
      <div class="threads-content">
        <div class="search-bar">
          <Search size={18} />
          <input
            type="text"
            bind:value={searchQuery}
            placeholder="Search threads..."
          />
        </div>
  
        <button class="new-thread-btn" on:click={createThread}>
          <Plus size={18} />
          <span>New Thread</span>
        </button>
  
        <div class="thread-list">
          {#each filteredThreads as thread (thread.id)}
            <div
              class="thread-item"
              on:click={() => selectThread(thread.id)}
            >
              <div class="thread-info">
                <span class="thread-title">{thread.title}</span>
                <span class="thread-message">{thread.lastMessage}</span>
                <span class="thread-time">
                  {thread.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
              {#if thread.unreadCount > 0}
                <span class="unread-badge">{thread.unreadCount}</span>
              {/if}
            </div>
          {/each}
        </div>
      </div>
    {/if}
  </div>
  
  <style lang="scss">
    .threads {
      background: var(--bg-color);
      padding: var(--spacing-md);
      width: 0;
      overflow: hidden;
      opacity: 0;
      transition: all var(--transition-speed);
      height: 100%;
  
      &.expanded {
        width: 250px;
        opacity: 1;
      }
    }
  
    .threads-header {
      display: flex;
      align-items: center;
      gap: var(--spacing-sm);
      margin-bottom: var(--spacing-md);
      color: var(--text-color);
  
      h3 {
        margin: 0;
        flex-grow: 1;
      }
    }
  
    .close-btn {
      background: transparent;
      border: none;
      color: var(--text-color);
      cursor: pointer;
      padding: var(--spacing-xs);
      border-radius: var(--border-radius);
      transition: background-color var(--transition-speed);
  
      &:hover {
        background: var(--secondary-color);
      }
    }
  
    .threads-content {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-md);
    }
  
    .search-bar {
      display: flex;
      align-items: center;
      gap: var(--spacing-sm);
      padding: var(--spacing-sm);
      background: var(--secondary-color);
      border-radius: var(--border-radius);
  
      input {
        background: transparent;
        border: none;
        color: var(--text-color);
        width: 100%;
        outline: none;
  
        &::placeholder {
          color: var(--placeholder-color);
        }
      }
    }
  
    .new-thread-btn {
      display: flex;
      align-items: center;
      gap: var(--spacing-sm);
      background: var(--primary-color);
      color: var(--text-color);
      border: none;
      padding: var(--spacing-sm);
      border-radius: var(--border-radius);
      cursor: pointer;
      transition: background-color var(--transition-speed);
  
      &:hover {
        background: var(--secondary-color);
      }
    }
  
    .thread-list {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-sm);
    }
  
    .thread-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: var(--spacing-sm);
      border-radius: var(--border-radius);
      cursor: pointer;
      transition: background-color var(--transition-speed);
  
      &:hover {
        background: var(--secondary-color);
      }
    }
  
    .thread-info {
      display: flex;
      flex-direction: column;
      gap: 2px;
      flex-grow: 1;
    }
  
    .thread-title {
      font-weight: bold;
      color: var(--text-color);
    }
  
    .thread-message {
      font-size: var(--font-size-sm);
      color: var(--placeholder-color);
    }
  
    .thread-time {
      font-size: var(--font-size-sm);
      color: var(--placeholder-color);
    }
  
    .unread-badge {
      background: var(--tertiary-color);
      color: var(--text-color);
      padding: 2px 8px;
      border-radius: 12px;
      font-size: var(--font-size-sm);
      font-weight: bold;
    }
  </style>