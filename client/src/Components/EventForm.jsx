import { Box, Heading, Input } from '@chakra-ui/react'
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addEvent } from '../redux/Event/event.action';


const initialState = {
    name:'',
    desc: '',
    start: '',
    end: '',
    maxPlayer: ''
};
const EventForm = () => {
    const [formData, setFormData] = useState(initialState);
    const dispatch = useDispatch();

    const handleChange = (e) => {
        let { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(addEvent(formData));
        setFormData({
            desc: '',
            start: '',
            end: '',
            maxPlayer: '',
            name:''
        });
    };


    const { desc, start, end, maxPlayer, name } = formData;
    return (
        <Box>
            <Heading fontSize={"22px"} textAlign={"center"}>Create a new Sports Event</Heading>
            <form onSubmit={onSubmit} style={{ textAlign: "center" }}>
                <Box>
                    <Input w="300px" type={"text"} placeholder="Event Name" value={name} name="name" onChange={handleChange} />
                </Box>
                <Box>
                    <Input w="300px" type={"text"} placeholder="Description" value={desc} name="desc" onChange={handleChange} />
                </Box>
                <Box>
                    <label>Start Date: </label>
                    <Input w="300px" type={"date"} value={start} name="start" placeholder='Start Date' onChange={handleChange} />
                </Box>
                <Box>
                    <label>End Date: </label>
                    <Input w="300px" type={"date"} value={end} name="end" placeholder='End Date' onChange={handleChange} />
                </Box>
                <Box>
                    <Input w="300px" type={'number'} value={maxPlayer} name="maxPlayer" placeholder='Player Limit' onChange={handleChange} />
                </Box>
                <Input w="300px" style={{ backgroundColor: "blue", color: "white", border: "none", borderRadius: "10px", padding: "10px" }} type={"submit"} value="Create Event" />
            </form>
        </Box>
    )
}

export default EventForm