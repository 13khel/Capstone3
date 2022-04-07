import { Fragment, useEffect, useContext, useState } from "react";
import ProductCarousel from './../components/ProductCarousel'
import UserContext from "../UserContext";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Products() {

    const {dispatch} = useContext(UserContext)
    const token = localStorage.getItem(`token`)
    const [products, setProducts] = useState([])


    const getProducts= () => {

        fetch(`https://deepbeataudio.herokuapp.com/api/products/isActive`, {
            method: "GET",
            headers:{
                "Authorization": `${token}`
            }
        })
        .then(res => res.json())
        .then(res => {

            if(token !== null){
                dispatch({type: "USER", payload: true})
            }
            setProducts(
                res.map(activeProd => {
                    return (
                        <Col xs={12} md={6} lg={4} xl={3} key={activeProd._id}>
                            <Card className="m-3 p-2 bg-dark" id="prodCard">
                            <Card.Header className="text-center text-light"><strong>{activeProd.name}</strong></Card.Header>
                                <Card.Img variant="top" src={require(`./../img/${activeProd._id}.jpg`)} />
                            <Card.Body className="text-center bg-light m-0 p-0">
                                <Card.Subtitle className="bg-dark text-light py-2">Price:</Card.Subtitle>
                                <Card.Text  className="p-2 m-0">
                                    &#8369; {activeProd.price}
                                </Card.Text>
                                <Card.Subtitle className="bg-dark text-light py-2">Stocks Left:</Card.Subtitle>
                                <Card.Text className="p-2 m-0">
                                    {activeProd.quantity} pcs
                                </Card.Text>
                            </Card.Body> 
                            <Link to={`/products/${activeProd._id}`}>
                            <Button
                            className="btn mt-2"
                            id="cardbtn">
                            See Details</Button>
                            </Link>
                            </Card>
                        </Col>

                    )

                })
            )
        })
    }
    
    useEffect(() => {
		getProducts()

	}, [])



    return(
        <Fragment>
            <Container className="p-5" id="contProd" >
                <Row className="d-block">
                    <Col xs={12}>
                        <ProductCarousel />
                    </Col>
                </Row>
                <Row id="spacing" className="d-block"/>
                    <h3 className="text-center text-light">Products</h3>
                <Row>
                    {products}
                </Row>
            </Container>
            <div id="spacing" className="d-block"/>
        </Fragment>

    )

}