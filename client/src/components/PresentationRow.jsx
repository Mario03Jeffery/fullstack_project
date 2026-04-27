import React from 'react';

const PresentationRow = ({ presentation, onDelete, onEdit }) => {
  return (
    <tr>
      <td>{presentation.title}</td>
      <td>{presentation.description}</td>
      <td>{presentation.userId?.name || 'Unknown'}</td>
      <td>
        <button onClick={() => onEdit(presentation)}>Edit</button>
        <button onClick={() => onDelete(presentation._id)}>Delete</button>
      </td>
    </tr>
  );
};

export default PresentationRow;