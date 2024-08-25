import axios from 'axios';

export const API_URL = 'http://localhost:8080/api/document';

// Document API functions
export const addDocument = (title, description) => {
  return axios.post(`${API_URL}/add`, { title, description });
};

export const updateDocument = (id, title, description) => {
  return axios.put(`${API_URL}/update/${id}`, { title, description });
};

export const getDocumentById = (id) => {
  return axios.get(`${API_URL}/get/${id}`);
};

export const getAllDocuments = () => {
  return axios.get(`${API_URL}/all`);
};

export const deleteDocument = (id) => {
  return axios.delete(`${API_URL}/delete/${id}`);
};
