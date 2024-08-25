import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './DocumentManager.css'; // Import the updated CSS file

const DocumentManager = () => {
  const [documents, setDocuments] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);
  const [editingDocument, setEditingDocument] = useState(null);
  const [viewDocument, setViewDocument] = useState(null);

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/document/all');
      setDocuments(response.data);
    } catch (error) {
      alert('Error fetching documents: ' + (error.response?.data || error.message));
    }
  };

  const handleAddDocument = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    if (file) formData.append('file', file);

    try {
      await axios.post('http://localhost:8080/api/document/add', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Document added successfully!');
      resetForm();
      fetchDocuments();
    } catch (error) {
      alert('Error adding document: ' + (error.response?.data || error.message));
    }
  };

  const handleUpdateDocument = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);

    try {
      await axios.put(`http://localhost:8080/api/document/update/${editingDocument.id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Document updated successfully!');
      resetForm();
      fetchDocuments();
    } catch (error) {
      alert('Error updating document: ' + (error.response?.data || error.message));
    }
  };

  const handleDeleteDocument = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/document/delete/${id}`);
      alert('Document deleted successfully!');
      setDocuments(documents.filter(doc => doc.id !== id));
    } catch (error) {
      alert('Error deleting document: ' + (error.response?.data || error.message));
    }
  };

  const handleEdit = (doc) => {
    setEditingDocument(doc);
    setTitle(doc.title);
    setDescription(doc.description);
  };

  const handleViewDocument = async (id) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/document/get/${id}`);
      setViewDocument(response.data);
    } catch (error) {
      alert('Error fetching document details: ' + (error.response?.data || error.message));
    }
  };

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setFile(null);
    setEditingDocument(null);
  };

  return (
    <div className="document-manager">
      <h2>Document Manager</h2>
      <form onSubmit={editingDocument ? handleUpdateDocument : handleAddDocument} className="document-form">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <button type="submit">{editingDocument ? 'Update Document' : 'Add Document'}</button>
        {editingDocument && <button type="button" onClick={resetForm}>Cancel</button>}
      </form>
      <ul className="document-list">
        {documents.map((doc) => (
          <li key={doc.id} className="document-item">
            <div className="document-details">
              <strong>{doc.title}</strong>
              <p>{doc.description}</p>
            </div>
            <div className="document-actions">
              <button className="view-btn" onClick={() => handleViewDocument(doc.id)}>View</button>
              <button className="edit-btn" onClick={() => handleEdit(doc)}>Edit</button>
              <button className="delete-btn" onClick={() => handleDeleteDocument(doc.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
      {viewDocument && (
        <div className="view-document">
          <h3>{viewDocument.title}</h3>
          <p>{viewDocument.description}</p>
          <a href={viewDocument.fileUrl} target="_blank" rel="noopener noreferrer">View File</a>
        </div>
      )}
    </div>
  );
};

export default DocumentManager;
