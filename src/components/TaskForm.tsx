"use client"; // Add this directive to make the component a client component

import styled from "styled-components";
import { useState } from "react";

interface TaskFormProps {
  onSubmit: (title: string, dueDate?: string) => void;
  initialTitle?: string;
  initialDueDate?: string;
}

const TaskForm = ({ onSubmit, initialTitle = "", initialDueDate = "" }: TaskFormProps) => {
  const [title, setTitle] = useState(initialTitle);
  const [dueDate, setDueDate] = useState(initialDueDate);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onSubmit(title.trim(), dueDate || undefined);
      setTitle("");
      setDueDate("");
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Input
        type="text"
        placeholder="Add a task..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
       
      />
      <label>
         Due Date: 
      <Input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
       
      />
      </label>
      <Button type="submit">Save</Button>
    </Form>
  );
};

export default TaskForm;

const Form = styled.form`
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
`;

const Input = styled.input`
  flex: 1;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const Button = styled.button`
  background-color: #0070f3;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #005bb5;
  }
`;
