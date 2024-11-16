<script lang="ts">
    import { User2, Star, Coins, Wifi, ThumbsUp, Shield } from 'lucide-svelte';
    import type { Agent, AgentCorner, AgentMetrics } from '$lib/types/agents.types';
  
    export let name: string;
    export let corners: AgentCorner[] = [];
    export let icon: string | undefined = undefined;
    export let type: Agent['type'];
    export let status: Agent['status'];
    export let metrics: AgentMetrics;
    export let isSelected: boolean = false;

    function getCornerClass(position: AgentCorner['position']): string {
        return `corner ${position}`;
    }

    function getRatingWidth(value: number): string {
        return `${value}%`;
    }

    function getRatingColor(value: number): string {
        if (value >= 90) return 'var(--success-color)';
        if (value >= 70) return 'var(--warning-color)';
        return 'var(--error-color)';
    }
</script>

<div 
    class="card-agent" 
    class:selected={isSelected}
    data-type={type} 
    data-status={status}
    on:click
>
    <div class="card-wrapper" class:minimized={isSelected}>
        {#each corners as corner}
            <div class={getCornerClass(corner.position)}>
                <span class="corner-icon">{corner.icon}</span>
                <span class="corner-text">{corner.text}</span>
            </div>
        {/each}
        
        <div class="card-content">
            {#if icon}
                <img src={icon} alt={name} class="agent-icon" />
            {:else}
                <User2 size={48} class="default-icon" />
            {/if}
            <h3 class="agent-name">{name}</h3>
        </div>

        <div class="parameters-overlay">
            <div class="parameter">
                <Star size={16} />
                <span>Intelligence</span>
                <div class="rating-bar">
                    <div class="rating-fill" style="width: {getRatingWidth(metrics.intelligence)}; background-color: {getRatingColor(metrics.intelligence)}"></div>
                </div>
            </div>

            <div class="parameter">
                <Coins size={16} />
                <span>Efficiency</span>
                <div class="rating-bar">
                    <div class="rating-fill" style="width: {getRatingWidth(metrics.efficiency)}; background-color: {getRatingColor(metrics.efficiency)}"></div>
                </div>
            </div>

            <div class="parameter">
                <Wifi size={16} />
                <span>Reliability</span>
                <div class="rating-bar">
                    <div class="rating-fill" style="width: {getRatingWidth(metrics.reliability)}; background-color: {getRatingColor(metrics.reliability)}"></div>
                </div>
            </div>

            <div class="parameter">
                <ThumbsUp size={16} />
                <span>Adaptability</span>
                <div class="rating-bar">
                    <div class="rating-fill" style="width: {getRatingWidth(metrics.adaptability)}; background-color: {getRatingColor(metrics.adaptability)}"></div>
                </div>
            </div>

            <div class="parameter">
                <Shield size={16} />
                <span>Throughput</span>
                <div class="rating-bar">
                    <div class="rating-fill" style="width: {getRatingWidth(metrics.throughput)}; background-color: {getRatingColor(metrics.throughput)}"></div>
                </div>
            </div>
        </div>
    </div>

    {#if isSelected}
        <div class="details-container">
            <div class="details-header">
                <h2>{name}</h2>
                <div class="details-meta">
                    <span class="type">{type}</span>
                    <span class="status" data-status={status}>{status}</span>
                </div>
            </div>
            <div class="details-content">
                <div class="metrics-display">
                    <!-- Add expanded metrics display here -->
                </div>
                <div class="details-description">
                    <!-- Add additional agent details here -->
                </div>
            </div>
        </div>
    {/if}
</div>
<style lang="scss">
    .card-agent {
        position: relative;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        overflow: hidden;

        &.selected {
            width: var(--breakpoint-xl);
            height: 100px;
            margin-top: 3rem;
            display: flex;
            gap: var(--spacing-md);
            padding: var(--spacing-md);
            background: var(--bg-gradient);
            border-radius: var(--border-radius);
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            transform-origin: left center;
        }

        &:not(.selected) {
            aspect-ratio: 1;
            background: var(--bg-gradient);
            border-radius: var(--border-radius);
            padding: var(--spacing-md);
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            cursor: pointer;

            &:hover {
                transform: translateY(-4px);
                box-shadow: 0 8px 12px rgba(0, 0, 0, 0.15);

                .parameters-overlay {
                    opacity: 1;
                    pointer-events: auto;
                }
            }
        }
    }

    .card-wrapper {
        position: relative;
        width: 100%;
        height: 100%;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

        &.minimized {
            transform: scale(0.9);
            width: 300px;
            flex-shrink: 0;
            transform-origin: left center;
        }
    }

    .card-content {
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: var(--spacing-sm);
        z-index: 1;
        position: relative;
    }

    .agent-icon, :global(.default-icon) {
        width: 48px;
        height: 48px;
        border-radius: 50%;
        color: var(--text-color);
        background: var(--bg-secondary);
        padding: var(--spacing-xs);
        transition: all 0.3s ease;

        .selected & {
            width: 32px;
            height: 32px;
        }
    }

    .agent-name {
        font-size: var(--font-size-lg);
        font-weight: bold;
        text-align: center;
        margin: 0;
        color: var(--text-color);
        transition: all 0.3s ease;

        .selected & {
            font-size: var(--font-size-base);
        }
    }

    .corner {
        position: absolute;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 4px;
        padding: var(--spacing-xs);
        font-size: var(--font-size-sm);
        color: var(--text-color);
        opacity: 0.8;
        transition: all 0.3s ease;
        z-index: 2;

        &:hover {
            opacity: 1;
        }

        &.top-left {
            top: var(--spacing-xs);
            left: var(--spacing-xs);
        }

        &.top-right {
            top: var(--spacing-xs);
            right: var(--spacing-xs);
        }

        &.bottom-left {
            bottom: var(--spacing-xs);
            left: var(--spacing-xs);
        }

        &.bottom-right {
            bottom: var(--spacing-xs);
            right: var(--spacing-xs);
        }

        .selected & {
            transform: scale(0.75);
        }
    }

    .corner-icon {
        font-size: 1.2em;
        line-height: 1;
    }

    .corner-text {
        font-size: 0.8em;
    }

    .parameters-overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.9);
        backdrop-filter: blur(4px);
        padding: var(--spacing-md);
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: var(--spacing-sm);
        opacity: 0;
        transition: all 0.3s ease;
        pointer-events: none;
        border-radius: var(--border-radius);
        z-index: 3;
    }

    .parameter {
        display: flex;
        align-items: center;
        gap: var(--spacing-sm);
        color: var(--text-color);
        padding: var(--spacing-xs);
        border-radius: var(--border-radius);
        transition: background-color 0.2s ease;

        &:hover {
            background: rgba(255, 255, 255, 0.1);
        }

        :global(svg) {
            flex-shrink: 0;
            opacity: 0.7;
        }

        span {
            width: 70px;
            flex-shrink: 0;
            font-size: var(--font-size-sm);
        }
    }

    .rating-bar {
        flex-grow: 1;
        height: 6px;
        background: rgba(255, 255, 255, 0.1);
        border-radius: 3px;
        overflow: hidden;
    }

    .rating-fill {
        height: 100%;
        transition: all 0.3s ease;
    }

    .details-container {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: var(--spacing-md);
        padding: var(--spacing-md);
        background: var(--bg-secondary);
        border-radius: var(--border-radius);
        animation: slideIn 0.3s ease forwards;
    }

    .details-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        padding-bottom: var(--spacing-sm);

        h2 {
            margin: 0;
            color: var(--text-color);
            font-size: var(--font-size-xl);
        }
    }

    .details-meta {
        display: flex;
        gap: var(--spacing-sm);
        align-items: center;

        .type, .status {
            padding: 4px 12px;
            border-radius: 12px;
            font-size: var(--font-size-sm);
            font-weight: 500;
            text-transform: capitalize;
        }

        .type {
            background: var(--bg-color);
            color: var(--text-color);
        }

        .status {
            &[data-status="active"] { 
                background: var(--success-color);
                color: white;
            }
            &[data-status="idle"] { 
                background: var(--warning-color);
                color: black;
            }
            &[data-status="busy"] { 
                background: var(--error-color);
                color: white;
            }
            &[data-status="offline"] { 
                background: var(--text-muted);
                color: white;
            }
        }
    }

    .details-content {
        display: flex;
        gap: var(--spacing-lg);
        padding: var(--spacing-sm);
    }

    .metrics-display {
        flex: 1;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: var(--spacing-md);
    }

    .details-description {
        flex: 2;
        background: var(--bg-color);
        border-radius: var(--border-radius);
        padding: var(--spacing-md);
    }

    @keyframes slideIn {
        from {
            opacity: 0;
            transform: translateX(20px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }

    @media (max-width: 768px) {
        .card-agent.selected {
            height: auto;
            flex-direction: column;
        }

        .card-wrapper.minimized {
            width: 100%;
            transform: scale(1);
        }

        .details-header {
            flex-direction: column;
            align-items: flex-start;
            gap: var(--spacing-sm);
        }

        .details-content {
            flex-direction: column;
        }
    }
</style>