const postcssModules = require("postcss-modules");
const path = require("path");
const AngularWebpackPlugin = require("@ngtools/webpack");
const nameGenerator = require("./name-ganerator.js");

module.exports = (config, options) => {
  /*  SCSS EXTEND */

  RegExp.prototype.toJSON = RegExp.prototype.toString;
  const uses = config.module.rules
    .find((x) => x.test.toString().includes("scss"))
    .rules.find((x) => "oneOf" in x)
    .oneOf.map((x) => x.use);

  for (let i = 0; i < uses.length; i++) {
    const loader = uses[i].find((x) => x.loader.includes("postcss-loader"));
    if (loader) {
      const optionsFn = loader.options.postcssOptions;
      const newOptionsFn = function () {
        let opts = optionsFn.apply(this, arguments);
        opts.plugins.splice(
          opts.plugins.length - 1,
          0,
          postcssModules({
            generateScopedName: function (name, filename, css) {
              console.log("he?", name, filename, css);
              return nameGenerator(name);
            },
            // getJSON: function (cssFileName, json, outputFileName) {
            //   console.log("processing", cssFileName);
            // },
          })
        );
        return opts;
      };
      loader.options.postcssOptions = newOptionsFn;
    }
  }

  const html = config.module.rules.find((x) =>
    x.test.toString().includes("html")
  );
  // html.use = [
  //   { loader: 'raw-loader' },
  //   {
  //     loader: 'posthtml-loader',
  //     options: {
  //       config: {
  //         path: './',
  //         ctx: {
  //           include: { ...options },
  //           content: { ...options },
  //         },
  //       },
  //     },
  //   },
  // ];

  // /*  HTML EXTEND */
  // config.module.rules.unshift({
  //   test: /\.html$/,
  //   use: [
  //     { loader: 'raw-loader' },
  //     {
  //       loader: 'posthtml-loader',
  //       options: {
  //         config: {
  //           path: './',
  //           ctx: {
  //             include: { ...options },
  //             content: { ...options },
  //           },
  //         },
  //       },
  //     },
  //   ],
  // });

  config.module.rules.unshift({
    test: /\.html$/,
    exclude: ["/node_modules/", "/src/assets/"],
    use: [
      // { loader: 'raw-loader' },
      {
        loader: "posthtml-loader",
        options: {
          config: {
            path: "./",
            ctx: {
              include: { ...options },
              content: { ...options },
            },
          },
        },
      },
    ],
  });

  const plugin = config.plugins.find(
    (p) => p instanceof AngularWebpackPlugin.AngularWebpackPlugin
  );
  plugin.pluginOptions.directTemplateLoading = false;

  return config;
};
