import { useContext, useEffect, Fragment, useState } from "react";
import UserContext from "../UserContext";
import { Button, Table, Container } from "react-bootstrap";


export default function Accounts () {

    const [Accounts, setAccounts] = useState([])
    const {dispatch} = useContext(UserContext)
    const token = localStorage.getItem(`token`)

    const allUsers = () => {
        fetch(`https://deepbeataudio.herokuapp.com/api/users/allUsers`, {
            method: "GET",
            headers:{
                "Authorization": `Bearer ${token}`
            }
        })
        .then(res => res.json())
        .then(res => {
            dispatch({type: "USER", payload: true})
            setAccounts(res.map(account=>{
                return(
                    <tr key={account._id}>
                        <td>{account.email}</td>
                        <td>{account.firstName}</td>
                        <td>{account.lastName}</td>
                        <td>{account.isAdmin ? "Admin" : "User"}</td>
                        <td>{account.isAdmin? 
                            <Fragment>
                                <Button 
                                className="mx-2 btn btn-info"
                                onClick={ () => handleToUser(account._id) }>
                                Set as User</Button> 
                            </Fragment>

                            :
                            <Fragment>
                                <Button 
                                className="mx-2 btn btn-success"
                                onClick={ () => handleToAdmin(account._id) }
                                >Set as Admin</Button> 
                                <Button 
                                className="mx-2 btn btn-danger"
                                onClick={ () => handleDeleteUser(account._id) }
                                >Delete</Button> 
                            </Fragment>

                            }</td>
                    </tr>
                )
            }))
        })

    }

    useEffect(() => {
        
		allUsers()

	}, [])

    const handleDeleteUser = (userId) =>{
        fetch(`https://deepbeataudio.herokuapp.com/api/users/${userId}/delete`, {
			method: "DELETE",
			headers:{
				"Authorization": `Bearer ${token}`
			}
		})
		.then(response => response.json())
		.then(response => {
			console.log(response)

			if(response){

                alert('User successfully deleted!')

				allUsers()
			}
		})
		
	}

    const handleToAdmin= (userId) =>{
        fetch(`https://deepbeataudio.herokuapp.com/api/users/${userId}/toAdmin`, {
			method: "PATCH",
			headers:{
				"Authorization": `Bearer ${token}`
			}
		})
		.then(response => response.json())
		.then(response => {
			console.log(response)

			if(response){

                alert('User turned to Admin!')

				allUsers()
			}
		})
		
	}

    const handleToUser= (userId) =>{
        fetch(`https://deepbeataudio.herokuapp.com/api/users/${userId}/toUser`, {
			method: "PATCH",
			headers:{
				"Authorization": `Bearer ${token}`
			}
		})
		.then(response => response.json())
		.then(response => {
			console.log(response)

			if(response){

                alert('Admin turned to User!')

				allUsers()
			}
		})
		
	}

    return(
        <Fragment>
        <Container id="dashCont" className="container bg-dark rounded">
            <h1 className="text-info text-center p-3"><strong>ACCOUNTS DASHBOARD</strong></h1>

            <Table>
				<thead>
					<tr className="text-light text-center">
						<th>Email</th>
                        <th>First Name</th>
                        <th>Last Name</th>
						<th>Account Status</th>
                        <th>Actions</th>
					</tr>
				</thead>
                <tbody  className="text-light text-center">
					{ Accounts }
				</tbody>
            </Table>
		</Container>
		<div id="homebg" />
		</Fragment>
    )

}