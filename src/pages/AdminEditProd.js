import { useEffect, useState, Fragment, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card, Row, Col, Container, Form, Button } from "react-bootstrap"
import UserContext from "../UserContext";



export default function EditProduct () {

    const {productId} = useParams()
    const token = localStorage.getItem(`token`)
    const navigate = useNavigate()
    const {dispatch} = useContext(UserContext)

    const [prodName, setProdName] = useState("")
    const [description, setDescription] = useState("")
    const [stocks, setStocks] = useState("")
    const [price, setPrice] = useState("")


    const prodDetail = () => {
        fetch(`https://deepbeataudio.herokuapp.com/api/products/${productId}`, {
	        method: "GET",
        })
        .then(res => res.json())
        .then(res => {
            dispatch({type: "USER", payload: true})
            
            if(res.name !== 'CastError'){
                setProdName(res.name)
                setDescription(res.description)
                setStocks(res.quantity)
                setPrice(res.price)

            }else{
                alert(`Item not found`)
                navigate(`/admin/products`)
            }
        })
      
    }

    useEffect(() => {
        
		prodDetail()

	}, [])


    const handleEditProduct = () => {
        fetch(`http://localhost:4028/api/products/${productId}/update`, {
	        method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                description: description,
                quantity : stocks,
                price : price,
            })
        })
        .then(res => res.json())
        .then(res => {
            console.log(res)
            alert(`Product details has been updated!`)
            navigate(`/admin/products`)
        })
    }

    return(
        <Fragment>
        <Container xs={12} md={6} id="cardCont">
        <Card className="bg-dark text-center mx-3" id="cardDetails">
            <h3 className="text-center text-light m-3"><strong>{prodName}</strong></h3>
            <Card.Img variant="top" 
            id="cardpic" className="mx-3 mt-0"
            src={require(`./../img/${productId}.jpg`)}/>
            <Card.Body className="bg-transparent m-3 p-0">
            <Container>
                <Row className="d-flex justify-content-center">
                    <Form.Group className="mb-3 bg-transparent d-flex  text-center" >
                    <Col md={4}>
                        <Form.Label className="text-light mt-2">
                            <strong>Description:</strong>
                         </Form.Label>
                    </Col>
                    <Col md={8}>
                     <Form.Control 
                        type="text" 
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="text-center"/>
                    </Col>
                    </Form.Group>
                </Row>

                <Row className="d-flex justify-content-center">
                    <Form.Group className="mb-3 bg-transparent d-flex  text-center" >
                    <Col md={4}>
                        <Form.Label className="text-light mt-2">
                            <strong>Quantity:</strong>
                         </Form.Label>
                    </Col>
                    <Col md={8}>
                     <Form.Control 
                        type="text" 
                        value={stocks}
                        onChange={(e) => setStocks(e.target.value)}
                        className="text-center"/>
                    </Col>
                    </Form.Group>
                </Row>

                <Row className="d-flex justify-content-center">
                    <Form.Group className="mb-3 bg-transparent d-flex  text-center" >
                    <Col md={4}>
                        <Form.Label className="text-light mt-2">
                            <strong>Price:</strong>
                         </Form.Label>
                    </Col>
                    <Col md={8}>
                     <Form.Control 
                        type="text" 
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        className="text-center"/>
                    </Col>
                    </Form.Group>
                </Row>
            </Container>
            <Button id="prodbtn"
                className="m-3"
                onClick={(e) => handleEditProduct(e) }
                >Edit Product</Button>
            </Card.Body>

        </Card>
        </Container>
        
            <div id="landingbg" />
        </Fragment>
    )
}