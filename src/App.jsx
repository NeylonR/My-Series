import Login from './views/pages/Login';
import Layout from './views/components/Layout';
import Signup from './views/pages/Signup';
import Home from './views/pages/Home';
import { Route, Routes } from 'react-router-dom';
import RequireAuth from './views/components/RequireAuth';
import RequireNotAuth from './views/components/RequireNotAuth';
import SerieDetail from './views/pages/SerieDetail';
import UserSeriesList from './views/pages/UserSeriesList';

export default function App() {
  return (
    <Routes>
      <Route path={"/"} element={<Layout />}>

        <Route path={"/"} element={<Home />}/>
        <Route path={'/detail/:serieId'} element={<SerieDetail />}/>
        {/* if already logged in then can't access these pages */}
        <Route element={<RequireNotAuth />}>
          <Route path={'/login'} element={<Login />}/>
          <Route path={'/signup'} element={<Signup />}/>
        </Route>
        
        {/* can only be access if logged in */}
        <Route element={<RequireAuth />}>
        <Route path={'/myList'} element={<UserSeriesList />}/>
        </Route>
      </Route>
    </Routes>
  );
}