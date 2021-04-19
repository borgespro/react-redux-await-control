module.exports = {
  presets: [['@babel/preset-env', { targets: { node: 'current' } }], '@babel/preset-react', '@babel/preset-typescript'],
  plugins: ['@babel/plugin-proposal-export-default-from', '@babel/plugin-proposal-export-namespace-from'],
};
