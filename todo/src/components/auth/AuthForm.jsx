import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useLanguage } from "../contexts/LanguageContext";
import { useTheme } from "../contexts/ThemeContext";

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { signUp, signIn } = useAuth();
  const { t, language, toggleLanguage } = useLanguage();
  const { isDark, toggleTheme } = useTheme();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (isLogin) {
        await signIn(formData.email, formData.password);
      } else {
        if (formData.password !== formData.confirmPassword) {
          setError(
            language === "en"
              ? "Passwords do not match"
              : "पासवर्ड मेल नहीं खाते"
          );
          setLoading(false);
          return;
        }
        await signUp(formData.email, formData.password);
        setIsLogin(true);
        setFormData({ email: "", password: "", confirmPassword: "" });
        setError(
          language === "en"
            ? "Account created! Please login."
            : "खाता बन गया! कृपया लॉगिन करें।"
        );
      }
    } catch (error) {
      setError(
        error.message ||
          (language === "en"
            ? "An error occurred. Please try again."
            : "एक त्रुटि हुई। कृपया पुनः प्रयास करें।")
      );
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
    if (error) setError("");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-100/40 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900/90 transition-all duration-500 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-32 w-72 h-72 bg-gradient-to-br from-blue-500/10 to-purple-600/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute -bottom-40 -left-32 w-72 h-72 bg-gradient-to-br from-emerald-400/10 to-cyan-500/10 rounded-full blur-3xl animate-float-delayed"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-br from-orange-400/5 to-rose-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="absolute top-6 right-6 flex space-x-3 z-50">
        <button
          onClick={toggleLanguage}
          className="group relative flex items-center space-x-2 px-4 py-3 bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border border-white/40 dark:border-slate-700/50 text-slate-700 dark:text-slate-200 rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-2xl shadow-lg"
          title={language === "en" ? "Switch to Hindi" : "Switch to English"}
        >
          <div className="flex items-center space-x-2">
            <span className="text-lg transform transition-transform duration-300 group-hover:rotate-12">
              🌐
            </span>
            <span className="text-sm font-semibold bg-gradient-to-r from-slate-700 to-slate-900 dark:from-slate-200 dark:to-slate-400 bg-clip-text text-transparent">
              {language === "en" ? "EN" : "HI"}
            </span>
          </div>

          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
        </button>

        <button
          onClick={toggleTheme}
          className="group relative flex items-center space-x-2 px-4 py-3 bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border border-white/40 dark:border-slate-700/50 text-slate-700 dark:text-slate-200 rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-2xl shadow-lg"
          title={isDark ? "Switch to light mode" : "Switch to dark mode"}
        >
          <div className="flex items-center space-x-2">
            {isDark ? (
              <span className="text-lg transform transition-transform duration-300 group-hover:rotate-45 group-hover:scale-110">
                ☀️
              </span>
            ) : (
              <span className="text-lg transform transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110">
                🌙
              </span>
            )}
            <span className="text-sm font-semibold bg-gradient-to-r from-slate-700 to-slate-900 dark:from-slate-200 dark:to-slate-400 bg-clip-text text-transparent">
              {isDark ? "Light" : "Dark"}
            </span>
          </div>

          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-amber-500/10 to-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
        </button>
      </div>

      <div className="max-w-sm w-full space-y-6 relative z-10">
        <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/40 dark:border-slate-700/50 p-8 transform transition-all duration-500 hover:shadow-3xl">
          <div className="text-center mb-6">
            <div className="relative mx-auto mb-4">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl blur-md opacity-75 animate-pulse-slow"></div>
              <div className="relative w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl mx-auto transform hover:scale-105 transition-transform duration-300 group">
                <svg
                  className="h-8 w-8 text-white transform group-hover:scale-110 transition-transform duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>

            <h2 className="text-2xl font-bold bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 dark:from-white dark:via-slate-200 dark:to-white bg-clip-text text-transparent mb-2 tracking-tight">
              {isLogin ? t("auth.login") : t("auth.signup")}
            </h2>

            <p className="text-slate-600 dark:text-slate-400 font-medium text-sm leading-relaxed">
              {isLogin
                ? language === "en"
                  ? "Welcome back to your productivity hub"
                  : "अपने उत्पादकता केंद्र में वापस स्वागत है"
                : language === "en"
                ? "Create your account to get started"
                : "शुरू करने के लिए अपना खाता बनाएं"}
            </p>

            <div className="mt-4 p-3 bg-slate-50/80 dark:bg-slate-700/50 backdrop-blur-sm rounded-2xl border border-slate-200/60 dark:border-slate-600/60 transform transition-all duration-300 hover:scale-105">
              <p className="text-xs text-slate-600 dark:text-slate-400">
                {isLogin ? t("auth.noAccount") : t("auth.haveAccount")}{" "}
                <button
                  type="button"
                  onClick={() => {
                    setIsLogin(!isLogin);
                    setError("");
                    setFormData({
                      email: "",
                      password: "",
                      confirmPassword: ""
                    });
                  }}
                  className="font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent hover:from-blue-700 hover:to-purple-700 transition-all duration-200 hover:underline"
                >
                  {isLogin ? t("auth.signup") : t("auth.login")}
                </button>
              </p>
            </div>
          </div>

          {error && (
            <div className="mb-4 bg-red-50/90 dark:bg-red-900/20 backdrop-blur-sm border border-red-200/80 dark:border-red-800/50 rounded-2xl p-3 transform transition-all duration-300 animate-shake">
              <div className="flex items-center space-x-2">
                <div className="flex-shrink-0 w-5 h-5 bg-red-100 dark:bg-red-800 rounded-full flex items-center justify-center">
                  <svg
                    className="w-3 h-3 text-red-600 dark:text-red-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </div>
                <span className="text-red-800 dark:text-red-200 text-xs font-medium">
                  {error}
                </span>
              </div>
            </div>
          )}

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div className="group">
                <label
                  htmlFor="email"
                  className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2 transition-all duration-300 group-focus-within:text-blue-600 dark:group-focus-within:text-blue-400"
                >
                  {t("auth.email")}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none transition-colors duration-300 group-focus-within:text-blue-500">
                    <svg
                      className="h-4 w-4 text-slate-400 group-focus-within:text-blue-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="block w-full pl-10 pr-3 py-3 border border-slate-300/80 dark:border-slate-600/80 placeholder-slate-500 dark:placeholder-slate-400 text-slate-900 dark:text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/25 focus:border-blue-500/50 bg-white/80 dark:bg-slate-700/80 backdrop-blur-sm transition-all duration-300 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:border-slate-400/80 dark:hover:border-slate-500/80"
                    placeholder={
                      language === "en"
                        ? "Enter your email"
                        : "अपना ईमेल दर्ज करें"
                    }
                    value={formData.email}
                    onChange={handleChange}
                    disabled={loading}
                  />
                </div>
              </div>

              <div className="group">
                <label
                  htmlFor="password"
                  className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2 transition-all duration-300 group-focus-within:text-blue-600 dark:group-focus-within:text-blue-400"
                >
                  {t("auth.password")}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none transition-colors duration-300 group-focus-within:text-blue-500">
                    <svg
                      className="h-4 w-4 text-slate-400 group-focus-within:text-blue-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                  </div>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete={isLogin ? "current-password" : "new-password"}
                    required
                    className="block w-full pl-10 pr-3 py-3 border border-slate-300/80 dark:border-slate-600/80 placeholder-slate-500 dark:placeholder-slate-400 text-slate-900 dark:text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/25 focus:border-blue-500/50 bg-white/80 dark:bg-slate-700/80 backdrop-blur-sm transition-all duration-300 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:border-slate-400/80 dark:hover:border-slate-500/80"
                    placeholder={
                      language === "en"
                        ? "Enter your password"
                        : "अपना पासवर्ड दर्ज करें"
                    }
                    value={formData.password}
                    onChange={handleChange}
                    disabled={loading}
                    minLength={6}
                  />
                </div>
              </div>

              {!isLogin && (
                <div className="group">
                  <label
                    htmlFor="confirmPassword"
                    className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2 transition-all duration-300 group-focus-within:text-blue-600 dark:group-focus-within:text-blue-400"
                  >
                    {t("auth.confirmPassword")}
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none transition-colors duration-300 group-focus-within:text-blue-500">
                      <svg
                        className="h-4 w-4 text-slate-400 group-focus-within:text-blue-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                        />
                      </svg>
                    </div>
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      autoComplete="new-password"
                      required
                      className="block w-full pl-10 pr-3 py-3 border border-slate-300/80 dark:border-slate-600/80 placeholder-slate-500 dark:placeholder-slate-400 text-slate-900 dark:text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/25 focus:border-blue-500/50 bg-white/80 dark:bg-slate-700/80 backdrop-blur-sm transition-all duration-300 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:border-slate-400/80 dark:hover:border-slate-500/80"
                      placeholder={
                        language === "en"
                          ? "Confirm your password"
                          : "अपना पासवर्ड पुष्टि करें"
                      }
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      disabled={loading}
                      minLength={6}
                    />
                  </div>
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center items-center py-3 px-4 border border-transparent text-sm font-bold rounded-xl text-white bg-gradient-to-r from-blue-600 via-blue-500 to-purple-600 hover:from-blue-700 hover:via-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-[1.02] active:scale-[0.98] overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>

              {loading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span className="text-white font-semibold text-sm">
                    {language === "en"
                      ? "Processing..."
                      : "प्रोसेस हो रहा है..."}
                  </span>
                </div>
              ) : isLogin ? (
                <div className="flex items-center space-x-1 transform group-hover:translate-x-1 transition-transform duration-200">
                  <span className="text-white font-semibold text-sm">
                    {t("auth.login")}
                  </span>
                  <svg
                    className="h-4 w-4 text-white transform group-hover:scale-110 transition-transform duration-200"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </div>
              ) : (
                <div className="flex items-center space-x-1 transform group-hover:translate-x-1 transition-transform duration-200">
                  <span className="text-white font-semibold text-sm">
                    {t("auth.signup")}
                  </span>
                  <svg
                    className="h-4 w-4 text-white transform group-hover:scale-110 transition-transform duration-200"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                </div>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
