import React,{useEffect} from 'react';
import { BrowserRouter,Routes ,Route} from 'react-router-dom';

import './App.css';
import { NavBar } from './components/NavBar';
import { TaskPage } from './features/tasks/TaskPage';
import { useAppDispatch } from './store/hooks';
import {SingleTask } from './features/tasks/singleTask';
import {CreateTaskPage } from './features/tasks/createTaskPage';
import {  EditTaskPage } from './features/tasks/EditTaskPage';
import { getTasks } from './features/tasks/taskSlice';

function App() {


  const dispatch=useAppDispatch();



  useEffect(()=>{
      dispatch(getTasks())
  },[dispatch])


  return (
    <BrowserRouter>
      <NavBar/>
      <Routes>
          <Route path="/" element={<TaskPage/>}/>
          <Route path="/task/:id" element={<SingleTask/>}/>
          <Route path="/create" element={<CreateTaskPage/>} />
          <Route path="/update/:id" element={<EditTaskPage/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
