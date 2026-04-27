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

    const interval = setInterval(fetchData, 30000); // Auto-refresh every 30s

    return () => clearInterval(interval); // Cleanup
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [presRes, usersRes] = await Promise.all([
        fetch(`${API_BASE}/presentations`),
        fetch(`${API_BASE}/users`)
      ]);
      if (!presRes.ok || !usersRes.ok) throw new Error('Failed to fetch data');
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
      if (!res.ok) throw new Error('Failed to create');
      fetchData();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure?')) return;
    try {
      const res = await fetch(`${API_BASE}/presentations/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete');
      fetchData();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEdit = (presentation) => {
    // For simplicity, alert or something. In real, modal.
    const newTitle = prompt('New title:', presentation.title);
    if (newTitle) {
      updatePresentation(presentation._id, { ...presentation, title: newTitle });
    }
  };

  const updatePresentation = async (id, data) => {
    try {
      const res = await fetch(`${API_BASE}/presentations/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (!res.ok) throw new Error('Failed to update');
      fetchData();
    } catch (err) {
      setError(err.message);
    }
  };

  const filteredPresentations = presentations.filter(p =>
    p.title.toLowerCase().includes(search.toLowerCase())
  );

  const sortedPresentations = [...filteredPresentations].sort((a, b) =>
    sortAsc ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title)
  );

  const handleSort = () => setSortAsc(!sortAsc);

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
            Edit <code>src/App.jsx</code> and save to test <code>HMR</code>
          </p>
        </div>
        <button
          type="button"
          className="counter"
          onClick={() => setCount((count) => count + 1)}
        >
          Count is {count}
        </button>
      </section>

      <div className="ticks"></div>

      <section id="next-steps">
        <div id="docs">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#documentation-icon"></use>
          </svg>
          <h2>Documentation</h2>
          <p>Your questions, answered</p>
          <ul>
            <li>
              <a href="https://vite.dev/" target="_blank">
                <img className="logo" src={viteLogo} alt="" />
                Explore Vite
              </a>
            </li>
            <li>
              <a href="https://react.dev/" target="_blank">
                <img className="button-icon" src={reactLogo} alt="" />
                Learn more
              </a>
            </li>
          </ul>
        </div>
        <div id="social">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#social-icon"></use>
          </svg>
          <h2>Connect with us</h2>
          <p>Join the Vite community</p>
          <ul>
            <li>
              <a href="https://github.com/vitejs/vite" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#github-icon"></use>
                </svg>
                GitHub
              </a>
            </li>
            <li>
              <a href="https://chat.vite.dev/" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#discord-icon"></use>
                </svg>
                Discord
              </a>
            </li>
            <li>
              <a href="https://x.com/vite_js" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#x-icon"></use>
                </svg>
                X.com
              </a>
            </li>
            <li>
              <a href="https://bsky.app/profile/vite.dev" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#bluesky-icon"></use>
                </svg>
                Bluesky
              </a>
            </li>
          </ul>
        </div>
      </section>

      <div className="ticks"></div>
      <section id="spacer"></section>
    </>
  )
}

export default App
