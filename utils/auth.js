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
        method: 'GET', // or 'GET' if you prefer
        credentials: 'include', // Important for cookies
      });
  
      if (response.ok) {
        // Redirect to login page or home page
        window.location.href = '/login';
        // Or if using Next.js router:
        // router.push('/login');
        return true;
      } else {
        console.error('Logout failed');
        return false;
      }
    } catch (error) {
      console.error('Logout error:', error);
      return false;
    }
  };