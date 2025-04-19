import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Task } from '@/types';
import AddTask from './AddTask';
import TaskList from './TaskList';
import { FaTasks, FaCheckCircle } from 'react-icons/fa';

const TaskManager: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    // Load tasks from localStorage on initial render
    if (typeof window !== 'undefined') {
      const savedTasks = localStorage.getItem('tasks');
      return savedTasks ? JSON.parse(savedTasks) : [];
    }
    return [];
  });

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  }, [tasks]);

  const addTask = (content: string) => {
    const newTask: Task = {
      id: uuidv4(),
      content,
      completed: false
    };
    setTasks(prevTasks => [...prevTasks, newTask]);
  };

  const deleteTask = (id: string) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
  };

  const editTask = (id: string, newContent: string) => {
    setTasks(prevTasks => prevTasks.map(task => 
      task.id === id ? { ...task, content: newContent } : task
    ));
  };

  const toggleComplete = (id: string) => {
    setTasks(prevTasks => prevTasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const handleReorder = (startIndex: number, endIndex: number) => {
    setTasks(prevTasks => {
      const updatedTasks = Array.from(prevTasks);
      const [removed] = updatedTasks.splice(startIndex, 1);
      updatedTasks.splice(endIndex, 0, removed);
      return updatedTasks;
    });
  };

  const completedTasksCount = tasks.filter(task => task.completed).length;
  const pendingTasksCount = tasks.length - completedTasksCount;

  return (
    <div className="w-full max-w-3xl mx-auto p-4 sm:p-6 space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-6">Task Dashboard</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg flex items-center gap-3">
            <div className="bg-blue-500 text-white p-2 rounded-full">
              <FaTasks className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm text-blue-700 dark:text-blue-300">Pending Tasks</p>
              <p className="text-2xl font-bold text-blue-800 dark:text-blue-200">{pendingTasksCount}</p>
            </div>
          </div>
          <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg flex items-center gap-3">
            <div className="bg-green-500 text-white p-2 rounded-full">
              <FaCheckCircle className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm text-green-700 dark:text-green-300">Completed</p>
              <p className="text-2xl font-bold text-green-800 dark:text-green-200">{completedTasksCount}</p>
            </div>
          </div>
        </div>
        <AddTask onAdd={addTask} />
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">Your Tasks</h2>
        <TaskList
          tasks={tasks}
          onDelete={deleteTask}
          onEdit={editTask}
          onToggleComplete={toggleComplete}
          onReorder={handleReorder}
        />
      </div>
    </div>
  );
};

export default TaskManager; 