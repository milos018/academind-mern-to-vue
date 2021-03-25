import React, { useEffect, useState } from 'react';

import UsersList from '../components/UsersList';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';

const Users = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');
	const [loadedUsers, setLoadedUsers] = useState();

	// const USERS = [
	// 	{
	// 		id: 'u1',
	// 		name: 'Yin Lo',
	// 		image: 'https://randomuser.me/api/portraits/women/51.jpg',
	// 		places: 3,
	// 	},
	// 	{
	// 		id: 'u2',
	// 		name: 'Joe Down',
	// 		image: 'https://randomuser.me/api/portraits/women/53.jpg',
	// 		places: 3,
	// 	},
	// ];

	useEffect(() => {
		const getUsers = async () => {
			const url = 'http://localhost:5500/api/users';
			setIsLoading(true);
			try {
				const response = await fetch(url);
				const userData = await response.json();

				if (!response.ok) {
					throw new Error(userData.message);
				}

				setLoadedUsers(userData.users);
			} catch (error) {
				setErrorMessage(error.message);
			}
			setIsLoading(false);
		};
		getUsers();
	}, []);

	const errorHandler = () => {
		setErrorMessage(null);
	};

	return (
		<React.Fragment>
			<ErrorModal error={errorMessage} onClear={errorHandler} />
			{isLoading && (
				<div className='center'>
					<LoadingSpinner />
				</div>
			)}
			{!isLoading && loadedUsers && <UsersList items={loadedUsers} />}
		</React.Fragment>
	);
};

export default Users;
