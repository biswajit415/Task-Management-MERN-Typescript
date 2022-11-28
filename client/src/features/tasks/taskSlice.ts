
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Action } from '@remix-run/router';
import axios from 'axios';
import { Task } from '../../interfaces/Task';


interface TaskState {
    tasks:Task[] | null;
    loading:boolean;
    singleTask:Task | null;
    errors:any
};

const initialState:TaskState={
    tasks:[],
    singleTask:null,
    loading: false,
    errors:null,
};


export const getTasks=createAsyncThunk<Task[]>(
        "tasks/getTasks",
        async(_,thunkAPI)=>{
                try {
                    const response=await axios.get('http://localhost:3000/api/tasks');
                    return response.data as Task[];
                } catch (error) {
                     return thunkAPI.rejectWithValue(error)
                }
        }
)


export  const getTaskById=createAsyncThunk<Task,string>(
    'tasks/getTaskById',
    async(id,thunkApi)=>{
        try {
            const response=await axios.get(`http://localhost:3000/api/tasks/task/${id}`);
            return response.data as Task;
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    }
)


export  const createTask=createAsyncThunk<Task,Task>(
    'tasks/createTask',
    async(data,thunkApi)=>{
        try {
            const response=await axios.post(`http://localhost:3000/api/tasks/task`,data);
            thunkApi.dispatch(getTasks());
            return response.data as Task;
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }

    }
)


export  const updateTask=createAsyncThunk<Task,Task>(
    'tasks/updateTask',
    async(data,thunkApi)=>{
        try {
            const response=await axios.put(`http://localhost:3000/api/tasks/task/${data._id}`,data);
            return response.data as Task;
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }

    }
)

export  const deleteTask=createAsyncThunk<Task,string>(
    'tasks/deleteTask',
    async(id,thunkApi)=>{
        try {
            const response=await axios.delete(`http://localhost:3000/api/tasks/task/${id}`);
            await thunkApi.dispatch(getTasks());
            return response.data;
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }

    }
)


export const taskSlice= createSlice({
    name:'tasks',
    initialState,
    reducers:{
        setTasks:(state,action:PayloadAction<Task[]>)=>{
            state.tasks=action.payload
        }
    },

    extraReducers:(builder)=>{
        builder.addCase(getTasks.pending,(state)=>{
                state.loading=true;
        });

        builder.addCase(getTasks.fulfilled,(state,action)=>{
            state.tasks=action.payload;
            state.loading=false
        })

        builder.addCase(getTasks.rejected,(state,action)=>{
            state.loading=false;
            state.errors=action.payload;
        })

        builder.addCase(getTaskById.pending,(state,action)=>{
            state.loading=true;
        })

        builder.addCase(getTaskById.fulfilled,(state,action)=>{
            state.singleTask=action.payload;
            state.loading=false;
        });


        builder.addCase(getTaskById.rejected,(state,action)=>{
            state.loading=false;
            state.errors=action.payload;
        })

        builder.addCase(updateTask.fulfilled,(state,action:PayloadAction<Task>)=>{
            state.singleTask=action.payload
        })


    }
})


export default taskSlice.reducer;

export const {setTasks}=taskSlice.actions;






