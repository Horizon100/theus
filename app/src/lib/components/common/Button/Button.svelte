<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    import type { SvelteComponent } from 'svelte';
    import { cn } from '$lib/utils';
    
    const dispatch = createEventDispatcher();
  
    export let type: "button" | "submit" | "reset" = "button";
    export let variant: "default" | "primary" | "secondary" | "danger" | "success" | "warning" | "ghost" | "link" = "default";
    export let size: "sm" | "md" | "lg" | "icon" = "md";
    export let icon: typeof SvelteComponent | null = null;
    export let iconPosition: "left" | "right" = "left";
    export let fullWidth = false;
    export let disabled = false;
    export let loading = false;
    export let active = false;
    export let round = false;
    export let class_ = "";
  
    function handleClick(event: MouseEvent) {
      if (!disabled && !loading) {
        dispatch('click', event);
      }
    }
  
    $: classes = cn(
      'button',
      `variant-${variant}`,
      `size-${size}`,
      {
        'full-width': fullWidth,
        'disabled': disabled,
        'loading': loading,
        'active': active,
        'round': round,
      },
      class_
    );
  </script>
  
  <button
    {type}
    class={classes}
    {disabled}
    on:click={handleClick}
    on:mouseenter
    on:mouseleave
    {...$$restProps}
  >
    {#if loading}
      <span class="loading-spinner" />
    {/if}
    
    {#if icon && iconPosition === 'left' && !loading}
      <svelte:component this={icon} class="icon icon-left" />
    {/if}
    
    {#if $$slots.default}
      <span class="button-content">
        <slot />
      </span>
    {/if}
    
    {#if icon && iconPosition === 'right' && !loading}
      <svelte:component this={icon} class="icon icon-right" />
    {/if}
  </button>
  
  <style lang="scss">
    .button {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-family: var(--font-family);
      font-size: var(--font-size-base);
      padding: var(--spacing-sm) var(--spacing-md);
      border-radius: var(--border-radius);
      border: none;
      cursor: pointer;
      transition: all var(--transition-speed);
      position: relative;
      overflow: hidden;
  
      &:focus {
        outline: none;
        box-shadow: 0 0 0 2px var(--primary-color);
      }
  
      &.variant-default {
        background: var(--bg-color);
        color: var(--text-color);
        &:hover { background: var(--secondary-color); }
      }
  
      &.variant-primary {
        background: var(--primary-color);
        color: white;
        &:hover { filter: brightness(110%); }
      }
  
      &.variant-secondary {
        background: var(--secondary-color);
        color: white;
        &:hover { filter: brightness(110%); }
      }
  
      &.variant-danger {
        background: var(--error-color);
        color: white;
        &:hover { filter: brightness(110%); }
      }
  
      &.variant-success {
        background: var(--success-color);
        color: white;
        &:hover { filter: brightness(110%); }
      }
  
      &.variant-warning {
        background: var(--warning-color);
        color: black;
        &:hover { filter: brightness(110%); }
      }
  
      &.variant-ghost {
        background: transparent;
        color: var(--text-color);
        &:hover { background: var(--secondary-color); }
      }
  
      &.variant-link {
        background: transparent;
        color: var(--tertiary-color);
        padding: 0;
        &:hover { text-decoration: underline; }
      }
  
      &.size-sm {
        font-size: var(--font-size-sm);
        padding: var(--spacing-xs) var(--spacing-sm);
      }
  
      &.size-lg {
        font-size: var(--font-size-lg);
        padding: var(--spacing-md) var(--spacing-lg);
      }
  
      &.size-icon {
        padding: var(--spacing-sm);
        width: 2.5rem;
        height: 2.5rem;
      }
  
      &.round {
        border-radius: 9999px;
      }
  
      &.full-width {
        width: 100%;
      }
  
      &.disabled {
        opacity: 0.5;
        cursor: not-allowed;
        pointer-events: none;
      }
  
      &.active {
        transform: scale(0.98);
      }
  
      .icon {
        width: 1.25em;
        height: 1.25em;
  
        &.icon-left {
          margin-right: var(--spacing-xs);
        }
  
        &.icon-right {
          margin-left: var(--spacing-xs);
        }
      }
  
      .loading-spinner {
        display: inline-block;
        width: 1em;
        height: 1em;
        border: 2px solid currentColor;
        border-right-color: transparent;
        border-radius: 50%;
        animation: spin 0.75s linear infinite;
        margin-right: var(--spacing-xs);
      }
  
      .button-content {
        display: inline-flex;
        align-items: center;
      }
    }
  
    @keyframes spin {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
  </style>