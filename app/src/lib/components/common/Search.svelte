<script lang="ts">
    import { onMount } from 'svelte';
    import { SearchIcon } from 'lucide-svelte';
  
    let isFixed = false;
    let searchValue = '';
    let searchContainer: HTMLDivElement;
    let heroHeight = 100; // Adjust based on your Hero height
    let footerHeight = 0; // Will be set dynamically
    let pageHeight = 0; // Will be set dynamically

    onMount(() => {
        const footer = document.querySelector('footer');
        footerHeight = footer?.offsetHeight || 0;
        pageHeight = document.documentElement.scrollHeight - footerHeight;

        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            const viewportHeight = window.innerHeight;
            
            if (scrollPosition > heroHeight) {
                const bottomThreshold = pageHeight - viewportHeight - footerHeight;
                isFixed = scrollPosition <= bottomThreshold;
            } else {
                isFixed = false;
            }
        };

        window.addEventListener('scroll', handleScroll);
        window.addEventListener('resize', () => {
            footerHeight = footer?.offsetHeight || 0;
            pageHeight = document.documentElement.scrollHeight - footerHeight;
        });

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', () => {});
        };
    });
</script>

<div class="search-outer-container">
    <div
        bind:this={searchContainer}
        class="search-container"
        class:fixed={isFixed}
    >
        <div class="search-wrapper">
            <div class="search-input-container">
                <input
                    type="text"
                    bind:value={searchValue}
                    placeholder="Search destinations..."
                    class="search-input"
                />
            </div>
            
            {#if searchValue}
                <div class="search-results">
                    <div class="results-content">
                        <p class="no-results">No results found for "{searchValue}"</p>
                    </div>
                </div>
            {/if}
        </div>
    </div>
</div>

<style lang="scss">
    .search-outer-container {
        display: flex;
        justify-content: center;
        width: 100%;
        margin-top: -2rem;
    }

    .search-container {
        width: 100%;
        max-width: 1400px;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        z-index: 50;
        padding: 0 var(--spacing-md);
        display: none;

        &.fixed {
            display: block;
            position: fixed;
            bottom: 1rem;
            left: 50%;
            transform: translateX(-50%);
            margin-top: 0;
            z-index: 2000;
        }
    }

    .search-wrapper {
        display: flex;
        justify-content: center;
        margin: 0.5rem auto;
    }

    .search-input-container {
        position: relative;
        width: var(--breakpoint-xl);
        transform: translateY(0);
        transition: transform 0.3s ease;
        display: flex;
        justify-content: center;

        :global(.fixed) & {
            transform: translateY(-0.5rem);
        }
    }

    input.search-input {
        width: 90%;
        padding: 1rem 3rem;
        font-size: 1.3rem;
        border-radius: 9999px;
        border: 1px solid #e5e7eb;
        transition: all 0.3s ease;
        background: var(--bg-color);
        color: var(--text-color);
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);

        &:focus {
            outline: none;
            border-color: #3b82f6;
            box-shadow: 0 4px 12px -1px rgba(59, 130, 246, 0.2);
            font-size: 1.5rem;
        }

        &::placeholder {
            color: var(--placeholder-color);
        }
    }

    .search-results {
        position: absolute;
        width: 90%;
        max-width: 800px;
        margin: 0 auto;
        background: var(--bg-color);
        border-radius: 0.5rem;
        box-shadow: 0 -10px 15px -3px rgba(0, 0, 0, 0.1);
        z-index: 50;
        bottom: 100%;
        left: 50%;
        transform: translateX(-50%);
    }

    .results-content {
        padding: 1rem;
    }

    .no-results {
        color: #6b7280;
        text-align: center;
    }

    @media (max-width: 640px) {
        .search-container {
            padding: 0 var(--spacing-sm);
        }

        .search-wrapper {
            padding: 0.5rem;
        }

        input.search-input {
            font-size: 1rem;
            padding: 0.75rem 2.5rem;
        }

        .search-outer-container {
            margin-top: -1rem;
        }
    }
</style>