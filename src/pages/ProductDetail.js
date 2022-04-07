import { useParams, useNavigate } from "react-router-dom"
import { useContext, useEffect, useState, Fragment } from "react"
import UserContext from "../UserContext"
import { Card, Button, Container, Form } from "react-bootstrap"

export default function ProductDetail () {
    const { productId } = useParams()
    const navigate = useNavigate()
    const token = localStorage.getItem(`token`)
    const { dispatch } = useContext(UserContext)

    const [prodName, setProdName] = useState("")
    const [description, setDescription] = useState("")
    const [stocks, setStocks] = useState("")
    const [price, setPrice] = useState("")

    const [buyQty, setBuyQty] = useState ("")


    const getProductDetail = () => {
        fetch(`https://deepbeataudio.herokuapp.com/api/products/${productId}`, {
	        method: "GET",
        })
        .then(res => res.json())
        .then(res => {



            if(res.name !== 'CastError'){
                setProdName(res.name)
                setDescription(res.description)
                setStocks(res.quantity)
                setPrice(res.price)

            }else{
                alert(`Item not found`)
                navigate(`/products`)
            }
        })
    }
    
    useEffect(() => {
		if(token !== null){
			dispatch({type: "USER", payload: true})
		}

		getProductDetail()

	}, [])

    const handleCart = (e) => {


        fetch('https://deepbeataudio.herokuapp.com/api/carts/myCarts', {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }, 
        })
        .then(res=>res.json())
        .then(res => {
            
            const isFound = res.some(element => {
                if (element.name === prodName) {   
                return true;
                }
            });

            if(isFound !== true){

                fetch('https://deepbeataudio.herokuapp.com/api/carts/create', {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                    body: JSON.stringify({
                            productId: productId,
                            quantity: buyQty,
                    })
        
                })
                .then(res=> res.json())
                .then(res=>  {
                    console.log(res)
                    alert(`Product has been added to cart`)
                })

          }else{
                res.some(element => {
                if (element.name === prodName) { 
                const cartId = element._id
                const currentQty = element.quantity
                
                console.log(cartId)

                    fetch(`https://deepbeataudio.herokuapp.com/api/carts/${cartId}/editQty`, {
                        method: "PATCH",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${token}`
                        },
                        body: JSON.stringify({
                            buyQty: buyQty,
                            quantity : (parseFloat(currentQty)+parseFloat(buyQty)),
                            price : price,
                            productId : productId
                        })

                    })
                    .then(res=> res.json()) 
                     .then(res=>  {
                    console.log(res)
                    alert(`Product has been updated in your cart`)
                })
                }
                });
              
          }
        })
        getProductDetail() 
        navigate(`/products`)
 
    }

    return (
        <Fragment>
        <Container xs={12} md={6} id="cardCont">
        <Card className="bg-dark text-center mx-3" id="cardDetails">
            <h3 className="text-center text-light m-3"><strong>{prodName}</strong></h3>
            <Card.Img variant="top" 
            id="cardpic" className="mx-3 mt-0"
            src={require(`./../img/${productId}.jpg`)}/>
            <Card.Body className="bg-transparent m-3 p-0">
            <Card.Subtitle className="bg-transparent text-light py-2">Description:</Card.Subtitle>
            <Card.Text className="p-2 m-2 bg-light">
                {description} 
            </Card.Text>
            <Card.Subtitle className="bg-transparent text-light py-2">Price:</Card.Subtitle>
            <Card.Text  className="p-2 m-2 bg-light">
                &#8369; {price}
            </Card.Text>
            <Card.Subtitle className="bg-transparent text-light py-2">Stocks Left:</Card.Subtitle>
            <Card.Text className="p-2 m-2 bg-light">
                {stocks} pcs
            </Card.Text>
            </Card.Body>
            <Form>
                <Form.Group className="mb-3 bg-transparent   d-flex mx-5" >
                <Form.Label className="mx-3 text-light mt-2">
                    <strong>Quantity:</strong>
                </Form.Label>
                <Form.Control 
                type="number" 
                placeholder="0" 
                className="text-center mx-5"
                value={buyQty}
                onChange={(e) => setBuyQty(e.target.value)}/>
                </Form.Group>
                <Button id="prodbtn"
                className="m-3"
                onClick={(e) => handleCart(e) }
                >Add to Cart</Button>
            </Form>
        </Card>
        </Container>
            <div id="landingbg" />
        </Fragment>
    )
}