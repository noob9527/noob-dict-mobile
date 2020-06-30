/**
 * https://docs.expo.io/workflow/configuration/#app-config
 * https://docs.expo.io/guides/environment-variables/
 */
import 'dotenv/config';

const extra = Object.keys(process.env)
  .filter(e => e.includes('REACT_NATIVE'))
  .reduce((acc, curr) => ({ ...acc, [curr]: process.env[curr] }), {});

export default {
  name: "Noob Dictionary",
  slug: "noob-dict-mobile",
  icon: "./src/assets/icon/icon@2x.png",
  scheme: "cn.staynoob.dict",
  version: "0.0.1",
  ios: {
    bundleIdentifier: "cn.staynoob.dict",
    buildNumber: "0.0.1"
  },
  android: {
    package: "cn.staynoob.dict",
    versionCode: 1
  },
  extra
};
