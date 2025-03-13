function cssPlugin(tree) {
  console.log("running css plugin", JSON.stringify(tree));
  const externalClasses = ["ng-", "mat-"];
  const nameGenerator = require("./name-ganerator.js");

  tree.match({ attrs: { class: /\w+/ } }, (node) => {
    console.log("inside tree match", node);
    const attrs = require("posthtml-attrs-parser")(node.attrs);
    console.log("attributes", attrs);
    const originalClasses = attrs.class;
    console.log("classes", originalClasses);
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

    console.log("new classes", newClasses);

    attrs.class = newClasses;
    node.attrs = attrs.compose();

    console.warn("after", node);

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
