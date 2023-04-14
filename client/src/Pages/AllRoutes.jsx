import { Box } from '@chakra-ui/react';
import React from 'react';
import { Route, Routes } from 'react-router-dom'
import Home from './Home';
import EventDetails from './EventDetails';
import Signup from './Signup';
import Login from './Login';
import Admin from './Admin';
import Overview from './Overview';


const AllRoutes = () => {
    return (
        <Box>
            <Routes>
                <Route path='/' element={<Home />}></Route>
                <Route path='/:event_id' element={<EventDetails />}></Route>
                <Route path='/register' element={<Signup />}></Route>
                <Route path='/login' element={<Login />}></Route>
                <Route path='/admin' element={<Admin />}></Route>
                <Route path='/overview' element={<Overview />}></Route>
            </Routes>
        </Box>
    );
}

export default AllRoutes;