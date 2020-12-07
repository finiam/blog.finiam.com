module.exports = {
  mount: {
    _output: "/",
    src: "/_dist_",
  },
  plugins: [
    "@snowpack/plugin-postcss",
    ["@snowpack/plugin-run-script", { cmd: "eleventy", watch: "$1 --watch" }],
  ],
  devOptions: {
    open: "none",
    hmrDelay: 500,
  },
  experiments: {
    optimize: {
      bundle: true,
      minify: true,
      target: "es2017",
    },
  },
};
