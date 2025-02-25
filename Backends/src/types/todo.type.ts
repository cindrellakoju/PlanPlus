export type Callback = (err: any, results?: any) => void;

export interface todo {
    id : number,
    task: string,
    status? : string,
    priority?: string,
    due_date ?: Date | string
}
export interface inserttodo {
    id : number,
    task: string,
    status : string,
    priority : string,
    due_date : Date | string
}