import React, { useState } from 'react';
import { Profiler } from './Profiler';
import { Rating } from '../src/Rating';
/* import { ItemStyles } from '../src/exportedTypes';
import { StickerStar } from '../src'; */

/* const customStyles: ItemStyles = {
	itemShapes: StickerStar,
	activeFillColor: '#9333ea',
	inactiveFillColor: '#f3e8ff',
}; */

const CUSTOM_GROUP_LABEL = 'Rate - GitHub Plaza Hotel';
const CUSTOM_GROUP_LABEL_ID = 'group_label';

/* const CUSTOM_LABELS = ['Bad', 'Poor', 'Average', 'Very Good', 'Excellent'];
const CUSTOM_LABELS_IDS = ['label_1', 'label_2', 'label_3', 'label_4', 'label_5']; */

export function App() {
	const [state, setState] = useState({
		name: '',
		review: '',
		rating: 3,
	});

	function handleHover(hoveredValue: number) {
		console.log(hoveredValue);
	}

	console.log('Rating: ' + state.rating);

	function handleChange(ratingValue: number) {
		console.log(ratingValue);

		setState((prevState) => ({
			...prevState,
			rating: ratingValue,
		}));
	}

	return (
		<div
			style={{
				width: '100%',
				height: '90vh',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				gap: '20px',
				flexDirection: 'column',
			}}
		>
			<button id="first_button" type="button" onClick={() => null}>
				First Button
			</button>
			<h2 id={CUSTOM_GROUP_LABEL_ID}>Rating Label</h2>
			<Profiler>
				<Rating
					style={{
						maxWidth: 160,
					}}
					// readOnly
					resetOnSecondClick
					// onHoverChange={handleHover}
					// isDisabled
					isRequired={false}
					items={5}
					aria-label="Ciao"
					onChange={handleChange}
					value={state.rating}
					// itemStyles={customStyles}
					// highlightOnlySelected
					orientation="horizontal"
					radius="small"
					visibleLabelId={CUSTOM_GROUP_LABEL_ID}
					invisibleLabel={CUSTOM_GROUP_LABEL}
				/>
			</Profiler>
			<button id="second_button" type="button" onClick={() => null}>
				Second Button
			</button>
		</div>
	);
}
