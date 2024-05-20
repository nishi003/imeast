import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './Components/Layout';
import Home from './Pages/Home';
import ModuleList from './Pages/ModuleList';
import SignIn from './Pages/SignIn';
import SignUp from './Pages/SignUp';
import AdminLayout from './Components/AdminLayout';
import AdminModules from './Pages/AdminModules';
import UserInformation from './Pages/UserInformation';
import Notifications from './Pages/Notifications';
import UserLayout from './Components/UserLayout';
import UserProfile from './Pages/UserProfile';
import UserModules from './Pages/UserModules';
import UserPurchases from './Pages/UserPurchases';

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
              <Route path=':moduleID/' />
              <Route path=':moduleID/edit/' element={<AdminModules />} isEdit={true} />
              <Route path=':moduleID/video/:videoID/' />
              <Route path=':moduleID/video/:videoID/comment/:commentID/' />
            </Route>
            <Route path='user-info/*' element={<UserInformation />}>
            </Route>
            <Route path='notifications/' element={<Notifications />} />
          </Route>
          <Route path='/user/*' element={<UserLayout />}>
            <Route index element={<UserProfile />} />
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
