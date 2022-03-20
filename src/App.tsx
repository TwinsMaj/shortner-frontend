import './App.css';
import { URLForm } from './URLForm';
import styled from 'styled-components';

const Wrapper = styled.div`
	height: 100vh;
	background-color: #09f;
`;

// eslint-disable-next-line require-jsdoc
function App() {
	return (
		<Wrapper className="App">
			<URLForm />
		</Wrapper>
	);
}

export default App;
