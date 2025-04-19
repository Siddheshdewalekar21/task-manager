import React, { useState } from 'react';
import { Task } from '@/types';
import { FaCheck, FaEdit, FaTrash, FaGripVertical } from 'react-icons/fa';
import { Draggable } from '@hello-pangea/dnd';

interface TaskItemProps {
  task: Task;
  index: number;
  onDelete: (id: string) => void;
  onEdit: (id: string, newContent: string) => void;
  onToggleComplete: (id: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({
  task,
  index,
  onDelete,
  onEdit,
  onToggleComplete
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(task.content);

  const handleEdit = () => {
    if (editValue.trim() !== '') {
      onEdit(task.id, editValue);
      setIsEditing(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleEdit();
    } else if (e.key === 'Escape') {
      setEditValue(task.content);
      setIsEditing(false);
    }
  };

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`group relative bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 mb-3 flex items-center gap-3 transition-all duration-200 cursor-grab active:cursor-grabbing ${
            snapshot.isDragging 
              ? 'shadow-lg ring-2 ring-blue-500 dark:ring-blue-400' 
              : 'hover:shadow-md'
          } ${
            task.completed 
              ? 'border-l-4 border-green-500' 
              : 'border-l-4 border-transparent hover:border-blue-400'
          }`}
        >
          {/* Visual drag handle indicator */}
          <div className="absolute left-0 top-0 bottom-0 w-8 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <FaGripVertical className="text-gray-400 dark:text-gray-600" />
          </div>

          <div className="flex items-center gap-3 pl-6 w-full">
            <button
              onClick={() => onToggleComplete(task.id)}
              className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                task.completed
                  ? 'bg-green-500 border-green-500 text-white scale-110'
                  : 'border-gray-300 dark:border-gray-600 hover:border-blue-400'
              }`}
              aria-label={task.completed ? "Mark as incomplete" : "Mark as complete"}
            >
              {task.completed && <FaCheck className="w-3 h-3" />}
            </button>

            {isEditing ? (
              <input
                type="text"
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                onBlur={handleEdit}
                onKeyDown={handleKeyDown}
                className="flex-grow bg-transparent border-b-2 border-blue-500 focus:outline-none px-2 py-1"
                autoFocus
              />
            ) : (
              <p className={`flex-grow ${
                task.completed 
                  ? 'line-through text-gray-500 dark:text-gray-400' 
                  : 'text-gray-800 dark:text-gray-200'
              }`}>
                {task.content}
              </p>
            )}

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  if (!isEditing) {
                    setIsEditing(true);
                  } else {
                    handleEdit();
                  }
                }}
                className="text-blue-500 hover:text-blue-600 p-2 rounded-full hover:bg-blue-50 dark:hover:bg-blue-900/30"
                aria-label="Edit task"
              >
                <FaEdit className="w-4 h-4" />
              </button>
              <button
                onClick={() => onDelete(task.id)}
                className="text-red-500 hover:text-red-600 p-2 rounded-full hover:bg-red-50 dark:hover:bg-red-900/30"
                aria-label="Delete task"
              >
                <FaTrash className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default TaskItem; 