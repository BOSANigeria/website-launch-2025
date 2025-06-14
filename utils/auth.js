// utils/auth.js
export const fetchUser = async () => {
  try {
    const res = await fetch('/api/auth/check-auth', { cache: 'no-store', credentials: 'include' });
    if (!res.ok) return null;

    const data = await res.json();
    return data.user;
  } catch (err) {
    return null;
  }
};

export const logout = async () => {
try {
  const response = await fetch('/api/auth/logout', {
    method: 'POST', // ← Changed from GET to POST
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (response.ok) {
    const data = await response.json();
    
    // Clear cookie client-side
    document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=strict";
    
    // Redirect to login page
    window.location.href = '/login';
    
    return data?.success || true;
  } else {
    console.error('Logout failed with status:', response.status);
    // Still redirect even if logout fails
    window.location.href = '/login';
    return false;
  }
} catch (error) {
  console.error('Logout error:', error);
  // Still redirect even on error
  window.location.href = '/login';
  return false;
}
};