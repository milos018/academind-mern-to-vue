import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import PlaceList from '../components/PlaceList';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';

import { useHttp } from '../../shared/hooks/http-hook';

const UserPlaces = () => {
	const [userPlaces, setUserPlaces] = useState();
	const { userId } = useParams();

	const { isLoading, errorMessage, sendRequest, clearError } = useHttp();

	useEffect(() => {
		const getPlaces = async () => {
			const url = process.env.REACT_APP_BACKEND_URL + '/places/user/' + userId;
			try {
				const userData = await sendRequest(url);
				setUserPlaces(userData.userPlaces.places);
			} catch (error) {}
		};
		getPlaces();
	}, [sendRequest, userId]);

	const placeDeleteHandler = (deletedPlaceId) => {
		setUserPlaces((prevPlaces) =>
			prevPlaces.filter((place) => place._id !== deletedPlaceId),
		);
	};

	return (
		<React.Fragment>
			<ErrorModal error={errorMessage} onClear={clearError} />
			{isLoading && (
				<div className='center'>
					<LoadingSpinner />
				</div>
			)}
			{!isLoading && userPlaces && (
				<PlaceList items={userPlaces} onDeletePlace={placeDeleteHandler} />
			)}
		</React.Fragment>
	);
};

export default UserPlaces;
