import UserContext from "../UserContext"
import { useContext, useEffect, useState, Fragment } from "react"
import { Button, Container, Table } from "react-bootstrap"
import { Link } from "react-router-dom"

export default function UserOrders() {

    const {dispatch} = useContext(UserContext)
    const token = localStorage.getItem(`token`)

    const [Orders, setOrders] = useState([])
    const [userId, setUserId] = useState([])

    const userProfile = () => {
        fetch(`https://deepbeataudio.herokuapp.com/api/users/profile`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }, 
        })
        .then(res => res.json())
        .then(res => {setUserId(res._id)})
    }

    const getUserOrders = () => {
        fetch(`https://deepbeataudio.herokuapp.com/api/orders/myOrder`, {
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
                            </Fragment>
                        )
                    }else{
                        return(
                            <Fragment>
                                <td>Completed</td>
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
                        <td>
                            <Link to={`/:userId/myOrders/${orderList._id}`}>
                                <Button className="btn btn-info mx-2">
                                    See more
                                </Button>
                            </Link>
                        </td>
                    </tr>
                )
                
            })
            )
        })
    }


    useEffect(() => {
        
		getUserOrders()

	}, [])

    return (
        <Fragment>
        <Container id="dashCont" className="container bg-dark rounded">
        <h1 className="text-info text-center m-3 p-3"><strong>MY ORDERS</strong></h1>
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
