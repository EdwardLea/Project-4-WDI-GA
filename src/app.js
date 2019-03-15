import React from 'react'
import ReactDOM from 'react-dom'

import { BrowserRouter, Route, Switch } from 'react-router-dom'

import 'bulma'
import './style.scss'

import EventsIndex from './components/events/EventsIndex'
import EventsNew from './components/events/EventsNew'
import EventsEdit from './components/events/EventsEdit'
import EventsShow from './components/events/EventsShow'
//
import ClubsIndex from './components/clubs/ClubsIndex'
import ClubsNew from './components/clubs/ClubsNew'
import ClubsEdit from './components/clubs/ClubsEdit'
import ClubsShow from './components/clubs/ClubsShow'
//
import SecureRoute from './components/common/SecureRoute'

import Register from './components/auth/Register'
import Login from './components/auth/Login'
import UserShow from './components/users/UserShow'

import Navbar from './components/common/NavBar'
import FlashMessages from './components/common/FlashMessages'

class App extends React.Component {
  render() {

    return (
      <BrowserRouter>
        <main>
          <Navbar />
          <FlashMessages />
          <Switch>
            <SecureRoute path="/events/new" component={EventsNew} />
            <SecureRoute path="/events/:id/edit" component={EventsEdit} />
            <Route path="/events/:id" component={EventsShow} />
            <Route path="/events" component={EventsIndex} />
            <Route path="/users/:id" component={UserShow} />

            <SecureRoute path="/clubs/new" component={ClubsNew} />
            <SecureRoute path="/clubs/:id/edit" component={ClubsEdit} />
            <Route path="/clubs/:id" component={ClubsShow} />
            <Route path="/clubs" component={ClubsIndex} />

            <Route path="/register" component={Register} />
            <Route path="/login" component={Login} />
            <Route path="/" component={EventsIndex} />
          </Switch>
        </main>
      </BrowserRouter>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
