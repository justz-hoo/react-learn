import './App.css';
import { useCount } from './useCount';

function App () {
  const {count, add, sub, set2zero} = useCount();
  return (
    <div className='App'>
      {count}
      <button onClick={add}> add </button>
      <button onClick={sub}> sub </button>
      <button onClick={set2zero}> set to zero </button>
    </div>
  );
}

export default App;