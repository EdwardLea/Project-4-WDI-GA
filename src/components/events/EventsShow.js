import React from 'react'
import axios from 'axios'
import moment from 'moment'

import Map from '../common/Map'
import MoreClubs from './MoreClubs'
import Auth from '../../lib/Auth'
import {Link} from 'react-router-dom'
import 'weather-icons/css/weather-icons.css'
import LoadingPage from '../common/LoadingPage'

class EventsShow extends React.Component {
  constructor(){
    super()

    this.state = {
      event: null,
      userLocation: {
        lat: '',
        lng: ''
      },
      eventInformation: {
        weather: '',
        travelTime: ''
      }
    }

    this.handleAttendee = this.handleAttendee.bind(this)
    this.eventLink = this.eventLink.bind(this)
  }

  componentDidMount() {
    axios.get(`/api/events/${this.props.match.params.id}`)
      .then(res => this.setState({ event: res.data }))

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.setState({
          userLocation: {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          }
        })
        axios.get(`/api/events/${this.props.match.params.id}/traveltime`, {
          params: {
            lat: this.state.userLocation.lat,
            lng: this.state.userLocation.lng
          }
        })
          .then(res => {
            const event = {...this.state.eventInformation, travelTime: res.data.citymapper, weather: res.data.weather }
            this.setState( {eventInformation: event} )
          })
      })
    }
  }

  getIconClass(icon) {
    const className = icon.replace('partly-', '')
      .split('-')
      .reverse()
      .join('-')
    if(className === 'day-clear') {
      return 'wi wi-day-sunny is-size-3'
    }
    if(className === 'wind') {
      return 'wi wi-day-windy is-size-3'
    }
    return `wi wi-${className} is-size-3`
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

  render(){

    if(!this.state.event) return <LoadingPage />

    const { id, name, owner, date, image, duration, description, lat, lng, hours, minutes, attendees, max_attendees, travelTime, club, weather } = this.state.event
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
                <div style={{display: 'inline-block'}}>
                  <span className="subtitle">{moment(date).format('MMM')} </span> <br />
                  <span className="subtitle date">{moment(date).format('DD')} </span>
                </div>
                {this.state.eventInformation.weather && (<span> <i className={this.getIconClass(this.state.eventInformation.weather)}></i> </span>)}
                <p className="subtitle is-6"><strong> {name} </strong></p>
                <p className="subtitle created has-text-grey"> Created by: {owner.username}</p>
                <p className="subtitle created has-text-grey"> <i className="fas fa-map-marked"></i>: {this.state.eventInformation.travelTime} minutes travel time</p>
                {this.state.userLocation.lat && (
                  <div>
                    <button className="button dir-btn is-outlined is-info"><a href={`https://citymapper.com/directions?startcoord=${this.state.userLocation.lat},${this.state.userLocation.lng}&endcoord=${lat},${lng}`} target="blank"> Launch in City Mapper</a></button>
                    <button className="button dir-btn is-outlined is-info"><a href={`https://www.google.com/maps/dir/?api=1&origin=${this.state.userLocation.lat},${this.state.userLocation.lng}&destination=${lat},${lng}`} target="blank"> Launch in Google Maps</a></button>
                  </div>
                )}
                {Auth.isAuthenticated() && Auth.isOwner(owner.id) && (
                  <Link to={`/events/${id}/edit`} className="button is-info"> Edit </Link>
                )}
              </div>
            </div>
          </div>
          <hr className="event-hr"/>
          {(moment(date) > new Date()) &&
            <div className="columns sticky is-centered">
              <div className="column is-4 has-text-centered">
                {Auth.isAuthenticated() && !Auth.isAttending(attendees) && (
                  <button className="button is-fullwidth is-outlined is-info" onClick={this.handleAttendee}> Attend
                  </button>
                )}
                {Auth.isAuthenticated() && Auth.isAttending(attendees) && (
                  <button className="button is-fullwidth is-info"> Attending
                  </button>
                )}
              </div>
            </div>
          }
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
                <span> {moment(date).format('dddd, MMMM Do YYYY')} </span>
                <span> {('0' + hours).slice(-2)}:{('0' + minutes).slice(-2)} </span>
                <p> Duration: {duration} mins </p>
                <p> Max attendees: {max_attendees} </p>
                <p> Attendees: {attendees.length} </p>
              </div>
            </div>
          </div>
          <hr />
          <div className="section">
            <div className="columns is-centered">
              <div className="column is-half has-text-centered">
                <Link to={`/clubs/${club.id}`}>
                  <div className="is-flex image-cropper">
                    <figure className="image club-pro-pic">
                      <img className="eventClubImg" src={club.image} alt={club.name} />
                    </figure>
                  </div>
                </Link>
                <h4> {club.name} </h4>
                <p> Organiser of {name} </p>
                <p> {club.description} </p>
              </div>
            </div>
          </div>
          <div className="section has-text-centered">
            <h3 className="title is-6"> More events from the organiser </h3>
          </div>
          <div>
            {club.events.filter(clubEvent => clubEvent.id !== id).map(clubEvent=> <div key={clubEvent.id}>
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
