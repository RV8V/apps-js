module.exports = {
  env: {
    commonjs: true,
    es6: true,
    node: true
  },
  extends: ["prettier", "airbnb-base"],
  plugins: ["prettier"],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly"
  },
  parserOptions: {
    ecmaVersion: 2018
  },
  rules: {
    "prettier/prettier": "error"
  }
}
