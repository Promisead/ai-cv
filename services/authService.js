// src/services/authService.js
export const validateToken = async (token) => {
    try {
      const response = await fetch('http://localhost:3000/api/validate-token', { // Adjust the URL accordingly
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
  
      if (response.status === 200) {
        const data = await response.json();
        return data; // Should include user data
      } else {
        return null;
      }
    } catch (error) {
      console.error("Error validating token:", error);
      throw error;
    }
  };
  