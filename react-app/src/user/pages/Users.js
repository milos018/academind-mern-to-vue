import React, { useEffect, useState } from 'react';

import UsersList from '../components/UsersList';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';

import { useHttp } from '../../shared/hooks/http-hook';

const Users = () => {
	const { isLoading, errorMessage, sendRequest, clearError } = useHttp();
	const [loadedUsers, setLoadedUsers] = useState();

	useEffect(() => {
		const getUsers = async () => {
			const url = 'http://localhost:5500/api/users';
			try {
				const userData = await sendRequest(url);
				setLoadedUsers(userData.users);
			} catch (error) {
				console.log(error.message);
			}
		};
		getUsers();
	}, [sendRequest]);

	return (
		<React.Fragment>
			<ErrorModal error={errorMessage} onClear={clearError} />
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
