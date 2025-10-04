import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useLanguage } from "../contexts/LanguageContext";
import { useTheme } from "../contexts/ThemeContext";

const AuthForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { signIn, signUp } = useAuth();
  const { t, toggleLanguage, language } = useLanguage();
  const { theme, toggleTheme, isDark } = useTheme();

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
    
      <div
        className="theme-toggle"
        style={{ position: "absolute", top: "20px", right: "20px" }}
      >
        <button className="theme-btn" onClick={toggleLanguage}>
          {language === "en" ? "हिंदी" : "English"}
        </button>
        <button
          className={`theme-btn ${theme === "light" ? "active" : ""}`}
          onClick={() => setTheme("light")}
        >
          ☀️
        </button>
        <button
          className={`theme-btn ${theme === "dark" ? "active" : ""}`}
          onClick={() => setTheme("dark")}
        >
          🌙
        </button>
      </div>

      <div className="auth-card card-glass fade-in">
      
        <div className="auth-header">
          <div className="auth-logo">✓</div>
          <h1 className="auth-title">
            {isSignUp ? t("auth.createAccount") : t("auth.welcomeBack")}
          </h1>
          <p className="auth-subtitle">
            {isSignUp
              ? "Create your account to get started"
              : "Sign in to your account to continue"}
          </p>
        </div>

       
        <form onSubmit={handleSubmit}>
          {error && (
            <div
              style={{
                backgroundColor: "var(--error)",
                color: "white",
                padding: "12px",
                borderRadius: "8px",
                marginBottom: "16px",
                fontSize: "14px"
              }}
            >
              {error}
            </div>
          )}

          <div className="input-group">
            <label className="input-label">{t("auth.email")}</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
              placeholder="you@example.com"
              className="input-field"
            />
          </div>

          <div className="input-group">
            <label className="input-label">{t("auth.password")}</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              disabled={loading}
              placeholder="••••••••"
              className="input-field"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary"
            style={{ width: "100%", marginBottom: "16px" }}
          >
            {loading
              ? "Loading..."
              : isSignUp
              ? t("auth.signUp")
              : t("auth.signIn")}
          </button>

          <div style={{ textAlign: "center" }}>
            <button
              type="button"
              onClick={() => setIsSignUp(!isSignUp)}
              className="btn btn-ghost"
              disabled={loading}
            >
              {isSignUp ? t("auth.hasAccount") : t("auth.noAccount")}{" "}
              <span style={{ color: "var(--accent-primary)" }}>
                {isSignUp ? t("auth.signIn") : t("auth.signUp")}
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AuthForm;
