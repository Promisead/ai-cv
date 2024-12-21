export const SIGNUP_USER = "SIGNUP_USER";
export const LOGIN_USER = "LOGIN_USER";
export const GENERATE_CV = "GENERATE_CV";
export const FETCH_CVS = "FETCH_CVS";
export const UPDATE_USER = "UPDATE_USER";
export const OPEN_CV = "OPEN_CV";
export const UPDATE_CV = "UPDATE_CV";
export const DELETE_CV = "DELETE_CV";
export const REFRESH_LOGIN = "REFRESH_LOGIN";
export const LOGOUT = "LOGOUT";


/* ${import.meta.env.VITE_API_BASE_URL2} */
/* ${import.meta.env.VITE_API_BASE_URL2} */
/* https://cv-frontend2.onrender.com */

let calculateRemainingTime = (hoursUntilExpiry) => {
  const currentTime = new Date().getTime();
  const expirationTime = currentTime + hoursUntilExpiry * 60 * 60 * 1000; // Convert hours to milliseconds
  const timeLeft = expirationTime - currentTime; // Time left in milliseconds
  return Math.max(timeLeft, 0); // Ensure non-negative result
};

// Function to retrieve admin token and check its validity
let retrievedAdminStoredToken = () => {
  const tokenFromStorage = localStorage.getItem('token');
  const expiryDate = localStorage.getItem('expiry'); // This should be a timestamp


  if (!expiryDate) {
    return {
      token: "",
      expiresIn: ""
    };
  }

  const timeLeft = calculateRemainingTime(Number(expiryDate)); // Ensure expiryDate is a number

  if (timeLeft <= 1000) {
    // Less than or equal to 1 hour
    localStorage.removeItem('token');
    localStorage.removeItem('expiry');
    localStorage.removeItem('user');

    return {
      token: "",
      expiresIn: ""
    };
  }

  return {
    token: tokenFromStorage,
    expiresIn: timeLeft
  };
}

// Redux async function for automatic login based on stored token
export const autoLogin = () => {
  return async (dispatch, getState) => {
    // Get the admin token and its expiry
    const { token, expiresIn } = retrievedAdminStoredToken();

    if (!token) {
      return {
        bool: false,
        message: "No valid session found",
        url: "/login"
      };
    }

    // Check if the token is still valid
    if (expiresIn <= 0) {

      localStorage.removeItem("user");
      localStorage.removeItem("token");
      localStorage.removeItem("expiry");
      return {
        bool: false,
        message: "Session expired, please log in again",
        url: "/login"
      };
    }

    // Optionally validate the token with the server
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL2}/validate-token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      });

      if (response.status === 200) {
        const data = await response.json();

        console.log(data)

        dispatch({ type: REFRESH_LOGIN, payload: data });
        return {
          bool: true,
          message: "Successfully logged in",
          url: `/template`
        };
      } else {


        localStorage.removeItem("user");
        localStorage.removeItem("token");
        localStorage.removeItem("expiry");
        return {
          bool: false,
          message: "Invalid token, please log in again",
          url: "/login"
        };
      }

    } catch (err) {
      return {
        bool: false,
        message: "Network error"
      };
    }
  }
}


/*   user sections */
export const signup = (data) => {
  return async (dispatch, getState) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL2}/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });
      const responseData = await response.json();

      if (response.status === 404 || response.status === 300) {

        return {
          bool: false,
          message: responseData.response,
          url: '/signup'
        };
      }

      if (response.status === 301) {

        return {
          bool: false,
          message: responseData.response,
          url: '/login'
        };
      }

      if (response.status === 200) {

        localStorage.setItem("user", JSON.stringify(responseData.user));
        localStorage.setItem("token", responseData.userToken); // Store directly as a string
        localStorage.setItem("expiry", responseData.userExpiresIn.toString()); // Store expiry as string

        let payloadData = {
          user: responseData.user,
          userToken: responseData.userToken,
          userExpiresIn: responseData.userExpiresIn
        };
        console.log(payloadData)
        dispatch({ type: LOGIN_USER, payload: payloadData });


        return {
          bool: true,
          message: responseData.response,
          url: `/login`
        };
      }
    } catch (err) {
      console.log(err)
      return {
        bool: false,
        message: "Network error",
        url: '/signup'
      };
    }
  }
}

export const login = (data) => {
  return async (dispatch, getState) => {
    let userData = data;
    // Do some check on the server if it's actually login before proceeding to dispatch
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL2}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
      });
      const responseData = await response.json();

      if (response.status === 404 || response.status === 300) {
        return {
          bool: false,
          message: responseData.response,
          url: "/login"
        };
      }

      if (response.status === 200) {
        localStorage.setItem("user", JSON.stringify(responseData.response.user));
        localStorage.setItem("token", responseData.response.userToken); // Store directly as a string
        localStorage.setItem("expiry", responseData.response.userExpiresIn.toString()); // Store expiry as string

        dispatch({ type: LOGIN_USER, payload: responseData.response });
        return {
          bool: true,
          message: responseData.response.message,
          url: `/cvs`
        };
      }

    } catch (err) {
      return {
        bool: false,
        message: "Network error"
      };
    }
  }
}


export const makeCv = (data) => {
  return async (dispatch, getState) => {
    try {
      const { userAuth } = getState();
      // Access specific slice of the state
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL2}/makecv/${userAuth.user._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      })
      if (response.status === 404) {

        let data = await response.json()
        return {
          bool: false,
          message: data.message,
        }
      }
      if (response.status === 300) {

        let data = await response.json()
        return {
          bool: false,
          message: data.message,
        }
      }

      if (response.status === 200) {

        let data = await response.json()
        dispatch({ type: GENERATE_CV, payload: data })
        return {
          bool: true,
          message: data.message,
        }
      }
    } catch (err) {

      return {
        bool: false,
        message: "network error",
      }

    }

  }

}

export const updateCv = (data) => {
  return async (dispatch, getState) => {
    try {
      const { userAuth } = getState(); // Access user authentication data
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL2}/updatecv/${userAuth.user._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });

      if (response.status === 404 || response.status === 300) {
        // Handle specific error responses from the server
        const errorData = await response.json();
        return {
          bool: false,
          message: errorData.message,
        };
      }

      if (response.status === 200) {
        // Success: parse the data and update the store
        const updatedCvData = await response.json();
        dispatch({
          type: UPDATE_CV,
          payload: {
            id: userAuth.user._id, // or use the specific CV's ID if different
            cv: updatedCvData.cv
          }
        });

        return {
          bool: true,
          message: "CV updated successfully",
        };
      }

      // Handle unexpected status codes
      return {
        bool: false,
        message: "Unexpected error",
      };

    } catch (err) {
      // Network or other errors
      return {
        bool: false,
        message: "Network error",
      };
    }
  };
}

//meta78.env.VITE_process.env.REACT_APP_API_BASE_URL2

export const deleteCv = (data) => {
  return async (dispatch, getState) => {
    try {
      const { userAuth } = getState(); // Access user authentication data
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL2}/deletecv/${userAuth.user._id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });

      if (response.status === 404 || response.status === 300) {
        // Handle specific error responses from the server
        const errorData = await response.json();
        return {
          bool: false,
          message: errorData.message,
        };
      }

      if (response.status === 200) {
        // Success: dispatch an action to remove the CV from the store
        dispatch({
          type: DELETE_CV,
          payload: {
            id: data._id // or use the specific CV's ID if different
          }
        });

        return {
          bool: true,
          message: "CV deleted successfully",
        };
      }

      // Handle unexpected status codes
      return {
        bool: false,
        message: "Unexpected error",
      };

    } catch (err) {
      // Network or other errors
      return {
        bool: false,
        message: "Network error",
      };
    }
  };
};


export const fetchCv = (id) => {
  return async (dispatch, getState) => {
    //do some check on the server if its actually login before proceding to dispatch
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL2}/cvs/${id}`)
      if (response.status === 404) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response,
        }
      }
      if (response.status === 300) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response,
        }
      }
      if (response.status === 200) {
        let data = await response.json()

        dispatch({ type: FETCH_CVS, payload: data.cvs })
        return {
          bool: true,
          message: data.cvs,
        }
      }

    } catch (err) {
      return {
        bool: false,
        message: "network error"
      }
    }
  }
}

export const openCv = (data) => {
  return async (dispatch, getState) => {
    dispatch({ type: OPEN_CV, payload: data })
  }
}
export const fetchSpecificCv = (id) => {
  return async (dispatch, getState) => {
    //do some check on the server if its actually login before proceding to dispatch
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL2}/cv/${id}`)
      if (response.status === 404) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response,
        }
      }
      if (response.status === 300) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response,
        }
      }
      if (response.status === 200) {
        let data = await response.json()

        return {
          bool: true,
          message: data.cv,
        }
      }

    } catch (err) {
      return {
        bool: false,
        message: "network error"
      }
    }
  }
}


export const updateUser = (data) => {
  return async (dispatch, getState) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL2}/updateaccount/${data._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      })
      if (response.status === 404) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response,
        }
      }
      if (response.status === 300) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response,
        }
      }

      if (response.status === 200) {
        let data = await response.json()
        /// 

        dispatch({ type: UPDATE_USER, payload: data.user })

        return {
          bool: true,
          message: data,
        }
      }
    } catch (err) {
      return {
        bool: false,
        message: "network error",
      }

    }

  }

}

//payment functions
export const initiatePlan = (data) => {

  return async (dispatch, getState) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL2}/initiateplan`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      })

      if (response.status === 404) {
        let data = await response.json()
        return {
          bool: false,
          message: data.message,
        }
      }
      if (response.status === 300) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response,
        }
      }

      if (response.status === 200) {
        let res = await response.json()

        // Save the reference code to localStorage
        localStorage.setItem('payment_reference', res.data.reference);
        // Optionally update the local state if you need to show it in the UI
        if (res.data.authorization_url) {
          // Redirect the user to the authorization URL to complete the payment
          window.location.href = res.data.authorization_url;
        } else {
          console.error('Failed to create authorization URL');
        }

        //dispatching subcription token
        dispatch({ type: UPDATE_USER, payload: res.user })

        return {
          bool: true,
          message: {
            acessCode: res.data.access_code,
            reference: res.data.reference

          }
        }
      }
    } catch (err) {
      console.log(err)
      return {
        bool: false,
        message: "network error",
      }
    }
  }

}


export const VerifySubscription = (data) => {
  return async (dispatch, getState) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL2}/verify-payment/${data}`, {
        method: 'GET',  
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 400) {
        let data = await response.json()
        return {
          bool: false,
          message: data.message,
        }
      }

      if (response.status === 404) {
        let data = await response.json()
        return {
          bool: false,
          message: data.message,
        }
      }
      if (response.status === 300) {
        let data = await response.json()
        return {
          bool: false,
          message: data.message,
        }
      }

      if (response.status === 200) {
        let data = await response.json()

        return {
          bool: true,
          message: data.message
        }
      }
    } catch (err) {
      console.log(err)
      return {
        bool: false,
        message: "network error",
      }

    }

  }

}






















export const logout = () => {
  return async (dispatch, getState) => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("expiry");
    dispatch({ type: LOGOUT })
  }
}






