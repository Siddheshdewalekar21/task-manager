export interface Task {
  id: string;
  content: string;
  completed: boolean;
}

export interface TaskList {
  tasks: Task[];
} 