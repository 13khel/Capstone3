import { useState, useContext, useEffect, Fragment } from "react"
import UserContext from "../UserContext"
import { Button, Container, Table } from "react-bootstrap"

export default function UserCart() {

    const [UserCart, setUserCart] = useState([])
    const {dispatch} = useContext(UserContext)
    const token = localStorage.getItem(`token`)


    const userCartItems = () => {
        fetch(`https://deepbeataudio.herokuapp.com/api/carts/myCarts`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }, 
        })
        .then(res => res.json())
        .then(res => {
            dispatch({type: "USER", payload: true})
            setUserCart(res.map(cart => {
                    if(cart.isActive === false){
                    return(
                        <tr key={cart._id}>  
                            <td><img id="cartpic" src={require(`./../img/${cart.productId}.jpg`)}/></td>
                            <td>{cart.productId}</td>
                            <td>{cart.name}</td>
                            <td>{cart.quantity}</td>
                            <td>&#8369; {cart.price}</td>
                            <td>&#8369; {cart.bill}</td>
                            <td>
                            <Fragment>
                                <Button 
                                className="btn btn-danger mx-2"
                                onClick={ () => handleDeleteCart(cart._id) }>
                                Delete
                                </Button>
                            </Fragment>
                            </td>
                        </tr>
                    )
                 }

                
            }))
        })
        
    }

    useEffect(() => {
        
		userCartItems()

	}, [])

    const handleDeleteCart = (productId) =>{
		fetch(`https://deepbeataudio.herokuapp.com/api/carts/${productId}/delete`, {
            method: "DELETE",
            headers:{
                "Authorization": `Bearer ${token}`
            }
        })
        .then(response => response.json())
        .then(response => {
            console.log(response)

	    })
        alert('Item successfully deleted!')
        userCartItems()
    }

    const handleCheckout = () =>{

        fetch(`https://deepbeataudio.herokuapp.com/api/orders/create`, {
			method: "POST",
			headers:{
                "Content-Type": "application/json",
				"Authorization": `Bearer ${token}`   
			}
		})
		.then(response => response.json())
		.then(response => {
			console.log(response)

            fetch(`https://deepbeataudio.herokuapp.com/api/carts/myCarts`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`
                }, 
            })
            .then(result => result.json())
            .then(result => {

                result.map(cartId =>{
                    const {_id} = cartId
                    fetch(`https://deepbeataudio.herokuapp.com/api/carts/${_id}/delete`, {
                        method: "DELETE",
                        headers:{
                            "Authorization": `Bearer ${token}`
                        }
                    })
                    .then(response => response.json())
                    .then(response => {
                        console.log(response)
            
                        if(response){
                            userCartItems()
                            
                            alert('Order has successfully made')
                        }
                    })
                })
		    })
	    })
    }


    
    return (
        <Fragment>
        <Container id="dashCont" className="container bg-dark rounded">
        <h1 className="text-info text-center m-3 p-3"><strong>MY CART</strong></h1>
        <Table>
            <thead>
                <tr className="text-light text-center">
                    <th></th>
                    <th>ID</th>
                    <th>Product Name</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Bill Amount</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody  className="text-light text-center">
                { UserCart }
            </tbody>

        </Table>
        <div className="d-flex justify-content-center">
        <Button id="checkoutbtn" 
        className="text-center m-3"
        onClick={ () => handleCheckout()}
        >Check Out</Button>
        </div>
        </Container>
        <div id="homebg" />
        </Fragment>
    )
}
