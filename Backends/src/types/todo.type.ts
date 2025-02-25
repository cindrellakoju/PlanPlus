export type Callback = (err: any, results?: any) => void;

export interface todo {
    id : number,
    task: string,
    status? : string,
    priority?: string,
}