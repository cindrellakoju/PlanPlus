import { Dispatch, SetStateAction } from 'react';

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
  user_table_id : number;
  user_id :number;
  table_name : string
  theme_id : number;
  orderindex : number;
  height : number;
  width : number;
  checkbox : boolean,
  bg_for_header :boolean,
  col_name : boolean,
  table_margin : boolean 
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

export interface ThemeProps{
  table_name: string;
  urlname?: string;
  height: number;
  width : number;
  id?: number | undefined,
  checkbox:  boolean;
  tablemargin : boolean,
  backgroundforhead : boolean,
  displaycolname : boolean,
  setLocalData?: Dispatch<SetStateAction<any[]>>;
  localData ?: any[]
  colnames ?: string | string[]
  tabledataid ?: number
  creatingtable ?: boolean ,
  themeid : number,
}