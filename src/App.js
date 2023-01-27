import "./App.css";
import { Person } from "./Person";

function App() {
  return (
    <div className="App">
      <Person
        name="Piggy"
        age={21}
        email="piggy@piggy.com"
        married={false}
        friends={["Kelly", "Jessica"]}
      />
    </div>
  );
}

export default App;
