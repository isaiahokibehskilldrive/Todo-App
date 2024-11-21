"use client";

import { useState } from "react";
import styled from "styled-components";
import { Task, SubTask } from "../store/taskStore";

interface TaskItemProps {
  task: Task;
  taskNumber: number;
  isOverdue?: boolean;
  onStartTask: () => void;
  onEndTask: () => void;
  onToggleComplete: () => void;
  onDelete: () => void;
  onEdit: (updatedTask: { title: string; dueDate?: string | null }) => void;
  onAddSubtask: (subtask: SubTask) => void;
  onToggleSubtask: (subtaskId: string) => void;
}

const TaskItem = ({
  task,
  taskNumber,
  isOverdue = false,
  onStartTask,
  onEndTask,
  onDelete,
  onEdit,
  onAddSubtask,
  onToggleSubtask,
}: TaskItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);
  const [editedDueDate, setEditedDueDate] = useState(
    task.dueDate ? new Date(task.dueDate).toISOString().split("T")[0] : ""
  );

  const handleSave = () => {
    if (!editedTitle.trim()) {
      alert("Task title cannot be empty.");
      return;
    }
  
    // Log values to ensure they are updated correctly
    console.log("Attempting to save changes:");
    console.log("Edited Title:", editedTitle);
    console.log("Edited Due Date:", editedDueDate);
  
    onEdit({ title: editedTitle, dueDate: editedDueDate || null });
  
    setIsEditing(false); // Close the edit mode
  };
  
  return (
    <TaskContainer $isOverdue={isOverdue}>
      <TaskInfo>
        <TaskNumber>{taskNumber}.</TaskNumber>

        {isEditing ? (
          <>
            <EditInput
              type="text"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              placeholder="Edit title"
            />
            <EditInput
              type="date"
              value={editedDueDate}
              onChange={(e) => setEditedDueDate(e.target.value)}
            />
          </>
        ) : (
          <>
            <TaskTitle $completed={task.completed}>{task.title}</TaskTitle>
            {task.dueDate && (
              <DueDate $isOverdue={isOverdue}>
                Due: {new Date(task.dueDate).toLocaleDateString()}
              </DueDate>
            )}
          </>
        )}
        {isOverdue && <OverdueLabel>Overdue</OverdueLabel>}
      </TaskInfo>

      <StatusControls>
        <CheckboxLabel>
          <Checkbox $completed={task.inProgress} onClick={onStartTask} />
          Start Task
        </CheckboxLabel>
        {task.inProgress && <StatusText>In Progress</StatusText>}

        <CheckboxLabel>
          <Checkbox $completed={task.completed} onClick={onEndTask} />
          End Task
        </CheckboxLabel>
        {task.completed && <StatusText>Completed Task Successfully!</StatusText>}
      </StatusControls>

      <Actions>
        {isEditing ? (
          <>
            <ActionButton onClick={handleSave}>💾 Save</ActionButton>
            <ActionButton onClick={() => setIsEditing(false)}>❌ Cancel</ActionButton>
          </>
        ) : (
          <>
            <ActionButton onClick={() => setIsEditing(true)}>✏️ Edit</ActionButton>
            <ActionButton
              onClick={() => {
                if (window.confirm("Are you sure you want to delete this task?")) {
                  onDelete();
                }
              }}
            >
              🗑️ Delete
            </ActionButton>
          </>
        )}
        <ActionButton
          onClick={() => {
            const subtaskTitle = prompt("Enter Subtask Title:");
            if (subtaskTitle) {
              onAddSubtask({
                id: Date.now().toString(),
                title: subtaskTitle,
                completed: false,
              });
            }
          }}
        >
          ➕ Add Subtask
        </ActionButton>
      </Actions>

      {task.subtasks?.length > 0 && (
        <SubtaskList>
          {task.subtasks.map((subtask) => (
            <SubtaskItem key={subtask.id}>
              <Checkbox
                $completed={subtask.completed}
                onClick={() => onToggleSubtask(subtask.id)}
              />
              <SubtaskTitle $completed={subtask.completed}>
                {subtask.title}
              </SubtaskTitle>
            </SubtaskItem>
          ))}
        </SubtaskList>
      )}
    </TaskContainer>
  );
};

export default TaskItem;

/* Styled Components */
const TaskContainer = styled.div<{ $isOverdue?: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 16px;
  background: ${({ $isOverdue }) => ($isOverdue ? "#ffe6e6" : "#ffffff")};
  border: 2px solid #f0f0f0;
  border-radius: 8px;
  margin-bottom: 24px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const TaskInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const TaskNumber = styled.div`
  font-size: 18px;
  font-weight: bold;
  color: #007aff;
`;

const TaskTitle = styled.div<{ $completed: boolean }>`
  font-size: 16px;
  font-weight: 500;
  color: ${({ $completed }) => ($completed ? "#9e9e9e" : "#333")};
  text-decoration: ${({ $completed }) => ($completed ? "line-through" : "none")};
`;

const DueDate = styled.div<{ $isOverdue?: boolean }>`
  font-size: 14px;
  color: ${({ $isOverdue }) => ($isOverdue ? "red" : "#666")};
`;

const OverdueLabel = styled.div`
  color: red;
  font-weight: bold;
  font-size: 14px;
  margin-left: auto;
`;

const StatusControls = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
`;

const StatusText = styled.div`
  font-size: 14px;
  font-weight: bold;
  color: #4caf50;
`;

const Actions = styled.div`
  display: flex;
  gap: 8px;
`;

const ActionButton = styled.button`
  background: none;
  border: none;
  font-size: 16px;
  cursor: pointer;
  color: #007aff;

  &:hover {
    color: #0056b3;
  }
`;

const EditInput = styled.input`
  font-size: 16px;
  padding: 4px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const SubtaskList = styled.div`
  margin-top: 8px;
  padding-left: 16px;
`;

const SubtaskItem = styled.div`
  display: flex;
  align-items: center;
  gap: 9px;
`;

const SubtaskTitle = styled.div<{ $completed: boolean }>`
  font-size: 14px;
  color: ${({ $completed }) => ($completed ? "#9e9e9e" : "#333")};
  text-decoration: ${({ $completed }) => ($completed ? "line-through" : "none")};
`;

const Checkbox = styled.div<{ $completed: boolean }>`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: ${({ $completed }) => ($completed ? "#4caf50" : "#e0e0e0")};
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.2);
  cursor: pointer;
`;
