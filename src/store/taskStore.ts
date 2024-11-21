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
  startTask: (id: string) => void;
  endTask: (id: string) => void;
  editDueDate: (id: string, dueDate: string | null) => void; // New: Edit due date
  getOverdueTasks: () => Task[];
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

  startTask: (id) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === id
          ? { ...task, inProgress: true, completed: false }
          : task
      ),
    })),

  endTask: (id) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === id
          ? { ...task, inProgress: false, completed: true }
          : task
      ),
    })),
    editDueDate: (id, dueDate) =>
      set((state) => ({
        tasks: state.tasks.map((task) =>
          task.id === id ? { ...task, dueDate } : task
        ),
      })),
    

  getOverdueTasks: () => {
    const now = new Date();
    return get().tasks.filter(
      (task) => task.dueDate && new Date(task.dueDate) < now && !task.completed
    );
  },
}));
