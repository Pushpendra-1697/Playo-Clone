import React, { useState } from 'react';
import { AiOutlineGoogle, AiOutlineTwitter, AiFillFacebook, AiFillGithub } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import { backend_url } from './BackendURL';
import { Box, Heading, Input, useToast } from '@chakra-ui/react';



const initialState = {
  name: '',
  password: ''
};
const Login = () => {
  const [formData, setFormData] = useState(initialState);
  const navigate = useNavigate();
  const toast = useToast();


  const handleChange = (e) => {
    let { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };


  const onSubmit = async (e) => {
    e.preventDefault();
    let { name, password } = formData;
    if (name == '' || password == '') {
      toast({
        title: `Please Fill * required Field`,
        status: "info",
        isClosable: true,
      });
      return;
    };

    try {
      let res = await fetch(`${backend_url}/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData)
      });
      res = await res.json();
      if (res) {
        if (res.msg === "Wrong Password") {
          toast({
            title: `${res.msg}`,
            status: "warning",
            isClosable: true,
          });
        } else if (res.msg === "Wrong Username") {
          toast({
            title: `${res.msg}`,
            status: "warning",
            isClosable: true,
          });
        } else if (res.msg === "Login Successfully") {
          localStorage.setItem('name', formData.name);
          localStorage.setItem('token', res.token);
          localStorage.setItem('user_id', res.user_id);
          toast({
            title: `${res.msg}`,
            status: "success",
            isClosable: true,
          });
          navigate('/');
        }
      };

      setFormData({
        name: '',
        password: ''
      });
    } catch (err) {
      console.log(err);
    }
  };

  const { name, password } = formData;

  return (
    <Box style={{ textAlign: 'center' }}>
      <Heading mb="10px" style={{ textAlign: "center" }} fontSize={["22px", '22px', '26px']}>Login For Existing Users</Heading>
      <form onSubmit={onSubmit} style={{ textAlign: "center" }}>
        <Box className='input-icons'>
          <i class="fa fa-user icon"></i>
          <Input className='input-field' w="300px" type={"text"} placeholder="Username" value={name} name="name" onChange={handleChange} />
        </Box>
        <Box className='input-icons'>
          <i class="fa fa-key icon"></i>
          <Input className='input-field' w="300px" type={"password"} value={password} name="password" placeholder='Password' onChange={handleChange} />
        </Box>
        <Input w="300px" style={{ backgroundColor: "blue", color: "white", border: "none", borderRadius: "10px", padding: "10px" }} type={"submit"} />
      </form>
      <p style={{ marginTop: "14px" }}>or continue with these social profile</p>
      <Box m="0px 0 8px 0" display={"flex"} justifyContent="center" alignItems={"center"} gap="5px">
        <a className='social-icon' target={"_blank"} href="https://github.com/topics/bug-tracker"><AiOutlineGoogle /></a>
        <a className='social-icon' target={"_blank"} href="https://github.com/topics/bug-tracker"><AiFillFacebook /> </a>
        <a className='social-icon' target={"_blank"} href="https://github.com/topics/bug-tracker"><AiOutlineTwitter /> </a>
        <a className='social-icon' target={"_blank"} href="https://github.com/topics/bug-tracker"><AiFillGithub /></a>
      </Box>
      <p>Cerate an account? <Link style={{ textDecoration: "none", color: "green" }} to={'/register'}>Register</Link></p>
    </Box>
  );
}

export default Login;