const config = {
  content: [
    '../../packages/ui/**/*.{html,js,ts,jsx,tsx,svelte}',
    './**/*.{html,js,ts,jsx,tsx,svelte}',
    './src/**/*.{html,js,ts,jsx,tsx,svelte}'
  ],
  theme: {
    extend: {
      height: {
        screen: ['100vh', '100dvh'],
      },
      width: {
        screen: ['100vw', '100dvw'],
      },
      fontFamily: {
        'body': ['"PT Mono"', 'monospace'],
      }
    },
  }
};

export default config;
