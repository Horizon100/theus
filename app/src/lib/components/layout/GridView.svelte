<script lang="ts">
    import CardAgent from '$lib/components/common/cards/CardAgent.svelte';
    import type { Agent } from '$lib/types/agent.types';
  
    export let agents: Agent[] = [];
    export let columns: number = 3;
    let selectedAgentId: string | null = null;

    function handleCardClick(agentId: string) {
        selectedAgentId = selectedAgentId === agentId ? null : agentId;
    }

</script>

{#if selectedAgentId}
    {#each agents.filter(agent => agent.id === selectedAgentId) as agent (agent.id)}
        <CardAgent 
            name={agent.name}
            corners={agent.corners}
            icon={agent.icon}
            type={agent.type}
            status={agent.status}
            metrics={agent.metrics}
            isSelected={true}
            on:click={() => handleCardClick(agent.id)}
        />
    {/each}
{:else}
    <div class="grid-view" style="--columns: {columns}">
        {#each agents as agent (agent.id)}
            <CardAgent 
                name={agent.name}
                corners={agent.corners}
                icon={agent.icon}
                type={agent.type}
                status={agent.status}
                metrics={agent.metrics}
                isSelected={false}
                on:click={() => handleCardClick(agent.id)}
            />
        {/each}
    </div>
{/if}

<style lang="scss">
    .grid-container {
        width: 100%;
        display: flex;
        justify-content: center;
        padding: var(--spacing-md);
    }

    .grid-view {
        display: grid;
        grid-template-columns: repeat(var(--columns), minmax(200px, 1fr));
        gap: var(--spacing-md);
        width: 100%;
        max-width: 1200px;
        margin: 0 auto;
    }

    .agent-card-wrapper {
        position: relative;
        transition: transform var(--transition-speed);

        &:hover {
            transform: translateY(-4px);
        }
    }

    .status-indicator {
        position: absolute;
        top: var(--spacing-sm);
        right: var(--spacing-sm);
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background-color: var(--status-color);
        box-shadow: 0 0 8px var(--status-color);
        animation: pulse 2s infinite;
    }

    @keyframes pulse {
        0% { opacity: 1; }
        50% { opacity: 0.5; }
        100% { opacity: 1; }
    }

    @media (max-width: 1200px) {
        .grid-view {
            --columns: 2;
        }
    }

    @media (max-width: 768px) {
        .grid-view {
            --columns: 1;
        }
    }
</style>