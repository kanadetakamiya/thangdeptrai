import { Router, Route } from "wouter";
import onboard from "./Onboard";
import test from "./Test";

import "./App.css";

function home() {
  return (
    <div>
      <h1>Home</h1>
    </div>
  );
}
function App() {
  return (
    <Router>
      <Route path="/" component={onboard} />
      <Route path="/test" component={test} />
      <Route path="/home" component={home} />
    </Router>
  );
}

export default App;
