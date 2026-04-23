import { colors } from './colors';

export const darkTheme = {
  name: 'dark' as const,
  colors: {
    background: colors.primary,
    surface: colors.homeCard,
    text: colors.textPrimary,
    textSecondary: colors.textSecondary,
    accent: colors.clientPrimary,
    link: colors.yellowVariant10,
    searchBg: colors.searchBackground,
    bottomsheet: colors.bottomsheet,
    statusBar: 'light-content' as const,
    border: colors.grey9,
    placeholder: colors.grey1,
    white: colors.white,
    error: colors.error,
    success: colors.success,
    buttonSecondaryPressed: colors.buttonSecondaryPressed,
  },
  opacity: {
    subHeading: 0.6,
  },
};

// Light theme currently mirrors dark (same values in original codebase)
export const lightTheme = {
  ...darkTheme,
  name: 'light' as const,
};

export type Theme = typeof darkTheme;
