"use client";

import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import ReactQueryProvider from "@/libs/react-query/providers";
import { ReduxProvider } from "@/libs/store/ReduxProvider";

const Providers = ({ children }: Readonly<{ children: React.ReactNode }>) => (
  <>
    <AppRouterCacheProvider options={{ enableCssLayer: true }}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <ReactQueryProvider>
          <ReduxProvider>{children}</ReduxProvider>
        </ReactQueryProvider>
      </LocalizationProvider>
    </AppRouterCacheProvider>
  </>
);

export default Providers;
