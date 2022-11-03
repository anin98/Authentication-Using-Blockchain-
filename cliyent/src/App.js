import Register from './Register';
import Login from './Login';
import Layout from './Layout';
import RequireAuth from './RequireAuth';
import Home from './Home';
import {Routes, Route} from 'react-router-dom';

function App() {

  return (
    <Routes>
      <Route path ="/" element ={<Layout/>}>
        {/*public routes */}
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />

        {/*protected routes */}
        <Route element ={<RequireAuth/>}>
          <Route path ="/" element={<Home/>} />
        </Route>


      </Route>
    </Routes>
  );
}

export default App;