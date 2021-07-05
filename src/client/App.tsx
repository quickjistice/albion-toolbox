import * as React from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom'
import { Main } from "./pages/main/main";
import { Calculator } from "./pages/calculator/calculator";
import { Navigation } from "./bloks/navigation/navigation";

interface Props {}

class App extends React.Component<Props> {
    render() {
        return (
            <Router>
                <Navigation />
                <Switch>
                    <Route
                        path="/calculator"
                        render={() => (
                            <React.Fragment>
                                <Calculator />
                            </React.Fragment>
                        )}
                    />
                    <Route
                        path="/"
                        render={() => (
                            <React.Fragment>
                                <Main />
                            </React.Fragment>
                        )}
                    />
                </Switch>
            </Router>
        );
    }
}

export default App;
