import Register from './Register';
import Login from './Login';
import Layout from './Layout';
import RequireAuth from './RequireAuth';
import Home from './Home';
import {Routes, Route} from 'react-router-dom';

import ErrorPage from './ErrorPage';
import Default from './Default';


function App() {

  return (
    <Routes>
      <Route path ="/" element ={<Layout/>}>
     
        {/*public routes */}
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="/" element={<Default/>}/>
       
        {/* <Route path ="/home" element={<Home/>} /> */}
       
        {/*protected routes */}
        <Route element ={<RequireAuth/>}>
          <Route path ="/" element={<Home/>} />
        </Route>

        <Route path="*" element={<ErrorPage />} />

      </Route>
    </Routes>
  );
}

export default App;
