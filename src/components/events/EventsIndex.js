import React from 'react'
import axios from 'axios'
import moment from 'moment'
import EventCard from './EventCard'
import EventsSearchForm from './EventsSearchForm'
import EventsShow from './EventsShow'
import Carousels from './Carousel'
import LoadingPage from '../common/LoadingPage'

class EventsIndex extends React.Component {

  constructor() {
    super()
    this.state = {
      events: [],
      category: 'All',
      location: ''
    }

    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    axios.get('/api/events')
      .then(res => this.setState({ events: res.data }))
  }

  handleChange({ target: { name, value } }) {
    this.setState({ [name]: value })
  }


  filteredEvents() {
    const re = new RegExp(this.state.location, 'i')
    if(!this.state.category && !this.state.location) return this.state.events
    return this.state.events.filter(event => {
      return re.test(event.address) && (moment(event.date) > new Date()) && (this.state.category === 'All' || event.category === this.state.category)
    })
  }



  render() {
    if(!this.state.events) return  <LoadingPage />

    return (

      <div>
        <Carousels />
        <section className="section">
          <div className="container">
            <EventsSearchForm handleChange={this.handleChange} />
          </div>
        </section>

        <div className="box">
          <section className="section panels">

            <div className="columns is-multiline">
              {this.filteredEvents().map(event =>
                <div key={event.id} className="column is-one-third">
                  <EventCard {...event} />
                </div>
              )}
            </div>

          </section>
        </div>

      </div>
    )
  }
}

export default EventsIndex
