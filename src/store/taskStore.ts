import { create } from "zustand";

export interface SubTask {
  id: string;
  title: string;
  completed: boolean;
}
export interface Task {
  id: string;
  title: string;
  completed: boolean;
  inProgress: boolean;
  dueDate?: string | null; // Allow null as a valid value
  subtasks: SubTask[];
}


interface TaskStore {
  tasks: Task[];
  addTask: (task: Task) => void;
  updateTask: (id: string, title: string) => void;
  toggleTaskCompletion: (id: string) => void;
  deleteTask: (id: string) => void;
  addSubtask: (taskId: string, subtask: SubTask) => void;
  toggleSubtask: (taskId: string, subtaskId: string) => void;
  startTask: (id: string) => void; // New: Start a task
  endTask: (id: string) => void; // New: End a task
  getOverdueTasks: () => Task[]; // Optional: Retrieve overdue tasks
}

export const useTaskStore = create<TaskStore>((set, get) => ({
  tasks: [],

  addTask: (task) =>
    set((state) => ({
      tasks: [
        ...state.tasks,
        { ...task, subtasks: [], inProgress: false }, // Default inProgress to false
      ],
    })),

  updateTask: (id, title) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === id ? { ...task, title } : task
      ),
    })),

  toggleTaskCompletion: (id) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      ),
    })),

  deleteTask: (id) =>
    set((state) => ({
      tasks: state.tasks.filter((task) => task.id !== id),
    })),

  addSubtask: (taskId, subtask) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === taskId
          ? { ...task, subtasks: [...task.subtasks, subtask] }
          : task
      ),
    })),

  toggleSubtask: (taskId, subtaskId) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              subtasks: task.subtasks.map((subtask) =>
                subtask.id === subtaskId
                  ? { ...subtask, completed: !subtask.completed }
                  : subtask
              ),
            }
          : task
      ),
    })),

  // New: Start a task
  startTask: (id) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === id
          ? { ...task, inProgress: true, completed: false }
          : task
      ),
    })),

  // New: End a task
  endTask: (id) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === id
          ? { ...task, inProgress: false, completed: true }
          : task
      ),
    })),

  // Optional: Get overdue tasks
  getOverdueTasks: () => {
    const now = new Date();
    return get().tasks.filter(
      (task) => task.dueDate && new Date(task.dueDate) < now && !task.completed
    );
  },
}));
