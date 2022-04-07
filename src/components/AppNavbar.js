import {Navbar, Container, Nav} from 'react-bootstrap'
import { useState, useContext, useEffect, Fragment } from 'react';
import RegisterForm from './Register'
import LoginForm from './Login'
import UserContext from '../UserContext';

export default function AppNavbar(){

    const [showRegister, setShowRegister] = useState(false);
    const [showLogin, setShowLogin] = useState(false);
   

    const {state, dispatch} = useContext(UserContext)
    const token = localStorage.getItem('token')
    const [cartCounter , setCartCounter] = useState(0)

    const cartItems = () => {

        if(token !== null){
            fetch(`https://deepbeataudio.herokuapp.com/api/carts/myCarts`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }, 
            })
            .then(res => res.json())
            .then(response => {
                setCartCounter(response.length)
            })
        }
        
    }


    useEffect( () => {
        UserNavlinks()
		if(localStorage.getItem('token')){
			dispatch({type: "USER", payload: true})
            cartItems()
		}
	}, [])
    
    

    const UserNavlinks = () => {
        if(state === true){
            const isAdmin = localStorage.getItem('admin')
            if(isAdmin === 'true'){
                return (
                    <Fragment>
                        <Nav.Link 
                        href='/admin/accounts'
                        className='text-light nav-link'>
                        Accounts</Nav.Link>

                         <Nav.Link 
                        href='/admin/products'
                        className='text-light nav-link'>
                        Products</Nav.Link>
    
                        <Nav.Link 
                        href='/admin/orders'
                        className='text-light nav-link'>
                        Orders</Nav.Link>
    
                        <Nav.Link 
                        href="/logout" 
                        className='text-light nav-link'>
                        Logout</Nav.Link>
                    </Fragment>
                )

            }else{
                return(
                <Fragment>
                        <Nav.Link 
                        href={`/user/profile`}
                        className='text-light nav-link'>
                        My Account</Nav.Link>

                        <Nav.Link 
                        href={`/user/myCart`}
                        className='text-light nav-link'>
                        My Cart ({cartCounter})</Nav.Link>

                        <Nav.Link 
                        href={`/user/myOrders`}
                        className='text-light nav-link'>
                        My Orders</Nav.Link>

                        <Nav.Link 
                        href='/products'
                        className='text-light nav-link'>
                        Products</Nav.Link>
    
                        <Nav.Link 
                        href="/logout" 
                        className='text-light nav-link'>
                        Logout</Nav.Link>
                    </Fragment>
                )

            }
            
        }else{
            return(
                <Fragment>
                    <Nav.Link 
                    href='/'
                    className='text-light nav-link'>
                    Home</Nav.Link>

                    <Nav.Link 
                    href='/products'
                    className='text-light nav-link'>
                    Products</Nav.Link>

                    <Nav.Link
                    onClick={() => setShowRegister(true)} 
                    className='text-light nav-link'>
                    Register</Nav.Link>

                    <Nav.Link
                    onClick={() => setShowLogin(true)} 
                    className='text-light nav-link'>
                    Login</Nav.Link>
                </Fragment>
            )
        }
    }

 
    return (
        <Navbar className='bg-transparent'>
            <Container id="nav" className='text-center'>
                <Navbar.Brand href='/' className='text-light'><img id='logo' alt="navlogo" src={require('./../img/Turntablist.png')}/>Deep Beat Audio</Navbar.Brand>
                <div className='justify-content-end'>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav id="navbar">
                    <UserNavlinks />
                </Nav>
                <RegisterForm
                 show = {showRegister}
                 onHide={() => setShowRegister(false)}/>
                 <LoginForm
                 show = {showLogin}
                 onHide={() => setShowLogin(false)}/>

                </Navbar.Collapse>
                </div>
            </Container>
        </Navbar>
    )
}
