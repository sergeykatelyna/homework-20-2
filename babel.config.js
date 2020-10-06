module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        useBuiltIns: 'usage',
        corejs: { version: 3, proposals: true },
        targets: '> 0.25%, not dead',
      },
    ],
  ],
  plugins: [
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-proposal-private-methods',
  ],
};

/*
Polyfill for DOM:

<script src="https://polyfill.io/v3/polyfill.min.js?features=Element.prototype.after%2CElement.prototype.append%2CElement.prototype.before%2CElement.prototype.prepend%2CElement.prototype.closest%2CElement.prototype.classList%2CElement.prototype.matches%2CElement.prototype.remove"></script>

*/
