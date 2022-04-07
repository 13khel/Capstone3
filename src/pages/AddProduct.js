import { useState, Fragment} from "react";
import { useNavigate } from "react-router-dom";
import { Card, Row, Col, Container, Form, Button } from "react-bootstrap"



export default function AddProduct () {

    const token = localStorage.getItem(`token`)
    const navigate = useNavigate()

    const [prodName, setProdName] = useState("")
    const [category, setCategory] = useState("")
    const [description, setDescription] = useState("")
    const [stocks, setStocks] = useState("")
    const [price, setPrice] = useState("")

    const handleAdd = () => {
        fetch(`https://deepbeataudio.herokuapp.com/api/products/listProduct`,{
            method: "POST",
			headers:{
                "Authorization": `Bearer ${token}`,
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
                name: prodName,
                description: description,
                category: category,
                price: price,
                quantity: stocks
			})
        })
        .then(res => res.json())
        .then(res => {
            if(res){
                console.log(res)
                alert(`Product successfully added`)
                navigate(`/admin/products`)
            }else{
                alert(`Something went wrong. Try again`)
            }
        })
    }




    return(
        <Fragment>
        <Container xs={12} md={6} id="cardCont">
        <Card className="bg-dark text-center mx-3" id="cardDetails">
            <h3 className="text-center text-light m-3"><strong>ADD PRODUCT</strong></h3>
            <Card.Body className="bg-transparent m-3 p-0">
            <Container>
            <Row className="d-flex justify-content-center">
                    <Form.Group className="mb-3 bg-transparent d-flex  text-center" >
                    <Col md={4}>
                        <Form.Label className="text-light mt-2">
                            <strong>Name:</strong>
                         </Form.Label>
                    </Col>
                    <Col md={8}>
                     <Form.Control 
                        type="text" 
                        value={prodName}
                        onChange={(e) => setProdName(e.target.value)}
                        className="text-center"/>
                    </Col>
                    </Form.Group>
                </Row>


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
                            <strong>Category:</strong>
                         </Form.Label>
                    </Col>
                    <Col md={8}>
                     <Form.Control 
                        type="text" 
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
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
                        type="number" 
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
                        type="number" 
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        className="text-center"/>
                    </Col>
                    </Form.Group>
                </Row>
            </Container>
            <Button id="prodbtn"
                className="m-3"
                onClick={(e) => handleAdd(e) }
                >Add Product</Button>
            </Card.Body>

        </Card>
        </Container>
        
            <div id="landingbg" />
        </Fragment>
    )
}