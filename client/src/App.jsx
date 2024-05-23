import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import AllRoutes from './router.tsx'; // Assuming AllRoutes is your routing setup component
import './index.css';
function App() {
  return (
    <React.StrictMode>
      <Router>
        <AllRoutes />
      </Router>
    </React.StrictMode>
  );
}

export default App; 

// ReactDOM.render(<App />, document.getElementById('root'));
