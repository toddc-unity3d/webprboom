import ReactDOM from 'react-dom';
import App from './App.js'

import './index.css';

window.Module = {}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
