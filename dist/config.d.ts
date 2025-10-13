import { DefaultOptions, OmitKeyof, QueryClient, useMutation, useQueries, useQuery, QueryKey, UseQueryResult } from "@tanstack/react-query";
import { Persister, PersistQueryClientOptions } from "@tanstack/react-query-persist-client";
export declare let asyncStoragePersister: Persister;
export declare const queryClient: QueryClient;
export declare let persistOptions: OmitKeyof<PersistQueryClientOptions, "queryClient">;
export interface CustomQueryClientConfigProps {
    options?: DefaultOptions;
    storagePersister?: Persister;
    customPersistOptions?: OmitKeyof<PersistQueryClientOptions, "queryClient">;
}
export declare const setCustomQueryClientConfig: ({ options, storagePersister, customPersistOptions, }: CustomQueryClientConfigProps) => void;
declare const useInvalidateQueries: () => {
    invalidateQueries: (queryKeys: Array<QueryKey | undefined>) => Promise<void>;
};
export { useMutation, useQueries, useQuery, useInvalidateQueries, type UseQueryResult, };
