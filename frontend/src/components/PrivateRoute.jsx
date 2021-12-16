import React, {useContext} from "react"
import {AuthContext} from "./auth"
import {Redirect, Route} from "react-router-dom"

const PrivateRoute = ({component: Component, toLogin, ...rest}) => {
	const {user} = useContext(AuthContext)
	if (toLogin) {
		return <Route{...rest} exact render={props => user ? <Component {...props} /> : <Redirect to="/login"/>}/>
	} else {
		return <Route{...rest} exact render={props => user ? <Redirect to="/"/> : <Component {...props} />}/>
	}
}

export default PrivateRoute
