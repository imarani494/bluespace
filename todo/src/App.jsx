import React from "react";
import { LanguageProvider } from "./components/contexts/LanguageContext";
import { ThemeProvider } from "./components/contexts/ThemeContext";
import { AuthProvider } from "./components/contexts/AuthContext";
import { TaskProvider } from "./components/contexts/TaskContext";
import AppRouter from "./components/common/AppRouter";

function App() {
  return (
    <LanguageProvider>
      <ThemeProvider>
        <AuthProvider>
          <TaskProvider>
            <AppRouter />
          </TaskProvider>
        </AuthProvider>
      </ThemeProvider>
    </LanguageProvider>
  );
}

export default App;
