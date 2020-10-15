module.exports = function (api) {
  api.cache(true);
  const presets = ["@babel/preset-env"];
  const plugins = [
    "@babel/plugin-proposal-optional-chaining",
    "@babel/plugin-proposal-class-properties",
    ["@babel/plugin-proposal-decorators", { decoratorsBeforeExport: true }],
  ];
  return { presets, plugins };
};
