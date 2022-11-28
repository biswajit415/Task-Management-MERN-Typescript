
import React from 'react'
import { Container,Card,Row,Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useAppSelector } from '../../store/hooks'

export const TaskPage:React.FC = () => {
  const {loading,tasks,errors}=useAppSelector(state=>state.task)

  
  return (
    <Container>
      <Row>
        {
          tasks?.map(task=>(
            
            <Col key={task._id} sm={12} md={6} lg={4} xl={3} >
              <Link to={`/task/${task._id}`} style={{textDecoration:'none'}}>
                <Card style={{ 
                    padding:"15px",
                    margin:'2%',
                    backgroundImage:' linear-gradient(to right,#54aff0,#32db7c)'
                  }}>
                  <Card.Title style={{
                    display:'flex',
                    justifyContent:'center',
                    color:'black'
                  }}>
                    {task.name}
                  </Card.Title>
                </Card>
              </Link>
            </Col>
          ))
        }
        </Row>
    </Container>
  )
}

