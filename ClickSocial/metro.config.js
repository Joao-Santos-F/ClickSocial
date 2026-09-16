const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Evita que o Metro recarregue a aplicação na web toda vez que o json-server atualiza o db.json
config.resolver.blockList = [
  /db\.json$/,
];

module.exports = config;
