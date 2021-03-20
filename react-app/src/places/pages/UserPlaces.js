import React from 'react';
import { useParams } from 'react-router-dom';

import PlaceList from '../components/PlaceList';

const DUMMY_PLACES = [
	{
		id: 'p1',
		title: 'Empire State Blgd',
		description: 'Great building in NY',
		imageUrl:
			'https://pbs.twimg.com/profile_images/1272532349151072262/kBEZiWIQ.jpg',
		address: '20 W 34th St, New York, NY 10001, United States',
		location: {
			lat: 40.7484405,
			lng: -73.9878584,
		},
		creator: 'u1',
	},
	{
		id: 'p2',
		title: 'Statue of liberty',
		description:
			'The Statue of Liberty is a colossal neoclassical sculpture on Liberty Island in New York Harbor within New York City, in the United States.',
		imageUrl:
			'https://www.history.com/.image/ar_4:3%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cq_auto:good%2Cw_1200/MTY1MTc1MTk3ODI0MDAxNjA5/topic-statue-of-liberty-gettyimages-960610006-promo.jpg',
		address: 'New York, NY 10004, United States',
		location: {
			lat: 40.6892534,
			lng: -74.0466891,
		},
		creator: 'u2',
	},
];

const UserPlaces = () => {
	const userId = useParams().userId;
	const userPlaces = DUMMY_PLACES.filter((user) => user.creator === userId);
	return <PlaceList items={userPlaces} />;
};

export default UserPlaces;
