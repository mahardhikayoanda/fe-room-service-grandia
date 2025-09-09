"use client";

import { StyledEngineProvider } from "@mui/material/styles";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import ReactQueryProvider from "@/libs/react-query/providers";
import { ReduxProvider } from "@/libs/store/ReduxProvider";

const Providers = ({ children }: Readonly<{ children: React.ReactNode }>) => (
  <>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <StyledEngineProvider injectFirst>
        <ReactQueryProvider>
          <ReduxProvider>{children}</ReduxProvider>
        </ReactQueryProvider>
      </StyledEngineProvider>
    </LocalizationProvider>
  </>
);

export default Providers;
