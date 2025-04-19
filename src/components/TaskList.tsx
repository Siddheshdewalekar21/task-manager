import React from 'react';
import { Task } from '@/types';
import TaskItem from './TaskItem';
import { DragDropContext, Droppable, DropResult } from '@hello-pangea/dnd';

interface TaskListProps {
  tasks: Task[];
  onDelete: (id: string) => void;
  onEdit: (id: string, newContent: string) => void;
  onToggleComplete: (id: string) => void;
  onReorder: (startIndex: number, endIndex: number) => void;
}

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  onDelete,
  onEdit,
  onToggleComplete,
  onReorder
}) => {
  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    
    const { source, destination } = result;
    if (source.index === destination.index) return;
    
    onReorder(source.index, destination.index);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="taskList">
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="space-y-3"
          >
            {tasks.length === 0 ? (
              <div className="p-6 text-center bg-gray-50 dark:bg-gray-800 rounded-lg">
                <p className="text-gray-500 dark:text-gray-400">
                  No tasks yet. Add a task to get started!
                </p>
              </div>
            ) : (
              tasks.map((task, index) => (
                <TaskItem
                  key={task.id}
                  task={task}
                  index={index}
                  onDelete={onDelete}
                  onEdit={onEdit}
                  onToggleComplete={onToggleComplete}
                />
              ))
            )}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default TaskList; 