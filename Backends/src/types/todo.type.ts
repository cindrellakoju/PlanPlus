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