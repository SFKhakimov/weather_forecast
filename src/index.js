import ReactDOM from 'react-dom';
import './index.css';
import app from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(app, document.getElementById('root'));

serviceWorker.unregister();
