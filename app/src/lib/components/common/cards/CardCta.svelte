<script lang="ts">
    import { Button } from '$lib/components/common/button';
    import { Github, Twitter, Mail, Heart, Play } from 'lucide-svelte';
    import { fade, scale } from 'svelte/transition';
    
    export let videoUrl: string = '/video/hero.mp4';
    export let posterUrl: string = '';
    export let showVideo = true;
    export let showEmailSignup = true;
    export let buttonText = 'Join Theus →';
    export let placeholderText = 'Type your email...';
    export let showSocial = true;

    let email = '';
    let videoPlaying = false;
    let videoElement: HTMLVideoElement;
    
    function handleSubmit() {
      // Handle email submission
      console.log('Email submitted:', email);
    }
    
    async function toggleVideo() {
      videoPlaying = !videoPlaying;
      if (videoElement) {
        try {
          if (videoPlaying) {
            await videoElement.play();
          } else {
            await videoElement.pause();
          }
        } catch (error) {
          console.error('Video playback error:', error);
          videoPlaying = false;
        }
      }
    }
  
    function handleVideoEnd() {
      videoPlaying = false;
    }
  
    function handleVideoError() {
      console.error('Video loading error');
      videoPlaying = false;
    }
  </script>
  
  <div class="card-hero">
    {#if showVideo}
      <div class="video-container" class:playing={videoPlaying}>
        <video 
          bind:this={videoElement}
          src={videoUrl} 
          poster={posterUrl}
          class="hero-video"
          on:ended={handleVideoEnd}
          on:error={handleVideoError}
          preload="metadata"
        />
        
        {#if !videoPlaying}
          <button 
            class="play-button" 
            on:click={toggleVideo}
            aria-label="Play video"
            in:scale={{ duration: 200, start: 0.9 }}
            out:fade={{ duration: 150 }}
          >
            <div class="play-button-inner">
              <Play size={40} />
            </div>
          </button>
        {/if}
        
        {#if videoPlaying}
          <button 
            class="video-overlay"
            on:click={toggleVideo}
            aria-label="Pause video"
          />
        {/if}
      </div>
    {/if}
  
    {#if showEmailSignup}
      <div class="signup-section">
        <div class="input-container">
          <input
            type="email"
            placeholder={placeholderText}
            bind:value={email}
            class="email-input"
          />
          {#if email}
            <div class="input-indicator" transition:fade={{ duration: 150 }} />
          {/if}
        </div>
  
        <Button 
          variant="primary" 
          fullWidth 
          on:click={handleSubmit}
          class_="signup-button"
          disabled={!email}
        >
          {buttonText}
        </Button>
  
        <p class="login-text">
          If you already have an account, we'll log you in
        </p>
      </div>
    {/if}


    {#if showSocial}
    <div class="socials">
      <a href="https://github.com" target="_blank" rel="noopener noreferrer">
        <Github size={20} />
      </a>
      <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
        <Twitter size={20} />
      </a>
      <a href="mailto:contact@example.com">
        <Mail size={20} />
      </a>
    </div>
  {/if}
  </div>
  
  <style lang="scss">
    .card-hero {
      background: var(--bg-color);
      border-radius: var(--border-radius);
      overflow: hidden;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
      transition: transform var(--transition-speed);
      height: 100%;
      &:hover {
        transform: translateY(-2px);
      }
    }
  
    .video-container {
      position: relative;
      aspect-ratio: 16/9;
      background: rgba(0, 0, 0, 0.3);
      overflow: hidden;
    }
  
    .hero-video {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform var(--transition-speed);
    }
  
    .play-button {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      border: none;
      background: rgba(0, 0, 0, 0.3);
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background var(--transition-speed);
  
      &:hover {
        background: rgba(0, 0, 0, 0.4);
  
        .play-button-inner {
          transform: scale(1.1);
        }
      }
    }
  
    .play-button-inner {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 80px;
      height: 80px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.2);
      backdrop-filter: blur(4px);
      color: white;
      transition: transform var(--transition-speed);
    }
  
    .video-overlay {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      border: none;
      background: transparent;
      cursor: pointer;
    }
  
    .signup-section {
      padding: var(--spacing-lg);
    }
  
    .input-container {
      position: relative;
      margin-bottom: var(--spacing-md);
    }
  
    .email-input {
      width: 90%;
      padding: var(--spacing-md);
      padding-right: calc(var(--spacing-md) + 20px);
      border: 2px solid var(--border-color);
      border-radius: var(--border-radius);
      font-size: var(--font-size-base);
      background: var(--placeholder-color);
      color: var(--text-color);
      transition: all var(--transition-speed);
  
      &:focus {
        outline: none;
        border-color: var(--primary-color);
        box-shadow: 0 0 0 3px rgba(var(--primary-color-rgb), 0.1);
      }
  
      &::placeholder {
        color: var(--placeholder-color);
      }
    }
  
    .input-indicator {
      position: absolute;
      right: var(--spacing-sm);
      top: 50%;
      transform: translateY(-50%);
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: var(--success-color);
    }
  
    :global(.signup-button) {
      font-weight: 500;
      letter-spacing: 0.5px;
      height: 48px;
      transition: all var(--transition-speed);
  
      &:not(:disabled):hover {
        transform: translateY(-1px);
      }
    }
  
    .login-text {
      text-align: center;
      color: var(--text-color);
      font-size: var(--font-size-sm);
      margin-top: var(--spacing-sm);
      opacity: 0.8;
    }

    .socials {
      display: flex;
      gap: var(--spacing-md);
      width: 50%;
      margin-left: 25%;
      justify-content: space-evenly;
  
      a {
        color: var(--text-color);
        transition: color var(--transition-speed);
  
        &:hover {
          color: var(--tertiary-color);
        }
      }
    }
  
    @media (max-width: var(--breakpoint-sm)) {
      .card-hero {
        border-radius: 0;
      }
  
      .signup-section {
        padding: var(--spacing-md);
      }
  
      .email-input,
      :global(.signup-button) {
        height: 40px;
      }
    }
  </style>