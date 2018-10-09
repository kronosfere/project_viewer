import React from 'react'
import { Route, Switch } from 'react-router-dom'

import { NavMain } from './components'

import HomeView from './views/HomeView'
import UserView from './views/UserView'
import ProjectView from './views/ProjectView'

const App = () => (
  <div>
    <Route path="/:user?/" component={NavMain} />
    <div>
      <Switch>
        <Route exact path="/" component={HomeView} />
        <Route exact path="/:user/" component={UserView} />
        <Route exact path="/:user/:project/" component={ProjectView} />
      </Switch>
    </div>
  </div>
)

export default App
