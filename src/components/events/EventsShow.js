import React from 'react'
import axios from 'axios'
import moment from 'moment'

import Map from '../common/Map'
import MoreClubs from './MoreClubs'
import Auth from '../../lib/Auth'
import {Link} from 'react-router-dom'

class EventsShow extends React.Component {
  constructor(){
    super()

    this.state = {
      event: null,
      userLocation: null
    }

    this.handleAttendee = this.handleAttendee.bind(this)
    this.eventLink = this.eventLink.bind(this)
  }

  componentDidMount() {
    axios.get(`/api/events/${this.props.match.params.id}`)
      .then(res => this.setState({ event: res.data }))

    // also get the user location...
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.setState({
          userLocation: {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          }
        })
      })
    }
  }

  eventLink(){
    axios.get(`/api/events/${this.props.match.params.id}`)
      .then(res => this.setState({ event: res.data }))
  }

  handleAttendee(e){
    e.preventDefault()
    axios.get(`/api/events/${this.state.event.id}/attend`, {
      headers: { Authorization: `Bearer ${Auth.getToken()}`}
    })
      .then(res => this.setState({event: res.data}))
  }


  // handleFolllow(e){
  //   e.preventDefault()
  //   axios.get(`/api/clubs/${this.state.event.club.id}/follow`, {
  //     headers: { Authorization: `Bearer ${Auth.getToken()}`}
  //   })
  //     .then(res => this.setState({club: res.data}))
  // }

  render(){
    if(!this.state.event) return null
    console.log(this.state)
    const { id, name, owner, date, image, duration, description, lat, lng, time, attendees, max_attendees, club } = this.state.event
    return (
      <div className="container">
        <div className="box eventsBox">

          <div className="columns">
            <div className="column events-img-Col is-8">
              <figure className="event-image">
                <img src={image} alt={name} />
              </figure>
            </div>
            <div className="column event-top-text is-4">
              <div className="content">
                <span className="subtitle">{moment(date).format('MMM')} </span> <br />
                <span className="subtitle date">{moment(date).format('DD')} </span>
                <p className="subtitle is-6"><strong> {name} </strong></p>
                <p className="subtitle created has-text-grey"> Created by: {owner.username}</p>
                <Link to={`/events/${id}/edit`} className="button is-dark is-rounded"> Edit </Link>
              </div>
            </div>
          </div>
          <hr className="event-hr"/>

          <div className="columns sticky is-centered">
            <div className="column is-4 has-text-centered">
              {Auth.isAuthenticated() && !Auth.isAttending(attendees) && (
                <button className="button is-fullwidth is-info" onClick={this.handleAttendee}> Attend  </button>
              )}
              {Auth.isAuthenticated() && Auth.isAttending(attendees) && (
                <button className="button is-fullwidth is-info"> Attending  </button>
              )}
            </div>
          </div>

          <hr/>
          <div className="columns">
            <div className="column des-col is-8">
              <div className="content">
                <h4>Description</h4>
                <h5> Collect: International Art Fair for Modern Craft and Design, presented by the Crafts Council, returns to London’s Saatchi Gallery for its 15th edition from 28 Feb - 3 March 2019.</h5>

                <p>Collect presents an unrivalled opportunity to see and buy exquisite craft-led works by artists and makers represented by British and international galleries.</p>

                <p>Filling all three floors of the Saatchi Gallery, Collect profiles the exceptional skill and intellectual rigour behind contemporary craft, featuring works in ceramics, glass, metal, wood and textiles alongside makers working in non-traditional materials with experimental techniques. </p>
              </div>
            </div>

            <div className="column mid-text is-4">
              <div className="content">
                <p> Date And Time </p>
                <span>{moment(date).format('dddd, MMMM Do YYYY')}, </span>
                <span>{time.substring(0, time.length - 3)}</span>
                <p>Duration: {duration} mins</p>
                <p>Max attendees: {max_attendees}</p>
                <p>Attendees: {attendees.length}</p>
              </div>
            </div>
          </div>

          <hr />

          <div className="section">
            <div className="columns is-centered">
              <div className="column is-half has-text-centered">
                <div className="is-flex image-cropper">
                  <figure className="image club-pro-pic">
                    <img className="eventClubImg" src={club.image} alt={club.name} />
                  </figure>
                </div>
                <h4> {club.name} </h4>
                <p> Organiser of {name} </p>
                <p> {club.description} </p>
                <button className="button is-outlined is-info" onClick={this.handleFolllow}> Follow  </button>
              </div>
            </div>
          </div>


          <div className="section has-text-centered">
            <h3 className="title is-6"> More events from the organiser </h3>
          </div>

          <div>
            {club.events.map(clubEvent=> <div key={clubEvent.id}>
              <MoreClubs
                {...clubEvent}
                eventLink = {this.eventLink}
              />
            </div>
            )}
          </div>


          <Map
            lat={lat}
            lng={lng}
            userLocation={this.state.userLocation}
            events={[this.state.event]}
            type= "event"
          />
        </div>


      </div>
    )
  }
}

export default EventsShow
