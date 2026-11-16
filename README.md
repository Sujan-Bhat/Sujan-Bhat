<style>
  @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&family=Space+Grotesk:wght@400;500;700&display=swap');

  :root {
    --bg: #0d1117;
    --bg-elevated: #161b22;
    --fg: #e6edf3;
    --fg-muted: #8b949e;
    --accent: #00d9a5;
    --accent-dim: #00b88a;
    --warn: #f0883e;
    --error: #f85149;
    --border: #30363d;
    --glow: rgba(0, 217, 165, 0.15);
  }

  @media (prefers-reduced-motion: reduce) {
    .motion * {
      animation: none !important;
      transition: none !important;
    }
  }
</style>

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 280" width="720" height="280" class="motion" role="img" aria-label="Terminal boot sequence initializing Sujan Bhat developer profile">
  <title>Boot Sequence</title>
  <desc>Animated terminal boot sequence showing system initialization</desc>

  <!-- Background -->
  <rect width="720" height="280" fill="#0d1117"/>

  <!-- Subtle grid pattern -->
  <defs>
    <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
      <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#1f2937" stroke-width="0.5"/>
    </pattern>
    <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
      <feMerge>
        <feMergeNode in="coloredBlur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
  </defs>
  <rect width="720" height="280" fill="url(#grid)" opacity="0.3"/>

  <!-- Terminal chrome -->
  <rect x="20" y="16" width="680" height="248" rx="8" fill="#0d1117" stroke="#30363d" stroke-width="1"/>
  <rect x="20" y="16" width="680" height="36" rx="8" fill="#161b22"/>
  <circle cx="42" cy="34" r="7" fill="#f85149"/>
  <circle cx="64" cy="34" r="7" fill="#f0883e"/>
  <circle cx="86" cy="34" r="7" fill="#3fb950"/>

  <!-- Title bar text -->
  <text x="120" y="40" font-family="JetBrains Mono, monospace" font-size="12" fill="#8b949e">~/github.com/Sujan-Bhat  main </text>

  <!-- Boot lines container -->
  <g font-family="JetBrains Mono, monospace" font-size="13" fill="#e6edf3" letter-spacing="0.3px">
    <!-- Line 1 -->
    <g opacity="0" transform="translate(44, 72)">
      <text x="0" y="0" fill="#8b949e">[</text>
      <text x="14" y="0" fill="#3fb950">OK</text>
      <text x="42" y="0" fill="#8b949e">]</text>
      <text x="58" y="0"> Initializing Sujan Bhat v2.4.1...</text>
      <animate attributeName="opacity" from="0" to="1" begin="0.2s" dur="0.3s" fill="freeze"/>
    </g>

    <!-- Line 2 -->
    <g opacity="0" transform="translate(44, 96)">
      <text x="0" y="0" fill="#8b949e">[</text>
      <text x="14" y="0" fill="#3fb950">OK</text>
      <text x="42" y="0" fill="#8b949e">]</text>
      <text x="58" y="0"> Loading full-stack modules...</text>
      <animate attributeName="opacity" from="0" to="1" begin="0.5s" dur="0.3s" fill="freeze"/>
    </g>

    <!-- Line 3 -->
    <g opacity="0" transform="translate(44, 120)">
      <text x="0" y="0" fill="#8b949e">[</text>
      <text x="14" y="0" fill="#3fb950">OK</text>
      <text x="42" y="0" fill="#8b949e">]</text>
      <text x="58" y="0"> Mounting /dev/skills (js, ts, python, c, cpp, rust)...</text>
      <animate attributeName="opacity" from="0" to="1" begin="0.8s" dur="0.3s" fill="freeze"/>
    </g>

    <!-- Line 4 -->
    <g opacity="0" transform="translate(44, 144)">
      <text x="0" y="0" fill="#8b949e">[</text>
      <text x="14" y="0" fill="#3fb950">OK</text>
      <text x="42" y="0" fill="#8b949e">]</text>
      <text x="58" y="0"> Starting backend services (node, fastapi, django, postgres)...</text>
      <animate attributeName="opacity" from="0" to="1" begin="1.1s" dur="0.3s" fill="freeze"/>
    </g>

    <!-- Line 5 -->
    <g opacity="0" transform="translate(44, 168)">
      <text x="0" y="0" fill="#8b949e">[</text>
      <text x="14" y="0" fill="#3fb950">OK</text>
      <text x="42" y="0" fill="#8b949e">]</text>
      <text x="58" y="0"> Launching frontend (react, next, tailwind)...</text>
      <animate attributeName="opacity" from="0" to="1" begin="1.4s" dur="0.3s" fill="freeze"/>
    </g>

    <!-- Line 6 -->
    <g opacity="0" transform="translate(44, 192)">
      <text x="0" y="0" fill="#8b949e">[</text>
      <text x="14" y="0" fill="#3fb950">OK</text>
      <text x="42" y="0" fill="#8b949e">]</text>
      <text x="58" y="0"> Connecting to github.com/Sujan-Bhat...</text>
      <animate attributeName="opacity" from="0" to="1" begin="1.7s" dur="0.3s" fill="freeze"/>
    </g>

    <!-- Line 7 - READY -->
    <g opacity="0" transform="translate(44, 220)">
      <text x="0" y="0" fill="#8b949e">[</text>
      <text x="14" y="0" fill="#00d9a5" font-weight="700">READY</text>
      <text x="94" y="0" fill="#8b949e">]</text>
      <text x="112" y="0" fill="#00d9a5"> System online. Awaiting input...</text>
      <animate attributeName="opacity" from="0" to="1" begin="2.1s" dur="0.4s" fill="freeze"/>
      <!-- Blinking cursor effect on READY -->
      <animate attributeName="opacity" values="1;0.3;1" begin="2.5s" dur="1.5s" repeatCount="indefinite"/>
    </g>

    <!-- Blinking cursor at end -->
    <g opacity="0" transform="translate(44, 244)">
      <text x="0" y="0" fill="#00d9a5">$</text>
      <text x="14" y="0" class="cursor">_</text>
      <animate attributeName="opacity" from="0" to="1" begin="2.6s" dur="0.2s" fill="freeze"/>
    </g>
  </g>

  <!-- Cursor blink animation -->
  <style><![CDATA[
    .cursor {
      animation: blink 1s step-end infinite;
    }
    @keyframes blink {
      0%, 50% { opacity: 1; }
      51%, 100% { opacity: 0; }
    }
  ]]></style>
</svg>

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 100" width="720" height="100" class="motion" role="img" aria-label="GitHub profile statistics: views, followers, stars, repositories">
  <title>Profile Statistics</title>
  <desc>Custom animated stat cards for profile views, followers, stars, and repositories</desc>

  <defs>
    <filter id="card-glow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="4" result="blur"/>
      <feMerge>
        <feMergeNode in="blur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
    <linearGradient id="accent-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#00d9a5"/>
      <stop offset="100%" stop-color="#00b88a"/>
    </linearGradient>
  </defs>

  <style><![CDATA[
    .stat-card {
      transition: transform 0.2s ease, box-shadow 0.2s ease;
    }
    .stat-card:hover {
      transform: translateY(-2px);
    }
    .stat-value {
      animation: countUp 1.5s ease-out forwards;
    }
    @keyframes countUp {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .accent-bar {
      animation: barGrow 1s ease-out forwards;
      transform-origin: left center;
    }
    @keyframes barGrow {
      from { transform: scaleX(0); }
      to { transform: scaleX(1); }
    }
  ]]></style>

  <!-- Card 1: Profile Views -->
  <g class="stat-card">
    <rect x="10" y="10" width="165" height="80" rx="10" fill="#161b22" stroke="#30363d" stroke-width="1" filter="url(#card-glow)"/>
    <rect x="14" y="14" width="4" height="52" rx="2" fill="url(#accent-gradient)"/>
    <text x="28" y="38" font-family="Space Grotesk, sans-serif" font-size="11" font-weight="500" fill="#8b949e" text-transform="uppercase" letter-spacing="0.8px">Profile Views</text>
    <text x="28" y="64" font-family="JetBrains Mono, monospace" font-size="24" font-weight="700" fill="#e6edf3" class="stat-value" style="animation-delay: 0.1s;">12.4K</text>
    <rect x="28" y="70" width="120" height="3" rx="1.5" fill="#30363d"/>
    <rect x="28" y="70" width="78" height="3" rx="1.5" fill="url(#accent-gradient)" class="accent-bar" style="animation-delay: 0.3s;"/>
  </g>

  <!-- Card 2: Followers -->
  <g class="stat-card" style="animation-delay: 0.1s;">
    <rect x="185" y="10" width="165" height="80" rx="10" fill="#161b22" stroke="#30363d" stroke-width="1" filter="url(#card-glow)"/>
    <rect x="189" y="14" width="4" height="52" rx="2" fill="url(#accent-gradient)"/>
    <text x="203" y="38" font-family="Space Grotesk, sans-serif" font-size="11" font-weight="500" fill="#8b949e" text-transform="uppercase" letter-spacing="0.8px">Followers</text>
    <text x="203" y="64" font-family="JetBrains Mono, monospace" font-size="24" font-weight="700" fill="#e6edf3" class="stat-value" style="animation-delay: 0.2s;">1.2K</text>
    <rect x="203" y="70" width="120" height="3" rx="1.5" fill="#30363d"/>
    <rect x="203" y="70" width="65" height="3" rx="1.5" fill="url(#accent-gradient)" class="accent-bar" style="animation-delay: 0.4s;"/>
  </g>

  <!-- Card 3: Total Stars -->
  <g class="stat-card" style="animation-delay: 0.2s;">
    <rect x="360" y="10" width="165" height="80" rx="10" fill="#161b22" stroke="#30363d" stroke-width="1" filter="url(#card-glow)"/>
    <rect x="364" y="14" width="4" height="52" rx="2" fill="url(#accent-gradient)"/>
    <text x="378" y="38" font-family="Space Grotesk, sans-serif" font-size="11" font-weight="500" fill="#8b949e" text-transform="uppercase" letter-spacing="0.8px">Total Stars</text>
    <text x="378" y="64" font-family="JetBrains Mono, monospace" font-size="24" font-weight="700" fill="#e6edf3" class="stat-value" style="animation-delay: 0.3s;">3.8K</text>
    <rect x="378" y="70" width="120" height="3" rx="1.5" fill="#30363d"/>
    <rect x="378" y="70" width="88" height="3" rx="1.5" fill="url(#accent-gradient)" class="accent-bar" style="animation-delay: 0.5s;"/>
  </g>

  <!-- Card 4: Repositories -->
  <g class="stat-card" style="animation-delay: 0.3s;">
    <rect x="535" y="10" width="165" height="80" rx="10" fill="#161b22" stroke="#30363d" stroke-width="1" filter="url(#card-glow)"/>
    <rect x="539" y="14" width="4" height="52" rx="2" fill="url(#accent-gradient)"/>
    <text x="553" y="38" font-family="Space Grotesk, sans-serif" font-size="11" font-weight="500" fill="#8b949e" text-transform="uppercase" letter-spacing="0.8px">Repositories</text>
    <text x="553" y="64" font-family="JetBrains Mono, monospace" font-size="24" font-weight="700" fill="#e6edf3" class="stat-value" style="animation-delay: 0.4s;">47</text>
    <rect x="553" y="70" width="120" height="3" rx="1.5" fill="#30363d"/>
    <rect x="553" y="70" width="42" height="3" rx="1.5" fill="url(#accent-gradient)" class="accent-bar" style="animation-delay: 0.6s;"/>
  </g>

  <!-- Decorative corner accents -->
  <g fill="none" stroke="#00d9a5" stroke-width="1.5" opacity="0.3">
    <path d="M10 10 L10 25 M10 10 L25 10"/>
    <path d="M175 10 L160 10 M175 10 L175 25"/>
    <path d="M185 10 L200 10 M185 10 L185 25"/>
    <path d="M355 10 L340 10 M355 10 L355 25"/>
    <path d="M360 10 L375 10 M360 10 L360 25"/>
    <path d="M535 10 L550 10 M535 10 L535 25"/>
    <path d="M705 10 L690 10 M705 10 L705 25"/>
  </g>
</svg>

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 140" width="720" height="140" class="motion" role="img" aria-label="Social links in command palette style: LinkedIn, Email, Portfolio, GitHub">
  <title>Social Links - Command Palette</title>
  <desc>Terminal-style command palette showing social links</desc>

  <defs>
    <filter id="link-glow" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="3" result="blur"/>
      <feMerge>
        <feMergeNode in="blur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
    <linearGradient id="accent-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#00d9a5"/>
      <stop offset="100%" stop-color="#00b88a"/>
    </linearGradient>
  </defs>

  <style><![CDATA[
    .link-row {
      transition: transform 0.15s ease;
    }
    .link-row:hover {
      transform: translateX(6px);
    }
    .link-icon {
      transition: fill 0.15s ease;
    }
    .link-row:hover .link-icon {
      fill: #00d9a5;
    }
    .key-hint {
      opacity: 0.5;
      transition: opacity 0.15s ease;
    }
    .link-row:hover .key-hint {
      opacity: 1;
    }
  ]]></style>

  <!-- Background panel -->
  <rect x="20" y="10" width="680" height="120" rx="10" fill="#161b22" stroke="#30363d" stroke-width="1"/>

  <!-- Title bar -->
  <rect x="20" y="10" width="680" height="36" rx="10" fill="#0d1117"/>
  <circle cx="42" cy="28" r="7" fill="#f85149"/>
  <circle cx="64" cy="28" r="7" fill="#f0883e"/>
  <circle cx="86" cy="28" r="7" fill="#3fb950"/>

  <!-- Title text -->
  <text x="120" y="34" font-family="JetBrains Mono, monospace" font-size="12" fill="#8b949e">⌘K  Links</text>
  <text x="320" y="34" font-family="JetBrains Mono, monospace" font-size="11" fill="#30363d">──────────────────────────────────────────────────────────────────────────</text>

  <!-- Link 1: LinkedIn -->
  <a href="https://www.linkedin.com/in/sujan-bhat/" target="_blank" rel="noopener noreferrer">
    <g class="link-row" transform="translate(0, 50)">
      <rect x="20" y="0" width="680" height="32" fill="transparent"/>
      <!-- Icon -->
      <g class="link-icon" transform="translate(48, 4)">
        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h16z" fill="#0a66c2"/>
        <path d="M7 9h4v10H7V9zm6 10h4V9h-4v10zm7-15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" fill="white"/>
      </g>
      <!-- Label -->
      <text x="88" y="20" font-family="Space Grotesk, sans-serif" font-size="13" font-weight="500" fill="#e6edf3">LinkedIn</text>
      <!-- URL -->
      <text x="200" y="20" font-family="JetBrains Mono, monospace" font-size="12" fill="#8b949e">linkedin.com/in/sujan-bhat</text>
      <!-- Key hint -->
      <text x="580" y="20" font-family="JetBrains Mono, monospace" font-size="11" fill="#30363d" class="key-hint">[Enter]</text>
      <!-- Chevron -->
      <path d="M630 12 L640 16 L630 20" fill="none" stroke="#30363d" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </g>
  </a>

  <!-- Link 2: Email -->
  <a href="mailto:sujan.bhat@example.com" target="_blank" rel="noopener noreferrer">
    <g class="link-row" transform="translate(0, 84)">
      <rect x="20" y="0" width="680" height="32" fill="transparent"/>
      <!-- Icon -->
      <g class="link-icon" transform="translate(48, 4)">
        <path d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zm0 2v.5l8 5 8-5V6l-8 5-8-5z" fill="#d14836"/>
      </g>
      <!-- Label -->
      <text x="88" y="20" font-family="Space Grotesk, sans-serif" font-size="13" font-weight="500" fill="#e6edf3">Email</text>
      <!-- URL -->
      <text x="200" y="20" font-family="JetBrains Mono, monospace" font-size="12" fill="#8b949e">sujan.bhat@example.com</text>
      <!-- Key hint -->
      <text x="580" y="20" font-family="JetBrains Mono, monospace" font-size="11" fill="#30363d" class="key-hint">[Enter]</text>
      <!-- Chevron -->
      <path d="M630 12 L640 16 L630 20" fill="none" stroke="#30363d" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </g>
  </a>

  <!-- Link 3: Portfolio -->
  <a href="https://sujanbhat.dev" target="_blank" rel="noopener noreferrer">
    <g class="link-row" transform="translate(0, 118)">
      <rect x="20" y="0" width="680" height="32" fill="transparent"/>
      <!-- Icon -->
      <g class="link-icon" transform="translate(48, 4)">
        <rect x="0" y="0" width="16" height="16" rx="3" fill="#000"/>
        <path d="M4 8 L8 12 L12 4" fill="none" stroke="#00d9a5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </g>
      <!-- Label -->
      <text x="88" y="20" font-family="Space Grotesk, sans-serif" font-size="13" font-weight="500" fill="#e6edf3">Portfolio</text>
      <!-- URL -->
      <text x="200" y="20" font-family="JetBrains Mono, monospace" font-size="12" fill="#8b949e">sujanbhat.dev</text>
      <!-- Key hint -->
      <text x="580" y="20" font-family="JetBrains Mono, monospace" font-size="11" fill="#30363d" class="key-hint">[Enter]</text>
      <!-- Chevron -->
      <path d="M630 12 L640 16 L630 20" fill="none" stroke="#30363d" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </g>
  </a>

  <!-- Link 4: GitHub -->
  <a href="https://github.com/Sujan-Bhat" target="_blank" rel="noopener noreferrer">
    <g class="link-row" transform="translate(0, 152)">
      <rect x="20" y="0" width="680" height="32" fill="transparent"/>
      <!-- Icon -->
      <g class="link-icon" transform="translate(48, 4)">
        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" fill="#e6edf3"/>
      </g>
      <!-- Label -->
      <text x="88" y="20" font-family="Space Grotesk, sans-serif" font-size="13" font-weight="500" fill="#e6edf3">GitHub</text>
      <!-- URL -->
      <text x="200" y="20" font-family="JetBrains Mono, monospace" font-size="12" fill="#8b949e">github.com/Sujan-Bhat</text>
      <!-- Key hint -->
      <text x="580" y="20" font-family="JetBrains Mono, monospace" font-size="11" fill="#30363d" class="key-hint">[Enter]</text>
      <!-- Chevron -->
      <path d="M630 12 L640 16 L630 20" fill="none" stroke="#30363d" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </g>
  </a>

  <!-- Divider lines -->
  <g stroke="#30363d" stroke-width="0.5" opacity="0.5">
    <line x1="40" y1="82" x2="680" y2="82"/>
    <line x1="40" y1="116" x2="680" y2="116"/>
    <line x1="40" y1="150" x2="680" y2="150"/>
  </g>
</svg>

---

## ⚙️ Module Registry

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 420" width="720" height="420" class="motion" role="img" aria-label="Tech stack displayed as terminal ls -la output with Languages, Frontend, Backend, Tools directories">
  <title>Tech Stack - Module Registry</title>
  <desc>Terminal ls -la style listing of tech stack organized by category</desc>

  <defs>
    <filter id="row-glow" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="2" result="blur"/>
      <feMerge>
        <feMergeNode in="blur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
    <linearGradient id="accent-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#00d9a5"/>
      <stop offset="100%" stop-color="#00b88a"/>
    </linearGradient>
  </defs>

  <style><![CDATA[
    .file-row {
      transition: background 0.15s ease;
    }
    .file-row:hover {
      background: rgba(0, 217, 165, 0.08);
    }
    .dir-row {
      font-weight: 600;
    }
    .file-icon {
      transition: transform 0.15s ease, fill 0.15s ease;
    }
    .file-row:hover .file-icon {
      transform: scale(1.1);
      fill: #00d9a5;
    }
    .stagger-in {
      opacity: 0;
      animation: staggerIn 0.4s ease-out forwards;
    }
    @keyframes staggerIn {
      from { opacity: 0; transform: translateX(-10px); }
      to { opacity: 1; transform: translateX(0); }
    }
  ]]></style>

  <!-- Background -->
  <rect width="720" height="420" fill="#0d1117"/>

  <!-- Terminal chrome -->
  <rect x="10" y="10" width="700" height="400" rx="8" fill="#0d1117" stroke="#30363d" stroke-width="1"/>
  <rect x="10" y="10" width="700" height="36" rx="8" fill="#161b22"/>
  <circle cx="30" cy="28" r="7" fill="#f85149"/>
  <circle cx="52" cy="28" r="7" fill="#f0883e"/>
  <circle cx="74" cy="28" r="7" fill="#3fb950"/>
  <text x="100" y="34" font-family="JetBrains Mono, monospace" font-size="12" fill="#8b949e">$ ls -la ~/tech-stack/</text>

  <!-- Column headers -->
  <g font-family="JetBrains Mono, monospace" font-size="11" fill="#8b949e" transform="translate(20, 60)">
    <text x="0" y="0">permissions</text>
    <text x="120" y="0">links</text>
    <text x="160" y="0">owner</text>
    <text x="210" y="0">group</text>
    <text x="270" y="0">size</text>
    <text x="330" y="0">modified</text>
    <text x="430" y="0">name</text>
  </g>

  <!-- Divider -->
  <line x1="20" y1="74" x2="700" y2="74" stroke="#30363d" stroke-width="0.5" opacity="0.5"/>

  <!-- LANGUAGES DIRECTORY -->
  <g class="stagger-in dir-row" style="animation-delay: 0.1s;" transform="translate(20, 92)" font-family="JetBrains Mono, monospace" font-size="12">
    <rect x="-4" y="-14" width="680" height="24" fill="transparent" class="file-row"/>
    <text x="0" y="0" fill="#8b949e">drwxr-xr-x</text>
    <text x="120" y="0" fill="#8b949e">2</text>
    <text x="160" y="0" fill="#8b949e">sujan</text>
    <text x="210" y="0" fill="#8b949e">staff</text>
    <text x="270" y="0" fill="#8b949e">64B</text>
    <text x="330" y="0" fill="#8b949e">Nov 16 10:00</text>
    <text x="430" y="0" fill="#00d9a5" font-weight="600">Languages/</text>
  </g>

  <!-- Language files -->
  <g class="stagger-in file-row" style="animation-delay: 0.15s;" transform="translate(20, 116)" font-family="JetBrains Mono, monospace" font-size="12">
    <rect x="-4" y="-14" width="680" height="24" fill="transparent" class="file-row"/>
    <text x="0" y="0" fill="#8b949e">-rw-r--r--</text>
    <text x="120" y="0" fill="#8b949e">1</text>
    <text x="160" y="0" fill="#8b949e">sujan</text>
    <text x="210" y="0" fill="#8b949e">staff</text>
    <text x="270" y="0" fill="#8b949e">1.2K</text>
    <text x="330" y="0" fill="#8b949e">Nov 16 10:00</text>
    <g transform="translate(426, 0)">
      <!-- JS icon -->
      <g class="file-icon" transform="translate(0, -10)">
        <path d="M0 16 L16 16 L16 0 L0 0 Z M4 4 L12 4 L12 12 L4 12 Z M6 6 L10 6 L10 10 L6 10 Z" fill="#f7df1e"/>
        <text x="8" y="4" font-size="8" fill="#000" text-anchor="middle" font-weight="bold">JS</text>
      </g>
      <text x="22" y="0" fill="#e6edf3">javascript.ts</text>
    </g>
  </g>

  <g class="stagger-in file-row" style="animation-delay: 0.2s;" transform="translate(20, 140)" font-family="JetBrains Mono, monospace" font-size="12">
    <rect x="-4" y="-14" width="680" height="24" fill="transparent" class="file-row"/>
    <text x="0" y="0" fill="#8b949e">-rw-r--r--</text>
    <text x="120" y="0" fill="#8b949e">1</text>
    <text x="160" y="0" fill="#8b949e">sujan</text>
    <text x="210" y="0" fill="#8b949e">staff</text>
    <text x="270" y="0" fill="#8b949e">1.1K</text>
    <text x="330" y="0" fill="#8b949e">Nov 16 10:00</text>
    <g transform="translate(426, 0)">
      <g class="file-icon" transform="translate(0, -10)">
        <path d="M0 16 L16 16 L16 0 L0 0 Z M4 4 L12 4 L12 12 L4 12 Z M6 6 L10 6 L10 10 L6 10 Z" fill="#3178c6"/>
        <text x="8" y="4" font-size="8" fill="#fff" text-anchor="middle" font-weight="bold">TS</text>
      </g>
      <text x="22" y="0" fill="#e6edf3">typescript.ts</text>
    </g>
  </g>

  <g class="stagger-in file-row" style="animation-delay: 0.25s;" transform="translate(20, 164)" font-family="JetBrains Mono, monospace" font-size="12">
    <rect x="-4" y="-14" width="680" height="24" fill="transparent" class="file-row"/>
    <text x="0" y="0" fill="#8b949e">-rw-r--r--</text>
    <text x="120" y="0" fill="#8b949e">1</text>
    <text x="160" y="0" fill="#8b949e">sujan</text>
    <text x="210" y="0" fill="#8b949e">staff</text>
    <text x="270" y="0" fill="#8b949e">98B</text>
    <text x="330" y="0" fill="#8b949e">Nov 16 10:00</text>
    <g transform="translate(426, 0)">
      <g class="file-icon" transform="translate(0, -10)">
        <rect x="0" y="0" width="16" height="16" rx="2" fill="#3776ab"/>
        <text x="8" y="11" font-size="9" fill="#fff" text-anchor="middle" font-weight="bold">PY</text>
      </g>
      <text x="22" y="0" fill="#e6edf3">python.py</text>
    </g>
  </g>

  <g class="stagger-in file-row" style="animation-delay: 0.3s;" transform="translate(20, 188)" font-family="JetBrains Mono, monospace" font-size="12">
    <rect x="-4" y="-14" width="680" height="24" fill="transparent" class="file-row"/>
    <text x="0" y="0" fill="#8b949e">-rw-r--r--</text>
    <text x="120" y="0" fill="#8b949e">1</text>
    <text x="160" y="0" fill="#8b949e">sujan</text>
    <text x="210" y="0" fill="#8b949e">staff</text>
    <text x="270" y="0" fill="#8b949e">142B</text>
    <text x="330" y="0" fill="#8b949e">Nov 16 10:00</text>
    <g transform="translate(426, 0)">
      <g class="file-icon" transform="translate(0, -10)">
        <rect x="0" y="0" width="16" height="16" rx="2" fill="#A8B9CC"/>
        <text x="8" y="11" font-size="9" fill="#000" text-anchor="middle" font-weight="bold">C</text>
      </g>
      <text x="22" y="0" fill="#e6edf3">c.c</text>
    </g>
  </g>

  <g class="stagger-in file-row" style="animation-delay: 0.35s;" transform="translate(20, 212)" font-family="JetBrains Mono, monospace" font-size="12">
    <rect x="-4" y="-14" width="680" height="24" fill="transparent" class="file-row"/>
    <text x="0" y="0" fill="#8b949e">-rw-r--r--</text>
    <text x="120" y="0" fill="#8b949e">1</text>
    <text x="160" y="0" fill="#8b949e">sujan</text>
    <text x="210" y="0" fill="#8b949e">staff</text>
    <text x="270" y="0" fill="#8b949e">156B</text>
    <text x="330" y="0" fill="#8b949e">Nov 16 10:00</text>
    <g transform="translate(426, 0)">
      <g class="file-icon" transform="translate(0, -10)">
        <rect x="0" y="0" width="16" height="16" rx="2" fill="#00599C"/>
        <text x="8" y="11" font-size="8" fill="#fff" text-anchor="middle" font-weight="bold">C++</text>
      </g>
      <text x="22" y="0" fill="#e6edf3">cpp.cpp</text>
    </g>
  </g>

  <g class="stagger-in file-row" style="animation-delay: 0.4s;" transform="translate(20, 236)" font-family="JetBrains Mono, monospace" font-size="12">
    <rect x="-4" y="-14" width="680" height="24" fill="transparent" class="file-row"/>
    <text x="0" y="0" fill="#8b949e">-rw-r--r--</text>
    <text x="120" y="0" fill="#8b949e">1</text>
    <text x="160" y="0" fill="#8b949e">sujan</text>
    <text x="210" y="0" fill="#8b949e">staff</text>
    <text x="270" y="0" fill="#8b949e">134B</text>
    <text x="330" y="0" fill="#8b949e">Nov 16 10:00</text>
    <g transform="translate(426, 0)">
      <g class="file-icon" transform="translate(0, -10)">
        <path d="M0 16 L16 16 L16 0 L0 0 Z M2 4 L14 4 L14 12 L2 12 Z M4 6 L12 6 L12 10 L4 10 Z" fill="#dea584"/>
        <text x="8" y="11" font-size="8" fill="#000" text-anchor="middle" font-weight="bold">RS</text>
      </g>
      <text x="22" y="0" fill="#e6edf3">rust.rs</text>
    </g>
  </g>

  <!-- FRONTEND DIRECTORY -->
  <g class="stagger-in dir-row" style="animation-delay: 0.45s;" transform="translate(20, 268)" font-family="JetBrains Mono, monospace" font-size="12">
    <rect x="-4" y="-14" width="680" height="24" fill="transparent" class="file-row"/>
    <text x="0" y="0" fill="#8b949e">drwxr-xr-x</text>
    <text x="120" y="0" fill="#8b949e">2</text>
    <text x="160" y="0" fill="#8b949e">sujan</text>
    <text x="210" y="0" fill="#8b949e">staff</text>
    <text x="270" y="0" fill="#8b949e">64B</text>
    <text x="330" y="0" fill="#8b949e">Nov 16 10:00</text>
    <text x="430" y="0" fill="#00d9a5" font-weight="600">Frontend/</text>
  </g>

  <g class="stagger-in file-row" style="animation-delay: 0.5s;" transform="translate(20, 292)" font-family="JetBrains Mono, monospace" font-size="12">
    <rect x="-4" y="-14" width="680" height="24" fill="transparent" class="file-row"/>
    <text x="0" y="0" fill="#8b949e">-rw-r--r--</text>
    <text x="120" y="0" fill="#8b949e">1</text>
    <text x="160" y="0" fill="#8b949e">sujan</text>
    <text x="210" y="0" fill="#8b949e">staff</text>
    <text x="270" y="0" fill="#8b949e">2.1K</text>
    <text x="330" y="0" fill="#8b949e">Nov 16 10:00</text>
    <g transform="translate(426, 0)">
      <g class="file-icon" transform="translate(0, -10)">
        <path d="M8 0 L16 8 L8 16 L0 8 Z M4 4 L8 8 L4 12 Z" fill="#61dafb"/>
        <text x="8" y="11" font-size="8" fill="#000" text-anchor="middle" font-weight="bold">⚛</text>
      </g>
      <text x="22" y="0" fill="#e6edf3">react.tsx</text>
    </g>
  </g>

  <g class="stagger-in file-row" style="animation-delay: 0.55s;" transform="translate(20, 316)" font-family="JetBrains Mono, monospace" font-size="12">
    <rect x="-4" y="-14" width="680" height="24" fill="transparent" class="file-row"/>
    <text x="0" y="0" fill="#8b949e">-rw-r--r--</text>
    <text x="120" y="0" fill="#8b949e">1</text>
    <text x="160" y="0" fill="#8b949e">sujan</text>
    <text x="210" y="0" fill="#8b949e">staff</text>
    <text x="270" y="0" fill="#8b949e">1.8K</text>
    <text x="330" y="0" fill="#8b949e">Nov 16 10:00</text>
    <g transform="translate(426, 0)">
      <g class="file-icon" transform="translate(0, -10)">
        <rect x="0" y="0" width="16" height="16" rx="2" fill="#000"/>
        <path d="M4 4 L12 4 L12 12 L4 12 Z M6 6 L10 6 L10 10 L6 10 Z" fill="#fff"/>
        <text x="8" y="11" font-size="8" fill="#000" text-anchor="middle" font-weight="bold">N</text>
      </g>
      <text x="22" y="0" fill="#e6edf3">next.config.js</text>
    </g>
  </g>

  <g class="stagger-in file-row" style="animation-delay: 0.6s;" transform="translate(20, 340)" font-family="JetBrains Mono, monospace" font-size="12">
    <rect x="-4" y="-14" width="680" height="24" fill="transparent" class="file-row"/>
    <text x="0" y="0" fill="#8b949e">-rw-r--r--</text>
    <text x="120" y="0" fill="#8b949e">1</text>
    <text x="160" y="0" fill="#8b949e">sujan</text>
    <text x="210" y="0" fill="#8b949e">staff</text>
    <text x="270" y="0" fill="#8b949e">94B</text>
    <text x="330" y="0" fill="#8b949e">Nov 16 10:00</text>
    <g transform="translate(426, 0)">
      <g class="file-icon" transform="translate(0, -10)">
        <rect x="0" y="0" width="16" height="16" rx="2" fill="#06b6d4"/>
        <text x="8" y="11" font-size="8" fill="#fff" text-anchor="middle" font-weight="bold">TW</text>
      </g>
      <text x="22" y="0" fill="#e6edf3">tailwind.css</text>
    </g>
  </g>

  <!-- BACKEND DIRECTORY -->
  <g class="stagger-in dir-row" style="animation-delay: 0.65s;" transform="translate(20, 372)" font-family="JetBrains Mono, monospace" font-size="12">
    <rect x="-4" y="-14" width="680" height="24" fill="transparent" class="file-row"/>
    <text x="0" y="0" fill="#8b949e">drwxr-xr-x</text>
    <text x="120" y="0" fill="#8b949e">2</text>
    <text x="160" y="0" fill="#8b949e">sujan</text>
    <text x="210" y="0" fill="#8b949e">staff</text>
    <text x="270" y="0" fill="#8b949e">64B</text>
    <text x="330" y="0" fill="#8b949e">Nov 16 10:00</text>
    <text x="430" y="0" fill="#00d9a5" font-weight="600">Backend/</text>
  </g>

  <!-- TOOLS DIRECTORY -->
  <g class="stagger-in dir-row" style="animation-delay: 0.7s;" transform="translate(20, 396)" font-family="JetBrains Mono, monospace" font-size="12">
    <rect x="-4" y="-14" width="680" height="24" fill="transparent" class="file-row"/>
    <text x="0" y="0" fill="#8b949e">drwxr-xr-x</text>
    <text x="120" y="0" fill="#8b949e">2</text>
    <text x="160" y="0" fill="#8b949e">sujan</text>
    <text x="210" y="0" fill="#8b949e">staff</text>
    <text x="270" y="0" fill="#8b949e">64B</text>
    <text x="330" y="0" fill="#8b949e">Nov 16 10:00</text>
    <text x="430" y="0" fill="#00d9a5" font-weight="600">Tools/</text>
  </g>
</svg>

---

## 📋 Config.yaml

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 300" width="720" height="300" class="motion" role="img" aria-label="About me configuration in YAML format with syntax highlighting">
  <title>About Me - Config.yaml</title>
  <desc>YAML configuration file showing developer profile with syntax highlighting</desc>

  <defs>
    <linearGradient id="accent-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#00d9a5"/>
      <stop offset="100%" stop-color="#00b88a"/>
    </linearGradient>
  </defs>

  <style><![CDATA[
    .line {
      opacity: 0;
      animation: lineIn 0.3s ease-out forwards;
    }
    @keyframes lineIn {
      from { opacity: 0; transform: translateX(-15px); }
      to { opacity: 1; transform: translateX(0); }
    }
  ]]></style>

  <!-- Background -->
  <rect width="720" height="300" fill="#0d1117"/>

  <!-- Terminal chrome -->
  <rect x="10" y="10" width="700" height="280" rx="8" fill="#0d1117" stroke="#30363d" stroke-width="1"/>
  <rect x="10" y="10" width="700" height="36" rx="8" fill="#161b22"/>
  <circle cx="30" cy="28" r="7" fill="#f85149"/>
  <circle cx="52" cy="28" r="7" fill="#f0883e"/>
  <circle cx="74" cy="28" r="7" fill="#3fb950"/>
  <text x="100" y="34" font-family="JetBrains Mono, monospace" font-size="12" fill="#8b949e">$ cat ~/config.yaml</text>

  <!-- Line numbers and content -->
  <g font-family="JetBrains Mono, monospace" font-size="13" transform="translate(20, 60)" letter-spacing="0.3px">
    <!-- Line 1 -->
    <g class="line" style="animation-delay: 0.1s;" transform="translate(0, 0)">
      <text x="0" y="0" fill="#30363d" text-anchor="end" font-size="11">1</text>
      <text x="35" y="0" fill="#00d9a5">name:</text>
      <text x="95" y="0" fill="#f0883e">"Sujan Bhat"</text>
    </g>

    <!-- Line 2 -->
    <g class="line" style="animation-delay: 0.15s;" transform="translate(0, 24)">
      <text x="0" y="0" fill="#30363d" text-anchor="end" font-size="11">2</text>
      <text x="35" y="0" fill="#00d9a5">role:</text>
      <text x="95" y="0" fill="#f0883e">"Full-stack Developer"</text>
    </g>

    <!-- Line 3 -->
    <g class="line" style="animation-delay: 0.2s;" transform="translate(0, 48)">
      <text x="0" y="0" fill="#30363d" text-anchor="end" font-size="11">3</text>
      <text x="35" y="0" fill="#00d9a5">location:</text>
      <text x="130" y="0" fill="#f0883e">"Bangalore, India"</text>
    </g>

    <!-- Line 4 -->
    <g class="line" style="animation-delay: 0.25s;" transform="translate(0, 72)">
      <text x="0" y="0" fill="#30363d" text-anchor="end" font-size="11">4</text>
      <text x="35" y="0" fill="#00d9a5">current_focus:</text>
    </g>

    <!-- Line 5 -->
    <g class="line" style="animation-delay: 0.3s;" transform="translate(0, 96)">
      <text x="0" y="0" fill="#30363d" text-anchor="end" font-size="11">5</text>
      <text x="35" y="0" fill="#8b949e">-</text>
      <text x="50" y="0" fill="#e6edf3"> Building scalable web applications</text>
    </g>

    <!-- Line 6 -->
    <g class="line" style="animation-delay: 0.35s;" transform="translate(0, 120)">
      <text x="0" y="0" fill="#30363d" text-anchor="end" font-size="11">6</text>
      <text x="35" y="0" fill="#8b949e">-</text>
      <text x="50" y="0" fill="#e6edf3"> Exploring system programming with Rust</text>
    </g>

    <!-- Line 7 -->
    <g class="line" style="animation-delay: 0.4s;" transform="translate(0, 144)">
      <text x="0" y="0" fill="#30363d" text-anchor="end" font-size="11">7</text>
      <text x="35" y="0" fill="#8b949e">-</text>
      <text x="50" y="0" fill="#e6edf3"> Contributing to open source</text>
    </g>

    <!-- Line 8 -->
    <g class="line" style="animation-delay: 0.45s;" transform="translate(0, 168)">
      <text x="0" y="0" fill="#30363d" text-anchor="end" font-size="11">8</text>
      <text x="35" y="0" fill="#00d9a5">learning:</text>
    </g>

    <!-- Line 9 -->
    <g class="line" style="animation-delay: 0.5s;" transform="translate(0, 192)">
      <text x="0" y="0" fill="#30363d" text-anchor="end" font-size="11">9</text>
      <text x="35" y="0" fill="#8b949e">-</text>
      <text x="50" y="0" fill="#e6edf3"> Distributed systems</text>
    </g>

    <!-- Line 10 -->
    <g class="line" style="animation-delay: 0.55s;" transform="translate(0, 216)">
      <text x="0" y="0" fill="#30363d" text-anchor="end" font-size="11">10</text>
      <text x="35" y="0" fill="#8b949e">-</text>
      <text x="50" y="0" fill="#e6edf3"> Cloud native architectures</text>
    </g>

    <!-- Line 11 -->
    <g class="line" style="animation-delay: 0.6s;" transform="translate(0, 240)">
      <text x="0" y="0" fill="#30363d" text-anchor="end" font-size="11">11</text>
      <text x="35" y="0" fill="#8b949e">-</text>
      <text x="50" y="0" fill="#e6edf3"> WebAssembly</text>
    </g>

    <!-- Line 12 -->
    <g class="line" style="animation-delay: 0.65s;" transform="translate(0, 264)">
      <text x="0" y="0" fill="#30363d" text-anchor="end" font-size="11">12</text>
      <text x="35" y="0" fill="#00d9a5">interests:</text>
    </g>
  </g>

  <!-- Right column for interests -->
  <g font-family="JetBrains Mono, monospace" font-size="13" transform="translate(400, 60)" letter-spacing="0.3px">
    <!-- Line 13 -->
    <g class="line" style="animation-delay: 0.7s;" transform="translate(0, 0)">
      <text x="0" y="0" fill="#30363d" text-anchor="end" font-size="11">13</text>
      <text x="35" y="0" fill="#8b949e">-</text>
      <text x="50" y="0" fill="#e6edf3"> Open source contribution</text>
    </g>

    <!-- Line 14 -->
    <g class="line" style="animation-delay: 0.75s;" transform="translate(0, 24)">
      <text x="0" y="0" fill="#30363d" text-anchor="end" font-size="11">14</text>
      <text x="35" y="0" fill="#8b949e">-</text>
      <text x="50" y="0" fill="#e6edf3"> Technical writing</text>
    </g>

    <!-- Line 15 -->
    <g class="line" style="animation-delay: 0.8s;" transform="translate(0, 48)">
      <text x="0" y="0" fill="#30363d" text-anchor="end" font-size="11">15</text>
      <text x="35" y="0" fill="#8b949e">-</text>
      <text x="50" y="0" fill="#e6edf3"> Mentoring developers</text>
    </g>

    <!-- Line 16 -->
    <g class="line" style="animation-delay: 0.85s;" transform="translate(0, 72)">
      <text x="0" y="0" fill="#30363d" text-anchor="end" font-size="11">16</text>
      <text x="35" y="0" fill="#8b949e">-</text>
      <text x="50" y="0" fill="#e6edf3"> Hackathons</text>
    </g>

    <!-- Line 17 -->
    <g class="line" style="animation-delay: 0.9s;" transform="translate(0, 96)">
      <text x="0" y="0" fill="#30363d" text-anchor="end" font-size="11">17</text>
    </g>

    <!-- Line 18 - prompt -->
    <g class="line" style="animation-delay: 1.0s;" transform="translate(0, 120)">
      <text x="0" y="0" fill="#30363d" text-anchor="end" font-size="11">18</text>
      <text x="35" y="0" fill="#8b949e">#</text>
      <text x="50" y="0" fill="#8b949e"> vim: ft=yaml</text>
    </g>

    <!-- Line 19 - cursor -->
    <g class="line" style="animation-delay: 1.1s;" transform="translate(0, 144)">
      <text x="0" y="0" fill="#30363d" text-anchor="end" font-size="11">19</text>
      <text x="35" y="0" fill="#00d9a5">$</text>
      <text x="50" y="0" fill="#00d9a5" class="cursor">_</text>
    </g>
  </g>

  <!-- Vertical divider between columns -->
  <line x1="380" y1="60" x2="380" y2="280" stroke="#30363d" stroke-width="0.5" opacity="0.3"/>

  <style><![CDATA[
    .cursor {
      animation: blink 1s step-end infinite;
    }
    @keyframes blink {
      0%, 50% { opacity: 1; }
      51%, 100% { opacity: 0; }
    }
  ]]></style>
</svg>

---

## 📦 Repository Index

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 360" width="720" height="360" class="motion" role="img" aria-label="Featured projects displayed as git log output with commit hashes, branches, titles, tech stacks, and descriptions">
  <title>Repository Index - Featured Projects</title>
  <desc>Git log style listing of featured repositories with tech stacks</desc>

  <defs>
    <filter id="project-glow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="3" result="blur"/>
      <feMerge>
        <feMergeNode in="blur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
    <linearGradient id="accent-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#00d9a5"/>
      <stop offset="100%" stop-color="#00b88a"/>
    </linearGradient>
    <linearGradient id="branch-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#00d9a5"/>
      <stop offset="100%" stop-color="#00b88a"/>
    </linearGradient>
  </defs>

  <style><![CDATA[
    .project-row {
      transition: background 0.15s ease;
    }
    .project-row:hover {
      background: rgba(0, 217, 165, 0.06);
    }
    .stagger-in {
      opacity: 0;
      animation: staggerIn 0.4s ease-out forwards;
    }
    @keyframes staggerIn {
      from { opacity: 0; transform: translateX(-15px); }
      to { opacity: 1; transform: translateX(0); }
    }
    .tech-badge {
      transition: transform 0.15s ease, fill 0.15s ease;
    }
    .project-row:hover .tech-badge {
      transform: scale(1.05);
    }
  ]]></style>

  <!-- Background -->
  <rect width="720" height="360" fill="#0d1117"/>

  <!-- Terminal chrome -->
  <rect x="10" y="10" width="700" height="340" rx="8" fill="#0d1117" stroke="#30363d" stroke-width="1"/>
  <rect x="10" y="10" width="700" height="36" rx="8" fill="#161b22"/>
  <circle cx="30" cy="28" r="7" fill="#f85149"/>
  <circle cx="52" cy="28" r="7" fill="#f0883e"/>
  <circle cx="74" cy="28" r="7" fill="#3fb950"/>
  <text x="100" y="34" font-family="JetBrains Mono, monospace" font-size="12" fill="#8b949e">$ git log --oneline --all --graph -6</text>

  <!-- Column headers -->
  <g font-family="JetBrains Mono, monospace" font-size="11" fill="#8b949e" transform="translate(20, 60)">
    <text x="0" y="0">hash</text>
    <text x="85" y="0">branch</text>
    <text x="180" y="0">title</text>
    <text x="420" y="0">tech</text>
    <text x="580" y="0">description</text>
  </g>

  <line x1="20" y1="72" x2="700" y2="72" stroke="#30363d" stroke-width="0.5" opacity="0.5"/>

  <!-- Project 1 -->
  <a href="https://github.com/Sujan-Bhat" target="_blank" rel="noopener noreferrer">
    <g class="stagger-in project-row" style="animation-delay: 0.1s;" transform="translate(20, 86)" font-family="JetBrains Mono, monospace" font-size="12">
      <rect x="-4" y="-14" width="660" height="52" fill="transparent" class="project-row"/>
      <!-- Commit hash -->
      <text x="0" y="0" fill="#8b949e">a1b2c3d</text>
      <!-- Branch badge -->
      <g transform="translate(80, -12)">
        <rect x="0" y="0" width="75" height="20" rx="4" fill="url(#branch-gradient)"/>
        <text x="37.5" y="14" font-size="10" fill="#0d1117" text-anchor="middle" font-weight="600">main</text>
      </g>
      <!-- Title -->
      <text x="175" y="0" fill="#e6edf3" font-weight="500">Project Nexus</text>
      <!-- Tech badges -->
      <g transform="translate(415, -10)">
        <rect class="tech-badge" x="0" y="0" width="38" height="18" rx="3" fill="#161b22" stroke="#30363d" stroke-width="0.5"/>
        <text x="19" y="13" font-size="9" fill="#00d9a5" text-anchor="middle" font-weight="500">Rust</text>
        <rect class="tech-badge" x="43" y="0" width="42" height="18" rx="3" fill="#161b22" stroke="#30363d" stroke-width="0.5"/>
        <text x="64" y="13" font-size="9" fill="#61dafb" text-anchor="middle" font-weight="500">WASM</text>
        <rect class="tech-badge" x="90" y="0" width="45" height="18" rx="3" fill="#161b22" stroke="#30363d" stroke-width="0.5"/>
        <text x="112.5" y="13" font-size="9" fill="#61dafb" text-anchor="middle" font-weight="500">React</text>
      </g>
      <!-- Description -->
      <text x="575" y="0" fill="#8b949e" font-size="11">Real-time collaborative editor</text>
      <!-- Second line of description -->
      <text x="175" y="22" fill="#8b949e" font-size="11">Operational transforms • WebRTC • Conflict-free replication</text>
    </g>
  </a>

  <!-- Divider -->
  <line x1="20" y1="144" x2="700" y2="144" stroke="#30363d" stroke-width="0.5" opacity="0.3"/>

  <!-- Project 2 -->
  <a href="https://github.com/Sujan-Bhat" target="_blank" rel="noopener noreferrer">
    <g class="stagger-in project-row" style="animation-delay: 0.2s;" transform="translate(20, 152)" font-family="JetBrains Mono, monospace" font-size="12">
      <rect x="-4" y="-14" width="660" height="52" fill="transparent" class="project-row"/>
      <text x="0" y="0" fill="#8b949e">e4f5g6h</text>
      <g transform="translate(80, -12)">
        <rect x="0" y="0" width="60" height="20" rx="4" fill="#161b22" stroke="#00d9a5" stroke-width="1"/>
        <text x="30" y="14" font-size="10" fill="#00d9a5" text-anchor="middle" font-weight="600">feat/api</text>
      </g>
      <text x="175" y="0" fill="#e6edf3" font-weight="500">API Gateway</text>
      <g transform="translate(415, -10)">
        <rect class="tech-badge" x="0" y="0" width="32" height="18" rx="3" fill="#161b22" stroke="#30363d" stroke-width="0.5"/>
        <text x="16" y="13" font-size="9" fill="#00ADD8" text-anchor="middle" font-weight="500">Go</text>
        <rect class="tech-badge" x="37" y="0" width="45" height="18" rx="3" fill="#161b22" stroke="#30363d" stroke-width="0.5"/>
        <text x="59.5" y="13" font-size="9" fill="#DC382D" text-anchor="middle" font-weight="500">Redis</text>
        <rect class="tech-badge" x="87" y="0" width="55" height="18" rx="3" fill="#161b22" stroke="#30363d" stroke-width="0.5"/>
        <text x="114.5" y="13" font-size="9" fill="#E10098" text-anchor="middle" font-weight="500">GraphQL</text>
      </g>
      <text x="575" y="0" fill="#8b949e" font-size="11">Rate-limited GraphQL proxy</text>
      <text x="175" y="22" fill="#8b949e" font-size="11">Token bucket • Circuit breaker • Request coalescing</text>
    </g>
  </a>

  <line x1="20" y1="210" x2="700" y2="210" stroke="#30363d" stroke-width="0.5" opacity="0.3"/>

  <!-- Project 3 -->
  <a href="https://github.com/Sujan-Bhat" target="_blank" rel="noopener noreferrer">
    <g class="stagger-in project-row" style="animation-delay: 0.3s;" transform="translate(20, 218)" font-family="JetBrains Mono, monospace" font-size="12">
      <rect x="-4" y="-14" width="660" height="52" fill="transparent" class="project-row"/>
      <text x="0" y="0" fill="#8b949e">i7j8k9l</text>
      <g transform="translate(80, -12)">
        <rect x="0" y="0" width="58" height="20" rx="4" fill="#161b22" stroke="#00d9a5" stroke-width="1"/>
        <text x="29" y="14" font-size="10" fill="#00d9a5" text-anchor="middle" font-weight="600">feat/ui</text>
      </g>
      <text x="175" y="0" fill="#e6edf3" font-weight="500">Design System</text>
      <g transform="translate(415, -10)">
        <rect class="tech-badge" x="0" y="0" width="38" height="18" rx="3" fill="#161b22" stroke="#30363d" stroke-width="0.5"/>
        <text x="19" y="13" font-size="9" fill="#3178c6" text-anchor="middle" font-weight="500">TypeScript</text>
        <rect class="tech-badge" x="43" y="0" width="65" height="18" rx="3" fill="#161b22" stroke="#30363d" stroke-width="0.5"/>
        <text x="75.5" y="13" font-size="9" fill="#FF4785" text-anchor="middle" font-weight="500">Storybook</text>
        <rect class="tech-badge" x="113" y="0" width="50" height="18" rx="3" fill="#161b22" stroke="#30363d" stroke-width="0.5"/>
        <text x="138" y="13" font-size="9" fill="#61dafb" text-anchor="middle" font-weight="500">React</text>
      </g>
      <text x="575" y="0" fill="#8b949e" font-size="11">Accessible component library</text>
      <text x="175" y="22" fill="#8b949e" font-size="11">WCAG 2.1 AA • Tokens • Composition primitives</text>
    </g>
  </a>

  <line x1="20" y1="276" x2="700" y2="276" stroke="#30363d" stroke-width="0.5" opacity="0.3"/>

  <!-- Project 4 -->
  <a href="https://github.com/Sujan-Bhat" target="_blank" rel="noopener noreferrer">
    <g class="stagger-in project-row" style="animation-delay: 0.4s;" transform="translate(20, 284)" font-family="JetBrains Mono, monospace" font-size="12">
      <rect x="-4" y="-14" width="660" height="52" fill="transparent" class="project-row"/>
      <text x="0" y="0" fill="#8b949e">m0n1o2p</text>
      <g transform="translate(80, -12)">
        <rect x="0" y="0" width="55" height="20" rx="4" fill="#161b22" stroke="#00d9a5" stroke-width="1"/>
        <text x="27.5" y="14" font-size="10" fill="#00d9a5" text-anchor="middle" font-weight="600">fix/auth</text>
      </g>
      <text x="175" y="0" fill="#e6edf3" font-weight="500">Auth Service</text>
      <g transform="translate(415, -10)">
        <rect class="tech-badge" x="0" y="0" width="60" height="18" rx="3" fill="#161b22" stroke="#30363d" stroke-width="0.5"/>
        <text x="30" y="13" font-size="9" fill="#009688" text-anchor="middle" font-weight="500">FastAPI</text>
        <rect class="tech-badge" x="65" y="0" width="80" height="18" rx="3" fill="#161b22" stroke="#30363d" stroke-width="0.5"/>
        <text x="105" y="13" font-size="9" fill="#336791" text-anchor="middle" font-weight="500">PostgreSQL</text>
        <rect class="tech-badge" x="150" y="0" width="45" height="18" rx="3" fill="#161b22" stroke="#30363d" stroke-width="0.5"/>
        <text x="172.5" y="13" font-size="9" fill="#000" text-anchor="middle" font-weight="500">JWT</text>
      </g>
      <text x="575" y="0" fill="#8b949e" font-size="11">JWT + OAuth2 provider</text>
      <text x="175" y="22" fill="#8b949e" font-size="11">Refresh rotation • PKCE • Device authorization</text>
    </g>
  </a>

  <!-- Bottom prompt -->
  <g font-family="JetBrains Mono, monospace" font-size="12" transform="translate(20, 340)">
    <text x="0" y="0" fill="#00d9a5">$</text>
    <text x="16" y="0" fill="#e6edf3"> gh repo list --limit 47</text>
    <text x="200" y="0" fill="#8b949e"># 47 repositories total</text>
  </g>
</svg>

---

## 🎮 Terminal Arcade

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 360" width="720" height="360" class="motion" role="img" aria-label="Animated Snake game demo in terminal style - snake moves eating food and growing">
  <title>Terminal Arcade - Snake Demo</title>
  <desc>Animated Snake game demonstration with terminal aesthetic. Non-interactive demo - visit sujanbhat.dev/snake to play</desc>

  <defs>
    <filter id="snake-glow" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="2" result="blur"/>
      <feMerge>
        <feMergeNode in="blur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
    <filter id="food-glow" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="4" result="blur"/>
      <feMerge>
        <feMergeNode in="blur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
    <linearGradient id="snake-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#00d9a5"/>
      <stop offset="100%" stop-color="#00b88a"/>
    </linearGradient>
    <linearGradient id="food-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#f0883e"/>
      <stop offset="100%" stop-color="#f85149"/>
    </linearGradient>
    <pattern id="grid-pattern" width="16" height="16" patternUnits="userSpaceOnUse">
      <rect width="16" height="16" fill="#0d1117"/>
      <path d="M 16 0 L 0 0 0 16" fill="none" stroke="#1f2937" stroke-width="0.5"/>
    </pattern>
  </defs>

  <style><![CDATA[
    .snake-segment {
      filter: url(#snake-glow);
    }
    .food {
      filter: url(#food-glow);
      animation: pulse 1s ease-in-out infinite;
    }
    @keyframes pulse {
      0%, 100% { transform: scale(1); opacity: 1; }
      50% { transform: scale(1.15); opacity: 0.8; }
    }
    .press-key {
      animation: blink 1.5s ease-in-out infinite;
    }
    @keyframes blink {
      0%, 100% { opacity: 0.4; }
      50% { opacity: 1; }
    }
    .score-counter {
      animation: countUp 0.3s ease-out;
    }
  ]]></style>

  <!-- Background -->
  <rect width="720" height="360" fill="#0d1117"/>

  <!-- Terminal chrome -->
  <rect x="10" y="10" width="700" height="340" rx="8" fill="#0d1117" stroke="#30363d" stroke-width="1"/>
  <rect x="10" y="10" width="700" height="36" rx="8" fill="#161b22"/>
  <circle cx="30" cy="28" r="7" fill="#f85149"/>
  <circle cx="52" cy="28" r="7" fill="#f0883e"/>
  <circle cx="74" cy="28" r="7" fill="#3fb950"/>
  <text x="100" y="34" font-family="JetBrains Mono, monospace" font-size="12" fill="#8b949e">$ python3 snake.py --demo</text>

  <!-- Game area -->
  <g transform="translate(60, 60)">
    <!-- Grid background -->
    <rect x="0" y="0" width="480" height="240" fill="url(#grid-pattern)"/>
    <rect x="0" y="0" width="480" height="240" fill="none" stroke="#30363d" stroke-width="2" rx="4"/>

    <!-- Snake path definition -->
    <path id="snake-path" d="
      M 224 120
      L 208 120
      L 192 120
      L 176 120
      L 160 120
      L 144 120
      L 128 120
      L 112 120
      L 96 120
      L 80 120
      L 80 136
      L 80 152
      L 96 152
      L 112 152
      L 128 152
      L 144 152
      L 160 152
      L 176 152
      L 192 152
      L 208 152
      L 224 152
      L 240 152
      L 256 152
      L 272 152
      L 288 152
      L 304 152
      L 320 152
      L 336 152
      L 352 152
      L 368 152
      L 384 152
      L 384 136
      L 384 120
      L 384 104
      L 384 88
      L 368 88
      L 352 88
      L 336 88
      L 320 88
      L 304 88
      L 288 88
      L 272 88
      L 256 88
      L 240 88
      L 224 88
      L 208 88
      L 192 88
      L 176 88
      L 160 88
      L 144 88
      L 128 88
      L 112 88
      L 96 88
      L 80 88
      L 80 104
      L 80 120
      Z" fill="none" stroke="none"/>

    <!-- Food positions along path (key points) -->
    <g class="food">
      <!-- Food 1 at start area -->
      <circle cx="200" cy="120" r="6" fill="url(#food-gradient)">
        <animate attributeName="opacity" values="0;1;1;0" dur="8s" repeatCount="indefinite" begin="0s"/>
      </circle>
      <!-- Food 2 at first turn -->
      <circle cx="80" cy="144" r="6" fill="url(#food-gradient)">
        <animate attributeName="opacity" values="0;1;1;0" dur="8s" repeatCount="indefinite" begin="2s"/>
      </circle>
      <!-- Food 3 at far right -->
      <circle cx="368" cy="152" r="6" fill="url(#food-gradient)">
        <animate attributeName="opacity" values="0;1;1;0" dur="8s" repeatCount="indefinite" begin="4s"/>
      </circle>
      <!-- Food 4 at top right -->
      <circle cx="384" cy="96" r="6" fill="url(#food-gradient)">
        <animate attributeName="opacity" values="0;1;1;0" dur="8s" repeatCount="indefinite" begin="6s"/>
      </circle>
    </g>

    <!-- Snake body (animated along path) -->
    <g class="snake-segment" fill="url(#snake-gradient)">
      <!-- Head -->
      <circle r="7" fill="url(#snake-gradient)">
        <animateMotion path="M 224 120 L 208 120 L 192 120 L 176 120 L 160 120 L 144 120 L 128 120 L 112 120 L 96 120 L 80 120 L 80 136 L 80 152 L 96 152 L 112 152 L 128 152 L 144 152 L 160 152 L 176 152 L 192 152 L 208 152 L 224 152 L 240 152 L 256 152 L 272 152 L 288 152 L 304 152 L 320 152 L 336 152 L 352 152 L 368 152 L 384 152 L 384 136 L 384 120 L 384 104 L 384 88 L 368 88 L 352 88 L 336 88 L 320 88 L 304 88 L 288 88 L 272 88 L 256 88 L 240 88 L 224 88 L 208 88 L 192 88 L 176 88 L 160 88 L 144 88 L 128 88 L 112 88 L 96 88 L 80 88 L 80 104 L 80 120 Z" dur="16s" repeatCount="indefinite" rotate="auto"/>
      </circle>
      <!-- Eyes on head -->
      <g>
        <animateMotion path="M 224 120 L 208 120 L 192 120 L 176 120 L 160 120 L 144 120 L 128 120 L 112 120 L 96 120 L 80 120 L 80 136 L 80 152 L 96 152 L 112 152 L 128 152 L 144 152 L 160 152 L 176 152 L 192 152 L 208 152 L 224 152 L 240 152 L 256 152 L 272 152 L 288 152 L 304 152 L 320 152 L 336 152 L 352 152 L 368 152 L 384 152 L 384 136 L 384 120 L 384 104 L 384 88 L 368 88 L 352 88 L 336 88 L 320 88 L 304 88 L 288 88 L 272 88 L 256 88 L 240 88 L 224 88 L 208 88 L 192 88 L 176 88 L 160 88 L 144 88 L 128 88 L 112 88 L 96 88 L 80 88 L 80 104 L 80 120 Z" dur="16s" repeatCount="indefinite" rotate="auto"/>
        <circle cx="-2" cy="-2" r="1.5" fill="#0d1117"/>
        <circle cx="2" cy="-2" r="1.5" fill="#0d1117"/>
      </g>

      <!-- Body segments (following head with delay) -->
      <!-- We'll use multiple circles with different begin times -->
      <circle r="7" fill="url(#snake-gradient)" opacity="0.95">
        <animateMotion path="M 224 120 L 208 120 L 192 120 L 176 120 L 160 120 L 144 120 L 128 120 L 112 120 L 96 120 L 80 120 L 80 136 L 80 152 L 96 152 L 112 152 L 128 152 L 144 152 L 160 152 L 176 152 L 192 152 L 208 152 L 224 152 L 240 152 L 256 152 L 272 152 L 288 152 L 304 152 L 320 152 L 336 152 L 352 152 L 368 152 L 384 152 L 384 136 L 384 120 L 384 104 L 384 88 L 368 88 L 352 88 L 336 88 L 320 88 L 288 88 L 272 88 L 256 88 L 240 88 L 224 88 L 208 88 L 192 88 L 176 88 L 160 88 L 144 88 L 128 88 L 112 88 L 96 88 L 80 88 L 80 104 L 80 120 Z" dur="16s" repeatCount="indefinite" rotate="auto" begin="0.15s"/>
      </circle>
      <circle r="7" fill="url(#snake-gradient)" opacity="0.9">
        <animateMotion path="M 224 120 L 208 120 L 192 120 L 176 120 L 160 120 L 144 120 L 128 120 L 112 120 L 96 120 L 80 120 L 80 136 L 80 152 L 96 152 L 112 152 L 128 152 L 144 152 L 160 152 L 176 152 L 192 152 L 208 152 L 224 152 L 240 152 L 256 152 L 272 152 L 288 152 L 304 152 L 320 152 L 336 152 L 352 152 L 368 152 L 384 152 L 384 136 L 384 120 L 384 104 L 384 88 L 368 88 L 352 88 L 336 88 L 320 88 L 288 88 L 272 88 L 256 88 L 240 88 L 224 88 L 208 88 L 192 88 L 176 88 L 160 88 L 144 88 L 128 88 L 112 88 L 96 88 L 80 88 L 80 104 L 80 120 Z" dur="16s" repeatCount="indefinite" rotate="auto" begin="0.3s"/>
      </circle>
      <circle r="7" fill="url(#snake-gradient)" opacity="0.85">
        <animateMotion path="M 224 120 L 208 120 L 192 120 L 176 120 L 160 120 L 144 120 L 128 120 L 112 120 L 96 120 L 80 120 L 80 136 L 80 152 L 96 152 L 112 152 L 128 152 L 144 152 L 160 152 L 176 152 L 192 152 L 208 152 L 224 152 L 240 152 L 256 152 L 272 152 L 288 152 L 304 152 L 320 152 L 336 152 L 352 152 L 368 152 L 384 152 L 384 136 L 384 120 L 384 104 L 384 88 L 368 88 L 352 88 L 336 88 L 320 88 L 288 88 L 272 88 L 256 88 L 240 88 L 224 88 L 208 88 L 192 88 L 176 88 L 160 88 L 144 88 L 128 88 L 112 88 L 96 88 L 80 88 L 80 104 L 80 120 Z" dur="16s" repeatCount="indefinite" rotate="auto" begin="0.45s"/>
      </circle>
      <circle r="7" fill="url(#snake-gradient)" opacity="0.8">
        <animateMotion path="M 224 120 L 208 120 L 192 120 L 176 120 L 160 120 L 144 120 L 128 120 L 112 120 L 96 120 L 80 120 L 80 136 L 80 152 L 96 152 L 112 152 L 128 152 L 144 152 L 160 152 L 176 152 L 192 152 L 208 152 L 224 152 L 240 152 L 256 152 L 272 152 L 288 152 L 304 152 L 320 152 L 336 152 L 352 152 L 368 152 L 384 152 L 384 136 L 384 120 L 384 104 L 384 88 L 368 88 L 352 88 L 336 88 L 320 88 L 288 88 L 272 88 L 256 88 L 240 88 L 224 88 L 208 88 L 192 88 L 176 88 L 160 88 L 144 88 L 128 88 L 112 88 L 96 88 L 80 88 L 80 104 L 80 120 Z" dur="16s" repeatCount="indefinite" rotate="auto" begin="0.6s"/>
      </circle>
      <circle r="7" fill="url(#snake-gradient)" opacity="0.75">
        <animateMotion path="M 224 120 L 208 120 L 192 120 L 176 120 L 160 120 L 144 120 L 128 120 L 112 120 L 96 120 L 80 120 L 80 136 L 80 152 L 96 152 L 112 152 L 128 152 L 144 152 L 160 152 L 176 152 L 192 152 L 208 152 L 224 152 L 240 152 L 256 152 L 272 152 L 288 152 L 304 152 L 320 152 L 336 152 L 352 152 L 368 152 L 384 152 L 384 136 L 384 120 L 384 104 L 384 88 L 368 88 L 352 88 L 336 88 L 320 88 L 288 88 L 272 88 L 256 88 L 240 88 L 224 88 L 208 88 L 192 88 L 176 88 L 160 88 L 144 88 L 128 88 L 112 88 L 96 88 L 80 88 L 80 104 L 80 120 Z" dur="16s" repeatCount="indefinite" rotate="auto" begin="0.75s"/>
      </circle>
      <circle r="7" fill="url(#snake-gradient)" opacity="0.7">
        <animateMotion path="M 224 120 L 208 120 L 192 120 L 176 120 L 160 120 L 144 120 L 128 120 L 112 120 L 96 120 L 80 120 L 80 136 L 80 152 L 96 152 L 112 152 L 128 152 L 144 152 L 160 152 L 176 152 L 192 152 L 208 152 L 224 152 L 240 152 L 256 152 L 272 152 L 288 152 L 304 152 L 320 152 L 336 152 L 352 152 L 368 152 L 384 152 L 384 136 L 384 120 L 384 104 L 384 88 L 368 88 L 352 88 L 336 88 L 320 88 L 288 88 L 272 88 L 256 88 L 240 88 L 224 88 L 208 88 L 192 88 L 176 88 L 160 88 L 144 88 L 128 88 L 112 88 L 96 88 L 80 88 L 80 104 L 80 120 Z" dur="16s" repeatCount="indefinite" rotate="auto" begin="0.9s"/>
      </circle>
      <circle r="7" fill="url(#snake-gradient)" opacity="0.65">
        <animateMotion path="M 224 120 L 208 120 L 192 120 L 176 120 L 160 120 L 144 120 L 128 120 L 112 120 L 96 120 L 80 120 L 80 136 L 80 152 L 96 152 L 112 152 L 128 152 L 144 152 L 160 152 L 176 152 L 192 152 L 208 152 L 224 152 L 240 152 L 256 152 L 272 152 L 288 152 L 304 152 L 320 152 L 336 152 L 352 152 L 368 152 L 384 152 L 384 136 L 384 120 L 384 104 L 384 88 L 368 88 L 352 88 L 336 88 L 320 88 L 288 88 L 272 88 L 256 88 L 240 88 L 224 88 L 208 88 L 192 88 L 176 88 L 160 88 L 144 88 L 128 88 L 112 88 L 96 88 L 80 88 L 80 104 L 80 120 Z" dur="16s" repeatCount="indefinite" rotate="auto" begin="1.05s"/>
      </circle>
      <circle r="7" fill="url(#snake-gradient)" opacity="0.6">
        <animateMotion path="M 224 120 L 208 120 L 192 120 L 176 120 L 160 120 L 144 120 L 128 120 L 112 120 L 96 120 L 80 120 L 80 136 L 80 152 L 96 152 L 112 152 L 128 152 L 144 152 L 160 152 L 176 152 L 192 152 L 208 152 L 224 152 L 240 152 L 256 152 L 272 152 L 288 152 L 304 152 L 320 152 L 336 152 L 352 152 L 368 152 L 384 152 L 384 136 L 384 120 L 384 104 L 384 88 L 368 88 L 352 88 L 336 88 L 320 88 L 288 88 L 272 88 L 256 88 L 240 88 L 224 88 L 208 88 L 192 88 L 176 88 L 160 88 L 144 88 L 128 88 L 112 88 L 96 88 L 80 88 L 80 104 L 80 120 Z" dur="16s" repeatCount="indefinite" rotate="auto" begin="1.2s"/>
      </circle>
    </g>

    <!-- Score display -->
    <g font-family="JetBrains Mono, monospace" font-size="11" fill="#8b949e" transform="translate(0, -18)">
      <text x="0" y="0">SCORE:</text>
      <text x="60" y="0" fill="#00d9a5" font-weight="700" class="score-counter">
        <tspan id="score">0</tspan>
        <animate attributeName="opacity" values="1;1" dur="16s" repeatCount="indefinite"/>
      </text>
      <text x="120" y="0">HIGH:</text>
      <text x="175" y="0" fill="#f0883e" font-weight="700">1247</text>
      <text x="250" y="0">LEN:</text>
      <text x="295" y="0" fill="#00d9a5" font-weight="700">12</text>
    </g>
  </g>

  <!-- Side panel with controls -->
  <g transform="translate(570, 60)" font-family="JetBrains Mono, monospace" font-size="11">
    <!-- Title -->
    <text x="0" y="0" fill="#00d9a5" font-weight="600" font-size="12" font-family="Space Grotesk, sans-serif">CONTROLS</text>
    <line x1="0" y1="8" x2="120" y2="8" stroke="#30363d" stroke-width="1"/>

    <!-- Key bindings -->
    <g fill="#e6edf3">
      <text x="0" y="28">▲  W / Up</text>
      <text x="0" y="48">▼  S / Down</text>
      <text x="0" y="68">◄  A / Left</text>
      <text x="0" y="88">►  D / Right</text>
    </g>
    <g fill="#8b949e" font-size="10">
      <text x="85" y="28">Move Up</text>
      <text x="85" y="48">Move Down</text>
      <text x="85" y="68">Move Left</text>
      <text x="85" y="88">Move Right</text>
    </g>

    <line x1="0" y1="104" x2="120" y2="104" stroke="#30363d" stroke-width="1"/>

    <text x="0" y="122" fill="#f0883e" font-weight="600">SPACE</text>
    <text x="50" y="122" fill="#8b949e" font-size="10">Pause/Resume</text>
    <text x="0" y="142" fill="#f0883e" font-weight="600">ESC</text>
    <text x="50" y="142" fill="#8b949e" font-size="10">Quit Game</text>

    <line x1="0" y1="158" x2="120" y2="158" stroke="#30363d" stroke-width="1"/>

    <!-- Play button / link -->
    <a href="https://sujanbhat.dev/snake" target="_blank" rel="noopener noreferrer">
      <g transform="translate(0, 170)">
        <rect x="0" y="0" width="120" height="36" rx="6" fill="#161b22" stroke="#00d9a5" stroke-width="1.5" filter="url(#snake-glow)"/>
        <text x="60" y="22" fill="#00d9a5" font-family="Space Grotesk, sans-serif" font-size="12" font-weight="600" text-anchor="middle">PLAY NOW</text>
        <text x="60" y="22" fill="#00d9a5" font-family="Space Grotesk, sans-serif" font-size="12" font-weight="600" text-anchor="middle" class="press-key">▶</text>
      </g>
    </a>

    <!-- Easter egg hint -->
    <g transform="translate(0, 230)" fill="#30363d" font-size="9">
      <text x="0" y="0"># Konami: ↑↑↓↓←→←→BA</text>
      <text x="0" y="16"># check console...</text>
    </g>
  </g>

  <!-- Bottom status bar -->
  <g font-family="JetBrains Mono, monospace" font-size="11" transform="translate(20, 310)">
    <text x="0" y="0" fill="#8b949e">$</text>
    <text x="16" y="0" fill="#e6edf3"> ./snake.py --demo</text>
    <text x="200" y="0" fill="#8b949e">│</text>
    <text x="216" y="0" fill="#00d9a5">Press [SPACE] to play on sujanbhat.dev</text>
    <text x="580" y="0" fill="#30363d">█ DEMO MODE</text>
  </g>
</svg>

---

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 140" width="720" height="140" class="motion" role="img" aria-label="Terminal shutdown sequence - saving session and closing connections">
  <title>Shutdown Sequence</title>
  <desc>Animated terminal shutdown sequence mirroring the boot header</desc>

  <defs>
    <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
      <feMerge>
        <feMergeNode in="coloredBlur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
  </defs>

  <!-- Background -->
  <rect width="720" height="140" fill="#0d1117"/>

  <!-- Subtle grid pattern -->
  <defs>
    <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
      <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#1f2937" stroke-width="0.5"/>
    </pattern>
  </defs>
  <rect width="720" height="140" fill="url(#grid)" opacity="0.3"/>

  <!-- Terminal chrome -->
  <rect x="20" y="10" width="680" height="120" rx="8" fill="#0d1117" stroke="#30363d" stroke-width="1"/>
  <rect x="20" y="10" width="680" height="32" rx="8" fill="#161b22"/>
  <circle cx="42" cy="26" r="7" fill="#f85149"/>
  <circle cx="64" cy="26" r="7" fill="#f0883e"/>
  <circle cx="86" cy="26" r="7" fill="#3fb950"/>

  <!-- Title bar text -->
  <text x="120" y="32" font-family="JetBrains Mono, monospace" font-size="11" fill="#8b949e">~/github.com/Sujan-Bhat  main </text>

  <!-- Shutdown lines container -->
  <g font-family="JetBrains Mono, monospace" font-size="12" fill="#e6edf3" letter-spacing="0.3px">
    <!-- Line 1 -->
    <g opacity="0" transform="translate(44, 54)">
      <text x="0" y="0" fill="#8b949e">[</text>
      <text x="14" y="0" fill="#3fb950">OK</text>
      <text x="42" y="0" fill="#8b949e">]</text>
      <text x="58" y="0"> Saving session...</text>
      <animate attributeName="opacity" from="0" to="1" begin="0.2s" dur="0.3s" fill="freeze"/>
    </g>

    <!-- Line 2 -->
    <g opacity="0" transform="translate(44, 74)">
      <text x="0" y="0" fill="#8b949e">[</text>
      <text x="14" y="0" fill="#3fb950">OK</text>
      <text x="42" y="0" fill="#8b949e">]</text>
      <text x="58" y="0"> Writing .bash_history...</text>
      <animate attributeName="opacity" from="0" to="1" begin="0.5s" dur="0.3s" fill="freeze"/>
    </g>

    <!-- Line 3 -->
    <g opacity="0" transform="translate(44, 94)">
      <text x="0" y="0" fill="#8b949e">[</text>
      <text x="14" y="0" fill="#3fb950">OK</text>
      <text x="42" y="0" fill="#8b949e">]</text>
      <text x="58" y="0"> Closing connections...</text>
      <animate attributeName="opacity" from="0" to="1" begin="0.8s" dur="0.3s" fill="freeze"/>
    </g>

    <!-- Line 4 - BYE -->
    <g opacity="0" transform="translate(44, 116)">
      <text x="0" y="0" fill="#8b949e">[</text>
      <text x="14" y="0" fill="#00d9a5" font-weight="700">BYE</text>
      <text x="74" y="0" fill="#8b949e">]</text>
      <text x="92" y="0" fill="#00d9a5"> Thanks for visiting!  👋</text>
      <animate attributeName="opacity" from="0" to="1" begin="1.2s" dur="0.4s" fill="freeze"/>
    </g>

    <!-- Line 5 - GitHub link -->
    <g opacity="0" transform="translate(44, 136)">
      <text x="0" y="0" fill="#8b949e">        github.com/Sujan-Bhat</text>
      <animate attributeName="opacity" from="0" to="1" begin="1.5s" dur="0.4s" fill="freeze"/>
    </g>
  </g>

  <!-- Blinking cursor at end -->
  <g opacity="0" transform="translate(44, 156)">
    <text x="0" y="0" fill="#00d9a5">$</text>
    <text x="14" y="0" class="cursor">_</text>
    <animate attributeName="opacity" from="0" to="1" begin="1.8s" dur="0.2s" fill="freeze"/>
  </g>

  <!-- Wave decoration at bottom -->
  <g fill="none" stroke="url(#accent-gradient)" stroke-width="1.5" opacity="0.4" transform="translate(0, 130)">
    <path d="M 20 0 Q 100 10 180 0 T 340 0 T 500 0 T 660 0" />
    <path d="M 20 5 Q 100 -5 180 5 T 340 5 T 500 5 T 660 5" stroke-dasharray="4,2"/>
  </g>

  <defs>
    <linearGradient id="accent-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#00d9a5"/>
      <stop offset="100%" stop-color="#00b88a"/>
    </linearGradient>
  </defs>

  <style><![CDATA[
    .cursor {
      animation: blink 1s step-end infinite;
    }
    @keyframes blink {
      0%, 50% { opacity: 1; }
      51%, 100% { opacity: 0; }
    }
  ]]></style>
</svg>

<p align="center">
  <sub>Last updated: <span id="last-updated"></span></sub>
</p>

<script>
  document.getElementById('last-updated').textContent = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
</script>