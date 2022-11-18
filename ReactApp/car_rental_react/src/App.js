import logo from './logo.svg';
import './App.css';
import { Link } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          <Link to="/Car">Car Selection</Link>
        </p>
      </header>
    </div>
  );
}

export default App;
