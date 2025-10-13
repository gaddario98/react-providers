import { jsx } from 'react/jsx-runtime';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import { c } from 'react/compiler-runtime';
import { storage } from '@gaddario98/react-state';
import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister';
import { QueryClient, useQueryClient } from '@tanstack/react-query';
export { useMutation, useQueries, useQuery } from '@tanstack/react-query';
import 'react';
import { HelmetProvider } from 'react-helmet-async';
import { createStore, Provider } from 'jotai';

let asyncStoragePersister = createAsyncStoragePersister({
  storage: storage
});
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      //   gcTime: 1000 * 60 * 60 * 24, // 24 hours
    }
  }
});
let persistOptions = {
  persister: asyncStoragePersister,
  maxAge: 1000 * 60 * 60 * 24,
  buster: "persister-v1"
};
const setCustomQueryClientConfig = ({
  options,
  storagePersister,
  customPersistOptions
}) => {
  if (options) {
    queryClient.setDefaultOptions(options);
  }
  if (storagePersister) {
    asyncStoragePersister = storagePersister;
  }
  if (customPersistOptions) {
    persistOptions = customPersistOptions;
  }
};
const useInvalidateQueries = () => {
  const $ = c(4);
  const queryClient = useQueryClient();
  let t0;
  if ($[0] !== queryClient) {
    t0 = async queryKeys => {
      await Promise.all(queryKeys.map(async queryKey => {
        if (queryKey) {
          await queryClient.invalidateQueries({
            queryKey,
            exact: false
          });
        }
      }));
    };
    $[0] = queryClient;
    $[1] = t0;
  } else {
    t0 = $[1];
  }
  const invalidateQueries = t0;
  let t1;
  if ($[2] !== invalidateQueries) {
    t1 = {
      invalidateQueries
    };
    $[2] = invalidateQueries;
    $[3] = t1;
  } else {
    t1 = $[3];
  }
  return t1;
};

const CustomQueryClientProvider = ({
  children
}) => {
  return jsx(PersistQueryClientProvider, {
    client: queryClient,
    persistOptions: persistOptions,
    children: children
  });
};

const store = createStore();
const AppProviders = ({
  children
}) => {
  return jsx(Provider, {
    store: store,
    children: jsx(HelmetProvider, {
      children: jsx(CustomQueryClientProvider, {
        children: children
      })
    })
  });
};

export { AppProviders, asyncStoragePersister, persistOptions, queryClient, setCustomQueryClientConfig, useInvalidateQueries };
//# sourceMappingURL=index.mjs.map
