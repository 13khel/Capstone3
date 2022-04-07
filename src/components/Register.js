import {  Modal, Button, Form, Container } from "react-bootstrap"
import { useState, useEffect } from "react"
import {useNavigate} from "react-router-dom"
import LoginForm from './Login'
 
export default function RegisterForm(props) {

  let navigate = useNavigate()
  const [firstName, setFirstName] = useState ("")
  const [lastName, setLastName] = useState ("")
  const [email, setEmail] = useState ("")
  const [address, setAddress] = useState ("")
  const [contact, setContact] = useState ("")
  const [password, setPassword] = useState ("")
  const [vPassword, setVpassword] = useState ("")
  const [isDisabled, setIsDisabled] = useState(true)
  const [showLogin, setShowLogin] = useState(false);
 
  useEffect(() => {
    if((firstName !== "" && lastName !== "" && email !== "" && password !== "" && vPassword !== "") 
    && (password === vPassword)){
        setIsDisabled(false)
    }else{
        setIsDisabled(true)
    }        
    }, [firstName,lastName,email,password,vPassword])  

    const handleRegister = (e) => {

      fetch(`https://deepbeataudio.herokuapp.com/api/users/email-exists`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: email,
        })
      }).then(res => res.json())
      .then(res => 
        {if(res === false){
          fetch(`https://deepbeataudio.herokuapp.com/api/users/register`, {
            method: "POST",
            headers:{
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              firstName: firstName,
              lastName: lastName,
              email: email,
              contactNum: contact,
              address: address,
              password: password
            })
          })
          .then(res => res.json())
          .then(res => {
            console.log(res)
            if(res){
              alert('User successfully registered!')
            } else {
              alert(`Please try again`)
              navigate('/home')         
            }
          })

        } else {
          alert(`User already exists`)
        }

      })
    }

    return (
        <Modal
        {...props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered 
         >
        <Modal.Header closeButton className="bg-dark">
          <Modal.Title id="contained-modal-title-vcenter" className="text-light">
            <strong>Register</strong>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-dark">
            <Container>
              <div className="d-flex justify-content-center">
                <p className="text-light text-center mx-2 pt-2">Already a User?</p> 
                <a className="text-info btn btn-transparent m-0"
                 onClick={() => setShowLogin(true) }

                >Login here</a>
              </div>
              <LoginForm
                 show = {showLogin}
                 onHide={() => setShowLogin(false)}/>
              <Form className="text-center text-light" >
                  <Form.Group className="mb-3" >
                      <Form.Label><strong>First Name</strong></Form.Label>
                      <Form.Control type="text" 
                      placeholder="Enter First Name" 
                      className="text-center" 
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}/>
                  </Form.Group>

                  <Form.Group className="mb-3" >
                      <Form.Label><strong>Last Name</strong></Form.Label>
                      <Form.Control type="text" 
                      placeholder="Enter Last Name"  
                      className="text-center"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}/>
                  </Form.Group>

                  <Form.Group className="mb-3" >
                      <Form.Label><strong>Address</strong></Form.Label>
                      <Form.Control type="text" 
                      placeholder="Enter Address"  
                      className="text-center"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}/>
                  </Form.Group>

                  <Form.Group className="mb-3" >
                      <Form.Label><strong>Contact Number</strong></Form.Label>
                      <Form.Control type="number" 
                      placeholder="Enter Contact Number"  
                      className="text-center"
                      value={contact}
                      onChange={(e) => setContact(e.target.value)}/>
                  </Form.Group>

                  <Form.Group className="mb-3">
                      <Form.Label><strong>Email address</strong></Form.Label>
                      <Form.Control type="email" 
                      placeholder="Enter Email Address" 
                      className="text-center"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}/>
                  </Form.Group>

                  <Form.Group className="mb-3">
                      <Form.Label><strong>Password</strong></Form.Label>
                      <Form.Control type="password" 
                      placeholder="Enter password"  
                      className="text-center"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}/>
                  </Form.Group>

                  <Form.Group className="mb-3">
                      <Form.Label><strong>Confirm Password</strong></Form.Label>
                      <Form.Control type="password" 
                      placeholder="Enter password" 
                      className="text-center"
                      value={vPassword}
                      onChange={(e) => setVpassword(e.target.value)}/>
                  </Form.Group>
                  <Button className="btn btn-success" 
                  onClick={() => handleRegister() }
                  disabled={isDisabled}
                  >Submit</Button>
              </Form>
            </Container>
        </Modal.Body>
      </Modal>
    );
}

