export interface allTasksRequest {
    token: string
}

export type TaskStatus = 
  | "NOT_STARTED"
  | "IN_PROGRESS"
  | "COMPLETED";

export type Priority = 
  | "LOW"
  | "MEDIUM"
  | "HIGH";

export interface Task {
    id: string
    title: string
    description: string
    status: TaskStatus
    priority: Priority
    dueDate: string | null
    userId: string
    createdAt: string
    updatedAt: string
}

export type allTasksResponse = Task[];