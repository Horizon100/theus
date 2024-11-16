<script lang="ts">
    import { onMount } from 'svelte';
    import type { Agent } from '$lib/types/agent.types';
    import CardAgent from '$lib/components/common/cards/CardAgent.svelte';
    
    export let agents: Agent[] = [];
    let container: HTMLDivElement;
</script>

<div class="list-view">
    {#each agents as agent (agent.id)}
        <div class="list-item">
            <CardAgent 
                name={agent.name}
                corners={agent.corners}
                icon={agent.icon}
                type={agent.type}
                status={agent.status}
                metrics={agent.metrics}
            />
            <div class="list-info">
                <div class="list-name">{agent.name}</div>
                <div class="list-status">
                    Status: {agent.status}
                </div>
                <div class="list-type">
                    Type: {agent.type}
                </div>
            </div>
        </div>
    {/each}
</div>

   <style lang="scss">
    .list-view {
        display: flex;
        flex-direction: column;
        gap: var(--spacing-md);
        padding: var(--spacing-lg);
        background: var(--bg-color);
        border-radius: var(--border-radius);
        overflow-y: auto;
    }

    .list-item {
        display: flex;
        align-items: center;
        padding: var(--spacing-md);
        gap: var(--spacing-lg);
        background: var(--bg-secondary);
        border-radius: var(--border-radius);
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        transition: transform var(--transition-speed);

        &:hover {
            transform: translateY(-0.5rem);
        }
    }

    // :global(.card-agent) {
    //     flex-shrink: 0;
    //     width: 120px;
    //     height: 120px;
    // }

    .list-info {
        display: flex;
        flex-direction: column;
        gap: var(--spacing-xs);
    }

    .list-name {
        font-size: var(--font-size-lg);
        font-weight: bold;
        color: var(--text-color);
    }

    .list-performance,
    .list-status,
    .list-type {
        font-size: var(--font-size-sm);
        color: var(--text-muted);
    }

    @media (max-width: 768px) {
        .list-item {
            flex-direction: column;
            align-items: stretch;
        }

        .list-info {
            align-items: center;
        }
    }
</style>