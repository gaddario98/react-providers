import CustomQueryClientProvider from "./CustomQueryClientProvider";
import { HelmetProvider } from "react-helmet-async";
import { PropsWithChildren } from "react";
import { Provider, createStore } from "jotai";
const store = createStore();

const helmetContext = {};
export const AppProviders: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <Provider store={store}>
      <HelmetProvider context={helmetContext}>
        <CustomQueryClientProvider>{children}</CustomQueryClientProvider>
      </HelmetProvider>
    </Provider>
  );
};
