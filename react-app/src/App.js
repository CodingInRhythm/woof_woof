import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
// import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import MainInterface from './components/AppUI/MainInterface';
import Splash from './components/Splash';
import Chat from './components/Chat';
import { authenticate } from './store/session';
import PageNotFound from './components/auth/PageNotFound';

function App() {
	const user = useSelector(state => state.session.user);
	const [loaded, setLoaded] = useState(false);
	const dispatch = useDispatch();

	useEffect(() => {
		(async () => {
			await dispatch(authenticate());
			setLoaded(true);
		})();
	}, [dispatch]);

	if (!loaded) {
		return null;
	}

	return (
		<BrowserRouter>
			{/* <NavBar /> */}
			<Switch>
				<Route path="/" exact={true}>
					<Splash />
				</Route>
				<Route path="/login" exact={true}>
					<LoginForm />
				</Route>
				<Route path="/sign-up" exact={true}>
					<SignUpForm />
				</Route>
				<ProtectedRoute path="/app_ui" exact={true}>
					<MainInterface />
				</ProtectedRoute>
				<Route path="/chatroom">
					<Chat />
				</Route>
				<ProtectedRoute path="/users" exact={true}>
					<UsersList />
				</ProtectedRoute>
				<ProtectedRoute path="/users/:userId" exact={true}>
					<User />
				</ProtectedRoute>
				<ProtectedRoute path="/channels/:id" exact={true}>
					<MainInterface />

				</Route>
				<Route path="/dms/all" exact={true}>
					<MainInterface />
				</Route>
				<Route path="/dm/:id" exact={true}>

					<MainInterface />
				</ProtectedRoute>
				{/* <ProtectedRoute path="/" exact={true} >
					<h1>My Home Page</h1>
				</ProtectedRoute> */}
				<Route>
					<PageNotFound />
				</Route>
			</Switch>
		</BrowserRouter>
	);
}

export default App;
