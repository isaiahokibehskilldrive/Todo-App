"use client"; 
import TaskItem from "../components/TaskItem";
import TaskForm from "../components/TaskForm";
import { useTaskStore } from "../store/taskStore";
import styled, { createGlobalStyle } from "styled-components";  // Import createGlobalStyle
import { useMemo } from "react";

// Global Styles
const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  body {
    font-family: Arial, sans-serif;
    background-color: #f9f9f9;
    color: #333;
  }
  h1 {
    font-size: 2rem;
    font-weight: 600;
  }
`;

const Home = () => {
  const {
    tasks,
    addTask,
    updateTask,
    toggleTaskCompletion,
    deleteTask,
    addSubtask,
    toggleSubtask,
    startTask,
    endTask,
  } = useTaskStore();

  // Memoize derived state for tasks
  const enhancedTasks = useMemo(() => {
    return tasks.map((task) => ({
      ...task,
      isOverdue: task.dueDate
        ? new Date(task.dueDate) < new Date() && !task.completed
        : false,
    }));
  }, [tasks]);

  // Handle adding a new task
  const handleAddTask = (title: string, dueDate?: string) => {
    addTask({
      id: Date.now().toString(),
      title,
      completed: false,
      inProgress: false,
      dueDate: dueDate || null,
      subtasks: [],
    });
  };

  return (
    <>
      <GlobalStyles /> {/* Apply global styles here */}
      <Container>
        <Header>Todo App</Header>
        <TaskForm onSubmit={handleAddTask} />
        <TaskList>
          {enhancedTasks.map((task, index) => (
            <TaskItem
              key={task.id}
              task={task}
              taskNumber={index + 1} // Displaying task number (index + 1)
              isOverdue={task.isOverdue}
              onStartTask={() => startTask(task.id)}
              onEndTask={() => endTask(task.id)}
              onToggleComplete={() => toggleTaskCompletion(task.id)}
              onDelete={() => deleteTask(task.id)}
              onEdit={() => {
                const newTitle = prompt("Edit Task", task.title);
                if (newTitle) updateTask(task.id, newTitle);
              }}
              onAddSubtask={(subtask) => addSubtask(task.id, subtask)}
              onToggleSubtask={(subtaskId) => toggleSubtask(task.id, subtaskId)}
            />
          ))}
        </TaskList>
      </Container>
    </>
  );
};

export default Home;

/* Styled Components */
const Container = styled.div`
  padding: 16px;
  max-width: 600px;
  margin: 0 auto;
`;

const Header = styled.h1`
  text-align: center;
  margin-bottom: 16px;
`;

const TaskList = styled.div`
  margin-top: 16px;
`;
