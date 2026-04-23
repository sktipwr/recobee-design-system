import { addons } from 'storybook/manager-api';
import { themes } from 'storybook/theming';

addons.setConfig({
  theme: {
    ...themes.dark,
    brandTitle: 'RecoBee Design System',
    brandUrl: '/',
    appBg: '#121212',
    appContentBg: '#1A1A1A',
    appBorderColor: '#333333',
    barBg: '#1E1E1E',
    colorPrimary: '#E9C638',
    colorSecondary: '#E9C638',
    textColor: '#F5F5F5',
    textInverseColor: '#121212',
    barTextColor: '#BDBDBD',
    barSelectedColor: '#E9C638',
    inputBg: '#272727',
    inputBorder: '#424242',
    inputTextColor: '#F5F5F5',
  },
});
