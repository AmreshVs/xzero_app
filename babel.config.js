module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    env: {
      development: {
        plugins: [
          [
            'module-resolver',
            {
              root: ['app'],
            }
          ]
        ]
      },
      production: {
        plugins: [
          [
            'module-resolver',
            {
              root: ['app'],
            }
          ],
          ["transform-remove-console"]
        ]
      }
    }
  };
};