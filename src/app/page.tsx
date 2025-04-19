"use client";

import React from "react";
import dynamic from "next/dynamic";
import { FaGithub } from "react-icons/fa";

// Disable server-side rendering for the TaskManager component to avoid hydration errors
// due to localStorage usage
const EnhancedTaskManager = dynamic(() => import("@/enhanced/EnhancedTaskManager"), { ssr: false });

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col">
      <header className="bg-gradient-to-r from-blue-600 to-violet-600 shadow-md py-6 text-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold">SuperTasks</h1>
              <p className="text-blue-100 mt-1">Manage your tasks efficiently</p>
            </div>
            <a 
              href="https://github.com/Siddheshdewalekar21/task-manager" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-white/10 hover:bg-white/20 transition-colors px-4 py-2 rounded-lg text-white"
            >
              <FaGithub /> View on GitHub
            </a>
          </div>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8 flex items-start justify-center">
        <EnhancedTaskManager />
      </main>

      <footer className="bg-white dark:bg-gray-800 py-6 shadow-inner">
        <div className="container mx-auto px-4 text-center text-gray-500 dark:text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} SuperTasks. All rights reserved.</p>
          <p className="mt-1">Built with Next.js, TypeScript, and Tailwind CSS</p>
        </div>
      </footer>
    </div>
  );
}
