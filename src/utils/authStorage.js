const AUTH_KEY = "talent_management_auth";
const UI_PREFS_KEY = "talent_management_ui_prefs";

export const loginUser = ({ email, role }) => {
  const authData = {
    isLoggedIn: true,
    email,
    role, 
  };

  localStorage.setItem(AUTH_KEY, JSON.stringify(authData));
  return authData;
};

export const logoutUser = () => {
  localStorage.removeItem(AUTH_KEY);
};

export const getAuthUser = () => {
  const stored = localStorage.getItem(AUTH_KEY);
  if (!stored) return null;

  try {
    return JSON.parse(stored);
  } catch (error) {
    return null;
  }
};

export const isAuthenticated = () => {
  const auth = getAuthUser();
  return Boolean(auth?.isLoggedIn);
};

export const getUIPreferences = () => {
  const stored = localStorage.getItem(UI_PREFS_KEY);

  if (!stored) {
    const defaults = {
      sidebarCollapsed: false,
    };
    localStorage.setItem(UI_PREFS_KEY, JSON.stringify(defaults));
    return defaults;
  }

  try {
    return JSON.parse(stored);
  } catch (error) {
    return { sidebarCollapsed: false };
  }
};

export const saveUIPreferences = (prefs) => {
  localStorage.setItem(UI_PREFS_KEY, JSON.stringify(prefs));
};