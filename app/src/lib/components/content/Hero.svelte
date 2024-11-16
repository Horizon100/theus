<script lang="ts">
    import { User2, MapIcon, Globe2, MessageCircleCodeIcon } from 'lucide-svelte';
    import CardCta from '$lib/components/common/cards/CardCta.svelte';
    import type { Testimonial } from '$lib/types/testimonials.types';
    import { testimonialStore } from '$lib/stores/testimonialStore';

    // Get featured testimonials from the store
    // const { featuredTestimonials } = testimonialStore;
</script>

<section class="hero">
  <div class="hero-container">
      <div class="hero-content">
              <div class="hero-badge">
                  <span class="badge-text">🤖 Powered by AI Experts</span>
                  <div class="badge-stars">★★★★★</div>
                  <span class="badge-year">SINCE 2024</span>
              </div>

              <h1>Leverage AI Agents to Solve Complex Problems</h1>
              <!-- <p class="hero-subtitle">
                  Our platform uses a network of specialized AI agents, each designed to solve unique challenges, 
                  empowering businesses and individuals to make smarter decisions and innovate faster.
              </p> -->

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

          
      </div>

      <!-- <div class="testimonials">
          {#each $featuredTestimonials as testimonial (testimonial.id)}
              <div class="testimonial-card">
                  <p class="quote">{testimonial.quote}</p>
                  <img src={testimonial.logo} alt={testimonial.source} class="source-logo" />
              </div>
          {/each}
      </div> -->
  </div>
</section>

  
  <style lang="scss">

    .hero {
      position: relative;
      padding: var(--spacing-xl) 0;
      background: var(--bg-gradient);
      max-width: var(--breakpoint-xl);
      height: 100vh;
      color: white;
      
      &::after {
        content: '';
        position: absolute;
        bottom: -2px;
        left: 0;
        right: 0;
        height: 100px;
        background: linear-gradient(transparent, var(--bg-color));
      }
    }
  
    .hero-container {
      max-width: var(--breakpoint-xl);
      margin: 0 auto;
      padding: 0 var(--spacing-md);
      position: relative;
      z-index: 1;
      display: flex;

      justify-content: center;
      align-items: center;
    }
  


    .hero-badge {
    display: inline-flex;
    align-items: center;
    gap: var(--spacing-sm);
    background: rgba(255, 255, 255, 0.1);
    padding: var(--spacing-sm) var(--spacing-md);
    border-radius: 50px;
    backdrop-filter: blur(10px);
    margin-bottom: var(--spacing-lg);
  }

  .badge-stars {
    color: gold;
  }

  h1 {
    font-size: 3.5rem;
    line-height: 1.2;
    margin-bottom: var(--spacing-md);
    width: 50%;
    text-align: center;

  }

  .hero-content {
    display: flex;
    flex-direction: column;
    align-items: center;

  }

  .hero-subtitle {
    font-size: var(--font-size-lg);
    margin-bottom: var(--spacing-xl);
    opacity: 0.9;
  }

  .hero-features {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-md);
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

  .video-container {
    position: relative;
    aspect-ratio: 16/9;
    background: rgba(0, 0, 0, 0.3);
    border-radius: var(--border-radius);
    overflow: hidden;
    margin-bottom: var(--spacing-md);

    &.playing {
      .play-button {
        opacity: 0;
        pointer-events: none;
      }
    }
  }

  .play-button {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    border: none;
    color: white;
    cursor: pointer;
    transition: transform var(--transition-speed);

    &:hover {
      transform: scale(1.1);
    }
  }

  .hero-video {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .cta-card {
    background: white;
    padding: var(--spacing-lg);
    border-radius: var(--border-radius);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  }

  .email-input {
    width: 100%;
    padding: var(--spacing-md);
    margin-bottom: var(--spacing-md);
    border: 1px solid var(--border-color);
    border-radius: var(--border-radius);
    font-size: var(--font-size-base);
  }

  .login-text {
    text-align: center;
    color: var(--text-color);
    font-size: var(--font-size-sm);
    margin-top: var(--spacing-sm);
  }

  .testimonials {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: var(--spacing-lg);
    margin-top: var(--spacing-xl);
  }

  .testimonial-card {
    background: white;
    padding: var(--spacing-lg);
    border-radius: var(--border-radius);
    text-align: center;
    
    .quote {
      color: var(--text-color);
      margin-bottom: var(--spacing-md);
    }

    .source-logo {
      height: 30px;
      object-fit: contain;
    }
  }

  @media (max-width: var(--breakpoint-lg)) {
    .hero-content {
      grid-template-columns: 1fr;
    }

    h1 {
      font-size: 2.5rem;
    }

    .testimonials {
      grid-template-columns: 1fr;
    }
  }
</style>