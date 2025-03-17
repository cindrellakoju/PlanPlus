export type Callback = (err: any, results?: any) => void;

export interface todo {
    id : number,
    task: string,
    status? : string,
    priority?: string,
    due_date ?: Date | string
}
export interface inserttodo {
    task: string,
    status : string,
    priority : string,
    due_date : Date | string
}

export interface validation {
    id ?: number,
    task: string,
    status : string,
    priority : string,
    due_date : Date | string
}

export interface components{
    component_id ?: number,
    // name? : string,
    order_index : number,
    position_x : number,
    position_y : number
}

export interface user{
    user_id?: number,
    first_name ?: string,
    last_name ?: string,
    email : string,
    password: string
}
export interface userinputfortable {
    name: string;         // Name of the table
    colname: string[];    // Array of column names
    coltype: string[];    // Array of column types
    unique: boolean[];    // Array of uniqueness constraints (true/false for each column)
}