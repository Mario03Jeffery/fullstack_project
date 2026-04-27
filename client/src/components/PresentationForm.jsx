import React, { useState } from 'react';

const PresentationForm = ({ onSubmit, users }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    userId: '',
    theme: 'default'
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({ title: '', description: '', userId: '', theme: 'default' });
  };

  return (
    <div>
      <h2>Add New Presentation</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
        />
        <select name="userId" value={formData.userId} onChange={handleChange} required>
          <option value="">Select User</option>
          {users.map(user => (
            <option key={user._id} value={user._id}>{user.name}</option>
          ))}
        </select>
        <select name="theme" value={formData.theme} onChange={handleChange}>
          <option value="default">Default</option>
          <option value="dark">Dark</option>
          <option value="light">Light</option>
          <option value="colorful">Colorful</option>
        </select>
        <button type="submit">Add Presentation</button>
      </form>
    </div>
  );
};

export default PresentationForm;