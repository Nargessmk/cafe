module.exports = {
    content: ['./*.html'],
    theme: {
      fontFamily: {
        'IRANSansX': ['IRANSansX']
      },
      extend: {},
    },
    plugins: [require('daisyui')],
    daisyui: {
      styled: true,
      themes: true,
      base: true,
      utils: true,
      logs: true,
      rtl: true,
      prefix: "",
      darkTheme: 'dark',
    },
    corePlugins: {
      preflight: false,
    },
    darkMode: 'class',
  }