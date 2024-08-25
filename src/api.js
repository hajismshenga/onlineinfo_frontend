import axios from 'axios';

export const API_URL = 'http://localhost:8080/api/document';

// Function to add a document
export const addDocument = (title, description, userId, file) => {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('userId', userId);
    if (file) {
        formData.append('file', file);
    }

    // Log form data for debugging
    console.log("Form Data being sent for addDocument:");
    for (let [key, value] of formData.entries()) {
        console.log(`${key}: ${value}`);
    }

    // Send POST request
    return axios.post(`${API_URL}/add`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }).catch(error => {
        // Log the error response for debugging
        console.error("Error occurred during addDocument:", error.response?.data || error.message);
        throw error;
    });
};

// Function to update a document
export const updateDocument = (id, title, description, file) => {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    if (file) {
        formData.append('file', file);
    }

    // Log form data for debugging
    console.log("Form Data being sent for updateDocument:");
    for (let [key, value] of formData.entries()) {
        console.log(`${key}: ${value}`);
    }

    // Send PUT request
    return axios.put(`${API_URL}/update/${id}`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }).catch(error => {
        // Log the error response for debugging
        console.error("Error occurred during updateDocument:", error.response?.data || error.message);
        throw error;
    });
};
