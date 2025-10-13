import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { PropsWithChildren } from "react";
import { persistOptions, queryClient } from "./config";

const CustomQueryClientProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={persistOptions}
    >
      {children}
    </PersistQueryClientProvider>
  );
};

export default CustomQueryClientProvider;
