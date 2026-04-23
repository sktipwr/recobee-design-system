export const fontFamily = {
  regular: 'DM Sans, sans-serif',
  medium: 'DM Sans, sans-serif',
  bold: 'DM Sans, sans-serif',
} as const;

export const fontWeight = {
  regular: '400' as const,
  medium: '500' as const,
  bold: '700' as const,
};

export const fontSize = {
  xs: 10,
  sm: 12,
  md: 14,
  lg: 16,
  xl: 24,
} as const;

export const textStyles = {
  // Body styles (DM Sans Regular)
  bodySmall: { fontSize: fontSize.xs, fontFamily: fontFamily.regular, fontWeight: fontWeight.regular },
  bodyMedium: { fontSize: fontSize.sm, fontFamily: fontFamily.regular, fontWeight: fontWeight.regular },
  bodyLarge: { fontSize: fontSize.md, fontFamily: fontFamily.regular, fontWeight: fontWeight.regular },
  bodyXL: { fontSize: fontSize.lg, fontFamily: fontFamily.regular, fontWeight: fontWeight.regular },
  bodyXXL: { fontSize: fontSize.xl, fontFamily: fontFamily.regular, fontWeight: fontWeight.regular },

  // Header styles (DM Sans Bold)
  headerSmall: { fontSize: fontSize.xs, fontFamily: fontFamily.bold, fontWeight: fontWeight.bold },
  headerMedium: { fontSize: fontSize.sm, fontFamily: fontFamily.bold, fontWeight: fontWeight.bold },
  headerLarge: { fontSize: fontSize.md, fontFamily: fontFamily.bold, fontWeight: fontWeight.bold },
  header: { fontSize: fontSize.lg, fontFamily: fontFamily.bold, fontWeight: fontWeight.bold },

  // Link styles (DM Sans Bold + clientPrimary color)
  headerMediumLink: { fontSize: fontSize.sm, fontFamily: fontFamily.bold, fontWeight: fontWeight.bold },
  headerSmallLink: { fontSize: fontSize.xs, fontFamily: fontFamily.bold, fontWeight: fontWeight.bold },
} as const;

export type TextStyleToken = keyof typeof textStyles;
