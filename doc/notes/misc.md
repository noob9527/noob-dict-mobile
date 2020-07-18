# noob dict mobile

### todo

### Notes
1. metro 和 @noob9527/noob-dict-core 依赖的一些问题
    1. `yarn add @noob9527/noob-dict-core` doesn't work. Currently, noob-dict-core is packaged to amd format, somehow metro cannot resolve amd module (maybe relates to https://github.com/facebook/metro/issues/225). it throws errors such like 'Error: Unknown named module isomorphic-fetch'. so we use metro's [extranodemodules](https://facebook.github.io/metro/docs/configuration/#extranodemodules) api to add noob-dict-core dependency(use commonjs module).
    1. `yarn link @noob9527/noob-dict-core` doesn't work, cus metro cannot solve symlink.
    1. 由于使用 extranodemodules 来指定依赖, typescript 无法在 node_modules 文件夹找到对应的声明文件。 因此我暂时使用 `yarn link @noob9527/noob-dict-core`. 因为 metro 无法处理 symlink, 因此不会对运行时造成影响，只是用来获取静态类型检查。
    
reference:
- [How to import files from outside of root directory with React Native Metro bundler](https://medium.com/@dushyant_db/how-to-import-files-from-outside-of-root-directory-with-react-native-metro-bundler-18207a348427)
