import { storage } from "@gaddario98/react-state";
import { createAsyncStoragePersister } from "@tanstack/query-async-storage-persister";
import {
  DefaultOptions,
  OmitKeyof,
  QueryClient,
  useMutation,
  useQueries,
  useQuery,
  useQueryClient,
  QueryKey,
  UseQueryResult,
} from "@tanstack/react-query";
import {
  Persister,
  PersistQueryClientOptions,
} from "@tanstack/react-query-persist-client";
import { useCallback } from "react";

export let asyncStoragePersister = createAsyncStoragePersister({
  storage: storage,
});

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
   //   gcTime: 1000 * 60 * 60 * 24, // 24 hours
    },
  },
});

export let persistOptions: OmitKeyof<PersistQueryClientOptions, "queryClient"> =
  {
    persister: asyncStoragePersister,
    maxAge: 1000 * 60 * 60 * 24,
    buster: "persister-v1",
  };

export interface CustomQueryClientConfigProps {
  options?: DefaultOptions;
  storagePersister?: Persister;
  customPersistOptions?: OmitKeyof<PersistQueryClientOptions, "queryClient">;
}

export const setCustomQueryClientConfig = ({
  options,
  storagePersister,
  customPersistOptions,
}: CustomQueryClientConfigProps) => {
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
  const queryClient = useQueryClient();
  const invalidateQueries = useCallback(
    async (queryKeys: Array<QueryKey | undefined>) => {
      await Promise.all(
        queryKeys.map(async (queryKey) => {
          if (queryKey) {
            await queryClient.invalidateQueries({ queryKey, exact: false });
          }
        })
      );
    },
    [queryClient]
  );

  return { invalidateQueries };
};

export {
  useMutation,
  useQueries,
  useQuery,
  useInvalidateQueries,
  type UseQueryResult,
};
