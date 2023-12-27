"use client";
import React from "react";
import { SnackbarProvider } from "notistack";

const SnackProvider = ({ children }) => {
  return (
    <SnackbarProvider
      autoHideDuration={1500}
      preventDuplicate
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
    >
      {children}
    </SnackbarProvider>
  );
};

export default SnackProvider;
