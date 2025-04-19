import React, { useState } from 'react';
import { FaPlus } from 'react-icons/fa';

interface AddTaskProps {
  onAdd: (content: string) => void;
}

const AddTask: React.FC<AddTaskProps> = ({ onAdd }) => {
  const [content, setContent] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (content.trim() !== '') {
      onAdd(content);
      setContent('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full fade-in">
      <div className="glass flex items-center w-full rounded-lg overflow-hidden hover-card">
        <input
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Add a new task..."
          className="input-primary border-0 bg-transparent flex-grow"
        />
        <button
          type="submit"
          className="btn-primary m-1"
          disabled={content.trim() === ''}
        >
          <FaPlus className="w-4 h-4" />
          <span>Add</span>
        </button>
      </div>
    </form>
  );
};

export default AddTask; 