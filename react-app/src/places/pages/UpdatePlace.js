import React from 'react';
import { useParams } from 'react-router-dom';

import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';

import './PlaceForm.css';

import {
	VALIDATOR_REQUIRE,
	VALIDATOR_MINLENGTH,
} from '../../shared/utils/validator';

import { useForm } from '../../shared/hooks/form-hook';

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

const UpdatePlace = () => {
	const { placeId } = useParams();

	const foundPlace = DUMMY_PLACES.find((place) => place.id === placeId);

	const [formState, inputHandler] = useForm(
		{
			title: {
				value: foundPlace.title,
				isValid: true,
			},
			description: {
				value: foundPlace.description,
				isValid: true,
			},
		},
		true,
	);

	const placeUpdateSubmitHandler = (event) => {
		event.preventDefault();
		console.log(formState.inputs);
	};

	if (!foundPlace)
		return (
			<div className='center'>
				<h2>Could find place with this ID</h2>
			</div>
		);

	return (
		<form onSubmit={placeUpdateSubmitHandler} className='place-form'>
			<Input
				id='title'
				element='input'
				type='text'
				label='Title'
				validators={[VALIDATOR_REQUIRE()]}
				errorText='Please enter a valid title.'
				onInput={inputHandler}
				initialValue={formState.inputs.title.value}
				initialValid={formState.inputs.title.isValid}
			/>
			<Input
				id='description'
				element='textarea'
				label='Description'
				validators={[VALIDATOR_MINLENGTH(5)]}
				errorText='Please enter a valid description (min 5 characters).'
				onInput={inputHandler}
				initialValue={formState.inputs.description.value}
				initialValid={formState.inputs.description.isValid}
			/>
			<Button type='submit' disabled={!formState.isValid}>
				Update Place
			</Button>
		</form>
	);
};

export default UpdatePlace;
