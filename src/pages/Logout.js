import { useContext, useEffect } from "react"
import UserContext from "../UserContext"
import { Navigate } from "react-router-dom"

export default function Logout(){
	
	const { state, dispatch } = useContext(UserContext)

	useEffect( () => {

 		localStorage.clear()

		dispatch({type: "USER", payload: null})

	}, [state,dispatch])

	return(
		<Navigate to="/" replaced/>
	)
}
