export const applyTheme = (theme) => {
  const root = document.documentElement;


  root.classList.remove("light", "dark");

 
  root.classList.add(theme);

 
  if (theme === "dark") {
    root.classList.add("dark");
  } else {
    root.classList.remove("dark");
  }

  console.log("Theme manually applied:", theme);
};
