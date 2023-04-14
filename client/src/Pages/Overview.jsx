import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom';
import { backend_url } from './BackendURL';
import { Table, TableContainer, Tbody, Td, Th, Thead, Tr, Text, Button, Box, Alert, AlertIcon } from '@chakra-ui/react';
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';
import { BiLoaderCircle } from "react-icons/bi";

const Overview = () => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);


    useEffect(() => {
        getRequests();
    }, []);

    const getRequests = async () => {
        try {
            setIsLoading(true);
            let res = await fetch(`${backend_url}/getAllRequests`, {
                method: "GET",
                headers: {
                    "Content-Type": 'application/json',
                    token: localStorage.getItem('token')
                }
            });
            res = await res.json();
            setData(res);
            setIsLoading(false);
            setIsError(false);
        } catch (err) {
            console.log(err);
            setIsError(true);
            setIsLoading(false);
        }
    };


    const handleUpdateStatus = async (id, change, eventId) => {
        let payload = { status: change };
        try {
            let res = await fetch(`${backend_url}/changeStatus/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": 'application/json',
                    "token": localStorage.getItem('token'),
                    "event_id": eventId
                },
                body: JSON.stringify(payload)
            });
            res = await res.json();
            console.log(res);
            getRequests();
        } catch (err) {
            console.log(err);
        }
    };


    const handleRejectRequest = async (id, eventId) => {
        try {
            let res = await fetch(`${backend_url}/rejectRequest/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": 'application/json',
                    "token": localStorage.getItem('token'),
                    "event_id": eventId
                },
            });
            res = await res.json();
            console.log(res);
            getRequests();
        } catch (err) {
            console.log(err);
        }
    };

    if (localStorage.getItem('token') === null) {
        return <Navigate to="/login" />
    };
    return (
        <>
            {isLoading && (
                <Box display={"flex"} justifyContent="center" alignItems={"center"}>
                    {" "}
                    <BiLoaderCircle fontSize={"34px"} />{" "}
                </Box>
            )}
            {isError && <Box display={"flex"} justifyContent="center" alignItems={"center"}>
                <Alert status='error' w="300px" >
                    <AlertIcon />
                    {`Something went Wrong 😒`}
                </Alert>
            </Box>}
            <TableContainer>
                <Table size='sm'>
                    <Thead>
                        <Tr>
                            <Th>Event Name</Th>
                            <Th>Player Limit</Th>
                            <Th>User Name</Th>
                            <Th>Status</Th>
                            <Th>Change Status</Th>
                            <Th>Reject Request</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {data && data.map((ele) =>
                            <Tr key={ele._id}>
                                <Td>{ele.name}</Td>
                                <Td>{ele.maxPlayer}</Td>
                                <Td>{ele.users && ele.users.map(({ userName, _id }) =>
                                    <Text mb='2%' key={_id}>{userName}</Text>
                                )}</Td>
                                <Td>{ele.users && ele.users.map(({ status, _id }) =>
                                    <Text mb='2%' key={_id}>{status ? <Text color={"green"}>Accepted</Text> : <Text color={"goldenrod"}>Pending</Text>}</Text>
                                )}</Td>
                                <Td>{ele.users && ele.users.map(({ _id, status }) =>
                                    <Text><Button isDisabled={localStorage.getItem('user_id') !== ele.admin_id} mb='2%' key={_id} onClick={() => handleUpdateStatus(_id, !status, ele._id)}><AiFillEdit color='green' /></Button></Text>
                                )}</Td>
                                <Td>{ele.users && ele.users.map(({ _id }) =>
                                    <Text><Button isDisabled={localStorage.getItem('user_id') !== ele.admin_id} mb='2%' key={_id} onClick={() => handleRejectRequest(_id, ele._id)}><AiFillDelete color='red' /></Button></Text>
                                )}</Td>
                            </Tr>
                        )}
                    </Tbody>
                </Table>
            </TableContainer>
        </>
    );
}

export default Overview;