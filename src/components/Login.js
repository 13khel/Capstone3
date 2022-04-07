import {  Modal, Button, Form } from "react-bootstrap"
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../UserContext";
import RegisterForm from './Register'

export default function LoginForm(props) {

  const [email, setEmail] = useState ("")
  const [password, setPassword] = useState ("")
  const [isDisabled, setIsDisabled] = useState(true)
  const [showRegister, setShowRegister] = useState(false);

  const {dispatch} = useContext(UserContext)
  const navigate = useNavigate()

  useEffect(() => {
		if(email !== "" && password !== ""){
			setIsDisabled(false)
		} else {
			setIsDisabled(true)
		}
	}, [email, password])

  const login = async (e) => {
		e.preventDefault()

  await fetch('https://deepbeataudio.herokuapp.com/api/users/login', {
			method: "POST",
			headers:{
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				email: email,
				password: password
			})
		})
		.then(res => res.json())
		.then(res => {
      if(res.token !== undefined){
        localStorage.setItem('token', res.token)
        localStorage.setItem('email', email)

        dispatch({type:"USER", payload: true})

        let token = localStorage.getItem('token')

        fetch(`https://deepbeataudio.herokuapp.com/api/users/profile`, {
                method: "GET",
                headers:{
                    "Authorization": `Bearer ${token}`
                }
            })
            .then(result => result.json())
            .then(result => {
                
                let isAdmin = result.isAdmin
                let userId = result._id

                localStorage.setItem('id', userId)
                localStorage.setItem('admin', isAdmin)

                if(isAdmin === true){
                  navigate('/admin/products')
                  alert(`Admin successfully logged in`)
                }else{
                  navigate(`/products`)
                  alert(`User successfully logged in`)
                }

                
            })
            setEmail("")
            setPassword("")

      }else{
        alert(`User does not exist or Password is incorrect. Please try again`)
      }
   })
  }


  return (
      <Modal
      {...props}
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered>
      <Modal.Header closeButton className="bg-dark">

        <Modal.Title className="text-light" id="contained-modal-title-vcenter">
          Log in
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="bg-dark">
        <div className="d-flex justify-content-center">
          <p className="text-light text-center pt-2">Not a User?</p> 
          <a className="text-info btn btn-transparent m-0"
          onClick={() => setShowRegister(true) }
          >Register here</a>
        </div>
        <RegisterForm
        show = {showRegister}
        onHide={() => setShowRegister(false)}/>
        <Form className="text-center text-light"
        onSubmit={(e) => login(e) }>
          <Form.Group className="mb-3 px-2">
              <Form.Label><strong>Email address</strong></Form.Label>
              <Form.Control type="email" 
              placeholder="Enter Email Address"  
              className="text-center"
              value={email}
              onChange={(e) => setEmail(e.target.value)}/>
          </Form.Group>

          <Form.Group className="mb-3 px-2">
              <Form.Label><strong>Password</strong></Form.Label>
              <Form.Control type="password" 
              placeholder="Enter password"  
              className="text-center"
              value={password}
              onChange={(e) => setPassword(e.target.value)}/>
          </Form.Group>
          <Button className="btn btn-info" 
          type="submit"
          disabled={isDisabled}
          onClick={props.onHide}
          >Log In</Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}