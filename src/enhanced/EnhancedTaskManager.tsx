import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Task } from '@/types';
import { FaPlus, FaSearch, FaFilter, FaTasks, FaCheckCircle, FaChartLine } from 'react-icons/fa';
import { DragDropContext, Droppable, DropResult } from '@hello-pangea/dnd';
import TaskItem from '@/components/TaskItem';

const EnhancedTaskManager: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    // Load tasks from localStorage on initial render
    if (typeof window !== 'undefined') {
      const savedTasks = localStorage.getItem('tasks');
      return savedTasks ? JSON.parse(savedTasks) : [];
    }
    return [];
  });
  
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
  const [newTaskContent, setNewTaskContent] = useState('');

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  }, [tasks]);

  const addTask = () => {
    if (newTaskContent.trim() !== '') {
      const newTask: Task = {
        id: uuidv4(),
        content: newTaskContent,
        completed: false
      };
      setTasks([...tasks, newTask]);
      setNewTaskContent('');
    }
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const editTask = (id: string, newContent: string) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, content: newContent } : task
    ));
  };

  const toggleComplete = (id: string) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    
    const { source, destination } = result;
    if (source.index === destination.index) return;
    
    const reordered = Array.from(tasks);
    const [removed] = reordered.splice(source.index, 1);
    reordered.splice(destination.index, 0, removed);
    
    setTasks(reordered);
  };

  const filterTasks = (task: Task) => {
    const matchesSearch = task.content.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (!matchesSearch) return false;
    
    switch (filter) {
      case 'active':
        return !task.completed;
      case 'completed':
        return task.completed;
      default:
        return true;
    }
  };

  const filteredTasks = tasks.filter(filterTasks);
  const completedTasksCount = tasks.filter(task => task.completed).length;
  const pendingTasksCount = tasks.length - completedTasksCount;
  const completionPercentage = tasks.length > 0 
    ? Math.round((completedTasksCount / tasks.length) * 100) 
    : 0;

  return (
    <div className="w-full max-w-4xl mx-auto p-4 sm:p-6 space-y-6">
      {/* Stats Dashboard */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-5 overflow-hidden">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center">
          <FaChartLine className="mr-2 text-blue-500" /> Task Dashboard
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg flex items-center gap-3">
            <div className="bg-blue-500 text-white p-3 rounded-full">
              <FaTasks className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm text-blue-700 dark:text-blue-300">Pending Tasks</p>
              <p className="text-2xl font-bold text-blue-800 dark:text-blue-200">{pendingTasksCount}</p>
            </div>
          </div>
          
          <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg flex items-center gap-3">
            <div className="bg-green-500 text-white p-3 rounded-full">
              <FaCheckCircle className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm text-green-700 dark:text-green-300">Completed</p>
              <p className="text-2xl font-bold text-green-800 dark:text-green-200">{completedTasksCount}</p>
            </div>
          </div>
          
          <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
            <p className="text-sm text-purple-700 dark:text-purple-300 mb-2">Completion Rate</p>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mb-2">
              <div 
                className="bg-purple-600 h-2.5 rounded-full transition-all duration-500 ease-in-out" 
                style={{ width: `${completionPercentage}%` }}
              ></div>
            </div>
            <p className="text-right text-sm font-medium text-purple-800 dark:text-purple-200">
              {completionPercentage}%
            </p>
          </div>
        </div>
      </div>
      
      {/* Add Task Section */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-5">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center">
          <FaPlus className="mr-2 text-green-500" /> Add New Task
        </h2>
        
        <div className="flex gap-2">
          <input
            type="text"
            value={newTaskContent}
            onChange={(e) => setNewTaskContent(e.target.value)}
            placeholder="What needs to be done?"
            className="flex-grow py-3 px-4 bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg text-gray-700 dark:text-gray-200 transition-all"
            onKeyDown={(e) => e.key === 'Enter' && addTask()}
          />
          <button
            onClick={addTask}
            disabled={newTaskContent.trim() === ''}
            className="bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 dark:disabled:bg-blue-800 text-white py-3 px-6 rounded-lg font-medium transition-colors flex items-center"
          >
            <FaPlus className="mr-1" /> Add
          </button>
        </div>
      </div>
      
      {/* Search and Filter Section */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-5">
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search tasks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 dark:text-gray-200"
            />
          </div>
          
          <div className="flex gap-1">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                filter === 'all' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilter('active')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                filter === 'active' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              Active
            </button>
            <button
              onClick={() => setFilter('completed')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                filter === 'completed' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              Completed
            </button>
          </div>
        </div>
      </div>
      
      {/* Task List */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-5">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center justify-between">
          <span><FaTasks className="inline mr-2 text-blue-500" /> Your Tasks</span>
          <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
            {filteredTasks.length} {filteredTasks.length === 1 ? 'task' : 'tasks'} displayed
          </span>
        </h2>
        
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="tasks">
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="space-y-2"
              >
                {filteredTasks.length === 0 ? (
                  <div className="p-6 text-center bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <p className="text-gray-500 dark:text-gray-400">
                      {tasks.length === 0 
                        ? 'No tasks yet. Add a task to get started!' 
                        : 'No tasks match your current filter.'}
                    </p>
                  </div>
                ) : (
                  filteredTasks.map((task, index) => (
                    <TaskItem
                      key={task.id}
                      task={task}
                      index={index}
                      onDelete={deleteTask}
                      onEdit={editTask}
                      onToggleComplete={toggleComplete}
                    />
                  ))
                )}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
      
      {/* Tips Section */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg shadow-lg p-5 text-white">
        <h3 className="font-bold text-xl mb-2">Pro Tips 💡</h3>
        <ul className="list-disc list-inside space-y-1 opacity-90">
          <li>Drag and drop tasks to reorder them</li>
          <li>Click the circle to mark a task as complete</li>
          <li>Use the filters to focus on specific tasks</li>
          <li>Search for tasks using the search bar</li>
        </ul>
      </div>
    </div>
  );
};

export default EnhancedTaskManager;