import { useContext } from 'react';
import { LoadingContext } from '../context/loadingContext'; // Import the context from its new file

/**
 * Custom hook to consume the LoadingContext.
 * @returns {object} An object containing `startLoading`, `stopLoading`, and `isLoading` functions/state.
 * @throws {Error} If used outside of a LoadingProvider.
 */
export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (context === undefined) {
    throw new Error('useLoading must be used within a LoadingProvider');
  }
  return context;
};