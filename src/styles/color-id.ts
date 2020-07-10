// names are copy from [Color customization color id changes](https://github.com/microsoft/vscode/wiki/Color-customization-color-id-changes)
enum ColorId {
  heart = 'heart', // none stable

  background = 'background',
  foreground = 'foreground',
  foreground_secondary = 'foreground_secondary',
  foreground_disabled = 'foreground_disabled',

  status_bar_background = 'status_bar_background',

  // word
  word_link = 'word_link',
  word_highlight = 'word_highlight',

  // input
  input_foreground = 'input.foreground',
  input_placeholder = 'input.placeholder',
  input_background = 'input.background',
  input_border = 'input.border',

  // button
  button_background = 'button.background',
  button_hoverBackground = 'button.hoverBackground',
  button_foreground = 'button.foreground',

  // tabs
  tab_border = 'tab.border',
  tab_indicator = 'tab.indicator',
  tab_activeForeground = 'tab.activeForeground',
  tab_inactiveForeground = 'tab.inactiveForeground',

  tab_activeBackground = 'tab.activeBackground',
  tab_inactiveBackground = 'tab.inactiveBackground',

  // dropdown
  dropdown_foreground = 'dropdown.foreground',
  dropdown_background = 'dropdown.background',
  dropdown_border = 'dropdown.border',
}

export default ColorId;
