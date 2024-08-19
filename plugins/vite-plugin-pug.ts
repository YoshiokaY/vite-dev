import { vitePluginPugBuild } from "./vite-plugin-pug-build";
import { vitePluginPugServe } from "./vite-plugin-pug-serve";

const vitePluginPug = (minify: boolean = true) => {
  return [vitePluginPugBuild(minify), vitePluginPugServe()];
};
export default vitePluginPug;
