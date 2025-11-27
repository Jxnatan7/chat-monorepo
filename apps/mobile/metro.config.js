const path = require("path");
const { getDefaultConfig } = require("expo/metro-config");

const projectRoot = __dirname;
const workspaceRoot = path.resolve(projectRoot, "../../");

const config = getDefaultConfig(projectRoot);

config.watchFolders = [workspaceRoot];

config.resolver = {
  ...config.resolver,
  blockList: [/.*\/apps\/backend\/.*/],
  extraNodeModules: new Proxy(
    {},
    {
      get: (_, name) => path.join(projectRoot, "node_modules", name),
    }
  ),
};

config.resolver.resolveRequest = (context, moduleName, platform) => {
  if (moduleName === "zustand" || moduleName.startsWith("zustand/")) {
    return {
      type: "sourceFile",
      filePath: require.resolve(moduleName),
    };
  }

  return context.resolveRequest(context, moduleName, platform);
};

module.exports = config;
