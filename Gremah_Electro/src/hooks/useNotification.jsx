import { useContext } from 'react';
import { NotificationContext } from '../context/NotificationContext'; // Import the context from its new file

/**
 * Custom hook to consume the NotificationContext.
 * @returns {object} An object containing the `showNotification` function.
 * @throws {Error} If used outside of a NotificationProvider.
 */
export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};