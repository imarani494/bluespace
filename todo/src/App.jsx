import React, { useState, useEffect, createContext, useContext } from "react";
import { supabase } from "./components/services/supabase";

// Create contexts
const AuthContext = createContext();
const LanguageContext = createContext();
const ThemeContext = createContext();

// Custom hooks
const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};

const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context)
    throw new Error("useLanguage must be used within LanguageProvider");
  return context;
};

const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within ThemeProvider");
  return context;
};

// Loading Spinner Component
const LoadingSpinner = ({ size = "medium", className = "" }) => {
  const sizeClass = {
    small: "w-4 h-4 border-2",
    medium: "w-8 h-8 border-3",
    large: "w-12 h-12 border-4"
  }[size];

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div
        className={`${sizeClass} border-gray-300 border-t-primary rounded-full animate-spin`}
        style={{
          borderTopColor: "var(--primary)",
          borderRightColor: "transparent",
          borderBottomColor: "transparent",
          borderLeftColor: "transparent"
        }}
      ></div>
    </div>
  );
};

// Auth Provider Component
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getSession = async () => {
      try {
        const {
          data: { session }
        } = await supabase.auth.getSession();
        setUser(session?.user ?? null);
      } catch (error) {
        console.error("Auth error:", error);
      } finally {
        setLoading(false);
      }
    };

    getSession();

    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (email, password) => {
    const { data, error } = await supabase.auth.signUp({ email, password });
    return { data, error };
  };

  const signIn = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    return { data, error };
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    return { error };
  };

  const value = {
    user,
    signUp,
    signIn,
    signOut,
    loading
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Language Provider Component
const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem("todo-language") || "en";
  });

  useEffect(() => {
    localStorage.setItem("todo-language", language);
  }, [language]);

  const translations = {
    en: {
      auth: {
        signIn: "Sign In",
        signUp: "Sign Up",
        email: "Email Address",
        password: "Password",
        logout: "Logout",
        welcomeBack: "Welcome Back",
        createAccount: "Create Account"
      },
      tasks: {
        title: "Tasks",
        addTask: "Add Task",
        titlePlaceholder: "What needs to be done?",
        notesPlaceholder: "Add notes...",
        edit: "Edit",
        delete: "Delete",
        save: "Save",
        cancel: "Cancel",
        markComplete: "Mark Complete",
        markIncomplete: "Mark Incomplete",
        confirmDelete: "Are you sure you want to delete this task?"
      },
      status: {
        all: "All",
        pending: "Pending",
        completed: "Completed"
      },
      ui: {
        loading: "Loading...",
        noTasks: "No tasks yet",
        addFirstTask: "Add your first task to get started!",
        searchPlaceholder: "Search tasks...",
        noResults: "No tasks found",
        tryDifferent: "Try different search terms"
      }
    },
    hi: {
      auth: {
        signIn: "साइन इन करें",
        signUp: "साइन अप करें",
        email: "ईमेल पता",
        password: "पासवर्ड",
        logout: "लॉगआउट",
        welcomeBack: "वापसी पर स्वागत है",
        createAccount: "खाता बनाएं"
      },
      tasks: {
        title: "कार्य",
        addTask: "कार्य जोड़ें",
        titlePlaceholder: "क्या करना है?",
        notesPlaceholder: "नोट्स जोड़ें...",
        edit: "संपादित करें",
        delete: "हटाएं",
        save: "सहेजें",
        cancel: "रद्द करें",
        markComplete: "पूर्ण चिह्नित करें",
        markIncomplete: "अपूर्ण चिह्नित करें",
        confirmDelete: "क्या आप वाकई इस कार्य को हटाना चाहते हैं?"
      },
      status: {
        all: "सभी",
        pending: "लंबित",
        completed: "पूर्ण"
      },
      ui: {
        loading: "लोड हो रहा है...",
        noTasks: "अभी तक कोई कार्य नहीं",
        addFirstTask: "शुरू करने के लिए अपना पहला कार्य जोड़ें!",
        searchPlaceholder: "कार्य खोजें...",
        noResults: "कोई कार्य नहीं मिला",
        tryDifferent: "अलग खोज शब्द आज़माएं"
      }
    }
  };

  const t = (key) => {
    const keys = key.split(".");
    let value = translations[language];
    for (const k of keys) {
      value = value?.[k];
    }
    return value || key;
  };

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "en" ? "hi" : "en"));
  };

  const value = {
    language,
    setLanguage,
    t,
    toggleLanguage
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

// Theme Provider Component
const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("todo-theme") || "light";
  });

  useEffect(() => {
    localStorage.setItem("todo-theme", theme);
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const value = {
    theme,
    toggleTheme,
    isDark: theme === "dark"
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

// Auth Form Component
const AuthForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { signIn, signUp } = useAuth();
  const { t, toggleLanguage, language } = useLanguage();
  const { toggleTheme, isDark } = useTheme();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const { error } = isSignUp
        ? await signUp(email, password)
        : await signIn(email, password);

      if (error) throw error;
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-background">
        <div className="auth-card">
          <div className="auth-header">
            <div className="app-logo">
              <div className="logo-icon">✓</div>
              <h1>TodoApp</h1>
            </div>
            <p className="auth-subtitle">
              {isSignUp ? t("auth.createAccount") : t("auth.welcomeBack")}
            </p>
          </div>

          {error && <div className="error-message">{error}</div>}

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="input-group">
              <input
                type="email"
                placeholder={t("auth.email")}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
                className="input-field"
              />
            </div>

            <div className="input-group">
              <input
                type="password"
                placeholder={t("auth.password")}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                disabled={loading}
                className="input-field"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary btn-large"
            >
              {loading ? (
                <LoadingSpinner size="small" />
              ) : isSignUp ? (
                t("auth.signUp")
              ) : (
                t("auth.signIn")
              )}
            </button>
          </form>

          <div className="auth-footer">
            <button
              onClick={() => setIsSignUp(!isSignUp)}
              className="btn btn-link"
              disabled={loading}
            >
              {isSignUp
                ? "Already have an account? Sign In"
                : "Don't have an account? Sign Up"}
            </button>
          </div>

          <div className="auth-controls">
            <button onClick={toggleLanguage} className="btn btn-ghost">
              {language === "en" ? "हिंदी" : "English"}
            </button>
            <button onClick={toggleTheme} className="btn btn-ghost">
              {isDark ? "☀️ Light" : "🌙 Dark"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Task Form Component
const TaskForm = ({ onTaskAdded }) => {
  const [title, setTitle] = useState("");
  const [notes, setNotes] = useState("");
  const [showNotes, setShowNotes] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { user } = useAuth();
  const { t } = useLanguage();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !user) {
      setError("Please enter a task title");
      return;
    }

    setLoading(true);
    setError("");
    try {
      const { data, error: supabaseError } = await supabase
        .from("tasks")
        .insert([
          {
            title: title.trim(),
            notes: notes.trim(),
            user_id: user.id,
            status: "pending",
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          }
        ])
        .select();

      if (supabaseError) throw supabaseError;

      console.log("Task added successfully:", data);
      setTitle("");
      setNotes("");
      setShowNotes(false);
      if (onTaskAdded) onTaskAdded();
    } catch (err) {
      console.error("Error adding task:", err);
      setError(err.message || "Failed to add task");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="task-form">
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <input
            type="text"
            placeholder={t("tasks.titlePlaceholder")}
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              setError("");
            }}
            onFocus={() => setShowNotes(true)}
            disabled={loading}
            className="task-input"
          />
          <button
            type="submit"
            disabled={!title.trim() || loading}
            className="btn btn-primary add-btn"
          >
            {loading ? <LoadingSpinner size="small" /> : t("tasks.addTask")}
          </button>
        </div>

        {error && (
          <div className="error-message" style={{ marginTop: "0.5rem" }}>
            {error}
          </div>
        )}

        {showNotes && (
          <div className="form-expanded">
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder={t("tasks.notesPlaceholder")}
              className="task-textarea"
              rows="3"
              disabled={loading}
            />
            <div className="form-actions">
              <button
                type="button"
                onClick={() => {
                  setShowNotes(false);
                  setError("");
                }}
                className="btn btn-secondary"
                disabled={loading}
              >
                {t("tasks.cancel")}
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

// Task Item Component
const TaskItem = ({ task, onTaskUpdated, onTaskDeleted }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editNotes, setEditNotes] = useState(task.notes || "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { t } = useLanguage();

  const handleToggleComplete = async () => {
    setLoading(true);
    setError("");
    try {
      const newStatus = task.status === "completed" ? "pending" : "completed";
      const { error: supabaseError } = await supabase
        .from("tasks")
        .update({
          status: newStatus,
          updated_at: new Date().toISOString()
        })
        .eq("id", task.id);

      if (supabaseError) throw supabaseError;
      console.log("Task status updated:", newStatus);
      if (onTaskUpdated) onTaskUpdated();
    } catch (err) {
      console.error("Error updating task:", err);
      setError(err.message || "Failed to update task");
    } finally {
      setLoading(false);
    }
  };

  const handleSaveEdit = async () => {
    if (!editTitle.trim()) {
      setError("Task title cannot be empty");
      return;
    }

    setLoading(true);
    setError("");
    try {
      const { error: supabaseError } = await supabase
        .from("tasks")
        .update({
          title: editTitle.trim(),
          notes: editNotes.trim(),
          updated_at: new Date().toISOString()
        })
        .eq("id", task.id);

      if (supabaseError) throw supabaseError;
      console.log("Task updated successfully");
      setIsEditing(false);
      if (onTaskUpdated) onTaskUpdated();
    } catch (err) {
      console.error("Error updating task:", err);
      setError(err.message || "Failed to update task");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm(t("tasks.confirmDelete"))) return;

    setLoading(true);
    setError("");
    try {
      const { error: supabaseError } = await supabase
        .from("tasks")
        .delete()
        .eq("id", task.id);

      if (supabaseError) throw supabaseError;
      console.log("Task deleted successfully");
      if (onTaskDeleted) onTaskDeleted();
    } catch (err) {
      console.error("Error deleting task:", err);
      setError(err.message || "Failed to delete task");
    } finally {
      setLoading(false);
    }
  };

  if (isEditing) {
    return (
      <div className="task-item editing">
        <div className="edit-form">
          <input
            type="text"
            value={editTitle}
            onChange={(e) => {
              setEditTitle(e.target.value);
              setError("");
            }}
            className="edit-input"
            disabled={loading}
            placeholder={t("tasks.titlePlaceholder")}
          />
          <textarea
            value={editNotes}
            onChange={(e) => setEditNotes(e.target.value)}
            placeholder={t("tasks.notesPlaceholder")}
            className="edit-textarea"
            disabled={loading}
          />
          {error && (
            <div className="error-message" style={{ marginBottom: "0.5rem" }}>
              {error}
            </div>
          )}
          <div className="edit-actions">
            <button
              onClick={() => {
                setIsEditing(false);
                setError("");
                setEditTitle(task.title);
                setEditNotes(task.notes || "");
              }}
              className="btn btn-secondary"
              disabled={loading}
            >
              {t("tasks.cancel")}
            </button>
            <button
              onClick={handleSaveEdit}
              className="btn btn-primary"
              disabled={!editTitle.trim() || loading}
            >
              {loading ? <LoadingSpinner size="small" /> : t("tasks.save")}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`task-item ${task.status === "completed" ? "completed" : ""}`}
    >
      <div className="task-main">
        <button
          className="status-toggle"
          onClick={handleToggleComplete}
          disabled={loading}
          title={
            task.status === "completed"
              ? t("tasks.markIncomplete")
              : t("tasks.markComplete")
          }
        >
          {loading ? (
            <LoadingSpinner size="small" />
          ) : task.status === "completed" ? (
            "✓"
          ) : (
            "○"
          )}
        </button>

        <div className="task-content">
          <h3
            className="task-title"
            onClick={handleToggleComplete}
            style={{ cursor: "pointer" }}
          >
            {task.title}
          </h3>
          {task.notes && <p className="task-notes">{task.notes}</p>}
          <div className="task-meta">
            <span className="task-date">
              Created: {new Date(task.created_at).toLocaleDateString()}
            </span>
            {task.updated_at !== task.created_at && (
              <span className="task-updated">
                • Updated: {new Date(task.updated_at).toLocaleDateString()}
              </span>
            )}
          </div>
          {error && (
            <div className="error-message" style={{ marginTop: "0.5rem" }}>
              {error}
            </div>
          )}
        </div>

        <div className="task-actions">
          <button
            onClick={() => setIsEditing(true)}
            className="btn btn-icon"
            disabled={loading}
            title={t("tasks.edit")}
          >
            {t("tasks.edit")}
          </button>
          <button
            onClick={handleDelete}
            className="btn btn-icon delete"
            disabled={loading}
            title={t("tasks.delete")}
          >
            {loading ? <LoadingSpinner size="small" /> : t("tasks.delete")}
          </button>
        </div>
      </div>
    </div>
  );
};

// Task List Component
const TaskList = ({ tasks, loading, searchTerm, onTasksUpdate }) => {
  const { t } = useLanguage();

  const filteredTasks = tasks.filter(
    (task) =>
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (task.notes &&
        task.notes.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleTaskUpdated = () => {
    if (onTasksUpdate) onTasksUpdate();
  };

  const handleTaskDeleted = () => {
    if (onTasksUpdate) onTasksUpdate();
  };

  if (loading) {
    return (
      <div className="loading-container" style={{ padding: "3rem" }}>
        <LoadingSpinner size="large" />
        <p style={{ marginTop: "1rem", color: "var(--text-secondary)" }}>
          {t("ui.loading")}
        </p>
      </div>
    );
  }

  if (filteredTasks.length === 0) {
    return (
      <div className="empty-state">
        <div className="text-6xl mb-4">📝</div>
        <h3>{searchTerm ? t("ui.noResults") : t("ui.noTasks")}</h3>
        <p>{searchTerm ? t("ui.tryDifferent") : t("ui.addFirstTask")}</p>
      </div>
    );
  }

  return (
    <div className="task-list">
      <div className="task-list-header">
        Showing {filteredTasks.length} of {tasks.length} tasks
        {searchTerm && ` for "${searchTerm}"`}
      </div>
      {filteredTasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onTaskUpdated={handleTaskUpdated}
          onTaskDeleted={handleTaskDeleted}
        />
      ))}
    </div>
  );
};

// Dashboard Component
const Dashboard = ({ stats }) => {
  const { t } = useLanguage();

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <p>Overview of your productivity</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon total">📊</div>
          <div className="stat-content">
            <h3>{stats.total}</h3>
            <p>{t("tasks.title")}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon completed">✅</div>
          <div className="stat-content">
            <h3>{stats.completed}</h3>
            <p>{t("status.completed")}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon pending">⏳</div>
          <div className="stat-content">
            <h3>{stats.pending}</h3>
            <p>{t("status.pending")}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon rate">📈</div>
          <div className="stat-content">
            <h3>{stats.completionRate}%</h3>
            <p>Completion Rate</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Header Component
const Header = ({ activeView, setActiveView, searchTerm, setSearchTerm }) => {
  const { user, signOut } = useAuth();
  const { t, toggleLanguage, language } = useLanguage();
  const { toggleTheme, isDark } = useTheme();

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <header className="header">
      <div className="header-content">
        <div className="header-brand">
          <h1>TodoApp</h1>
        </div>

        <div className="header-actions">
          {activeView === "tasks" && (
            <div className="search-box">
              <input
                type="text"
                placeholder={t("ui.searchPlaceholder")}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>
          )}

          <div className="nav-tabs">
            <button
              className={`nav-tab ${activeView === "tasks" ? "active" : ""}`}
              onClick={() => setActiveView("tasks")}
            >
              {t("tasks.title")}
            </button>
            <button
              className={`nav-tab ${
                activeView === "dashboard" ? "active" : ""
              }`}
              onClick={() => setActiveView("dashboard")}
            >
              Dashboard
            </button>
          </div>

          <button onClick={toggleLanguage} className="btn btn-ghost">
            {language === "en" ? "हिंदी" : "English"}
          </button>

          <button onClick={toggleTheme} className="btn btn-ghost">
            {isDark ? "☀️" : "🌙"}
          </button>

          <div className="user-menu">
            <span className="user-email">{user?.email}</span>
            <button onClick={handleSignOut} className="btn btn-secondary">
              {t("auth.logout")}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

// Main Todo App Component
const TodoApp = () => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeView, setActiveView] = useState("tasks");
  const [searchTerm, setSearchTerm] = useState("");

  const fetchTasks = async () => {
    if (!user) {
      setTasks([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      console.log("Fetching tasks for user:", user.id);
      const { data, error } = await supabase
        .from("tasks")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) throw error;
      console.log("Tasks fetched:", data?.length || 0);
      setTasks(data || []);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      setTasks([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchTasks();
    } else {
      setTasks([]);
      setLoading(false);
    }
  }, [user]);

  const stats = {
    total: tasks.length,
    completed: tasks.filter((t) => t.status === "completed").length,
    pending: tasks.filter((t) => t.status === "pending").length,
    completionRate:
      tasks.length > 0
        ? Math.round(
            (tasks.filter((t) => t.status === "completed").length /
              tasks.length) *
              100
          )
        : 0
  };

  return (
    <div className="todo-app">
      <Header
        activeView={activeView}
        setActiveView={setActiveView}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      <main className="main-content">
        <div className="container">
          {activeView === "dashboard" ? (
            <Dashboard stats={stats} />
          ) : (
            <>
              <TaskForm onTaskAdded={fetchTasks} />
              <TaskList
                tasks={tasks}
                loading={loading}
                searchTerm={searchTerm}
                onTasksUpdate={fetchTasks}
              />
            </>
          )}
        </div>
      </main>
    </div>
  );
};

// Main App Component
function App() {
  const [user, setUser] = useState(null);
  const [appLoading, setAppLoading] = useState(true);

  useEffect(() => {
    const getSession = async () => {
      try {
        const {
          data: { session }
        } = await supabase.auth.getSession();
        setUser(session?.user ?? null);
      } catch (error) {
        console.error("Error getting session:", error);
      } finally {
        setAppLoading(false);
      }
    };

    getSession();

    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setAppLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (appLoading) {
    return (
      <div className="loading-container">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  return (
    <ThemeProvider>
      <LanguageProvider>
        <AuthProvider>{user ? <TodoApp /> : <AuthForm />}</AuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
