import React,{useState,useEffect} from 'react'
import { Container,Form ,Button} from 'react-bootstrap';
import {  useNavigate, useParams } from 'react-router-dom';
import { Task } from '../../interfaces/Task';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getTaskById, updateTask } from './taskSlice';



export const EditTaskPage = () => {
 
    const dispatch=useAppDispatch();
    const {singleTask }=useAppSelector(state=>state.task)
    const {id}=useParams();
    const navigate = useNavigate();

    useEffect(()=>{
        if(id)
        dispatch(getTaskById(id))
    },[])

    const initilData={
        name:'',
        descripion:'',
        status:'',
        Days:0,
        taskDate:new Date(),
      
    }

    console.log(initilData)
    const [task,setTask]=useState<Task>(initilData)


    useEffect(()=>{
        if (!singleTask) return; 
        const initilData={
            name:singleTask?.name,
            descripion:singleTask?.descripion,
            status:singleTask?.status,
            Days:singleTask?.Days,
            taskDate:new Date(singleTask?.taskDate),
         

        }
        setTask(initilData)
    
    },[singleTask])



    const handleSubmit=async(e:React.FormEvent<HTMLFormElement>)=>{
            e.preventDefault();
            dispatch(updateTask({_id:id,...task}))
            .then(data=>navigate(`/task/${id}`))
         
            
    }


  return (
    <Container style={{backgroundColor:'#ffffb3', width:'70%', padding:'10px',borderRadius:'15px'}} >
         <p style={{textAlign:'center',fontSize:'2rem'}}>Update Task</p>
        <Form onSubmit={(e)=>handleSubmit(e)}>
            <Form.Group className="mb-3">
                <Form.Label>Task Name</Form.Label>
                <Form.Control onChange={(e)=>setTask(task=>({...task,name:e.target.value}))} 
                value={task.name}  type="text" placeholder="Enter Task Name" />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control 
                    onChange={(e)=>setTask(task=>({...task,descripion:e.target.value}))}  
                    value={task.descripion}  type="text" placeholder="Enter task description" 
                />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Total Required Days</Form.Label>
                <Form.Control type='number'
                    onChange={(e)=>setTask(task=>({...task,Days:parseInt(e.target.value?e.target.value:'0')}))}  
                    value={task.Days}  placeholder="Enter the number of days" 
                />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Task Date</Form.Label>
                <Form.Control 
                    onChange={(e)=>setTask(task=>({...task,date:new Date(e.target.value)}))}  
                    value={task.taskDate?task.taskDate.toISOString().substring(0,10):undefined}  
                    type="date" placeholder="Enter  the date" 
                />
            </Form.Group>
          
            
            <Form.Group controlId="formBasicSelect">
                <Form.Label>Task Status</Form.Label>
                <Form.Select 
                value={task.status}
                onChange={(e)=>setTask(task=>({
                    ...task, status:e.target.value
                }))}>
                    <option value="Completed">Completed</option>
                    <option value="Pending">Pending</option>
                    <option value="Progress">Progress</option>
                    <option value="Started">Started</option>
                    <option value="Not Started Yet">Not Started Yet</option>
                </Form.Select>
            </Form.Group>
            <br/>
            <Button  type="submit">Update</Button>
        </Form>
    </Container>
  )
}
