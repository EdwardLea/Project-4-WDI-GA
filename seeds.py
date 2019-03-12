from app import app, db
from models.user import UserSchema
from models.club import Club, ClubComment
from models.event import Event

user_schema = UserSchema()

with app.app_context():
    db.drop_all()
    db.create_all()

    Mark, errors = user_schema.load({
        'username': 'Mark',
        'email':'mark@gmail.com',
        'image': '',
        'password':'password',
        'password_confirmation':'password'
    })

    if errors:
        raise Exception(errors)
    Mark.save()

    Wendy, errors = user_schema.load({
        'username': 'Wendy',
        'email':'wendy@gmail.com',
        'image': '',
        'password':'password',
        'password_confirmation':'password'
    })

    if errors:
        raise Exception(errors)
    Wendy.save()

    Dwight, errors = user_schema.load({
        'username': 'Dwight',
        'email':'Dwight@gmail.com',
        'image': '',
        'password':'password',
        'password_confirmation':'password'
    })

    if errors:
        raise Exception(errors)
    Dwight.save()

    Nawal, errors = user_schema.load({
        'username': 'Nawal',
        'email':'nawal@gmail.com',
        'image': 'https://tinyurl.com/y3n62bu6',
        'password':'password',
        'password_confirmation':'password'
    })

    if errors:
        raise Exception(errors)
    Nawal.save()

    Jody, errors = user_schema.load({
        'username': 'Jody',
        'email':'jody@gmail.com',
        'image': '',
        'password':'password',
        'password_confirmation':'password'
    })

    if errors:
        raise Exception(errors)
    Jody.save()

    Ed, errors = user_schema.load({
        'username': 'Ed',
        'email':'ed@gmail.com',
        'image': '',
        'password':'password',
        'password_confirmation':'password'
    })

    if errors:
        raise Exception(errors)
    Ed.save()

    badminton_north_london = Club(
        name='North London Badminton Club',
        image='https://tinyurl.com/y2zjeusz',
        owner=Nawal,
        followed_by=[Ed, Nawal],
        location='Finsbury Park, London, Greater London, England, United Kingdom',
        lat=51.534969,
        lng=-0.103750,
        description='Friendly club to play weekly badminton on a Wednesday',
        category='Sports'
    )
    badminton_north_london.save()

    mums_club_Surbiton = Club(
        name='Mums Meetup Club Surbiton',
        image='http://tinyurl.com/y5oj22bz',
        owner=Wendy,
        followed_by=[Ed, Nawal],
        location='Surbiton, Greater London, England, United Kingdom',
        lat=51.3862921,
        lng=-0.3090997,
        description='A great environment for Mums & Mums to be to connect and let their hair down',
        category='Mums'
    )
    mums_club_Surbiton.save()

    chess_club_islington = Club(
        name='Chess Club Islington',
        image='https://tinyurl.com/yx8o8rff',
        owner=Ed,
        followed_by=[Ed, Nawal],
        location='Islington',
        lat=51.534969,
        lng=-0.103750,
        description='Begineers chess club in Islington North London',
        category='Sports'
    )
    chess_club_islington.save()

    south_londoner_gamer = Club(
        name='South London Gamers',
        image='https://tinyurl.com/y3gc763z',
        owner=Ed,
        followed_by=[Ed, Nawal],
        location='Croydon, Greater London, England, United Kingdom',
        lat=51.376163,
        lng=-0.098234,
        description='Computers games club for those in and around Croydon',
        category='Gaming'
    )
    south_londoner_gamer.save()

    london_photography = Club(
        name='London Photography Group',
        image='https://tinyurl.com/j2lwsjz',
        owner=Ed,
        followed_by=[Ed, Wendy, Mark],
        location='London, Greater London, England, United Kingdom',
        lat=51.376163,
        lng=-0.098234,
        description='Monthly group to capture areas of the city',
        category='Photography'
    )
    london_photography.save()

    surrey_walkers = Club(
        name='Surrey Walkers',
        image='https://tinyurl.com/yxehbrk8',
        owner=Ed,
        followed_by=[Ed, Nawal, Jody, Dwight],
        location='Teddington, Greater London, England, United Kingdom',
        lat=51.376163,
        lng=-0.098234,
        description='Lovely walks around the surrey countryside',
        category='Sports'
    )
    surrey_walkers.save()

    east_london_five = Club(
        name='East London Five-a-Side',
        image='https://tinyurl.com/y5s8wns5',
        owner=Ed,
        followed_by=[Ed, Mark, Jody],
        location='Shoreditch, London, Greater London, England, United Kingdom',
        lat=51.515617,
        lng=-0.070839,
        description=' Five-a-side football at Shoreditch',
        category='Sports'
    )
    east_london_five.save()

    football = Club(
        name='Sutton Football Club',
        image='https://tinyurl.com/yxq3hdqc',
        owner=Nawal,
        followed_by=[Ed, Nawal],
        location='London, Greater London, England, United Kingdom',
        lat=51.3587483,
        lng=-0.2402007,
        description='Football club in Sutton area for a kick around',
        category='Sports'
    )
    football.save()

    board_games = Club(
        name='Board Game Club',
        image='https://tinyurl.com/y2vmkz7d',
        owner=Nawal,
        followed_by=[Ed, Nawal],
        location='Hammersmith, London',
        lat=51.4927027,
        lng=-0.2558098,
        description='Monthly Meeting',
        category='Board Games'
    )
    board_games.save()

    food_club = Club(
        name='Food Club',
        image='https://tinyurl.com/y3jhtfs2',
        owner=Ed,
        followed_by=[Ed, Nawal, Mark, Wendy],
        location='Illford, London',
        lat=51.5786412,
        lng=0.0146417,
        description='Monthly italian food prep',
        category='Food & Drink'
    )
    food_club.save()

    club_comment_1 = ClubComment(
        content='Has anyone can any ideas for the next group meeting?',
        club=london_photography,
        creator=Ed
    )
    club_comment_1.save()

    club_comment_2 = ClubComment(
        content='I was in Greenwich last weekend and thought that was quite a lot of potential spots there',
        club=london_photography,
        creator=Wendy
    )
    club_comment_2.save()

    club_comment_3 = ClubComment(
        content='Also the Thames Barrier is well worth a visit whilst in that area',
        club=london_photography,
        creator=Wendy
    )
    club_comment_3.save()

    club_comment_4 = ClubComment(
        content='I would be up for a trip there',
        club=london_photography,
        creator=Jody
    )
    club_comment_4.save()

    club_comment_5 = ClubComment(
        content='Think that would be a good call, especially this time of year',
        club=london_photography,
        creator=Ed
    )
    club_comment_5.save()

    club_comment_6 = ClubComment(
        content='I will set up an event for January',
        club=london_photography,
        creator=Ed
    )
    club_comment_6.save()

    badminton_day = Event(
        name='Badminton Club Tottenham',
        image='https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F55930430%2F3256470838%2F1%2Foriginal.jpg?w=800&auto=compress&rect=258%2C0%2C2180%2C1090&s=dff8d8034e2a483f7524662d89f5e58f',
        owner=Ed,
        max_attendees=20,
        date='2019-02-11',
        hours=14,
        minutes=30,
        duration=300,
        club=badminton_north_london,
        attendees=[Nawal, Jody, Dwight, Wendy, Mark],
        lat=51.6784598,
        lng=-0.3447658,
        description='Team tournement followed by a BBQ and party',
        category='Sports',
        address='Tottenham Hale, London, Greater London, England, United Kingdom'
    )
    badminton_day.save()

    badminton_doubles = Event(
        name='Badminton Doubles',
        image='https://images.unsplash.com/photo-1521537634581-0dced2fee2ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80',
        owner=Ed,
        max_attendees=4,
        date='2019-03-10',
        hours=19,
        minutes=00,
        duration=60,
        club=badminton_north_london,
        attendees=[Nawal],
        lat=51.6784598,
        lng=-0.3447658,
        description='Friendly game of doubles for anyone who fancies it',
        category='Sports',
        address='Tottenham Hale, London, Greater London, England, United Kingdom'
    )
    badminton_doubles.save()

    greenwich_photo_tour = Event(
        name='Greenwich Photography Event',
        image='https://tinyurl.com/y5cd2kbz',
        owner=Jody,
        max_attendees=6,
        date='2019-03-15',
        hours=14,
        minutes=00,
        duration=120,
        club=london_photography,
        attendees=[Jody, Ed],
        lat=51.4874009,
        lng=-0.012965,
        description='Lovely club',
        category='Photography',
        address='Greenwich, London, Greater London, England, United Kingdom'
    )
    greenwich_photo_tour.save()

    city_photo_tour = Event(
        name='The City Photography Trip',
        image='https://tinyurl.com/y2a6cosv',
        owner=Jody,
        max_attendees=6,
        date='2019-03-01',
        hours=16,
        minutes=00,
        duration=120,
        club=london_photography,
        attendees=[Ed],
        lat=51.5150422,
        lng=-0.1107947,
        description='Little trip around the square mile',
        category='Photography',
        address='Bank, Princes St, London, England EC3V 3NR, United Kingdom'
    )
    city_photo_tour.save()

    feb_five_a_side = Event(
        name='March Five-a-Side',
        image='https://360sport.fr/wp-content/uploads/sites/6/2016/11/foot-salle-foot-5.jpg',
        owner=Mark,
        max_attendees=10,
        date='2019-03-15',
        hours=14,
        minutes=00,
        duration=120,
        club=east_london_five,
        attendees=[Jody, Ed],
        lat=51.4963099,
        lng=-0.1203346,
        description='The February issue of our monthly five-a-side',
        category='Sports',
        address='Shoreditch, London, Greater London, England, United Kingdom'
    )
    feb_five_a_side.save()

    jan_five_a_side = Event(
        name='April Five-a-Side',
        image='https://images.unsplash.com/photo-1526232636376-53d03f24f092?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80',
        owner=Mark,
        max_attendees=10,
        date='2019-04-18',
        hours=14,
        minutes=00,
        duration=120,
        club=east_london_five,
        attendees=[Jody, Ed],
        lat=51.4963099,
        lng=-0.1203346,
        description='The January issue of our monthly five-a-side',
        category='Sports',
        address='Shoreditch, London, Greater London, England, United Kingdom'
    )
    jan_five_a_side.save()

    champions_chess = Event(
        name='Champions Chess Tournement',
        image='https://tinyurl.com/y5m9pvd8',
        owner=Jody,
        max_attendees=6,
        date='2019-03-20',
        hours=18,
        minutes=00,
        duration=120,
        club=chess_club_islington,
        attendees=[Jody, Ed],
        lat=51.5389083,
        lng=-0.109142,
        description='It is that time of the year again!',
        category='Sports',
        address='The Old Queens Head, 44 Essex Rd, London, England N1 2SZ, United Kingdom'
    )
    champions_chess.save()

    richmond_park = Event(
        name='March Richmond Park Walk',
        image='https://tinyurl.com/y3r8k2e7',
        owner=Nawal,
        max_attendees=6,
        date='2019-03-15',
        hours=14,
        minutes=00,
        duration=120,
        club=surrey_walkers,
        attendees=[Jody, Ed],
        lat=51.4463869,
        lng=-0.2779614,
        description='Great walk around Richmond Park',
        category='Sports',
        address='Richmond Park, Richmond, Richmond, England, United Kingdom'
    )
    richmond_park.save()

    fifa_tourney = Event(
        name='Fifa Tourney',
        image='https://tinyurl.com/y2hr5mua',
        owner=Nawal,
        max_attendees=20,
        date='2019-09-13',
        hours=10,
        minutes=00,
        duration=160,
        club=south_londoner_gamer,
        attendees=[Jody, Mark, Ed, Nawal],
        lat=53.0219186,
        lng=-2.2297829,
        description='Play with the best fifa players in South London',
        category='Gaming',
        address='149 Hook Rise South, Chessington, Surbiton'
        )
    fifa_tourney.save()

    mums_breakfast = Event(
        name='Mums BreakFast May',
        image='http://tinyurl.com/y6ayg466',
        owner=Wendy,
        max_attendees=20,
        date='2019-06-11',
        hours=10,
        minutes=00,
        duration=120,
        club=mums_club_Surbiton,
        attendees=[Jody, Ed],
        lat=51.3908113,
        lng=-0.3158732,
        description='A great environment for Mums & Mums to be to connect and let their hair down',
        category='Mums',
        address='Surbiton Cafe, Brighton Road, Surbiton, England KT6 5PL, United Kingdom'
    )
    mums_breakfast.save()

    go_board = Event(
        name='April Go Meet Up',
        image='https://images.unsplash.com/photo-1509314315934-8d1fffb65dd6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1502&q=80',
        owner=Wendy,
        max_attendees=10,
        date='2019-04-20',
        hours=14,
        minutes=00,
        duration=60,
        club=board_games,
        attendees=[Wendy, Dwight, Mark],
        lat=51.4927027,
        lng=-0.2558098,
        description='Play various board games with a prize to win',
        category='Board Games',
        address='22-26 Hammersmith Broadway'
    )
    go_board.save()

    monopoly_board = Event(
        name='Monopoly',
        image='https://images-na.ssl-images-amazon.com/images/I/915NTWZUtjL._SL1500_.jpg',
        owner=Wendy,
        max_attendees=5,
        date='2019-04-21',
        hours=15,
        minutes=00,
        duration=60,
        club=board_games,
        attendees=[Wendy, Dwight, Mark, Ed],
        lat=51.4927027,
        lng=-0.2558098,
        description='If you enjoy monopoly then play with us with a prize to win',
        category='Board Games',
        address='1 Hammersmith Broadway'
    )
    monopoly_board.save()

    pasta_day = Event(
        name='Pasta Cooking Session',
        image='https://tinyurl.com/yxd6b62b',
        owner=Ed,
        max_attendees=10,
        date='2019-05-10',
        hours=18,
        minutes=00,
        duration=30,
        club=food_club,
        attendees=[Wendy, Dwight, Mark, Ed, Nawal],
        lat=51.5576056,
        lng=0.0715469,
        description='Learn home cooked itlian food',
        category='Food & Drinks',
        address='University of East London, Water Ln, London, England E15 4NQ, United Kingdom'
    )
    pasta_day.save()
