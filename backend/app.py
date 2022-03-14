from azure.core.credentials import AzureNamedKeyCredential
from azure.data.tables import TableEntity
from azure.data.tables import TableServiceClient
from flask import Flask, request
from flask import jsonify
from flask_cors import CORS
from datetime import date, datetime
app = Flask(__name__)
CORS(app)
credential = AzureNamedKeyCredential(
    "storagecorina", "Z6MCaQlKoDsfm6mFx3afBpKR3thzCvI0JimQVT0aXKUlMNb6z564Y6LZY66/PiqsjI6JZDHoUhjDs6dwDT7/Ng==")
table_service = TableServiceClient(
    endpoint="https://storagecorina.table.core.windows.net/", credential=credential)


@app.route('/elements', methods=["GET"])
def elements():

    table_client = table_service.get_table_client(table_name="Login")
    tasks = table_client.list_entities()
    lst = list(tasks)
    print(lst)
    return jsonify(results=lst)


@app.route('/getmyevents', methods=["POST"])
def elementsform():
    email = request.json.get("email", None)
    table_client = table_service.get_table_client(table_name="Form")
    tasks = table_client.query_entities(
        query_filter='PartitionKey eq \'' + email + '\'')
    lst = list(tasks)
    print(lst)
    return jsonify(results=lst)


@app.route('/register', methods=["POST"])
def register():
    name = request.json.get("name", None)
    email = request.json.get("email", None)
    password = request.json.get("password", None)
   # current dateTime
    now = datetime.now()

# convert to date String
    date = now.strftime("%d/%m/%Y")
    print('Date String:', date)
    table_client = table_service.get_table_client(table_name="Login")
    print(email)
    print(name)
    print(password)
    print(date)
    task = {u'PartitionKey': email, u'RowKey': name,
            u'Password': password, u'Date': date}
    table_client.create_entity(entity=task)
    return "Done"


@app.route('/login', methods=["POST"])
def login():
    table_client = table_service.get_table_client(table_name="Login")
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    print(email)
    print(password)
    tasks = table_client.query_entities(
        query_filter='PartitionKey eq \'' + email + '\'')

    print(tasks)

    for task in tasks:
        if task['Password'] == password:
            return jsonify(task)
        else:
            return 'Parola sau utilizator gresit', 401


@app.route('/postform', methods=["POST"])
def postform():
    email = request.json.get("email", None)
    event = request.json.get("event", None)
    date = request.json.get("date", None)
    nrguests = request.json.get("nrguests", None)
    location = request.json.get("location", None)
    budget = request.json.get("budget", None)
    liveband = request.json.get("liveband", None)
    artisticmoment = request.json.get("artisticmoment", None)
    photographer = request.json.get("photographer", None)
    videorecording = request.json.get("videorecording", None)
    candybar = request.json.get("candybar", None)
    fruitsbar = request.json.get("fruitsbar", None)
    drinks = request.json.get("drinks", None)
    ringdance = request.json.get("ringdance", None)

    print(email)
    print(event)
    print(date)
    print(nrguests)
    print(location)
    print(budget)
    print(liveband)
    print(artisticmoment)
    print(photographer)
    print(videorecording)
    print(candybar)
    print(fruitsbar)
    print(drinks)
    print(ringdance)
    table_client = table_service.get_table_client(table_name="Form")

    task = {u'PartitionKey': email,
            u'RowKey': date,
            u'EventType': event,
            u'NumberGuests': nrguests,
            u'Location': location,
            u'Budget': budget,
            u'LiveBand': liveband,
            u'ArtisticMoment': artisticmoment,
            u'Photographer': photographer,
            u'VideoRecording': videorecording,
            u'CandyBar': candybar,
            u'FruitsBar': fruitsbar,
            u'Drinks': drinks,
            u'RingDance': ringdance
            }
    table_client.create_entity(entity=task)
    return "Done"


@app.route('/changepassword', methods=["POST"])
def changepassword():
    table_client = table_service.get_table_client(table_name="Login")
    email = request.json.get("email", None)
    name = request.json.get("name", None)
    newpassword = request.json.get("newpassword", None)
    print(email)
    print(newpassword)
    task = {u'PartitionKey': email,
            u'RowKey': name,
            u'Password': newpassword}
    table_client.update_entity(task)
    return "Done"


@app.route('/updateprofile', methods=["POST"])
def updateprofile():
    table_client = table_service.get_table_client(table_name="Login")
    email = request.json.get("email", None)
    name = request.json.get("name", None)
    password = request.json.get("password", None)
    date = request.json.get("date", None)
    location = request.json.get("location", None)
    phonenumber = request.json.get("phonenumber", None)

    task = {u'PartitionKey': email,
            u'RowKey': name,
            u'Password': password,
            u'Date': date,
            u'Location': location,
            u'Phone': phonenumber}

    table_client.update_entity(task)
    return "Done"


@app.route('/updateform', methods=["POST"])
def updateform():
    email = request.json.get("email", None)
    event = request.json.get("event", None)
    date = request.json.get("date", None)
    nrguests = request.json.get("nrguests", None)
    location = request.json.get("location", None)
    budget = request.json.get("budget", None)
    liveband = request.json.get("liveband", None)
    artisticmoment = request.json.get("artisticmoment", None)
    photographer = request.json.get("photographer", None)
    videorecording = request.json.get("videorecording", None)
    candybar = request.json.get("candybar", None)
    fruitsbar = request.json.get("fruitsbar", None)
    drinks = request.json.get("drinks", None)
    ringdance = request.json.get("ringdance", None)

    print(email)
    print(event)
    print(date)
    print(nrguests)
    print(location)
    print(budget)
    print(liveband)
    print(artisticmoment)
    print(photographer)
    print(videorecording)
    print(candybar)
    print(fruitsbar)
    print(drinks)
    print(ringdance)
    table_client = table_service.get_table_client(table_name="Form")

    task = {u'PartitionKey': email,
            u'RowKey': date,
            u'EventType': event,
            u'NumberGuests': nrguests,
            u'Location': location,
            u'Budget': budget,
            u'LiveBand': liveband,
            u'ArtisticMoment': artisticmoment,
            u'Photographer': photographer,
            u'VideoRecording': videorecording,
            u'CandyBar': candybar,
            u'FruitsBar': fruitsbar,
            u'Drinks': drinks,
            u'RingDance': ringdance
            }
    table_client.update_entity(task)
    return "Done"


@app.route('/deleteevent', methods=["POST"])
def deleteevent():
    table_client = table_service.get_table_client(table_name="Form")
    email = request.json.get("email", None)
    date = request.json.get("date", None)
    print(email)
    print(date)
    table_client.delete_entity(email, date)
    return "Done"


@app.route('/postoptionsinvitation', methods=["POST"])
def postoptionsinvitation():
    email = request.json.get("email", None)
    name = request.json.get("name", None)
    age = request.json.get("age", None)
    location = request.json.get("location", None)
    organizerOpinion = request.json.get("organizerOpinion", None)
    drinksOpinion = request.json.get("drinksOpinion", None)
    cakesOpinion = request.json.get("cakesOpinion", None)
    fruitsOpinion = request.json.get("fruitsOpinion", None)
    appetizerOpinion = request.json.get("appetizerOpinion", None)
    maincourseOpinion = request.json.get("maincourseOpinion", None)
    type2Opinion = request.json.get("type2Opinion", None)
    musicOpinion = request.json.get("musicOpinion", None)
    print(email)
    print(name)
    print(age)
    print(location)
    print(organizerOpinion)
    print(drinksOpinion)
    print(cakesOpinion)
    print(fruitsOpinion)
    print(appetizerOpinion)
    print(maincourseOpinion)
    print(type2Opinion)
    print(musicOpinion)

    table_client = table_service.get_table_client(
        table_name="InvitationOpinion")

    OrganizerToStr = ','.join([str(elem) for elem in organizerOpinion])
    DrinkToStr = ','.join([str(elem) for elem in drinksOpinion])
    CakesToStr = ','.join([str(elem) for elem in cakesOpinion])
    FruitsToStr = ','.join([str(elem) for elem in fruitsOpinion])
    AppetizerToStr = ','.join([str(elem) for elem in appetizerOpinion])
    MainCourseToStr = ','.join([str(elem) for elem in maincourseOpinion])
    Type2ToStr = ','.join([str(elem) for elem in type2Opinion])
    MusicToStr = ','.join([str(elem) for elem in musicOpinion])

    task = {u'PartitionKey': email,
            u'RowKey': name,
            u'Age': age,
            u'Location': location,
            u'Organizer_opinion': OrganizerToStr,
            u'Drinks_opinion': DrinkToStr,
            u'Cakes_opinion': CakesToStr,
            u'Fruits_opinion': FruitsToStr,
            u'Appetizer_opinion': AppetizerToStr,
            u'Main_course_opinion': MainCourseToStr,
            u'Type2_opinion': Type2ToStr,
            u'Music_opinion': MusicToStr,
            }
    table_client.create_entity(entity=task)
    return "Done"


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
