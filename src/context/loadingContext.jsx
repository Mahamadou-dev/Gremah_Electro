/*import React, { createContext, useState, useMemo, useCallback } from 'react';
import Loader from '../components/Shared/Loader.jsx'; // Assuming your Loader component is here

// Create the context outside the component
const LoadingContext = createContext();

/**
 * Provides loading state and functions to its children.
 * @param {object} props - Component props.
 * @param {React.ReactNode} props.children - Child components to be rendered within the provider.
 *//*
export const LoadingProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false); // State to manage the loading status

  /**
   * Sets the loading state to true.
   * Memoized to ensure stable reference.
   *//*
  const startLoading = useCallback(() => {
    setIsLoading(true);
  }, []); // No dependencies, so stable across renders

  /**
   * Sets the loading state to false.
   * Memoized to ensure stable reference.
   *//*
  const stopLoading = useCallback(() => {
    setIsLoading(false);
  }, []); // No dependencies, so stable across renders

  // Memoize the context value object itself to prevent unnecessary re-renders of consumers
  const contextValue = useMemo(() => ({
    startLoading,
    stopLoading,
    isLoading // You might want to expose isLoading itself if consumers need to check the state
  }), [startLoading, stopLoading, isLoading]); // Include isLoading as dependency if exposed

  return (
    <LoadingContext.Provider value={contextValue}>
      {children}
      {/* Conditionally render the Loader component if isLoading is true *//*}
      {isLoading && <Loader />}
    </LoadingContext.Provider>
  );
};

// Export the context itself for use in the custom hook
export { LoadingContext };*/