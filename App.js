import React, {Component} from 'react';
import {Route, Switch} from 'react-router';
import {BrowserRouter} from 'react-router-dom'
import Home from './modules/Home/Home'

class App extends Component {
    componentDidMount() {
      /*fetch('/api/v1/storageListing')
       .then(response => response.json())
       .then((response) => {
       console.log(response);
       })
       .catch(error => {
       console.log('request failed', error);
       });*/
    }

    render() {
        return (
            <BrowserRouter>
              <div>
                <Switch>
                  <Route exact path="/" component={Home}/>
                </Switch>
              </div>
            </BrowserRouter>
        );
    }
}

export default App;