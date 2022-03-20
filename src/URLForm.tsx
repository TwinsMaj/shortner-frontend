/* eslint-disable require-jsdoc */
import React, { useState } from 'react';
import styled from 'styled-components';

type TinyURL = {
	id: string;
	encodedURL: string;
	shortURL: string;
	bigURL: string;
	created: string;
	expiry: string;
};

const Input = styled.input`
	border: 1px solid black;
	padding: 8px 2px;
	width: 750px;
	font-size: 18px;
	margin-top: 10px;
`;

const Header = styled.h3`
	display: inline-block
	padding-top: 500px;
`;

const Button = styled.input`
	padding: 10px;
	margin-left: 8px;
	border: 1px solid black;
`;

export const URLForm = () => {
	const [data, setData] = useState({} as TinyURL);
	const [url, setUrl] = useState('');
	const [loaded, setLoaded] = useState(false);
	const [error, setError] = useState(null);

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!url) return;

		const requestOptions = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ bigURL: url }),
		};

		async function fetchData() {
			const endpoint = `https://strategyzer-takehome.herokuapp.com/api/v1/url`;

			fetch(endpoint, requestOptions)
				.then((response) => {
					if (!response.ok) {
						throw Error('Could not fetch data for the resource');
					}
					return response.json();
				})
				.then((data) => {
					setData(data);
					setError(null);
					setUrl('');
					setLoaded(true);
				})
				.catch((err) => {
					setLoaded(false);
					setError(err.message);
				});
		}
		fetchData();
	};

	return (
		<>
			<form onSubmit={handleSubmit}>
				<Header>Enter URL (must be a full url): </Header>
				<Input
					type="text"
					value={url}
					onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUrl(e.target.value)}
					placeholder="http://www.yahoo.com"
				/>
				<Button type="submit" value="Generate" />
			</form>
			<div>{loaded && <p>Here is your URL: {data.shortURL}</p>}</div>
			<div>{error && <p>{error}</p>}</div>
		</>
	);
};
