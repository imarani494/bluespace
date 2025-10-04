import React from 'react';
import { AuthProvider, LanguageProvider, ThemeProvider } from './components/contexts';
import AppRouter from './components/common/AppRouter';
import './App.css'; 

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AuthProvider>
          <div className="app-container">
            <AppRouter />
          </div>
        </AuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;