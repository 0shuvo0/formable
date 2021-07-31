import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom"

import Navbar from "./components/Navbar"
import Footer from "./components/Footer"

//Importing pages
import Home from "./pages/Home"
import Create from "./pages/Create"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Forms from "./pages/Forms"
import Fill from "./pages/Fill"
import Submissions from "./pages/Submissions"

function App() {
  return (
    <div className="App">
        <Router>
          <Navbar />
          <div className="container main">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/create" component={Create} />
              <Route path="/login" component={Login} />
              <Route path="/signup" component={Signup} />
              <Route path="/forms" component={Forms} />
              <Route path="/fill/:id" component={Fill} />
              <Route path="/submissions/:id" component={Submissions} />
            </Switch>
          </div>
        </Router>
        <Footer />
    </div>
  );
}

export default App;
