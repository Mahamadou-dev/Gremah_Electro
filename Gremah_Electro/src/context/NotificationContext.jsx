import React, { createContext, useState, useCallback, useMemo } from 'react';
import Notification from '../components/Shared/Notification'; // Assuming your Notification component is here

// Create the context outside the component
const NotificationContext = createContext();

/**
 * Provides notification state and functions to its children.
 * @param {object} props - Component props.
 * @param {React.ReactNode} props.children - Child components to be rendered within the provider.
 */
export const NotificationProvider = ({ children }) => {
  const [notification, setNotification] = useState(null); // State for the current notification message

  /**
   * Displays a notification with the given message.
   * @param {string} message - The message to display in the notification.
   */
  const showNotification = useCallback((message) => {
    setNotification(message);
  }, []); // Memoize the function

  /**
   * Clears the currently displayed notification.
   */
  const clearNotification = useCallback(() => {
    setNotification(null);
  }, []); // Memoize the function

  // Memoize the context value to prevent unnecessary re-renders of consumers
  const contextValue = useMemo(() => ({
    showNotification,
    // If you need consumers to access the notification message or clear it directly,
    // you might expose 'notification' or 'clearNotification' here too,
    // but typically consumers only need 'showNotification'.
    // showNotification, notification, clearNotification
  }), [showNotification]); // Only re-create if showNotification changes

  return (
    <NotificationContext.Provider value={contextValue}>
      {children}
      {notification && (
        // Render the Notification component if a message exists
        <Notification
          message={notification}
          onClose={clearNotification} // Pass the memoized clear function
        />
      )}
    </NotificationContext.Provider>
  );
};

// Export the context itself so it can be imported by the useNotification hook
export { NotificationContext };