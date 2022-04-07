import { useContext, useEffect, Fragment, useState } from "react";
import UserContext from "../UserContext";
import { useParams, Link } from "react-router-dom";
import { Button, Container, Table } from "react-bootstrap";


export default function OrderDetails () {

    const {dispatch} = useContext(UserContext)
    const token = localStorage.getItem(`token`)
    const {orderId} = useParams()
    const [cartItems, setCartItems] = useState([])
    const admin = localStorage.getItem(`admin`)

    const getOrder = () => {
        fetch(`https://deepbeataudio.herokuapp.com/api/orders/${orderId}`,{
            method: "GET",
            headers:{
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
        })
        .then(res => res.json())
        .then(res => {

            dispatch({type: "USER", payload: true})

            setCartItems(res.cartItems.map(cart => {

                return(
                    <tr key={cart._id}>  
                        <td><img id="cartpic" src={require(`./../img/${cart.productId}.jpg`)}/></td>
                        <td>{cart.productId}</td>
                        <td>{cart.name}</td>
                        <td>{cart.quantity}</td>
                        <td>&#8369; {cart.price}</td>
                        <td>&#8369; {cart.bill}</td>
                    </tr>
                )
            }))      
        })
    }


    useEffect(() => {
        
		getOrder()

	}, [])

    const BackToOrders = () => {
        if(admin === 'true'){
            return(
                <div className="p-3 text-center">
                <Link to={`/admin/Orders`}>
                    <Button className="btn btn-info">Back to Orders</Button>
                </Link>
                </div>
            )
        }else{
            return(
                <div className="p-3 text-center">
                <Link to={`/users/myOrders`}>
                    <Button className="btn btn-info">Back to Orders</Button>
                </Link>
                </div>
            )

        }


    }

    return(
        <Fragment>
        <Container id="dashCont" className="container bg-dark rounded">
        <h1 className="text-info text-center m-3 p-3"><strong>Order: {orderId}</strong></h1>
        <Table>
            <thead>
                <tr className="text-light text-center">
                    <th></th>
                    <th>ID</th>
                    <th>Product Name</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Bill Amount</th>
                </tr>
            </thead>
            <tbody  className="text-light text-center">
                {cartItems}
            </tbody>

        </Table>
            <BackToOrders/>
        </Container>
        <div id="homebg" />
        </Fragment>
    )
}