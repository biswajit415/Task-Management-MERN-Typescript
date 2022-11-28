
import React,{useEffect} from 'react'
import { Container,Card,Row,Col,Button } from 'react-bootstrap'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { deleteTask, getTaskById} from './taskSlice';


type IDparams = {
    id: string;
  };

export const SingleTask: React.FC = () => {


    const dispatch=useAppDispatch();
    const navigate=useNavigate()
    const {singleTask}=useAppSelector(state=>state.task);
    console.log(singleTask)
    const {id}=useParams<IDparams>() ;

    const navigateItem=()=>{
        navigate(`/update/${singleTask?._id}`,{state:singleTask})
    }

    useEffect(()=>{
        if(id)
        dispatch(getTaskById(id))

    },[dispatch])


    const deleteTaskHandler=()=>{
  
        if(id){
        dispatch(deleteTask(id))
        .then(data=> navigate('/'))
    
       }
    }

  return (
    <Container>
       
        <Card>
            <Card.Header style={{display:'flex', justifyContent:'space-between',backgroundColor:'#edd89d'}}>
                <div>
                    <h1>  {singleTask?.name}</h1>
                </div>
                <div style={{height:'50%'}}>
              
                    <Button onClick={navigateItem}>Update</Button> &nbsp; &nbsp;
                    <Button style={{backgroundColor:'red'}} onClick={deleteTaskHandler}>Delete</Button>
              
               </div>
                
            </Card.Header>
            <Card.Body style={{backgroundColor:'#faf9f5'}}>
                <div style={{display:'flex', justifyContent:'space-around'}}>
                    <div>
                        <p><strong>Descripion: </strong>{singleTask?.descripion}</p>
                    </div>
                     <div></div><div >
                        <p><strong>Date:</strong> { singleTask?new Date(singleTask?.taskDate).toISOString().substring(0,10):null}</p>
                    </div> 

                    <div>
                        <p><strong>Status: </strong>{singleTask?.status}</p>
                    </div>
                    <div>
                        <p><strong>Number Of Days Required:</strong> {singleTask?.Days}</p>
                    </div>
                </div>
               
            </Card.Body>
        </Card>
    </Container>
  )
}
