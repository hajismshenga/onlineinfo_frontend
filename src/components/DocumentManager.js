import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DocumentManager = () => {
  const [documents, setDocuments] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);

  useEffect(() => {
    const fetchDocuments = async () => {
      const response = await axios.get('http://localhost:8080/api/document/all');
      setDocuments(response.data);
    };
    fetchDocuments();
  }, []);

  const handleAddDocument = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('file', file);

    try {
      await axios.post('http://localhost:8080/api/document/add', formData);
      alert('Document added successfully!');
    } catch (error) {
      alert('Error adding document: ' + error.response.data);
    }
  };

  const handleDeleteDocument = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/document/delete/${id}`);
      alert('Document deleted successfully!');
      setDocuments(documents.filter(doc => doc.id !== id));
    } catch (error) {
      alert('Error deleting document');
    }
  };

  return (
    <div>
      <h2>Document Manager</h2>
      <form onSubmit={handleAddDocument}>
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
          required
        />
        <button type="submit">Add Document</button>
      </form>
      <ul>
        {documents.map(doc => (
          <li key={doc.id}>
            <strong>{doc.title}</strong> - {doc.description}
            <button onClick={() => handleDeleteDocument(doc.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DocumentManager;
