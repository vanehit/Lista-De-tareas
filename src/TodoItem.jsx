import React, { useState } from "react";

const TodoItem = ({ task, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(task.text);

  const handleEdit = () => {
    onEdit(task.id, editedText);
    setIsEditing(false);
  };

  return (
    <li className="task-item">
      {isEditing ? (
        <div>
          <input
            type="text"
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
            className="edit-input"
          />
          <button onClick={handleEdit}>Guardar</button>
        </div>
      ) : (
        <div>
          <span>{task.text}</span>
          <button onClick={() => setIsEditing(true)}>Editar</button>
          <button onClick={() => onDelete(task.id)}>Eliminar</button>
        </div>
      )}
    </li>
  );
};

export default TodoItem;
