import "./App.css";
import Rating from "./Rate";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>precision: 0.5</p>
        <Rating count={5} precision={0.5} />

        <p>precision: 0.75</p>
        <Rating count={6} precision={1 / 4} />
      </header>
    </div>
  );
}

export default App;
