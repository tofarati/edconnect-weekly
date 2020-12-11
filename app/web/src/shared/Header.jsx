import {
  Nav,
  Navbar,
  Form,
  FormControl,
  Button
} from 'react-bootstrap';
import {React, useState,
        useEffect} from 'react';

const Header = ({passLoginStatus}) => {
  const [loggedIn, setLoggedIn] = useState();
  const [userName, setUserName] = useState('');

  useEffect(() => {
    if (document.cookie.includes('uid=')){
      const ck = document.cookie.split(';')
      .filter(cookie => cookie.trim().startsWith(`uid=`)) || [];
      const vals = ck[0].split('=') || [];
      if (vals[1]){
        setLoggedIn(true);
        fetch(`/api/users/${vals[1]}`).then(response => response.json())
        .then(data => { setUserName(data.firstname) });
      } else {
        setLoggedIn(false);
      }
    } else {
      setLoggedIn(false);
    }
  },[]);

  useEffect(()=>{
    if(window.location.href.includes('/projects/submit')){
        passLoginStatus(loggedIn);
    }
  }, [loggedIn, passLoginStatus])

  const handleLogout = () => {
    document.cookie = `uid=;path=/;expires=Thu, 01 Jan 1970 00:00:00 GMT;`;
    setLoggedIn(false);
    window.location.href='/';
  }

  return (
    <Navbar bg='primary' variant='dark' expand='lg' animation='false'>
      <Navbar.Brand href='/'>
        Project Explorer
      </Navbar.Brand>
      <Navbar.Toggle aria-controls='responsive-nav'/>
      <Navbar.Collapse id='responsive-nav' animation='false' className="d-lg-flex flex-lg-row justify-content-lg-between">
          <Form inline>
            <FormControl type='text' placeholder='Search Projects' className='mr-sm-2 my-1'/>
            <Button variant='outline-light' className='mr-sm-2 my-1'>Search</Button>
          </Form>
        <Nav className='flex-lg-fill'>
          <Nav.Link href='/projects'>Projects</Nav.Link>
          <Nav.Link href='/projects/submit' className='mr-lg-auto'>Submit</Nav.Link>
          {loggedIn ?
          <>
            <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
            <Nav.Link id='username'>Hi, {userName}</Nav.Link>
          </> :
          <>
            <Nav.Link href='/signup'>Sign Up</Nav.Link>
            <Nav.Link href='/login'>Login</Nav.Link>
          </>
          }
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Header;
