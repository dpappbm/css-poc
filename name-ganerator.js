const genericNames = require("generic-names");

const nameGenerator = function (name) {
  return genericNames("[hash:base64:5]")(name, "");
};

module.exports = nameGenerator;
