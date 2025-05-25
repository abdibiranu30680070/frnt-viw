import axios from "axios";

const BASE_URL = "https://server-node-zgkl.onrender.com"; // Backend URL

const storeToken = (token) => {
    if (token) {
        localStorage.setItem("token", token);  // Use localStorage for persistence
    }
};

const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    return token ? { authorization: `Bearer ${token}` } : {};
};

// Authentication APIs
export const login = async (userData) => {
    try {
        const response = await axios.post(`${BASE_URL}/api/users/login`, userData);
        const { token } = response.data;
        storeToken(token);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || "Login failed");
    }
};

export const signup = async (userData) => {
    try {
        const response = await axios.post(`${BASE_URL}/api/users/register`, userData);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || "Signup failed");
    }
};

/**
 * Adds a new patient record and gets prediction results
 * @param {Object} patientData - Patient data to be submitted
 * @returns {Promise<Object>} The created patient record with prediction results
 * @throws {Error} If the request fails or validation errors occur
 */
export const addPatient = async (patientData) => {
  // Validate input
  if (!patientData || typeof patientData !== 'object' || Object.keys(patientData).length === 0) {
    throw new Error('Invalid patient data: Must provide a non-empty patient object');
  }

  try {
    const config = {
      method: 'post',
      url: `${BASE_URL}/api/patients/predict`, // More RESTful endpoint
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeaders(), // Ensure this returns Authorization header
      },
      data: patientData,
      timeout: 15000, // 15 second timeout
      validateStatus: (status) => status < 500, // Don't throw for 4xx errors
    };

    const response = await axios(config);

    // Handle non-success responses
    if (response.status >= 400) {
      const errorMessage = response.data?.error?.message || 
                         response.data?.message || 
                         `Request failed with status ${response.status}`;
      throw new Error(errorMessage);
    }

    // Validate response structure
    if (!response.data || 
        typeof response.data !== 'object' || 
        !('prediction' in response.data)) {
      throw new Error('Invalid response format from server');
    }

    return response.data;

  } catch (error) {
    console.error('Patient submission failed:', {
      error: error.message,
      endpoint: `${BASE_URL}/api/patients/predict`,
      timestamp: new Date().toISOString(),
      patientData: patientData, // Log sanitized data if needed
    });

    // Enhance error messages based on error type
    if (error.response) {
      // Server responded with error status
      const serverError = error.response.data?.error || error.response.data;
      throw new Error(serverError?.message || 'Server rejected patient data');
    } else if (error.request) {
      // Request was made but no response received
      throw new Error('Network error: Could not reach the server');
    } else if (error instanceof Error) {
      // Something happened in setting up the request
      throw new Error(`Request error: ${error.message}`);
    } else {
      throw new Error('Unknown error occurred while adding patient');
    }
  }
};

export const getAllPatients = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/api/getAllPatients`, {
            headers: {
                "Content-Type": "application/json",
                ...getAuthHeaders(),
            },
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || "Failed to fetch patient history");
    }
};

export const deletePatient = async (id) => {
    try {
        const response = await axios.delete(`${BASE_URL}/admin/deletePatient/${id}`, {
            headers: getAuthHeaders(),
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || "Failed to delete patient");
    }
};

export const getPatientDetails = async (id) => {
    try {
        const response = await axios.get(`${BASE_URL}/api/getPatientDetails/${id}`, {
            headers: getAuthHeaders(),
        });
        return response.data;
    } catch (error) {
        console.error("Error details:", error); // Log the full error for debugging
        throw new Error(error.response?.data?.message || "Failed to fetch patient details");
    }
};

// Admin APIs
export const fetchAllUsers = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/admin/users`, {
            headers: {
                "Content-Type": "application/json",
                ...getAuthHeaders(),
            },
        });
        return response.data;
    } catch (error) {
        const message = error.response?.data?.error || "Failed to fetch users";
        throw new Error(message);
    }
};

export const updateUserRole = (userId, newRole) => 
    axios.patch(`${BASE_URL}/admin/users/${userId}/role`, { newRole }, { headers: getAuthHeaders() });

export const deleteUser = (userId) => 
    axios.delete(`${BASE_URL}/admin/users/${userId}`, { headers: getAuthHeaders() });

export const fetchSystemStats = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/admin/system-stats`, {
            headers: {
                "Content-Type": "application/json",
                ...getAuthHeaders(),
            },
        });
        return response.data;
    } catch (error) {
        const message = error.response?.data?.error || "Failed to fetch system stats";
        throw new Error(message);
    }
};

export const fetchAuditLogs = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/admin/audit-logs`, { headers: getAuthHeaders() });
        return response.data;
    } catch (error) {
        const message = error.response?.data?.error || "Failed to fetch audit logs";
        throw new Error(message);
    }
};

// New function for Admin to get all patients
export const getAllPatientsForAdmin = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/admin/getAllPatientsForAdmin`, {
            headers: {
                "Content-Type": "application/json",
                ...getAuthHeaders(),
            },
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || "Failed to fetch all patients for admin");
    }
};
// Forgot Password - Request Password Reset

// Reset Password - Set New Password
export const resetPassword = async (token, newPassword) => {
    try {
        const response = await axios.post(`${BASE_URL}/api/users/reset-password`, { token, newPassword });
        return response.data;
    } catch (error) {
        // Improved error handling to cover both response and other potential issues
        if (error.response) {
            // The request was made and the server responded with an error status
            throw new Error(error.response?.data?.message || "Failed to reset password");
        } else if (error.request) {
            // The request was made but no response was received
            throw new Error("No response from the server. Please check your network connection.");
        } else {
            // Something else happened while setting up the request
            throw new Error(error.message || "An unknown error occurred");
        }
    }
};
export const fetchPredictionStats = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/admin/prediction-stats`, {
            headers: getAuthHeaders(), // Add the token to the header
        });
        return response.data; // Return data from the API
    } catch (error) {
        console.error('Error fetching prediction stats:', error);
        throw new Error(error.response?.data?.error || 'Failed to fetch prediction statistics');
    }
};
export const downloadCSVReport = async (dateFrom, dateTo, prediction) => {
    try {
      const response = await axios.get(`${BASE_URL}/admin/export/csv`, {
        headers: getAuthHeaders(),
        responseType: "blob",
        params: { dateFrom, dateTo, prediction }, // Pass filters as query params
      });
      const url = window.URL.createObjectURL(response.data);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "patients_data.csv");
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      throw new Error("Failed to download CSV report");
    }
  };
  
  export const downloadExcelReport = async (dateFrom, dateTo, prediction) => {
    try {
      const response = await axios.get(`${BASE_URL}/admin/export/excel`, {
        headers: getAuthHeaders(),
        responseType: "blob",
        params: { dateFrom, dateTo, prediction }, // Pass filters as query params
      });
      const url = window.URL.createObjectURL(response.data);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "patients_data.xlsx");
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      throw new Error("Failed to download Excel report");
    }
  };
  export const fetchUserInfo = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/user`, {
        headers: getAuthHeaders(),
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Failed to fetch user info");
    }
  };

  
  
export const requestPasswordReset = async ({ email }) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/users/forgot-password`, { email });
    return response.data;
  } catch (error) {
    console.error("API Error:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Failed to request password reset");
  }
};
  export const sendFeedback = async (feedbackMessage) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/api/feedback`,
        { message: feedbackMessage },
        { headers: getAuthHeaders() }
      );
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Failed to send feedback");
    }
  };
  // Assuming you have a `Feedback` model in your database

// Fetch all feedback
export const getAllFeedback = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/admin/feedbacks`, {
            headers: getAuthHeaders(),
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || "Failed to fetch feedback");
    }
};
