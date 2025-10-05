import React, { useState, useEffect } from "react";
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
  const [showLoader, setShowLoader] = useState(false);
  const [loaderProgress, setLoaderProgress] = useState(0);

  const { signUp, signIn } = useAuth();
  const { t, language, toggleLanguage } = useLanguage();
  const { isDark, toggleTheme } = useTheme();

  useEffect(() => {
    let progressInterval;

    if (showLoader) {
      const duration = 3000;
      const interval = 50;
      const steps = duration / interval;
      const increment = 100 / steps;

      progressInterval = setInterval(() => {
        setLoaderProgress((prev) => {
          if (prev >= 100) {
            clearInterval(progressInterval);
            return 100;
          }
          return prev + increment;
        });
      }, interval);

      const timer = setTimeout(() => {
        setShowLoader(false);
        setLoaderProgress(0);
        clearInterval(progressInterval);
      }, duration);

      return () => {
        clearTimeout(timer);
        clearInterval(progressInterval);
      };
    }
  }, [showLoader]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (isLogin) {
      setShowLoader(true);
      setLoading(true);

      setTimeout(async () => {
        try {
          await signIn(formData.email, formData.password);
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
      }, 3000);
    } else {
      setLoading(true);
      try {
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
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
    if (error) setError("");
  };

  if (showLoader) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-100/40 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900/90 transition-all duration-500 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-32 w-80 h-80 bg-gradient-to-br from-blue-500/10 to-purple-600/10 rounded-full blur-3xl animate-float"></div>
          <div className="absolute -bottom-40 -left-32 w-80 h-80 bg-gradient-to-br from-emerald-400/10 to-cyan-500/10 rounded-full blur-3xl animate-float-delayed"></div>
        </div>

        <div className="max-w-md w-full space-y-8 relative z-10">
          <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/40 dark:border-slate-700/50 p-12 text-center">
            <div className="relative mx-auto mb-8">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl blur-md opacity-75 animate-pulse"></div>
              <div className="relative w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl mx-auto">
                <svg
                  className="h-12 w-12 text-white"
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

            <h3 className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 dark:from-white dark:to-slate-300 bg-clip-text text-transparent mb-4">
              {language === "en" ? "Welcome Back!" : "वापसी पर स्वागत है!"}
            </h3>

            <p className="text-slate-600 dark:text-slate-400 mb-8 text-lg">
              {language === "en"
                ? "Getting everything ready for you..."
                : "आपके लिए सब कुछ तैयार कर रहे हैं..."}
            </p>

            <div className="mb-8">
              <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-3 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full transition-all duration-300 ease-out"
                  style={{ width: `${loaderProgress}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-sm text-slate-500 dark:text-slate-400 mt-2">
                <span>{language === "en" ? "Loading" : "लोड हो रहा है"}</span>
                <span>{Math.round(loaderProgress)}%</span>
              </div>
            </div>

            <div className="flex justify-center space-x-2">
              {[0, 1, 2].map((index) => (
                <div
                  key={index}
                  className="w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full animate-bounce"
                  style={{ animationDelay: `${index * 0.1}s` }}
                ></div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-slate-50/80 dark:bg-slate-700/50 rounded-2xl">
              <p className="text-sm text-slate-600 dark:text-slate-400">
                {language === "en"
                  ? "This will only take a moment..."
                  : "यह केवल एक पल लेगा..."}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-100/40 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900/90 py-12 px-4 sm:px-6 lg:px-8 transition-all duration-500 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-32 w-80 h-80 bg-gradient-to-br from-blue-500/10 to-purple-600/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute -bottom-40 -left-32 w-80 h-80 bg-gradient-to-br from-emerald-400/10 to-cyan-500/10 rounded-full blur-3xl animate-float-delayed"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-orange-400/5 to-rose-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="absolute top-8 right-8 flex space-x-3 z-50">
        <button
          onClick={toggleLanguage}
          className="group relative flex items-center space-x-2 px-4 py-3 bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border border-white/40 dark:border-slate-700/50 text-slate-700 dark:text-slate-200 rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-2xl shadow-lg"
          title={language === "en" ? "Switch to Hindi" : "Switch to English"}
        >
          <div className="flex items-center space-x-2">
            <span className="text-lg">🌐</span>
            <span className="text-sm font-semibold bg-gradient-to-r from-slate-700 to-slate-900 dark:from-slate-200 dark:to-slate-400 bg-clip-text text-transparent">
              {language === "en" ? "EN" : "HI"}
            </span>
          </div>
        </button>

        <button
          onClick={toggleTheme}
          className="flex items-center space-x-2 px-4 py-2 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 rounded-lg transition-all duration-200 font-medium text-sm border border-slate-200 dark:border-slate-600 shadow-sm hover:shadow-md"
          title={
            isDark
              ? language === "en"
                ? "Switch to light mode"
                : "लाइट मोड में बदलें"
              : language === "en"
              ? "Switch to dark mode"
              : "डार्क मोड में बदलें"
          }
        >
          {isDark ? (
            <span className="text-base">☀️</span>
          ) : (
            <span className="text-base">🌙</span>
          )}
          <span className="hidden sm:inline">
            {isDark
              ? language === "en"
                ? "Light"
                : "लाइट"
              : language === "en"
              ? "Dark"
              : "डार्क"}
          </span>
        </button>
      </div>

      <div className="max-w-md w-full space-y-8 relative z-10">
        <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/40 dark:border-slate-700/50 p-8 transform transition-all duration-500 hover:shadow-3xl">
          <div className="text-center mb-8">
            <div className="relative mx-auto mb-6">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl blur-md opacity-75 animate-pulse-slow"></div>
              <div className="relative w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl transform hover:scale-105 transition-transform duration-300 group">
                <svg
                  className="h-10 w-10 text-white transform group-hover:scale-110 transition-transform duration-300"
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

            <h2 className="text-3xl font-bold bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 dark:from-white dark:via-slate-200 dark:to-white bg-clip-text text-transparent mb-3 tracking-tight">
              {isLogin ? t("auth.login") : t("auth.signup")}
            </h2>

            <p className="text-slate-600 dark:text-slate-400 font-medium text-lg leading-relaxed">
              {isLogin
                ? language === "en"
                  ? "Welcome back to your productivity hub"
                  : "अपने उत्पादकता केंद्र में वापस स्वागत है"
                : language === "en"
                ? "Create your account to get started"
                : "शुरू करने के लिए अपना खाता बनाएं"}
            </p>

            <div className="mt-6 p-4 bg-slate-50/80 dark:bg-slate-700/50 backdrop-blur-sm rounded-2xl border border-slate-200/60 dark:border-slate-600/60">
              <p className="text-sm text-slate-600 dark:text-slate-400">
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
            <div className="mb-6 bg-red-50/90 dark:bg-red-900/20 backdrop-blur-sm border border-red-200/80 dark:border-red-800/50 rounded-2xl p-4 transform transition-all duration-300 animate-shake">
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0 w-6 h-6 bg-red-100 dark:bg-red-800 rounded-full flex items-center justify-center">
                  <svg
                    className="w-4 h-4 text-red-600 dark:text-red-400"
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
                <span className="text-red-800 dark:text-red-200 text-sm font-medium">
                  {error}
                </span>
              </div>
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-5">
              <div className="group">
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3 transition-all duration-300 group-focus-within:text-blue-600 dark:group-focus-within:text-blue-400"
                >
                  {t("auth.email")}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors duration-300 group-focus-within:text-blue-500">
                    <svg
                      className="h-5 w-5 text-slate-400 group-focus-within:text-blue-500"
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
                    className="block w-full pl-12 pr-4 py-4 border border-slate-300/80 dark:border-slate-600/80 placeholder-slate-500 dark:placeholder-slate-400 text-slate-900 dark:text-white rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/25 focus:border-blue-500/50 bg-white/80 dark:bg-slate-700/80 backdrop-blur-sm transition-all duration-300 text-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:border-slate-400/80 dark:hover:border-slate-500/80"
                    placeholder={
                      language === "en"
                        ? "Enter your email address"
                        : "अपना ईमेल पता दर्ज करें"
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
                  className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3 transition-all duration-300 group-focus-within:text-blue-600 dark:group-focus-within:text-blue-400"
                >
                  {t("auth.password")}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors duration-300 group-focus-within:text-blue-500">
                    <svg
                      className="h-5 w-5 text-slate-400 group-focus-within:text-blue-500"
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
                    className="block w-full pl-12 pr-4 py-4 border border-slate-300/80 dark:border-slate-600/80 placeholder-slate-500 dark:placeholder-slate-400 text-slate-900 dark:text-white rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/25 focus:border-blue-500/50 bg-white/80 dark:bg-slate-700/80 backdrop-blur-sm transition-all duration-300 text-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:border-slate-400/80 dark:hover:border-slate-500/80"
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
                    className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3 transition-all duration-300 group-focus-within:text-blue-600 dark:group-focus-within:text-blue-400"
                  >
                    {t("auth.confirmPassword")}
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors duration-300 group-focus-within:text-blue-500">
                      <svg
                        className="h-5 w-5 text-slate-400 group-focus-within:text-blue-500"
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
                      className="block w-full pl-12 pr-4 py-4 border border-slate-300/80 dark:border-slate-600/80 placeholder-slate-500 dark:placeholder-slate-400 text-slate-900 dark:text-white rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/25 focus:border-blue-500/50 bg-white/80 dark:bg-slate-700/80 backdrop-blur-sm transition-all duration-300 text-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:border-slate-400/80 dark:hover:border-slate-500/80"
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
              className="group relative w-full flex justify-center items-center py-5 px-4 border border-transparent text-lg font-bold rounded-2xl text-white bg-gradient-to-r from-blue-600 via-blue-500 to-purple-600 hover:from-blue-700 hover:via-blue-600 hover:to-purple-700 focus:outline-none focus:ring-4 focus:ring-blue-500/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:scale-[1.02] active:scale-[0.98] overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>

              {loading ? (
                <div className="flex items-center space-x-3">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span className="text-white font-semibold">
                    {language === "en"
                      ? "Processing..."
                      : "प्रोसेस हो रहा है..."}
                  </span>
                </div>
              ) : isLogin ? (
                <div className="flex items-center space-x-2 transform group-hover:translate-x-1 transition-transform duration-200">
                  <span className="text-white font-semibold">
                    {t("auth.login")}
                  </span>
                  <svg
                    className="h-5 w-5 text-white transform group-hover:scale-110 transition-transform duration-200"
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
                <div className="flex items-center space-x-2 transform group-hover:translate-x-1 transition-transform duration-200">
                  <span className="text-white font-semibold">
                    {t("auth.signup")}
                  </span>
                  <svg
                    className="h-5 w-5 text-white transform group-hover:scale-110 transition-transform duration-200"
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
