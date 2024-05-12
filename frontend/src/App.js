import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './Components/Layout';
import Home from './Pages/Home';
import ModuleList from './Pages/ModuleList';
import SignIn from './Pages/SignIn'
import SignUp from './Pages/SignUp'

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
            {/* <Route path='/' element={<Home />} />
          <Route path='module/list/' element={<ModuleList />} />
          <Route path='signup/' element={<SignUp />} /> */}
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
