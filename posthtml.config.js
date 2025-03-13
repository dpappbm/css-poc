function cssPlugin(tree) {
  const externalClasses = ["ng-", "mat-"];
  const nameGenerator = require("./name-ganerator.js");

  tree.match({ attrs: { class: /\w+/ } }, (node) => {
    const attrs = require("posthtml-attrs-parser")(node.attrs);
    const originalClasses = attrs.class;
    const newClasses = [];
    for (let i = 0; i < originalClasses.length; i++) {
      const originalClass = originalClasses[i];
      if (externalClasses.some((ec) => originalClass.startsWith(ec))) {
        newClasses.push(originalClass);
      } else {
        const newClassName = nameGenerator(originalClass);
        newClasses.push(newClassName);
      }
    }

    attrs.class = newClasses;
    node.attrs = attrs.compose();
    return node;
  });
}

module.exports = ({ file, options, env }) => {
  return {
    plugins: [
      cssPlugin,
      // require('posthtml-css-modules')(
      //   file.dirname.concat('/').concat(file.basename.replace('.html', '.scss.json'))
      // ),
    ],
  };
};
