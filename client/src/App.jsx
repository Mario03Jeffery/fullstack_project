import React, { useState, useEffect } from 'react';
import PresentationList from './components/PresentationList';
import PresentationForm from './components/PresentationForm';
import './App.css';

const API_BASE = 'http://localhost:5000/api';

function App() {
  const [presentations, setPresentations] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [sortAsc, setSortAsc] = useState(true);

  useEffect(() => {
    fetchData();

    const interval = setInterval(fetchData, 30000);

    return () => clearInterval(interval);
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);

      const [presRes, usersRes] = await Promise.all([
        fetch(`${API_BASE}/presentations`),
        fetch(`${API_BASE}/users`)
      ]);

      if (!presRes.ok || !usersRes.ok) {
        throw new Error('Failed to fetch data');
      }

      const presData = await presRes.json();
      const usersData = await usersRes.json();

      setPresentations(presData);
      setUsers(usersData);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (data) => {
    try {
      const res = await fetch(`${API_BASE}/presentations`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      if (!res.ok) {
        throw new Error('Failed to create');
      }

      fetchData();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure?')) return;

    try {
      const res = await fetch(`${API_BASE}/presentations/${id}`, {
        method: 'DELETE'
      });

      if (!res.ok) {
        throw new Error('Failed to delete');
      }

      fetchData();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEdit = (presentation) => {
    const newTitle = window.prompt('New title:', presentation.title);

    if (newTitle && newTitle.trim() !== '') {
      updatePresentation(presentation._id, {
        ...presentation,
        title: newTitle.trim()
      });
    }
  };

  const updatePresentation = async (id, data) => {
    try {
      const res = await fetch(`${API_BASE}/presentations/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      if (!res.ok) {
        throw new Error('Failed to update');
      }

      fetchData();
    } catch (err) {
      setError(err.message);
    }
  };

  const filteredPresentations = presentations.filter((p) =>
    p.title?.toLowerCase().includes(search.toLowerCase())
  );

  const sortedPresentations = [...filteredPresentations].sort((a, b) =>
    sortAsc
      ? a.title.localeCompare(b.title)
      : b.title.localeCompare(a.title)
  );

  const handleSort = () => {
    setSortAsc((prev) => !prev);
  };

  return (
    <div className="App">
      <h1>Notes Transformer - Presentation Builder</h1>

      <input
        type="text"
        placeholder="Search presentations..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <PresentationForm onSubmit={handleCreate} users={users} />

      <PresentationList
        presentations={sortedPresentations}
        loading={loading}
        error={error}
        onDelete={handleDelete}
        onEdit={handleEdit}
        onSort={handleSort}
        sortAsc={sortAsc}
      />
    </div>
  );
}

export default App;