import React, { Component } from 'react';
import { Route, IndexRoute } from 'react-router';

class Routes extends Component{
    render(){
        return(
            <Route path="/" component={App}>
            <IndexRoute component={Home} />
            <Route path="/horizontal/" component={HorizontalFlow} />
            <Route path="/change-size/" component={ChangeSize} />
            <Route path="/real-world/" component={RealWorld} />
            </Route>
        )
    }
}

export default Routes;