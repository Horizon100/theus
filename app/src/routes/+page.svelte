<script lang="ts">
  import '../global.scss';
  import Hero from '$lib/components/content/Hero.svelte';
  import Search from '$lib/components/common/Search.svelte';
  import GridView from '$lib/components/layout/GridView.svelte';
  import ChartView from '$lib/components/layout/ChartView.svelte';
  import { agentStore, filteredAgents } from '$lib/stores/agentStore';
  import { TESTIMONIALS } from '$lib/constants/testimonials.constants';
  import { viewStore } from '$lib/stores/viewStore';
  import CardCta from '$lib/components/common/cards/CardCta.svelte';
  import { User2, MapIcon, Globe2, MessageCircleCodeIcon } from 'lucide-svelte';


  let isScrolled = false;

  function handleScroll() {
      isScrolled = window.scrollY > 0;
    }

    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', handleScroll);
    }

  // Subscribe to the viewState store
  $: isGridView = $viewStore.isGridView;

  // Get filtered agents
  $: agents = $filteredAgents;
  
  </script>

<svelte:head>
  <title>Theus - Go AI</title>
  <meta name="description" content="Join the Agency" />
</svelte:head>

<div class="page-content">
  <div class="hero-wrapper" class:scrolled={isScrolled}>
    <section class="hero-section">
      <Hero />
    </section>
  </div>
  
  
  <div class="search-container" >
    <Search />
  </div>

  <!-- <div class="hero-features">
    <a href="/agents" class="feature-link">
        <User2 size={20} />
        <span>Interact with AI agents tailored to your needs</span>
    </a>
    <a href="/solutions" class="feature-link">
        <MapIcon size={20} />
        <span>Explore AI-driven solutions for a variety of industries</span>
    </a>
    <a href="/projects" class="feature-link">
        <Globe2 size={20} />
        <span>Track AI agent projects and monitor progress in real time</span>
    </a>
    <a href="/collaborations" class="feature-link">
        <MessageCircleCodeIcon size={20} />
        <span>Join collaborative AI sessions to solve complex problems</span>
    </a>
</div> -->

  <section class="agents-section">
    <div class="agents-container" class:scrolled={isScrolled}>
      {#if isGridView}
        <GridView {agents} />
      {:else}
        <ChartView {agents} />
      {/if}
    </div>
  </section>

  <div class="cta-container" class:hidden={isScrolled}>
    <CardCta
      videoUrl="/video/hero.mp4"
      posterUrl="/images/hero-poster.jpg"
    />
    <CardCta
    videoUrl="/video/hero.mp4"
    posterUrl="/images/hero-poster.jpg"
  />
  <CardCta
  videoUrl="/video/hero.mp4"
  posterUrl="/images/hero-poster.jpg"
/>
  </div>
</div>

<style lang="scss">
  .page-content {
    width: 100%;
    min-height: 100vh;
    position: relative;
    padding-bottom: var(--footer-height, 0px);
  }

  .hero-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    transition: all 0.3s ease;
    
    &.scrolled {
      transform: scale(0);
      height: 0;
    }
  }

  .hero-section {
    display: flex;
        justify-content: center;
        width: 100%;
        margin: 0.5rem auto;
    }

  .agents-section {
    position: relative;
    z-index: 1;
    display: flex;
    min-height: calc(100vh - var(--hero-height, 600px));
    width: var(--breakpoint-xl);
    margin: 0 auto;
    padding: 0 var(--spacing-md);
  }

  .agents-container {
    transform: scale(0);
    width: 100%;
    transition: all var(--transition-speed);

    &.scrolled {
      transform: scale(1);
    }
  }

  .cta-container {
    display: flex;
    flex-direction: column;
    position: fixed;
    top: 50%;
    right: var(--spacing-md);
    transform: translateY(-50%);
    width: 400px;
    z-index: 10;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    opacity: 1;
    pointer-events: auto;
    gap: 2rem;


    &.hidden {
      opacity: 0;
      transform: translateY(-50%) translateX(100%);
      pointer-events: none;
    }
  }

  @media (max-width: 1800px) {
    .cta-container {
      width: 350px;
    }
  }

  @media (max-width: 1400px) {
    .cta-container {
      width: 300px;
    }
  }

  @media (max-width: 1200px) {
    .cta-container {
      display: none;
    }
  }

  @media (max-width: 768px) {
    .agents-section {
      padding: 0 var(--spacing-sm);
    }

    .agents-container {
      padding: 0.5rem;
    }

    .hero-section {
      padding: 0 var(--spacing-sm);
    }
  }



  :global(body) {
    margin: 0;
    padding: 0;
    background: var(--bg-color);
    color: var(--text-color);
    font-family: var(--font-family);
  }

  .hero-features {
    display: flex;
    justify-self: center;
    position: relative;
    max-width: 1400px;
    flex-direction: column;
    justify-content: center;
    gap: var(--spacing-md);
background-color: red;
    
  }

  .feature-link {
    display: flex;
    align-items: center;
    gap: var(--spacing-sm);
    color: white;
    text-decoration: none;
    transition: transform var(--transition-speed);

    &:hover {
      transform: translateX(var(--spacing-sm));
    }
  }

</style>