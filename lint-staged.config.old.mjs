export default {
  "packages/server/**/*.ts?(x)": () => [
    //"tsc -p packages/server/tsconfig.json --noEmit",
    "eslint --fix",
    //"prettier --write",
  ],
  "packages/client/**/*.ts?(x)": () => [
    // "tsc -p packages/client/tsconfig.json --noEmit",
    "eslint --fix",
    //"prettier --write",
  ],

  "**/*.js?(x)": () => ["eslint --fix", "prettier --write"],
};
