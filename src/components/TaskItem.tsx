"use client";
import styled from "styled-components";
import { Task, SubTask } from "../store/taskStore";

interface TaskItemProps {
  task: Task;
  taskNumber: number; // Add task number as a prop
  isOverdue?: boolean;
  onStartTask: () => void;
  onEndTask: () => void;
  onToggleComplete: () => void;
  onDelete: () => void;
  onEdit: () => void;
  onAddSubtask: (subtask: SubTask) => void;
  onToggleSubtask: (subtaskId: string) => void;
}

const TaskItem = ({
  task,
  taskNumber,
  isOverdue = false,
  onStartTask,
  onEndTask,
  onToggleComplete,
  onDelete,
  onEdit,
  onAddSubtask,
  onToggleSubtask,
}: TaskItemProps) => {
  return (
    <TaskContainer $isOverdue={isOverdue}>
      <TaskInfo>
        <TaskNumber>{taskNumber}.</TaskNumber> {/* Display task number */}
        <TaskTitle $completed={task.completed}>{task.title}</TaskTitle>
        {isOverdue && <OverdueLabel>Overdue</OverdueLabel>}
      </TaskInfo>

      <StatusControls>
        <CheckboxLabel>
          <Checkbox
            $completed={task.inProgress}
            onClick={onStartTask}
          />
          Start Task
        </CheckboxLabel>
        {task.inProgress && <StatusText>In Progress</StatusText>}

        <CheckboxLabel>
          <Checkbox
            $completed={task.completed}
            onClick={onEndTask}
          />
          End Task
        </CheckboxLabel>
        {task.completed && <StatusText>Completed Task Successfully!</StatusText>}
      </StatusControls>

      <Actions>
        <ActionButton onClick={onEdit}>✏️</ActionButton>
        <ActionButton onClick={onDelete}>🗑️</ActionButton>
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
          ➕
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

const SubtaskList = styled.div`
  margin-top: 8px;
  padding-left: 16px;
`;

const SubtaskItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const SubtaskTitle = styled.div<{ $completed: boolean }>`
  font-size: 14px;
  color: ${({ $completed }) => ($completed ? "#9e9e9e" : "#333")};
  text-decoration: ${({ $completed }) => ($completed ? "line-through" : "none")};
`;

/* Checkbox styled component */
const Checkbox = styled.div<{ $completed: boolean }>`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: ${({ $completed }) => ($completed ? "#4caf50" : "#e0e0e0")};
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.2);
  cursor: pointer;
`;
