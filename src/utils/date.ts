import moment from 'moment';

export {
  string2date,
};

// new Date(str) produce weird date bug at react native runtime
// https://github.com/expo/expo/issues/782
// https://github.com/facebook/react-native/issues/15819
function string2date(str: string): Date {
  return moment(str).toDate();
}
