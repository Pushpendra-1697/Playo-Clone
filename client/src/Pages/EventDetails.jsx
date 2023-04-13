import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { backend_url } from './BackendURL';
import { useSelector } from 'react-redux';
import { BiLoaderCircle } from "react-icons/bi";
import { Alert, AlertIcon, Box, Button, Container, Text } from '@chakra-ui/react';


function getEventById(id) {
  return fetch(`${backend_url}/events/get/${id}`).then((res) => res.json());
};

const EventDetails = () => {
  const { loading, error } = useSelector((store) => store.eventManager);
  const [data, setData] = useState(null);
  const params = useParams();

  useEffect(() => {
    getEventById(params.event_id).then((res) => setData(res.event)).catch((err) => console.log(err));
  }, []);

  if (data == null) {
    return (<h1 style={{ textAlign: "center", fontSize: "23px" }}>Loading....</h1>)
  };
  console.log(data)
  return (
    <Container boxShadow="rgba(0, 0, 0, 0.35) 0px 5px 15px" padding={"10px"} borderRadius={"10px"} mt={["15%", "15%", "5%"]}>
      {(loading) && (
        <Box display={"flex"} justifyContent="center" alignItems={"center"}>
          {" "}
          <BiLoaderCircle fontSize={"34px"} />{" "}
        </Box>
      )}
      {error && <Box display={"flex"} justifyContent="center" alignItems={"center"}>
        <Alert status='error' w="300px" >
          <AlertIcon />
          {`Something went Wrong`}
        </Alert>
      </Box>}

      <Text>Event Name: {data.name}</Text>
      <Text>Description: {data.desc}</Text>
      <Text>Start Date: {data.start}</Text>
      <Text>End Date: {data.end}</Text>
      <Text>Player Limit: {data.maxPlayer}</Text>
      <Text mb="13px">CreatedAt: {data.createdAt}</Text>
      <Box display={"flex"} justifyContent={"space-evenly"}>
      <Link style={{ textDecoration: "none", color: "red", background: "black", padding: "8px", borderRadius: "10px" }} to='/'>Go Back</Link>
      <Button>Join Event</Button>
      </Box>
    </Container>
  )
}

export default EventDetails;
