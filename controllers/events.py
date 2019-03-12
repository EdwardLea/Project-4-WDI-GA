import requests, time, datetime
from flask import Blueprint, request, jsonify, g
from models.event import Event, EventSchema
from models.club import Club, ClubSchema
from lib.secure_route import secure_route
from config.environment import city_mapper_key, darksky_key


api = Blueprint('events', __name__)

events_schema = EventSchema(
    many=True,
    exclude=('club', 'attendees', 'owner', 'description', 'max_attendees')
)
event_schema = EventSchema()

@api.route('/events', methods=['GET'])
def index():
    events = Event.query.all()
    return events_schema.jsonify(events)

@api.route('/events/<int:event_id>/traveltime', methods=['GET'])
def travel_time(event_id):
    event = Event.query.get(event_id)
    lat = request.args.get('lat')
    lng = request.args.get('lng')
    citymapper_url = 'https://developer.citymapper.com/api/1/traveltime'
    params = {
        'startcoord': f'{lat},{lng}',
        'endcoord': f'{event.lat},{event.lng}',
        'key': city_mapper_key
    }
    citymapper_response = requests.get(citymapper_url, params=params).json()
    print(citymapper_response)

    unix_date = int(time.mktime(datetime.datetime.strptime(f'{event.date}', "%Y-%m-%d").timetuple()))
    print(unix_date)

    darksky_url = f'https://api.darksky.net/forecast/{darksky_key}/{event.lat},{event.lng},{unix_date}?exclude=currently,flags,hourly,minutely,%20alerts'
    darksky_response = requests.get(darksky_url).json()
    print(darksky_response)
    response = {
        'citymapper': citymapper_response['travel_time_minutes'],
        'weather': darksky_response['daily']['data'][0]['icon']
    }
    print(response)

    return jsonify(response)


@api.route('/events/<int:event_id>', methods=['GET'])
def show(event_id):
    event = Event.query.get(event_id)
    return event_schema.jsonify(event)


@api.route('/events', methods=['POST'])
@secure_route
def create():
    event, errors = event_schema.load(request.get_json())

    if errors:
        return jsonify(errors), 422

    event.owner = g.current_user

    event.attendees.append(g.current_user)

    event.save()

    return event_schema.jsonify(event)

@api.route('/events/<int:event_id>', methods=['PUT'])
@secure_route
def update(event_id):

    event = Event.query.get(event_id)

    if event.owner != g.current_user:
        return jsonify({'messsage': 'Unauth'}), 401

    event, errors = event_schema.load(request.get_json(), instance=event)

    if errors:
        return jsonify(errors), 422

    event.save()

    return event_schema.jsonify(event)

@api.route('/events/<int:event_id>', methods=['DELETE'])
@secure_route
def delete(event_id):

    event = Event.query.get(event_id)

    if event.owner != g.current_user:
        return jsonify({'messsage': 'Unauth'}), 401

    event.remove()

    return '', 204

@api.route('/events/<int:event_id>/attend', methods=['GET'])
@secure_route
def event_attend(event_id):

    event = Event.query.get(event_id)

    event.attendees.append(g.current_user)

    event.save()

    return event_schema.jsonify(event)
