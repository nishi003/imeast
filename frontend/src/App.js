import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './Components/Layout'
import Navbar from './Components/Navbar'
import Home from './Pages/Home'
import ModuleList from './Pages/ModuleList'

function App() {
  return (
    <div>
      <div className='flex h-screen flex-col'>
        <Home />
      </div>

    </div>
    // <BrowserRouter>
    //   <Routes>
    //     <Route path='/' element={<Layout />}>
    //       <Route index element={<Home />} />
    //       <Route path='modules' element={<ModuleList />} />
    //     </Route>
    //   </Routes>
    // </BrowserRouter>
  );
}

export default App;
