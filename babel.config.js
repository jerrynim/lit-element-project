module.exports = function (api) {
  api.cache(true);
  const presets = ["@babel/preset-env"];
  const plugins = [
    "@babel/plugin-proposal-optional-chaining",
    ["@babel/plugin-proposal-decorators", { legacy: true }],
  ];
  return { presets, plugins };
};
