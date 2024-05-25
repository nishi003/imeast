import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './Components/Home/Layout';
import Home from './Pages/Home';
import ModuleList from './Pages/ModuleList';
import SignIn from './Pages/SignIn';
import SignUp from './Pages/SignUp';
import AdminLayout from './Components/Admin/AdminLayout';
import AdminModules from './Pages/Admin/AdminModules';
import UserInformation from './Pages/Admin/UserInformation';
import Notifications from './Pages/Admin/Notifications';
import UserLayout from './Components/User/UserLayout';
import UserProfile from './Pages/User/UserProfile';
import UserModules from './Pages/User/UserModules';
import UserPurchases from './Pages/User/UserPurchases';

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
            <Route index element={<AdminModules />} />
            <Route path='module/*' element={<AdminModules />}>
              <Route index element={<AdminModules />} />
              <Route path='module/list/' element={<AdminModules />} />
              <Route path=':moduleID/' element={<AdminModules />} />
              <Route path=':moduleID/edit/' element={<AdminModules />} />
              <Route path=':moduleID/video/:videoID/' element={<AdminModules />} />
              <Route path=':moduleID/video/create/' element={<AdminModules />} />
              <Route path=':moduleID/video/:videoID/comment/:commentID/' element={<AdminModules />} />
            </Route>
            <Route path='user-info/*' element={<UserInformation />} />
            <Route path='notifications/' element={<Notifications />} />
          </Route>
          <Route path='/user/*' element={<UserLayout />}>
            <Route index element={<UserProfile />} />
            <Route path='profile/' element={<UserProfile />} />
            <Route path='transaction/list/' element={<UserProfile />} />
            <Route path='module/*' element={<UserModules />}>
              <Route path=':moduleID/' />
              <Route path=':moduleID/video/:videoID/' />
            </Route>
            <Route path='purchase/list/' element={<UserPurchases />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
