import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './Components/Home/Layout';
import Home from './Pages/Home';
import ModuleList from './Pages/ModuleList';
import SignIn from './Pages/SignIn';
import SignUp from './Pages/SignUp';
import AdminLayout from './Components/Admin/AdminLayout';
import AdminModules from './Pages/Admin/AdminModules';
import AdminModuleList from './Pages/Admin/AdminModuleList';
import AdminModuleCreate from './Pages/Admin/AdminModuleCreate';
import AdminModuleInfo from './Pages/Admin/AdminModuleInfo';
import AdminModuleEdit from './Pages/Admin/AdminModuleEdit';
import AdminLessonCreate from './Pages/Admin/AdminLessonCreate';
import AdminLessonDetail from './Pages/Admin/AdminLessonDetail';
import UserInformation from './Pages/Admin/UserInformation';
import Notifications from './Pages/Admin/Notifications';
import UserLayout from './Components/User/UserLayout';
import UserProfile from './Pages/User/UserProfile';
import UserModules from './Pages/User/UserModules';
import UserPurchases from './Pages/User/UserPurchases';

import { ModuleContext, useModuleContext, LessonContext, useLessonContext, } from './Contexts/MLCContext';

function App() {
  return (
    <ModuleContext.Provider value={useModuleContext()}>
      <LessonContext.Provider value={useLessonContext()}>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Layout />}>
              <Route index element={<Home />} />
              <Route path='module/list/' element={<ModuleList />} />
              <Route path='signin/' element={<SignIn />} />
              <Route path='signup/' element={<SignUp />} />
            </Route>
            <Route path='/admin/*' element={<AdminLayout />}>
              <Route path='module/list/' element={<AdminModuleList />} />
              <Route path='module/create/:moduleNumber/' element={<AdminModuleCreate />} />
              <Route path='module/:moduleID/' element={<AdminModuleInfo />} />
              <Route path='module/:moduleID/edit/' element={<AdminModuleEdit />} />
              <Route path='module/:moduleID/lesson/create/' element={<AdminLessonCreate />} />
              <Route path='module/:moduleID/lesson/:lessonID/' element={<AdminLessonDetail />} />
              {/* 
              <Route index element={<AdminModules />} />
                <Route path=':moduleID/video/:videoID/' element={<AdminModules />} />
                <Route path=':moduleID/video/create/' element={<AdminModules />} />
                <Route path=':moduleID/video/:videoID/comment/:commentID/' element={<AdminModules />} />
              </Route> 
              */}
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
      </LessonContext.Provider>
    </ModuleContext.Provider>
  );
}

export default App;
