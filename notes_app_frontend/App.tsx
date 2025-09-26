import React from 'react';
import { AppNavigator } from './src/navigation/AppNavigator';
import { NotesProvider } from './src/context/NotesContext';

// PUBLIC_INTERFACE
export default function App() {
  /** Root application entrypoint.
   * Wraps the app with NotesProvider and sets up navigation.
   * Returns the app navigator with drawer and stack.
   */
  return (
    <NotesProvider>
      <AppNavigator />
    </NotesProvider>
  );
}
