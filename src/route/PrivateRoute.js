import React, { useContext } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { AuthContext } from '../context/Auth/AuthContext'

const PrivateRoute = ({ component: Component, setId, notif, ...rest }) => {
	const { isAuthenticated, loading} = useContext(AuthContext)
	return (
		<Route
			{...rest}
			render={props =>
				!isAuthenticated && !loading ? (
					<Redirect to="/" />
				) : (
					<Component {...props} notif={notif} setId={setId}/>
				)
			}
		/>
	)
}

export default PrivateRoute