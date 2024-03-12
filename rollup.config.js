import babel from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import json from "@rollup/plugin-json";
import * as fs from "fs";
import path from "path";
import excludeDependenciesFromBundle from "rollup-plugin-exclude-dependencies-from-bundle";

const PACKAGE_NAME = process.cwd();
const pkg = JSON.parse(
  fs.readFileSync(path.join(PACKAGE_NAME, "package.json"), "utf-8"),
);

const commonjsOptions = {
  ignoreGlobal: true,
  include: /node_modules/,
};
const extensions = [".js", ".ts", ".tsx"];

const babelOptions = {
  exclude: /node_modules/,
  extensions,
  configFile: "../../.babelrc.json",
  babelHelpers: "runtime",
};
const nodeOptions = {
  extensions,
};
const typescriptOptions = {
  tsconfig: `${PACKAGE_NAME}/tsconfig.json`,
  include: ["@types/global.d.ts", "./@types/i18next.d.ts"],
};

export default [
  {
    input: pkg.source,
    external: [
      ...Object.keys(pkg.peerDependencies ?? {}),
      "react",
      "react-dom",
      "@stylexjs/stylex",
      "@babel/runtime",
    ],
    output: [
      {
        dir: "dist/cjs/",
        format: "cjs",
        preserveModules: true,
      },
      {
        dir: "dist/esm/",
        format: "es",
        preserveModules: true,
      },
    ],
    watch: {
      clearScreen: false,
    },
    plugins: [
      excludeDependenciesFromBundle({
        peerDependencies: true,
        dependencies: true,
      }),
      nodeResolve(nodeOptions),
      typescript(typescriptOptions),
      commonjs(commonjsOptions),
      babel(babelOptions),
      json(),
    ],
  },
];
