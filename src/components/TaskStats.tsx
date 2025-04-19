import React from 'react';
import { Task } from '@/types';
import { FaTasks, FaCheckCircle, FaChartLine } from 'react-icons/fa';

interface TaskStatsProps {
  tasks: Task[];
}

const TaskStats: React.FC<TaskStatsProps> = ({ tasks }) => {
  const completedTasksCount = tasks.filter(task => task.completed).length;
  const pendingTasksCount = tasks.length - completedTasksCount;
  const completionPercentage = tasks.length > 0 
    ? Math.round((completedTasksCount / tasks.length) * 100) 
    : 0;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-5 mb-6">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center">
        <FaChartLine className="mr-2 text-blue-500" /> Task Dashboard
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
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
      
      {tasks.length === 0 && (
        <div className="text-center py-4 text-gray-500 dark:text-gray-400">
          <p>No tasks yet. Add a task to see your statistics!</p>
        </div>
      )}
    </div>
  );
};

export default TaskStats;