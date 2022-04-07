import { useEffect, Fragment, useState, useContext } from "react"
import { Card, Row, Col, Container, Form, Button } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import UserContext from "../UserContext"

export default function UserProfile () {

    const token = localStorage.getItem('token')
    const navigate = useNavigate

    const {dispatch} = useContext(UserContext)
    const [userId, setUserId] = useState ("")
    const [firstName, setFirstName] = useState ("")
    const [lastName, setLastName] = useState ("")
    const [email, setEmail] = useState ("")
    const [address, setAddress] = useState ("")
    const [contact, setContact] = useState ("")

    const myProfile = () => {
        fetch(`https://deepbeataudio.herokuapp.com/api/users/profile`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }, 
        })
        .then(res => res.json())
        .then(res => {
            dispatch({type: "USER", payload: true})

            console.log(res)

            if(res.name !== 'CastError'){
                setUserId(res._id)
                setFirstName(res.firstName)
                setLastName(res.lastName)
                setEmail(res.email)
                setAddress(res.address)
                setContact(res.contactNum)


            }else{
                alert(`Item not found`)
                navigate(`/admin/products`)
            }
        })
    }

    useEffect(() => {
		myProfile()

	}, [])

    const handleUpdateUser = () => {
        fetch(`https://deepbeataudio.herokuapp.com/api/users/${userId}/update`, {
	        method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                email : email,
                firstName: firstName,
                lastName : lastName,
                address: address,
                contactNum: contact
            })
        })
        .then(res => res.json())
        .then(res => {
            alert(`User details has been updated!`)
            navigate(`/products`)
        })
    }

    return(
        <Fragment>
        <Container xs={12} md={6} id="cardCont">
        <Card className="bg-dark text-center mx-3" id="cardDetails">
            <h3 className="text-center text-light m-3"><strong>Hello {firstName} {lastName}</strong></h3>
            <Card.Body className="bg-transparent m-3 p-0">
            <Container>
                <Row className="d-flex justify-content-center">
                    <Form.Group className="mb-3 bg-transparent d-flex  text-center" >
                    <Col md={4}>
                        <Form.Label className="text-light mt-2">
                            <strong>Email Address:</strong>
                         </Form.Label>
                    </Col>
                    <Col md={8}>
                     <Form.Control 
                        type="text" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="text-center"/>
                    </Col>
                    </Form.Group>
                </Row>
                <Row className="d-flex justify-content-center">
                    <Form.Group className="mb-3 bg-transparent d-flex  text-center" >
                    <Col md={4}>
                        <Form.Label className="text-light mt-2">
                            <strong>FirstName:</strong>
                         </Form.Label>
                    </Col>
                    <Col md={8}>
                     <Form.Control 
                        type="text" 
                        value={lastName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="text-center"/>
                    </Col>
                    </Form.Group>
                </Row>

                <Row className="d-flex justify-content-center">
                    <Form.Group className="mb-3 bg-transparent d-flex  text-center" >
                    <Col md={4}>
                        <Form.Label className="text-light mt-2">
                            <strong>Last Name:</strong>
                         </Form.Label>
                    </Col>
                    <Col md={8}>
                     <Form.Control 
                        type="text" 
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="text-center"/>
                    </Col>
                    </Form.Group>
                </Row>

                <Row className="d-flex justify-content-center">
                    <Form.Group className="mb-3 bg-transparent d-flex  text-center" >
                    <Col md={4}>
                        <Form.Label className="text-light mt-2">
                            <strong>Address:</strong>
                         </Form.Label>
                    </Col>
                    <Col md={8}>
                     <Form.Control 
                        type="text" 
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="text-center"/>
                    </Col>
                    </Form.Group>
                </Row>
                
                <Row className="d-flex justify-content-center">
                    <Form.Group className="mb-3 bg-transparent d-flex  text-center" >
                    <Col md={4}>
                        <Form.Label className="text-light mt-2">
                            <strong>Contact Number:</strong>
                         </Form.Label>
                    </Col>
                    <Col md={8}>
                     <Form.Control 
                        type="number" 
                        value={contact}
                        onChange={(e) => setContact(e.target.value)}
                        className="text-center"/>
                    </Col>
                    </Form.Group>
                </Row>

            </Container>
            <Button id="prodbtn"
                className="m-3"
                onClick={(e) => handleUpdateUser(e) }
                >Update User Details</Button>
            </Card.Body>

        </Card>
        </Container>
        
            <div id="headerSpacing" />
        </Fragment>
    )
}