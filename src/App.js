import './App.css';
import { Person } from './Person';

function App () {
  return (
    <div className='App'>
      <Person name='piggy' age={21} email='piggy@piggy.com'/>
    </div>
  );
}

export default App;