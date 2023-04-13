import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { getEvents } from '../redux/Event/event.action';
import { Box } from '@chakra-ui/react';

const Home = () => {
  const { loading, error, events } = useSelector((store) => store.eventManager);
  const dispatch = useDispatch();
  useEffect(() => {
    getEvents();
  }, []);

  console.log(events);

  if (localStorage.getItem('token') === null) {
    return <Navigate to="/login" />
  }
  return (
    <Box>
      
    </Box>
  )
}

export default Home