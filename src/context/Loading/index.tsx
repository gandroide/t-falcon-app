import { createContext, FC, useCallback, useState } from 'react';

interface ILoadingContext {
  isLoading: boolean;
  onLoadingHandler: (isLoading: boolean) => void;
}

const defaultLoadingContext: ILoadingContext = {
  isLoading: false,
  onLoadingHandler: () => {}
};

export const LoadingContext = createContext<ILoadingContext>(
  defaultLoadingContext
);

export const LoadingProvider: FC = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);

  const onLoadingHandler = useCallback<ILoadingContext['onLoadingHandler']>(
    (loading) => {
      if (loading) setIsLoading(loading);
      else {
        setTimeout(() => {
          setIsLoading(loading);
        }, 150);
      }
    },
    []
  );

  return (
    <LoadingContext.Provider value={{ isLoading, onLoadingHandler }}>
      {children}
    </LoadingContext.Provider>
  );
};
