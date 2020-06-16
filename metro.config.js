/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * refer to:
 * https://facebook.github.io/metro/docs/configuration/#extranodemodules
 * https://medium.com/@dushyant_db/how-to-import-files-from-outside-of-root-directory-with-react-native-metro-bundler-18207a348427
 *
 * @format
 */
const path = require('path');
const fs = require('fs');
const _ = require('lodash');

const noob_dict_core_path = path.resolve(__dirname + '/modules/dep/node_modules/@noob9527/noob-dict-core/dist/lib-commonjs');

const extraNodeModules = {
  '@noob9527/noob-dict-core': noob_dict_core_path,
};
const watchFolders = [
  noob_dict_core_path
];

function _resolve_dep_path(name) {
  const target = extraNodeModules;
  const local_modules_path = path.join(process.cwd(), `node_modules/${name}`);
  const dep_module_path = path.join(process.cwd(), 'modules', 'dep', `node_modules/${name}`);
  const stub_modules_path = path.join(process.cwd(), 'modules', 'stub');

  if (name in target) {
    // console.log(name, `using ${target[name]}`)
    return target[name];
  } else if (fs.existsSync(local_modules_path)) {
    // console.log(name, `using ${local_modules_path}`)
    return local_modules_path;
  } else if (fs.existsSync(dep_module_path)) {
    // console.log(name, `using ${dep_module_path}`);
    return dep_module_path;
  } else {
    // console.log(name, `using ${stub_modules_path}`);
    return stub_modules_path;
  }
}

const resolve_dep_path = _.memoize(_resolve_dep_path);

module.exports = {
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: false,
      },
    }),
  },
  resolver: {
    extraNodeModules: new Proxy(extraNodeModules, {
      //redirects dependencies referenced from common/ to local node_modules
      get: (target, name) => {
        return resolve_dep_path(name);
      }
    }),
  },
  watchFolders,
};
