
import React,{useState} from 'react'
import { Container,Form ,Button} from 'react-bootstrap';
import { Task } from '../../interfaces/Task';
import { useAppDispatch } from '../../store/hooks';
import { createTask } from './taskSlice';
import { useNavigate } from 'react-router-dom';





export const CreateTaskPage = () => {

    const dispatch=useAppDispatch();
    const navigate = useNavigate();

    const initilData:Task={
        name:'',
        descripion:'',
        status:'',
        taskDate:new Date(),
        Days:0,
    }

    const [task,setTask]=useState<Task>(initilData)



    const handleSubmit=async(e:React.FormEvent<HTMLFormElement>)=>{
            e.preventDefault();
            const data=await dispatch(createTask(task))
            if(data.payload){
                const {_id}=data.payload as Task;
              navigate(`/task/${_id}`);
            }
       
    }


  return (
    <Container style={{backgroundColor:'#ffffb3', width:'70%', padding:'10px',borderRadius:'15px'}} >
        <Form onSubmit={(e)=>handleSubmit(e)}>

            <Form.Group className="mb-3">
                <Form.Label>Task Name</Form.Label>
                <Form.Control 
                    onChange={(e)=>setTask(task=>({...task,name:e.target.value}))} 
                    value={task.name}  
                    type="text" placeholder="Enter Task Name" 
                />
            </Form.Group>

           <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control 
                    onChange={(e)=>setTask(task=>({...task,descripion:e.target.value}))}  
                    value={task.descripion}  
                    type="text" 
                    placeholder="Enter task description" 
                />
            </Form.Group>

             <Form.Group className="mb-3">
                <Form.Label>Total Required Days</Form.Label>
                <Form.Control type='number'
                    onChange={(e)=>setTask(task=>({...task,Days:parseInt(e.target.value?e.target.value:'0')}))}  
                    value={task.Days}  
                    placeholder="Enter the number of days" 
                />
            </Form.Group>


            <Form.Group className="mb-3">
                <Form.Label>Task Date</Form.Label>
                <Form.Control 
                    onChange={(e)=>setTask(task=>({...task,date:new Date(e.target.value)}))}  
                    value={task.taskDate?task.taskDate.toISOString().substring(0,10):undefined}  
                    type="date"
                    placeholder="Enter  the date" 
                />
            </Form.Group>


            <Form.Group controlId="formBasicSelect">
                <Form.Label>Task Status</Form.Label>
                <Form.Select 
                onChange={(e)=>setTask(task=>({
                    ...task, status:e.target.value
                }))}>
                    <option value="Completed">Completed</option>
                    <option value="Pending">Pending</option>
                    <option value="Progress">Progress</option>
                    <option value="Started">Started</option>
                    <option value="NotStarted">Not Started Yet</option>
                </Form.Select>
            </Form.Group>
             <br/>
            <Button  type="submit">Submit</Button>
        </Form>
    </Container>
  )
}
