from azure.core.credentials import AzureNamedKeyCredential
from azure.data.tables import TableEntity
from azure.data.tables import TableServiceClient
from flask import Flask, request, jsonify
from flask_cors import CORS
from datetime import date, datetime
from azure.cosmosdb.table.tableservice import TableService
from azure.cosmosdb.table.models import Entity
import pandas as pd
from azure.cosmosdb.table.tableservice import TableService
import numpy as np
import sklearn
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity


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
    emailOrganizer = request.json.get("emailOrganizer", None)
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

    task = {u'PartitionKey': emailOrganizer,
            u'RowKey': email,
            u'Name': name,
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


countAperitiv = 50


@app.route('/aperitiveRating', methods=["POST"])
def aperitivRating():
    global countAperitiv

    countAperitiv += 1
    event = request.json.get("event", None)
    date = request.json.get("date", None)
    emailOrganizer = request.json.get("emailOrganizer", None)
    email = request.json.get("email", None)
    aperitivTraditionalRating = request.json.get(
        "aperitivTraditionalRating", None)
    aperitivVegetarianRating = request.json.get(
        "aperitivVegetarianRating", None)
    aperitivFructeDeMareRating = request.json.get(
        "aperitivFructeDeMareRating", None)

    # print("Email organizator:"+emailOrganizer)
    # print("Email:"+email)
    # print("apertivTraditionalRating:"+aperitivTraditionalRating)
    # print("aperitivVegetarianRating"+aperitivVegetarianRating)
    # print("aperitivFructeDeMare"+aperitivFructeDeMareRating)

    table_client = table_service.get_table_client(
        table_name="AperitivRating")

    countString = str(countAperitiv)
    task = {u'PartitionKey': emailOrganizer,
            u'RowKey': countString,
            u'Event': event,
            u'Data': date,
            u'Email': email,
            u'Aperitiv': "Traditional",
            u'Rating': aperitivTraditionalRating,

            }
    table_client.create_entity(entity=task)

    countAperitiv += 1
    countString = str(countAperitiv)
    task = {u'PartitionKey': emailOrganizer,
            u'RowKey': countString,
            u'Event': event,
            u'Data': date,
            u'Email': email,
            u'Aperitiv': "Vegetarian",
            u'Rating': aperitivVegetarianRating,

            }
    table_client.create_entity(entity=task)

    countAperitiv += 1
    countString = str(countAperitiv)
    task = {u'PartitionKey': emailOrganizer,
            u'RowKey': countString,
            u'Event': event,
            u'Data': date,
            u'Email': email,
            u'Aperitiv': "Fructe de mare",
            u'Rating': aperitivFructeDeMareRating,

            }
    table_client.create_entity(entity=task)

    return "Done"


count = 50


@app.route('/type1Rating', methods=["POST"])
def type1Rating():
    global count

    count += 1
    event = request.json.get("event", None)
    date = request.json.get("date", None)
    emailOrganizer = request.json.get("emailOrganizer", None)
    email = request.json.get("email", None)
    supaTaieteiRating = request.json.get("supaTaieteiRating", None)
    ciorbaAcraRating = request.json.get("ciorbaAcraRating", None)
    ciorbaCartofiRating = request.json.get("ciorbaCartofiRating", None)
    ciorbaPerisoareRating = request.json.get("ciorbaPerisoareRating", None)

    # print("emailOrganizer:"+emailOrganizer)
    # print("email"+email)
    # print("supaTaieteiRating"+supaTaieteiRating)
    # print("ciorbaAcraRating"+ciorbaAcraRating)
    # print("ciorbaCartofiRating"+ciorbaCartofiRating)
    # print("ciorbaPerisoareRating"+ciorbaPerisoareRating)

    table_client = table_service.get_table_client(
        table_name="Type1Rating")

    countString = str(count)
    task = {u'PartitionKey': emailOrganizer,
            u'RowKey': countString,
            u'Event': event,
            u'Data': date,
            u'Email': email,
            u'Type1': "Supa taietei",
            u'Rating': supaTaieteiRating,

            }
    table_client.create_entity(entity=task)

    count += 1
    countString = str(count)
    task = {u'PartitionKey': emailOrganizer,
            u'RowKey': countString,
            u'Event': event,
            u'Data': date,
            u'Email': email,
            u'Type1': "Ciorba acra",
            u'Rating': ciorbaAcraRating,

            }
    table_client.create_entity(entity=task)

    count += 1
    countString = str(count)
    task = {u'PartitionKey': emailOrganizer,
            u'RowKey': countString,
            u'Event': event,
            u'Data': date,
            u'Email': email,
            u'Type1': "Ciorba cartofi",
            u'Rating': ciorbaCartofiRating,

            }
    table_client.create_entity(entity=task)

    count += 1
    countString = str(count)
    task = {u'PartitionKey': emailOrganizer,
            u'RowKey': countString,
            u'Event': event,
            u'Data': date,
            u'Email': email,
            u'Type1': "Ciorba perisoare",
            u'Rating': ciorbaPerisoareRating,

            }
    table_client.create_entity(entity=task)

    return "Done"


countType2 = 50


@app.route('/type2Rating', methods=["POST"])
def type2Rating():
    global countType2

    countType2 += 1
    event = request.json.get("event", None)
    date = request.json.get("date", None)
    emailOrganizer = request.json.get("emailOrganizer", None)
    email = request.json.get("email", None)
    sarmaleRating = request.json.get("sarmaleRating", None)
    carnePuiRating = request.json.get("carnePuiRating", None)
    carnePorcRating = request.json.get("carnePorcRating", None)
    carneVitaRating = request.json.get("carneVitaRating", None)

    print("emailOrganizer"+emailOrganizer)
    print("email"+email)
    print("sarmaleRating"+sarmaleRating)
    print("carnePuiRating"+carnePuiRating)
    print("carnePorcRating"+carnePorcRating)
    print("carneVitaRating"+carneVitaRating)

    table_client = table_service.get_table_client(
        table_name="Type2Rating")

    countString = str(countType2)
    task = {u'PartitionKey': emailOrganizer,
            u'RowKey': countString,
            u'Event': event,
            u'Data': date,
            u'Email': email,
            u'Type2': "Sarmale",
            u'Rating': sarmaleRating,

            }
    table_client.create_entity(entity=task)

    countType2 += 1
    countString = str(countType2)
    task = {u'PartitionKey': emailOrganizer,
            u'RowKey': countString,
            u'Event': event,
            u'Data': date,
            u'Email': email,
            u'Type2': "Carne pui",
            u'Rating': carnePuiRating,

            }
    table_client.create_entity(entity=task)

    countType2 += 1
    countString = str(countType2)
    task = {u'PartitionKey': emailOrganizer,
            u'RowKey': countString,
            u'Event': event,
            u'Data': date,
            u'Email': email,
            u'Type2': "Carne porc",
            u'Rating': carnePorcRating,

            }
    table_client.create_entity(entity=task)

    countType2 += 1
    countString = str(countType2)
    task = {u'PartitionKey': emailOrganizer,
            u'RowKey': countString,
            u'Event': event,
            u'Data': date,
            u'Email': email,
            u'Type2': "Carne vita",
            u'Rating': carneVitaRating,

            }
    table_client.create_entity(entity=task)

    return "Done"


countMusic = 50


@app.route('/musicRating', methods=["POST"])
def musicRating():
    global countMusic

    countMusic += 1
    event = request.json.get("event", None)
    date = request.json.get("date", None)
    emailOrganizer = request.json.get("emailOrganizer", None)
    email = request.json.get("email", None)
    muzicaComercialaRating = request.json.get("muzicaComercialaRating", None)
    muzicaDiscoRating = request.json.get("muzicaDiscoRating", None)
    muzicaPopRating = request.json.get("muzicaPopRating", None)
    muzicaRockRating = request.json.get("muzicaRockRating", None)
    muzicaDePetrecereRating = request.json.get("muzicaDePetrecereRating", None)

    # print("emailOrganizer"+emailOrganizer)
    # print("email"+email)
    # print("muzicaComercialaRating"+muzicaComercialaRating)
    # print("muzicaDiscoRating"+muzicaDiscoRating)
    # print("muzicaPopRating"+muzicaPopRating)
    # print("muzicaRockRating"+muzicaRockRating)
    # print("muzicaDePetrecereRating"+muzicaDePetrecereRating)

    table_client = table_service.get_table_client(
        table_name="MusicRating")

    countString = str(countMusic)
    task = {u'PartitionKey': emailOrganizer,
            u'RowKey': countString,
            u'Event': event,
            u'Data': date,
            u'Email': email,
            u'Music': "Comerciala",
            u'Rating': muzicaComercialaRating,

            }
    table_client.create_entity(entity=task)

    countMusic += 1
    countString = str(countMusic)
    task = {u'PartitionKey': emailOrganizer,
            u'RowKey': countString,
            u'Event': event,
            u'Data': date,
            u'Email': email,
            u'Music': "Disco",
            u'Rating': muzicaDiscoRating,

            }
    table_client.create_entity(entity=task)

    countMusic += 1
    countString = str(countMusic)
    task = {u'PartitionKey': emailOrganizer,
            u'RowKey': countString,
            u'Event': event,
            u'Data': date,
            u'Email': email,
            u'Music': "Pop",
            u'Rating': muzicaPopRating,

            }
    table_client.create_entity(entity=task)

    countMusic += 1
    countString = str(countMusic)
    task = {u'PartitionKey': emailOrganizer,
            u'RowKey': countString,
            u'Event': event,
            u'Data': date,
            u'Email': email,
            u'Music': "Rock",
            u'Rating': muzicaRockRating,

            }
    table_client.create_entity(entity=task)

    countMusic += 1
    countString = str(countMusic)
    task = {u'PartitionKey': emailOrganizer,
            u'RowKey': countString,
            u'Event': event,
            u'Data': date,
            u'Email': email,
            u'Music': "De petrecere",
            u'Rating': muzicaDePetrecereRating,

            }
    table_client.create_entity(entity=task)

    return "Done"


# table_service = TableService(
#     connection_string='DefaultEndpointsProtocol=https;AccountName=storagecorina;AccountKey=Z6MCaQlKoDsfm6mFx3afBpKR3thzCvI0JimQVT0aXKUlMNb6z564Y6LZY66/PiqsjI6JZDHoUhjDs6dwDT7/Ng==;EndpointSuffix=core.windows.net')

CONNECTION_STRING = "DefaultEndpointsProtocol=https;AccountName=storagecorina;AccountKey=Z6MCaQlKoDsfm6mFx3afBpKR3thzCvI0JimQVT0aXKUlMNb6z564Y6LZY66/PiqsjI6JZDHoUhjDs6dwDT7/Ng==;EndpointSuffix=core.windows.net"
SOURCE_TABLE_APERITIVE = "AperitivRating"
SOURCE_TABLE_TYPE1 = "Type1Rating"
SOURCE_TABLE_TYPE2 = "Type2Rating"
SOURCE_TABLE_MUSIC = "MusicRating"
SOURCE_TABLE = "Form"


def set_table_service():
    return TableService(connection_string=CONNECTION_STRING)


def get_dataframe_from_table_storage_table(table_service, filter_query):

    return pd.DataFrame(get_data_from_table_storage_table(table_service,
                                                          filter_query))


def get_data_from_table_storage_table(table_service, filter_query):

    for record in table_service.query_entities(SOURCE_TABLE_APERITIVE, filter_query):
        yield record

    for record in table_service.query_entities(
        SOURCE_TABLE_TYPE1, filter_query
    ):
        yield record

    for record in table_service.query_entities(
        SOURCE_TABLE_TYPE2, filter_query
    ):
        yield record

    for record in table_service.query_entities(
        SOURCE_TABLE_MUSIC, filter_query
    ):
        yield record

    for record in table_service.query_entities(
        SOURCE_TABLE, filter_query
    ):
        yield record


@app.route('/highestRating', methods=["POST"])
def highestRating():

    email = request.json.get("email", None)
    event = request.json.get("event", None)
    date = request.json.get("date", None)
    print(email)
    print(event)
    print(date)

    fq = 'PartitionKey eq \'' + email + '\' and Event eq  \'' + \
        event + '\' and Data eq \'' + date + '\''
    ts_aperitive = set_table_service()
    ts_type1 = set_table_service()
    ts_type2 = set_table_service()
    ts_music = set_table_service()

    table_aperitive = get_dataframe_from_table_storage_table(
        table_service=ts_aperitive, filter_query=fq)

    table_type1 = get_dataframe_from_table_storage_table(
        table_service=ts_type1, filter_query=fq)

    table_type2 = get_dataframe_from_table_storage_table(
        table_service=ts_type2, filter_query=fq)

    table_music = get_dataframe_from_table_storage_table(
        table_service=ts_music, filter_query=fq)

    table_aperitive.head()
    table_type1.head()
    table_type2.head()
    table_music.head()

    table_aperitive['Rating'] = table_aperitive['Rating'].astype(int)
    table_type1['Rating'] = table_type1['Rating'].astype(int)
    table_type2['Rating'] = table_type2['Rating'].astype(int)
    table_music['Rating'] = table_music['Rating'].astype(int)

    # Reccomandation for apperitive

    # Highest rated apperitive
    mean_rating_aperitive = table_aperitive.groupby('Aperitiv')[
        ['Rating']].mean()

    highest_rated_aperitive = mean_rating_aperitive['Rating'].idxmax()

    # Reccomandation for type 1

    # Highest rated type1
    mean_rating_type1 = table_type1.groupby('Type1')[['Rating']].mean()

    highest_rated_type1 = mean_rating_type1['Rating'].idxmax()

    # Reccomandation for type 2

    # Highest rated type 2
    mean_rating_type2 = table_type2.groupby('Type2')[['Rating']].mean()

    highest_rated_type2 = mean_rating_type2['Rating'].idxmax()

    # Reccomandation for music

    # Highest rated music
    mean_rating_music = table_music.groupby('Music')[['Rating']].mean()

    highest_rated_music = mean_rating_music['Rating'].idxmax()

    data_set = {
        "Highest_Rate_Aperitiv": highest_rated_aperitive,
        "Highest_Rate_Type1": highest_rated_type1,
        "Highest_Rate_Type2": highest_rated_type2,
        "Highest_Rate_Music": highest_rated_music,
        "Rating_aperitiv_fructe_de_mare": mean_rating_aperitive['Rating']['Fructe de mare'],
        "Rating_aperitiv_traditional": mean_rating_aperitive['Rating']['Traditional'],
        "Rating_aperitiv_vegetarian": mean_rating_aperitive['Rating']['Vegetarian'],

        "Rating_tip1_ciorba_acra": mean_rating_type1['Rating']['Ciorba acra'],
        "Rating_tip1_ciorba_cartofi": mean_rating_type1['Rating']['Ciorba cartofi'],
        "Rating_tip1_ciorba_perisoare": mean_rating_type1['Rating']['Ciorba perisoare'],
        "Rating_tip1_supa_taietei": mean_rating_type1['Rating']['Supa taietei'],

        "Rating_tip2_sarmale": mean_rating_type2['Rating']['Sarmale'],
        "Rating_tip2_carne_porc": mean_rating_type2['Rating']['Carne porc'],
        "Rating_tip2_carne_pui": mean_rating_type2['Rating']['Carne pui'],
        "Rating_tip2_carne_vita": mean_rating_type2['Rating']['Carne vita'],

        "Rating_muzica_comerciala": mean_rating_music['Rating']['Comerciala'],
        "Rating_muzica_petrecere": mean_rating_music['Rating']['De petrecere'],
        "Rating_muzica_disco": mean_rating_music['Rating']['Disco'],
        "Rating_muzica_pop": mean_rating_music['Rating']['Pop'],
        "Rating_muzica_rock": mean_rating_music['Rating']['Rock'],

    }
    print(data_set)
    return data_set


def clean_data(x):
    if isinstance(x, list):
        return [str.lower(i.replace(" ", "")) for i in x]
    else:
        if isinstance(x, str):
            return str.lower(x.replace(" ", ""))
        elif isinstance(x, int):
            return str(x)
        else:
            return ''


def create_all(x):
    return "".join(x['NumberGuests']) + '|' + ''.join(x['Budget']) + '|' + "".join(x['Drinks'])


def get_recommendations(name, indices, cosine_sim2, table):
    # Get the index of the user that matches the title
    idx = indices[name]

    # Get the pairwsie similarity scores of all locations with that user
    sim_scores = list(enumerate(cosine_sim2[idx]))

    # Sort the locations based on the similarity scores
    sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)

    # Get the scores of the 10 most similar locations
    sim_scores = sim_scores[1:4]

    # Get the movie indices
    email_indices = [i[0] for i in sim_scores]

    # Return the top 3 most similar locations
    return table['Location'].iloc[email_indices]


@app.route('/getRecomandations', methods=["POST"])
def getRecomandations():

    event = request.json.get("event", None)
    email = request.json.get("email", None)
    print(event)

    fq = 'EventType eq \'' + event + '\' '
    ts = set_table_service()
    table_form = get_dataframe_from_table_storage_table(
        table_service=ts, filter_query=fq)
    features = ['NumberGuests', 'Budget', 'Drinks']
    print(table_form[features])
    for feature in features:
        table_form[feature] = table_form[feature].apply(clean_data)
    table_form['all'] = table_form.apply(create_all, axis=1)

    count = CountVectorizer()
    count_matrix = count.fit_transform(table_form['all'])
    cosine_sim2 = cosine_similarity(count_matrix, count_matrix)
    table_form = table_form.reset_index()
    indices = pd.Series(table_form.index, index=table_form['PartitionKey'])
    recomandation = get_recommendations(
        email, indices, cosine_sim2, table_form)
    print(recomandation)
    return recomandation.to_dict()


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
