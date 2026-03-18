"use client";

import { createTheme, alpha } from "@mui/material/styles";

// ─── RecoBee Brand Tokens ───────────────────────────────────
const amber = {
  50: "#fffbeb",
  100: "#fef3c7",
  200: "#fde68a",
  300: "#fcd34d",
  400: "#fbbf24",
  500: "#f59e0b",
  600: "#d97706",
  700: "#b45309",
  800: "#92400e",
  900: "#78350f",
};

const zinc = {
  50: "#fafafa",
  100: "#f4f4f5",
  200: "#e4e4e7",
  300: "#d4d4d8",
  400: "#a1a1aa",
  500: "#71717a",
  600: "#52525b",
  700: "#3f3f46",
  800: "#27272a",
  900: "#18181b",
  950: "#09090b",
};

// ─── RecoBee MUI Theme ──────────────────────────────────────
const recobeeTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: amber[500],
      light: amber[400],
      dark: amber[700],
      contrastText: "#ffffff",
    },
    secondary: {
      main: zinc[600],
      light: zinc[500],
      dark: zinc[700],
      contrastText: zinc[200],
    },
    error: {
      main: "#ef4444",
      light: "#f87171",
      dark: "#dc2626",
    },
    warning: {
      main: amber[500],
      light: amber[400],
      dark: amber[600],
    },
    info: {
      main: "#3b82f6",
      light: "#60a5fa",
      dark: "#2563eb",
    },
    success: {
      main: "#22c55e",
      light: "#4ade80",
      dark: "#16a34a",
    },
    background: {
      default: zinc[950],
      paper: zinc[900],
    },
    text: {
      primary: "#ffffff",
      secondary: zinc[400],
      disabled: zinc[600],
    },
    divider: alpha("#ffffff", 0.06),
    action: {
      hover: alpha("#ffffff", 0.04),
      selected: alpha(amber[500], 0.15),
      focus: alpha(amber[500], 0.2),
      disabled: alpha("#ffffff", 0.2),
      disabledBackground: alpha("#ffffff", 0.08),
    },
  },

  typography: {
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
    // RecoBee type scale
    h1: { fontSize: "30px", lineHeight: "36px", fontWeight: 700 },
    h2: { fontSize: "24px", lineHeight: "32px", fontWeight: 700 },
    h3: { fontSize: "20px", lineHeight: "28px", fontWeight: 600 },
    h4: { fontSize: "16px", lineHeight: "24px", fontWeight: 600 },
    h5: { fontSize: "15px", lineHeight: "22px", fontWeight: 600 },
    h6: { fontSize: "13px", lineHeight: "20px", fontWeight: 600 },
    body1: { fontSize: "13px", lineHeight: "20px" },
    body2: { fontSize: "12px", lineHeight: "18px" },
    caption: { fontSize: "11px", lineHeight: "16px" },
    button: { fontSize: "13px", lineHeight: "20px", fontWeight: 500, textTransform: "none" as const },
    overline: { fontSize: "11px", lineHeight: "16px", fontWeight: 500, letterSpacing: "0.1em" },
  },

  shape: {
    borderRadius: 12, // default for buttons, inputs
  },

  spacing: 4, // 4px base grid

  components: {
    // ─── Global defaults ───
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: zinc[950],
          color: "#fafafa",
          "&::-webkit-scrollbar": { width: 6 },
          "&::-webkit-scrollbar-track": { background: "transparent" },
          "&::-webkit-scrollbar-thumb": { background: zinc[700], borderRadius: 3 },
          "&::-webkit-scrollbar-thumb:hover": { background: zinc[600] },
          "::selection": { background: alpha(amber[500], 0.2) },
        },
      },
    },

    // ─── Button ───
    MuiButton: {
      defaultProps: {
        disableElevation: true,
        disableRipple: false,
      },
      styleOverrides: {
        root: {
          borderRadius: 12,
          textTransform: "none" as const,
          fontWeight: 500,
          transition: "all 300ms ease",
          "&:active": { transform: "scale(0.97)" },
        },
        containedPrimary: {
          background: `linear-gradient(135deg, ${amber[400]}, ${amber[600]})`,
          "&:hover": {
            background: `linear-gradient(135deg, ${amber[300]}, ${amber[500]})`,
            boxShadow: `0 0 24px -6px ${alpha(amber[500], 0.3)}`,
          },
        },
        containedSecondary: {
          backgroundColor: zinc[800],
          color: zinc[200],
          border: `1px solid ${alpha("#ffffff", 0.06)}`,
          "&:hover": {
            backgroundColor: zinc[700],
            color: "#ffffff",
            borderColor: alpha("#ffffff", 0.1),
          },
        },
        outlined: {
          borderColor: alpha("#ffffff", 0.06),
          color: zinc[400],
          "&:hover": {
            borderColor: alpha("#ffffff", 0.14),
            backgroundColor: alpha("#ffffff", 0.04),
            color: zinc[200],
          },
        },
        text: {
          color: zinc[400],
          "&:hover": {
            backgroundColor: alpha("#ffffff", 0.04),
            color: zinc[200],
          },
        },
        sizeSmall: { padding: "6px 12px", fontSize: "12px" },
        sizeMedium: { padding: "8px 16px", fontSize: "13px" },
        sizeLarge: { padding: "10px 20px", fontSize: "15px" },
      },
    },

    // ─── Chip (Badge / FilterChip) ───
    MuiChip: {
      defaultProps: { size: "small" },
      styleOverrides: {
        root: {
          borderRadius: 9999,
          fontWeight: 500,
          fontSize: "11px",
          height: "auto",
          transition: "all 300ms ease",
          "&:active": { transform: "scale(0.96)" },
        },
        sizeSmall: { padding: "2px 0", fontSize: "10px" },
        sizeMedium: { padding: "3px 2px", fontSize: "11px" },
        filled: {
          backgroundColor: alpha(zinc[800], 0.4),
          color: zinc[400],
          "&:hover": {
            backgroundColor: alpha(zinc[800], 0.7),
            color: zinc[300],
          },
        },
        outlined: {
          borderColor: "transparent",
          backgroundColor: alpha(zinc[800], 0.4),
          color: zinc[400],
          "&:hover": {
            backgroundColor: alpha(zinc[800], 0.7),
            borderColor: "transparent",
          },
        },
        colorPrimary: {
          backgroundColor: alpha(amber[500], 0.15),
          color: amber[300],
          border: `1px solid ${alpha(amber[500], 0.2)}`,
        },
      },
    },

    // ─── TextField / Input ───
    MuiTextField: {
      defaultProps: {
        variant: "outlined",
        size: "small",
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 9999,
          backgroundColor: alpha(zinc[900], 0.6),
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: alpha("#ffffff", 0.06),
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: alpha("#ffffff", 0.14),
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: alpha(amber[500], 0.3),
            borderWidth: 1,
          },
        },
        input: {
          fontSize: "13px",
          padding: "8px 16px",
          "&::placeholder": { color: zinc[600], opacity: 1 },
        },
      },
    },

    // ─── Card ───
    MuiCard: {
      defaultProps: { variant: "outlined" },
      styleOverrides: {
        root: {
          backgroundColor: alpha(zinc[900], 0.4),
          backdropFilter: "blur(8px)",
          borderRadius: 16,
          border: `1px solid ${alpha("#ffffff", 0.06)}`,
          transition: "all 300ms ease",
          "&:hover": {
            borderColor: alpha("#ffffff", 0.14),
            backgroundColor: alpha(zinc[900], 0.7),
            boxShadow: "0 12px 48px -12px rgba(0,0,0,0.6)",
            transform: "translateY(-2px)",
          },
        },
      },
    },

    // ─── Paper ───
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
          backgroundColor: alpha(zinc[900], 0.4),
          backdropFilter: "blur(8px)",
          border: `1px solid ${alpha("#ffffff", 0.06)}`,
        },
      },
    },

    // ─── Tooltip ───
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: zinc[800],
          color: zinc[200],
          fontSize: "12px",
          fontWeight: 500,
          borderRadius: 8,
          border: `1px solid ${alpha("#ffffff", 0.06)}`,
          boxShadow: "0 10px 30px -5px rgba(0,0,0,0.5)",
        },
      },
    },

    // ─── Breadcrumbs ───
    MuiBreadcrumbs: {
      styleOverrides: {
        root: { fontSize: "13px" },
        separator: { color: zinc[600] },
      },
    },

    // ─── Avatar ───
    MuiAvatar: {
      styleOverrides: {
        root: {
          fontWeight: 700,
          background: `linear-gradient(135deg, ${amber[400]}, ${amber[600]})`,
        },
      },
    },

    // ─── Dialog ───
    MuiDialog: {
      styleOverrides: {
        paper: {
          backgroundColor: zinc[900],
          border: `1px solid ${alpha("#ffffff", 0.06)}`,
          borderRadius: 16,
          backgroundImage: "none",
        },
      },
    },

    // ─── Menu / Dropdown ───
    MuiMenu: {
      styleOverrides: {
        paper: {
          backgroundColor: zinc[900],
          border: `1px solid ${alpha("#ffffff", 0.06)}`,
          borderRadius: 12,
          backgroundImage: "none",
          boxShadow: "0 12px 48px -12px rgba(0,0,0,0.6)",
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          fontSize: "13px",
          borderRadius: 8,
          margin: "2px 4px",
          "&:hover": { backgroundColor: alpha("#ffffff", 0.04) },
          "&.Mui-selected": {
            backgroundColor: alpha(amber[500], 0.15),
            color: amber[300],
            "&:hover": { backgroundColor: alpha(amber[500], 0.2) },
          },
        },
      },
    },

    // ─── Switch ───
    MuiSwitch: {
      styleOverrides: {
        switchBase: {
          "&.Mui-checked": { color: amber[500] },
          "&.Mui-checked + .MuiSwitch-track": {
            backgroundColor: alpha(amber[500], 0.4),
          },
        },
        track: { backgroundColor: zinc[700] },
      },
    },

    // ─── Tabs ───
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: "none" as const,
          fontWeight: 500,
          fontSize: "13px",
          minHeight: 40,
          color: zinc[500],
          "&.Mui-selected": { color: amber[300] },
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        indicator: { backgroundColor: amber[500], height: 2 },
      },
    },

    // ─── Alert ───
    MuiAlert: {
      styleOverrides: {
        root: { borderRadius: 12, fontSize: "13px" },
        standardError: {
          backgroundColor: alpha("#ef4444", 0.15),
          color: "#fca5a5",
          border: `1px solid ${alpha("#ef4444", 0.2)}`,
        },
        standardSuccess: {
          backgroundColor: alpha("#22c55e", 0.15),
          color: "#86efac",
          border: `1px solid ${alpha("#22c55e", 0.2)}`,
        },
        standardWarning: {
          backgroundColor: alpha(amber[500], 0.15),
          color: amber[300],
          border: `1px solid ${alpha(amber[500], 0.2)}`,
        },
        standardInfo: {
          backgroundColor: alpha("#3b82f6", 0.15),
          color: "#93c5fd",
          border: `1px solid ${alpha("#3b82f6", 0.2)}`,
        },
      },
    },

    // ─── Table ───
    MuiTableContainer: {
      styleOverrides: {
        root: {
          backgroundColor: "transparent",
          borderRadius: 16,
          border: `1px solid ${alpha("#ffffff", 0.06)}`,
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          backgroundColor: alpha(zinc[900], 0.6),
          "& .MuiTableCell-head": {
            color: zinc[400],
            fontSize: "11px",
            fontWeight: 600,
            textTransform: "uppercase" as const,
            letterSpacing: "0.05em",
            borderBottom: `1px solid ${alpha("#ffffff", 0.06)}`,
            padding: "12px 16px",
          },
        },
      },
    },
    MuiTableBody: {
      styleOverrides: {
        root: {
          "& .MuiTableRow-root": {
            transition: "background-color 200ms",
            "&:hover": { backgroundColor: alpha("#ffffff", 0.02) },
          },
          "& .MuiTableCell-body": {
            color: zinc[300],
            fontSize: "13px",
            borderBottom: `1px solid ${alpha("#ffffff", 0.04)}`,
            padding: "10px 16px",
          },
        },
      },
    },
    MuiTablePagination: {
      styleOverrides: {
        root: { color: zinc[400], fontSize: "13px" },
        selectIcon: { color: zinc[500] },
      },
    },

    // ─── Skeleton (loading) ───
    MuiSkeleton: {
      styleOverrides: {
        root: {
          backgroundColor: alpha(zinc[800], 0.5),
        },
      },
    },

    // ─── Badge ───
    MuiBadge: {
      styleOverrides: {
        badge: { fontWeight: 600, fontSize: "10px" },
      },
    },

    // ─── LinearProgress ───
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          backgroundColor: alpha(zinc[800], 0.5),
          borderRadius: 4,
        },
        bar: {
          background: `linear-gradient(90deg, ${amber[400]}, ${amber[600]})`,
          borderRadius: 4,
        },
      },
    },
  },
});

export default recobeeTheme;
