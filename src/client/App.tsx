import * as React from 'react';

import { Route, Switch } from 'react-router'
import { Main } from "./pages/main/main";
import { Calculator } from "./pages/calculator/calculator";
import { Navigation } from "./bloks/navigation/navigation";
import {PagePath} from "./types/pages";

interface Props {}

class App extends React.Component<Props> {
    render() {
        return (
            <>
                <Navigation />
                <Switch>
                    <Route
                        path={PagePath.calculator}
                        component={Calculator}
                    />
                    <Route
                        path={PagePath.main}
                        component={Main}
                    />
                </Switch>
            </>
        );
    }
}

export default App;
