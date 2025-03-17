export interface Todo {
    todolist_id: number;  
    task: string;         
    due_date: string;     
    priority: 'low' | 'medium' | 'high';
    status: 'pending' | 'completed' | 'overdue';  
    created_at: string;   
    updated_at: string;   
}

export interface ComponentType {
  component_id : number;
  name: string;
  order_index : number;
  position_x : number;
  position_y : number;
}

export interface selectedComponent {
  component_id : number;
  name: string
}

export interface userinfo{
  first_name : string,
  last_name : string,
  user_id : number
}