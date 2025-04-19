# SuperTasks - Task Management Application

A modern, responsive task management application built with Next.js, TypeScript, and Tailwind CSS. This application allows users to efficiently manage their tasks with a beautiful and intuitive interface.

## Features

- **Add Tasks**: Quickly add new tasks to your list
- **Edit Tasks**: Update task content with inline editing
- **Delete Tasks**: Remove unwanted tasks from your list
- **Complete Tasks**: Mark tasks as completed with a visual indicator
- **Drag and Drop Reordering**: Reorganize your tasks in any order you prefer
- **Persistent Storage**: Tasks are saved in localStorage for persistence across sessions
- **Responsive Design**: Works beautifully on all device sizes
- **Dark Mode Support**: Automatically adjusts to your system's light/dark mode preference

## Technologies Used

- **Next.js 15**: For server-side rendering and improved performance
- **TypeScript**: For type safety and improved developer experience
- **Tailwind CSS**: For utility-first styling
- **@hello-pangea/dnd**: For drag and drop functionality (maintained fork of react-beautiful-dnd)
- **React Icons**: For beautiful UI elements
- **UUID**: For generating unique IDs for tasks

## Getting Started

First, run the development server:

```bash
cd task-manager-main
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## Project Structure

- `/src/app`: Next.js app router files
- `/src/components`: React components
  - `AddTask.tsx`: Component for adding new tasks
  - `TaskItem.tsx`: Component for displaying individual tasks
  - `TaskList.tsx`: Component for displaying and managing the list of tasks
  - `TaskManager.tsx`: Main component that handles task state and operations
- `/src/types`: TypeScript type definitions

## Usage

- **Adding a Task**: Type your task in the input field and click the "Add" button
- **Editing a Task**: Click the edit (pencil) icon and modify the text
- **Completing a Task**: Click the circle to the left of the task to mark it as completed
- **Deleting a Task**: Click the trash icon to delete a task
- **Reordering Tasks**: Drag and drop tasks to change their order

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

## License

MIT

## Acknowledgements

- Icons provided by [React Icons](https://react-icons.github.io/react-icons/)
- Drag and Drop functionality powered by [@hello-pangea/dnd](https://github.com/hello-pangea/dnd)
