import axios from "axios";

const BASE_URL = "https://node-server-1gbx.onrender.com"; // Backend URL

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
        const response = await axios.post(`${BASE_URL}/login`, userData);
        const { token } = response.data;
        storeToken(token);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || "Login failed");
    }
};

export const signup = async (userData) => {
    try {
        const response = await axios.post(`${BASE_URL}/register`, userData);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || "Signup failed");
    }
};

// Patient APIs
export const addPatient = async (patientData) => {
    try {
        const response = await axios.post(`${BASE_URL}/predict`, patientData, {
            headers: {
                "Content-Type": "application/json",
                ...getAuthHeaders(),
            },
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || "Failed to add patient");
    }
};

export const getAllPatients = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/getAllPatients`, {
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
        const response = await axios.get(`${BASE_URL}/getPatientDetails/${id}`, {
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
        const response = await axios.post(`${BASE_URL}/reset-password`, { token, newPassword });
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
      const response = await axios.get(`${BASE_URL}/user`, {
        headers: getAuthHeaders(),
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Failed to fetch user info");
    }
  };

  
  
 export const requestPasswordReset = async ({ email }) => {
    try {
      const response = await axios.post("http://localhost:4001/api/auth/forgot-password", { email });
      return response.data;
    } catch (error) {
      console.error("API Error:", error.response?.data || error.message);
      throw new Error(error.response?.data?.message || "Failed to request password reset");
    }
  };
  export const sendFeedback = async (feedbackMessage) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/feedback`,
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
