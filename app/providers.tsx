"use client";

import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import recobeeTheme from "@/lib/theme";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider theme={recobeeTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
