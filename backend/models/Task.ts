import { Schema, model } from 'mongoose';


enum statusType{
    Completed="Completed",
    Pending="Pending",
    Progress="Progress",
    Started="Started",
    NotStarted="Not Started Yet"
}
export interface Task {
    name:string;
    descripion:string;
    status:statusType;
    Days:number;
    taskDate:Date ;
}

const TaskSchema = new Schema<Task>({
    name: {type: String, required: true},
    descripion: {type: String, required: true},
    status: {type: String, enum:statusType, 
        default:statusType.NotStarted, 
        required: true},
    Days: {type: Number, required: true},
    taskDate: {type: Date, required: true},
});

export default model<Task>('Task', TaskSchema)