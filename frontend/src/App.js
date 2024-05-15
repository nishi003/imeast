import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './Components/Layout';
import Home from './Pages/Home';
import ModuleList from './Pages/ModuleList';
import SignIn from './Pages/SignIn';
import SignUp from './Pages/SignUp';
import AdminLayout from './Components/AdminLayout';
import Dashboard from './Pages/Dashboard';
import Modules from './Pages/AdminModules';
import UserInformation from './Pages/UserInformation';
import Forum from './Pages/Forum';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<Home />} />
            <Route path='module/list/' element={<ModuleList />} />
            <Route path='signin/' element={<SignIn />} />
            <Route path='signup/' element={<SignUp />} />
          </Route>
          <Route path='/admin/*' element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path='module/list/' element={<Modules />} />
            <Route path='user-info/' element={<UserInformation />} />
            <Route path='forum/' element={<Forum />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
