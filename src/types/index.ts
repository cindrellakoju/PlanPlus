export interface Todo {
    todolist_id: number;  
    task: string;         
    due_date: string;     
    priority: 'low' | 'medium' | 'high';
    status: 'pending' | 'completed' | 'overdue';  
    created_at: string;   
    updated_at: string;   
  }