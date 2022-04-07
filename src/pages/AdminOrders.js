import UserContext from "../UserContext"
import { useContext, useEffect, useState, Fragment } from "react"
import { Button, Container, Table } from "react-bootstrap"
import { Link } from "react-router-dom"

export default function AllOrders() {

    const {dispatch} = useContext(UserContext)
    const token = localStorage.getItem(`token`)

    const [Orders, setOrders] = useState([])

    const getUserOrders = () => {
        fetch(`https://deepbeataudio.herokuapp.com/api/orders/allOrders`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }, 
        })
        .then(res => res.json())
        .then(res => {
            
            dispatch({type: "USER", payload: true})
            setOrders(res.map(orderList => {
                console.log(orderList)

                const OrderStatus = () => {
                    if(orderList.active === true){
                        return(
                            <Fragment>
                                <td>Pending</td>
                                <td>
                                <Link to={`/users/myOrders/${orderList._id}`}>
                                    <Button className="btn btn-info mx-2">
                                        See more
                                    </Button>
                                </Link>
                                <Button 
                                className="btn btn-success mx-2"
                                onClick={ () => handleCompleteOrder(orderList._id) }>
                                Complete</Button>
                                <Button 
                                className="btn btn-danger mx-2"
                                onClick={ () => handleDeleteOrder(orderList._id) }
                                >  
                                Delete
                                </Button>
                                </td>
                            </Fragment>
                        )
                    }else{
                        return(
                            <Fragment>
                            <td>Completed</td>
                            <td>
                                <Link to={`/users/myOrders/${orderList._id}`}>
                                    <Button className="btn btn-info mx-2">
                                        See more
                                    </Button>
                                </Link>
                                <Button 
                                className="btn btn-warning mx-2"
                                onClick={ () => handlePendingOrder(orderList._id) }>
                                Pending</Button>
                                <Button 
                                className="btn btn-danger mx-2"
                                onClick={ () => handleDeleteOrder(orderList._id) }
                                >  
                                Delete
                                </Button>
                            </td>      
                    </Fragment>
                        )

                    }
                }
                
                return(
                    <tr key={orderList._id}>  
                        <td>{orderList._id}</td>
                        <td>{orderList.cartItems.length}</td>
                        <td>&#8369; {orderList.totalBill}</td>
                        <td>{orderList.createdAt}</td>
                        <OrderStatus />
                    </tr>
                )
                
            })
            )
        })
    }

    const handleDeleteOrder = (orderId) =>{
        fetch(`https://deepbeataudio.herokuapp.com/api/orders/${orderId}/delete`, {
			method: "DELETE",
			headers:{
				"Authorization": `Bearer ${token}`
			}
		})
		.then(response => response.json())
		.then(response => {
			console.log(response)

			if(response){

                alert('Order successfully deleted!')

				getUserOrders()	
			}
		})
		
	}

    const handleCompleteOrder = (orderId) =>{
        fetch(`https://deepbeataudio.herokuapp.com/api/orders/${orderId}/archive`, {
			method: "PATCH",
			headers:{
				"Authorization": `Bearer ${token}`
			}
		})
		.then(response => response.json())
		.then(response => {
			console.log(response)

			if(response){

                alert('Order completed!')

				getUserOrders()	
			}
		})
		
	}

    const handlePendingOrder = (orderId) =>{
        fetch(`https://deepbeataudio.herokuapp.com/api/orders/${orderId}/unarchive`, {
			method: "PATCH",
			headers:{
				"Authorization": `Bearer ${token}`
			}
		})
		.then(response => response.json())
		.then(response => {
			console.log(response)

			if(response){

                alert('Order reverted to pending?')

				getUserOrders()	
			}
		})
		
	}

    useEffect(() => {
        
		getUserOrders()

	}, [])

    return (
        <Fragment>
        <Container id="dashCont" className="container bg-dark rounded">
        <h1 className="text-info text-center m-3 p-3"><strong>ORDER DASHBOARD</strong></h1>
        <Table>
            <thead>
                <tr className="text-light text-center">                    
                    <th>ID</th>
                    <th>Order Items</th>
                    <th>Bill Amount</th>
                    <th>Date Purchased</th>
                    <th>Status</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody  className="text-light text-center">
                { Orders }
            </tbody>

        </Table>
        </Container>
        <div id="homebg" />
        </Fragment>
    )
}
