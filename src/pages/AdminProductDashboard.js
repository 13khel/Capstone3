import { useContext, useState, useEffect, Fragment } from "react"
import UserContext from "../UserContext"
import { Button, Container, Table } from "react-bootstrap"
import { Link } from "react-router-dom"

export default function AdminDashboard () {

    const [Products, setProducts] = useState([])

    const {dispatch} = useContext(UserContext)
    const token = localStorage.getItem(`token`)

    const allProducts = () => {
        fetch(`https://deepbeataudio.herokuapp.com/api/products/`, {
            method: "GET",
            headers:{
                "Authorization": `${token}`
            }
        })
        .then(res => res.json())
        .then(res => {


            dispatch({type: "USER", payload: true})
            setProducts(res.map(product => {
                return(
					<tr key={product._id}>
						<td>{product._id}</td>
						<td>{product.name}</td>
                        <td>{product.quantity}</td>
                        <td>{product.category}</td>
						<td>{product.price}</td>
						<td>{product.isActive ? "Active" : "Inactive"}</td>
						<td>
							{
								product.isActive?
									<Fragment>
									<Button 
										className="btn btn-warning mx-2"
										onClick={ () => handleArchive(product._id) }
									>
										Archive
									</Button>
									<Link to={`/admin/products/${product._id}`}>
										<Button 
										className="btn btn-info mx-2"
										>
										Edit
										</Button>
										</Link>
									</Fragment>

									

								:
									<Fragment>
										<Button 
											className="btn btn-success mx-2"
											onClick={ () => handleUnarchive(product._id) }
										>
												Unarchive
										</Button>
										<Link to={`/admin/products/${product._id}`}>
											<Button 
											className="btn btn-info mx-2">
											Edit
											</Button>
										</Link>
										<Button 
											className="btn btn-danger mx-2"
											onClick={ () => handleDelete(product._id) }
										>
											Delete
										</Button>
									</Fragment>
							}
						</td>
					</tr>
				)

                
            }))
        })
    }

    useEffect(() => {
        
		allProducts()

	}, [])

	const handleArchive = (productId) =>{
		fetch(`hhttps://deepbeataudio.herokuapp.com/api/products/${productId}/archive`, {
			method: "PATCH",
			headers:{
				"Authorization": `Bearer ${token}`
			}
		})
		.then(response => response.json())
		.then(response => {
			console.log(response)

			if(response){
				allProducts()

				alert('Product successfully archived!')
			}
		})
	}


	const handleUnarchive = (productId) =>{
		fetch(`https://deepbeataudio.herokuapp.com/api/products/${productId}/unarchive`, {
			method: "PATCH",
			headers:{
				"Authorization": `Bearer ${token}`
			}
		})
		.then(response => response.json())
		.then(response => {
			console.log(response)

			if(response){
				allProducts()
				
				alert('Product successfully unnarchived!')
			}
		})
	}

	const handleDelete = (productId) =>{
		fetch(`https://deepbeataudio.herokuapp.com/api/products/${productId}/delete`, {
			method: "DELETE",
			headers:{
				"Authorization": `Bearer ${token}`
			}
		})
		.then(response => response.json())
		.then(response => {
			console.log(response)

			if(response){
				allProducts()
				
				alert('Product successfully deleted!')
			}
		})
	}



    return (
        <Fragment>
        <Container id="dashCont" className="container bg-dark rounded">
            <h3 className="text-light text-center pt-3">Hello Admin!</h3>
            <h1 className="text-info text-center m-3"><strong>ADMIN PRODUCT DASHBOARD</strong></h1>
			<div className="d-flex justify-content-center m-3">
			<Link to={`/admin/products/add`}>
				<Button className="btn-success" >Add Product</Button>
			</Link>
			</div>
			
            <Table>
				<thead>
					<tr className="text-light text-center">
						<th>ID</th>
						<th>Product Name</th>
                        <th>Stocks left</th>
                        <th>Category</th>
						<th>Price</th>
						<th>Status</th>
						<th>Actions</th>
					</tr>
				</thead>
                <tbody  className="text-light text-center">
					{ Products }
				</tbody>
            </Table>
		</Container>
		<div id="homebg" />
		</Fragment>
    )
}