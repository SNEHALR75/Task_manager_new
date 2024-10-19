import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../node_modules/bootstrap/dist/js/bootstrap.min.js'
import '../node_modules/bootstrap-icons/font/bootstrap-icons.min.css'

import {BrowserRouter, Route, Routes} from 'react-router-dom'
import './App.css';
import Home from './components/Pages/Home.js';
import Navbar from './components/Navbar.js';
import SignUp from './components/Pages/SignUp.js';
import Login from './components/Pages/Login.js';
import useAuth from './hooks/useAuth.js';
import Account from './components/Pages/Account.js';
import AccountUpdateForm from './components/Pages/AccountUpdateForm.js';
import Users from './components/Pages/Users.js';
import UserTasks from './components/Pages/UserTasks.js';
import AccountActivation from './components/Pages/AccountActivation.js';
import Tasks from './components/Tasks.js';
import TaskForm from './components/TaskForm.js';
import PersistLogin from './components/PersistLogin.js';
import { Navigate } from 'react-router-dom';
import Error404 from './components/Pages/Error404.js';

function App() {

  const auth = useAuth()
  
  return (
    <div>
        <BrowserRouter>
            <Navbar/>
            
            <Routes>
              
              <Route path='/' element={<PersistLogin/>}>
                  <Route path='/' element={<Home/>}/>
                  <Route path='/tasks/add/' element={ auth.user.role=="manager"||auth.user.role=="team_leader" ? <TaskForm/> : <Navigate to={`/login/`}/> }/>
                  <Route path='/home' element={<Home/>}/>
                  <Route path='/signup' element={<SignUp/>}/>
                  <Route path='/login' element={<Login/>}/>

                  <Route path='/account' element={ auth.loggedIn ? <Account/> : <Navigate to={`/login/`}/> }/>
                  <Route path='/account/activate/:token/' element={<AccountActivation/>}/>
                  <Route path='/account/update' element={ auth.loggedIn ? <AccountUpdateForm/> : <Navigate to={`/login/`}/> }/>
                  <Route path='/users' element={ auth.loggedIn ? <Users/> : <Navigate to={`/login/`}/> }/>
                  <Route path='/user/tasks/:id/' element={ auth.user.role=="manager"||auth.user.role=="team_leader" ? <UserTasks/> : <Navigate to={`/login/`}/> }/>
                  <Route path='/tasks' element={ auth.loggedIn ? <Tasks/> : <Navigate to={`/login/`}/> }/>
                  
              </Route>

              <Route path='*' element={<Error404/>}/>
            
            </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
