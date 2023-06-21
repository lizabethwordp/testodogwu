/* istanbul ignore file */
import './index.css';
import Landing from './Landing';
import Sliding from './Sliding.jsx';


function App() {
  return (
    <div>
      <div className="overlay"></div>
      <Sliding />
      <Landing className="content"/>
    </div>
  );
}

export default App;
