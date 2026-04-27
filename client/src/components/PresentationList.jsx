import React from 'react';
import PresentationRow from './PresentationRow';

const PresentationList = ({ presentations, loading, error, onDelete, onEdit, onSort, sortAsc }) => {
  if (loading) return <p>Loading presentations...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>Presentations</h2>
      <table>
        <thead>
          <tr>
            <th>Title <button onClick={onSort}>{sortAsc ? '↓' : '↑'}</button></th>
            <th>Description</th>
            <th>User</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {presentations.map(presentation => (
            <PresentationRow
              key={presentation._id}
              presentation={presentation}
              onDelete={onDelete}
              onEdit={onEdit}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PresentationList;