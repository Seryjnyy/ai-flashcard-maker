import { Box } from '@mui/material';
import React, { useState } from 'react'
import useSWR, { mutate, useSWRConfig } from 'swr';
import useSWRImmutable from 'swr/immutable'
import Flashcard from './Flashcard';
import PromptInput from './PromptInput';

export default function FlashcardMaker() {
	const [selectedCards, setSelectedCards] = useState(new Set());
	const [prompt, setPrompt] = useState("")

	const fetcher = () => fetch(
		"/api/flashcard/create",
		{
			method: "POST",
			body: JSON.stringify(prompt)
		}
	).then(res => res.json()).then(ar => {
		return ar;
	});

	
	const { data, error, isLoading } = useSWR("api/flashcard/create", fetcher, {
		revalidateIfStale: false,
		revalidateOnFocus: false,
		revalidateOnReconnect: false
	  });

	const onSelectCard = (id: number, selected: boolean) => {
		setSelectedCards(prevState => {
			let temp = new Set();

			prevState.forEach(value => {
				temp.add(value);
			});

			if (selected) {
				temp.add(id);
			} else {
				temp.delete(id);
			}

			return temp;
		})
	}

	console.log(data)

	if (error) return <div>failed to load</div>
	if (isLoading) return <div>loading...</div>

	return (
		<>
			<PromptInput existingPrompt={data.prompt} generateCallback={(userInput) => setPrompt(userInput)}></PromptInput>
			<Box>
				{data.cards.map((result, index) => <Flashcard key={index} id={index} selected={selectedCards.has(index)} front={result.question} back={result.answer} onSelect={(id, selected) => onSelectCard(id, selected)} />)}
			</Box>
		</>
	)
}
