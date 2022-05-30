from azure.core.credentials import AzureNamedKeyCredential
from azure.data.tables import TableEntity
from azure.data.tables import TableServiceClient
from flask import Flask, request, jsonify
from flask_cors import CORS
from datetime import date, datetime
from azure.cosmosdb.table.tableservice import TableService
from azure.cosmosdb.table.models import Entity
from matplotlib.cbook import flatten
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
CORS(app, resources={r"*": {"origins": "*"}})
credential = AzureNamedKeyCredential(
    "storagecorina", "Z6MCaQlKoDsfm6mFx3afBpKR3thzCvI0JimQVT0aXKUlMNb6z564Y6LZY66/PiqsjI6JZDHoUhjDs6dwDT7/Ng==")
table_service = TableServiceClient(
    endpoint="https://storagecorina.table.core.windows.net/", credential=credential)


@app.route('/', methods=["GET"])
def elementsss():

    table_client = table_service.get_table_client(table_name="Login")
    tasks = table_client.list_entities()
    lst = list(tasks)
    print(lst)
    return jsonify(results=lst)


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


@app.route('/register1', methods=["POST"])
def register1():
    name = request.json.get("name", None)
    email = request.json.get("email", None)
    password = request.json.get("password", None)

    table_client = table_service.get_table_client(table_name="Login")
    print(email)
    print(name)
    print(password)

    task = {u'PartitionKey': email, u'RowKey': email, u'Nume': name,
            u'Parola': password,

            }
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
        if task['Parola'] == password:
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
    judet = request.json.get("judet", None)
    budget = request.json.get("budget", None)
    liveband = request.json.get("liveband", None)
    photographer = request.json.get("photographer", None)
    opinie = request.json.get("opinie", None)

    print(email)
    print(event)
    print(date)
    print(nrguests)
    print(location)
    print(judet)
    print(budget)
    print(liveband)
    print(photographer)
    print(opinie)

    table_client = table_service.get_table_client(table_name="Form")

    task = {u'PartitionKey': email,
            u'RowKey': date,
            u'TipEveniment': event,
            u'NumarInvitati': nrguests,
            u'Restaurant': location,
            u'Judet': judet,
            u'Buget': budget,
            u'Muzica': liveband,
            u'Fotograf': photographer,
            u'Opinie': opinie,
            }
    table_client.create_entity(entity=task)
    return "Done"


@app.route('/postOpinii', methods=["POST"])
def postOpinii():
    email = request.json.get("email", None)
    name = request.json.get("name", None)
    event = request.json.get("event", None)
    date = request.json.get("date", None)
    judet = request.json.get("judet", None)
    liveband = request.json.get("liveband", None)
    photographer = request.json.get("photographer", None)
    location = request.json.get("location", None)
    opiniiMuzica = request.json.get("opiniiMuzica", None)
    opiniiRestaurant = request.json.get("opiniiRestaurant", None)
    opiniiFotograf = request.json.get("opiniiFotograf", None)
    ratingMuzica = request.json.get("ratingMuzica", None)
    ratingRestaurant = request.json.get("ratingRestaurant", None)
    ratingFotograf = request.json.get("ratingFotograf", None)

    print(email)
    print(event)
    print(date)
    print(location)
    print(judet)
    print(liveband)
    print(photographer)
    print(opiniiMuzica)
    print(opiniiRestaurant)
    print(opiniiFotograf)
    print(ratingMuzica)
    print(ratingRestaurant)
    print(ratingFotograf)

    table_client = table_service.get_table_client(table_name="OpiniiFinale")

    task = {u'PartitionKey': email,
            u'RowKey': date,
            u'Nume': name,
            u'TipEveniment': event,
            u'Judet': judet,
            u'Restaurant': location,
            u'Muzica': liveband,
            u'Fotograf': photographer,
            u'OpiniiRestaurant': opiniiRestaurant,
            u'OpiniiMuzica': opiniiMuzica,
            u'OpiniiFotograf': opiniiFotograf,
            u'RatingRestaurant': ratingRestaurant,
            u'RatingMuzica': ratingMuzica,
            u'RatingFotograf': ratingFotograf,

            }
    table_client.create_entity(entity=task)
    return "Done"


@app.route('/getOpinii', methods=["POST"])
def getOpinii():
    judet = request.json.get("judet", None)

    table_client = table_service.get_table_client(table_name="OpiniiFinale")
    tasks = table_client.query_entities(
        query_filter='Judet eq \'' + judet + '\'')
    lst = list(tasks)
    print(lst)
    return jsonify(results=lst)


@app.route('/invitationList', methods=["POST"])
def invitationList():
    email = request.json.get("email", None)
    date = request.json.get("date", None)
    formValues = request.json.get("formValues", None)
    oldValues = request.json.get("oldValues", None)
    table_client = table_service.get_table_client(table_name="Invitati")
    print("NEW", formValues)
    print("OLD", oldValues)
    for index in range(len(formValues)):
        task = {u'PartitionKey': email+"-"+date,
                u'RowKey': formValues[index]["EmailInvitat"],
                u'NumeInvitat': formValues[index]["NumeInvitat"],
                u'ConfirmarePrezenta': formValues[index]["ConfirmarePrezenta"],
                u'NumarPersoane': formValues[index]["NumarPersoane"],
                }
        table_client.create_entity(entity=task)

    if(len(oldValues) != 0):
        for index in range(len(oldValues)):
            task = {u'PartitionKey': email+"-"+date,
                    u'RowKey': oldValues[index]["EmailInvitat"],
                    u'NumeInvitat': oldValues[index]["NumeInvitat"],
                    u'ConfirmarePrezenta': oldValues[index]["ConfirmarePrezenta"],
                    u'NumarPersoane': oldValues[index]["NumarPersoane"],
                    }
            print("done")
            table_client.update_entity(task)

    return "Done"


@app.route('/getInvitati', methods=["POST"])
def getInvitati():
    email = request.json.get("email", None)
    date = request.json.get("date", None)
    table_client = table_service.get_table_client(table_name="Invitati")
    tasks = table_client.query_entities(
        query_filter='PartitionKey eq \'' + email+"-"+date + '\'')
    lst = list(tasks)
    print(lst)
    return jsonify(results=lst)


@app.route('/deleteinvitat', methods=["POST"])
def deleteInvitat():
    table_client = table_service.get_table_client(table_name="Invitati")

    email = request.json.get("email", None)
    date = request.json.get("date", None)
    emailInvitat = request.json.get("EmailInvitat", None)

    print(email)
    print(date)
    print(emailInvitat)
    print("aaa"+email+"-"+date+"aaa")
    table_client.delete_entity(email+"-"+date, emailInvitat)

    return "Done"


@app.route('/updateinvitat', methods=["POST"])
def updateInvitat():

    email = request.json.get("email", None)
    date = request.json.get("date", None)
    formValues = request.json.get("formValues", None)
    table_client = table_service.get_table_client(table_name="Invitati")
    print(formValues)
    for index in range(len(formValues)):
        task = {u'PartitionKey': email+"-"+date,
                u'RowKey': formValues[index]["emailInvitat"],
                u'NumeInvitat': formValues[index]["numeInvitat"],
                u'ConfirmarePrezenta': formValues[index]["confirmarePrezenta"],
                }

    table_client.update_entity(task)

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
            u'RowKey': email,
            u'Password': newpassword,
            u'Name': name}
    table_client.update_entity(task)
    return "Done"


@app.route('/updateform', methods=["POST"])
def updateform():
    email = request.json.get("email", None)
    event = request.json.get("event", None)
    date = request.json.get("date", None)
    nrguests = request.json.get("nrguests", None)
    location = request.json.get("location", None)
    judet = request.json.get("judet", None)
    budget = request.json.get("budget", None)
    liveband = request.json.get("liveband", None)
    photographer = request.json.get("photographer", None)
    opinie = request.json.get("opinie", None)

    print(email)
    print(event)
    print(date)
    print(nrguests)
    print(location)
    print(judet)
    print(budget)
    print(liveband)
    print(photographer)
    print(opinie)

    table_client = table_service.get_table_client(table_name="Form")

    task = {u'PartitionKey': email,
            u'RowKey': date,
            u'TipEveniment': event,
            u'NumarInvitati': nrguests,
            u'Restaurant': location,
            u'Judet': judet,
            u'Buget': budget,
            u'Muzica': liveband,
            u'Fotograf': photographer,
            u'Opinie': opinie,
            }
    table_client.update_entity(task)
    return "Done"


@app.route('/deleteevent', methods=["POST"])
def deleteevent():
    table_client_form = table_service.get_table_client(table_name="Form")

    email = request.json.get("email", None)
    date = request.json.get("date", None)
    print(email)
    print(date)

    print(email)
    print(date)

    table_client_form.delete_entity(email, date)
    return "Done"


@app.route('/ratingChestionar', methods=["POST"])
def ratingChestionar():

    table_client_aperitiv = table_service.get_table_client(
        table_name="AperitivRating")
    table_client_type1 = table_service.get_table_client(
        table_name="Type1Rating")
    table_client_type2 = table_service.get_table_client(
        table_name="Type2Rating")
    table_client_music = table_service.get_table_client(
        table_name="MusicRating")

    entities = table_client_music.query_entities(query_filter='')
    lst = list(entities)

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

    supaTaieteiRating = request.json.get("supaTaieteiRating", None)
    ciorbaAcraRating = request.json.get("ciorbaAcraRating", None)
    ciorbaCartofiRating = request.json.get("ciorbaCartofiRating", None)
    ciorbaPerisoareRating = request.json.get("ciorbaPerisoareRating", None)

    sarmaleRating = request.json.get("sarmaleRating", None)
    carnePuiRating = request.json.get("carnePuiRating", None)
    carnePorcRating = request.json.get("carnePorcRating", None)
    carneVitaRating = request.json.get("carneVitaRating", None)

    muzicaComercialaRating = request.json.get("muzicaComercialaRating", None)
    muzicaDiscoRating = request.json.get("muzicaDiscoRating", None)
    muzicaPopRating = request.json.get("muzicaPopRating", None)
    muzicaRockRating = request.json.get("muzicaRockRating", None)
    muzicaDePetrecereRating = request.json.get("muzicaDePetrecereRating", None)

    countRating = len(lst)+1
    countString = str(countRating)

    task_aperitiv = {u'PartitionKey': emailOrganizer,
                     u'RowKey': countString,
                     u'Event': event,
                     u'Data': date,
                     u'Email': email,
                     u'Aperitiv': "Traditional",
                     u'Rating': aperitivTraditionalRating,
                     }

    task_type1 = {u'PartitionKey': emailOrganizer,
                  u'RowKey': countString,
                  u'Event': event,
                  u'Data': date,
                  u'Email': email,
                  u'Type1': "Supa taietei",
                  u'Rating': supaTaieteiRating,
                  }
    task_type2 = {u'PartitionKey': emailOrganizer,
                  u'RowKey': countString,
                  u'Event': event,
                  u'Data': date,
                  u'Email': email,
                  u'Type2': "Sarmale",
                  u'Rating': sarmaleRating,
                  }
    task_music = {u'PartitionKey': emailOrganizer,
                  u'RowKey': countString,
                  u'Event': event,
                  u'Data': date,
                  u'Email': email,
                  u'Music': "Comerciala",
                  u'Rating': muzicaComercialaRating,

                  }

    table_client_aperitiv.create_entity(entity=task_aperitiv)
    table_client_type1.create_entity(entity=task_type1)
    table_client_type2.create_entity(entity=task_type2)
    table_client_music.create_entity(entity=task_music)

    countRating += 1
    countString = str(countRating)

    task_aperitiv = {u'PartitionKey': emailOrganizer,
                     u'RowKey': countString,
                     u'Event': event,
                     u'Data': date,
                     u'Email': email,
                     u'Aperitiv': "Vegetarian",
                     u'Rating': aperitivVegetarianRating,
                     }
    task_type1 = {u'PartitionKey': emailOrganizer,
                  u'RowKey': countString,
                  u'Event': event,
                  u'Data': date,
                  u'Email': email,
                  u'Type1': "Ciorba acra",
                  u'Rating': ciorbaAcraRating,
                  }
    task_type2 = {u'PartitionKey': emailOrganizer,
                  u'RowKey': countString,
                  u'Event': event,
                  u'Data': date,
                  u'Email': email,
                  u'Type2': "Carne pui",
                  u'Rating': carnePuiRating,
                  }
    task_music = {u'PartitionKey': emailOrganizer,
                  u'RowKey': countString,
                  u'Event': event,
                  u'Data': date,
                  u'Email': email,
                  u'Music': "Disco",
                  u'Rating': muzicaDiscoRating,
                  }

    table_client_aperitiv.create_entity(entity=task_aperitiv)
    table_client_type1.create_entity(entity=task_type1)
    table_client_type2.create_entity(entity=task_type2)
    table_client_music.create_entity(entity=task_music)

    countRating += 1
    countString = str(countRating)
    task_aperitiv = {u'PartitionKey': emailOrganizer,
                     u'RowKey': countString,
                     u'Event': event,
                     u'Data': date,
                     u'Email': email,
                     u'Aperitiv': "Fructe de mare",
                     u'Rating': aperitivFructeDeMareRating,
                     }

    task_type1 = {u'PartitionKey': emailOrganizer,
                  u'RowKey': countString,
                  u'Event': event,
                  u'Data': date,
                  u'Email': email,
                  u'Type1': "Ciorba cartofi",
                  u'Rating': ciorbaCartofiRating,
                  }

    task_type2 = {u'PartitionKey': emailOrganizer,
                  u'RowKey': countString,
                  u'Event': event,
                  u'Data': date,
                  u'Email': email,
                  u'Type2': "Carne porc",
                  u'Rating': carnePorcRating,
                  }

    task_music = {u'PartitionKey': emailOrganizer,
                  u'RowKey': countString,
                  u'Event': event,
                  u'Data': date,
                  u'Email': email,
                  u'Music': "Pop",
                  u'Rating': muzicaPopRating,
                  }

    table_client_aperitiv.create_entity(entity=task_aperitiv)
    table_client_type1.create_entity(entity=task_type1)
    table_client_type2.create_entity(entity=task_type2)
    table_client_music.create_entity(entity=task_music)

    countRating += 1
    countString = str(countRating)
    task_type1 = {u'PartitionKey': emailOrganizer,
                  u'RowKey': countString,
                  u'Event': event,
                  u'Data': date,
                  u'Email': email,
                  u'Type1': "Ciorba perisoare",
                  u'Rating': ciorbaPerisoareRating,

                  }

    task_type2 = {u'PartitionKey': emailOrganizer,
                  u'RowKey': countString,
                  u'Event': event,
                  u'Data': date,
                  u'Email': email,
                  u'Type2': "Carne vita",
                  u'Rating': carneVitaRating,
                  }
    task_music = {u'PartitionKey': emailOrganizer,
                  u'RowKey': countString,
                  u'Event': event,
                  u'Data': date,
                  u'Email': email,
                  u'Music': "Rock",
                  u'Rating': muzicaRockRating,
                  }

    table_client_type1.create_entity(entity=task_type1)
    table_client_type2.create_entity(entity=task_type2)
    table_client_music.create_entity(entity=task_music)

    countRating += 1
    countString = str(countRating)

    task_music = {u'PartitionKey': emailOrganizer,
                  u'RowKey': countString,
                  u'Event': event,
                  u'Data': date,
                  u'Email': email,
                  u'Music': "De petrecere",
                  u'Rating': muzicaDePetrecereRating,
                  }
    table_client_music.create_entity(entity=task_music)
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

    # table_aperitive.head()
    # table_type1.head()
    # table_type2.head()
    # table_music.head()

    table_aperitive['Rating'] = table_aperitive['Rating'].astype(float)
    table_type1['Rating'] = table_type1['Rating'].astype(float)
    table_type2['Rating'] = table_type2['Rating'].astype(float)
    table_music['Rating'] = table_music['Rating'].astype(float)

    # Reccomandation for apperitive

    # Highest rated apperitive
    mean_rating_aperitive = table_aperitive.groupby('Aperitiv')[
        ['Rating']].mean()

    highest_rated_aperitive = mean_rating_aperitive['Rating'].idxmax()
    print("aperitive")
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
        "Answers": table_aperitive['Email'].nunique(),
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
    return "".join(x['NumarInvitati']) + '|' + ''.join(x['Buget'])


def get_recommendations(email, date, type, indices, cosine_sim2, table):
    # Get the index of the user that matches the title
    idx = indices[email, date]
    # Get the pairwsie similarity scores of all locations with that user
    sim_scores = list(enumerate(cosine_sim2[idx]))
    # Sort the locations based on the similarity scores
    sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)
    # Get the scores of the 10 most similar locations
    sim_scores = sim_scores[1:6]
    # Get the movie indices
    email_indices = [i[0] for i in sim_scores]

    # Return the top 3 most similar locations
    return table[type].iloc[email_indices].unique()


@app.route('/getRecomandations', methods=["POST"])
def getRecomandations():

    event = request.json.get("event", None)
    date = request.json.get("date", None)
    email = request.json.get("email", None)
    judet = request.json.get("judet", None)
    type = request.json.get("type", None)
    print(event)
    print(date)
    print(email)
    print(judet)
    fq = 'TipEveniment eq \'' + event + '\' and Judet eq \'' + judet + '\' '
    ts = set_table_service()
    table_form = get_dataframe_from_table_storage_table(
        table_service=ts, filter_query=fq)
    features = ['NumarInvitati', 'Buget']
    print(table_form[features])
    for feature in features:
        table_form[feature] = table_form[feature].apply(clean_data)
    table_form['all'] = table_form.apply(create_all, axis=1)

    count = CountVectorizer()
    count_matrix = count.fit_transform(table_form['all'])
    cosine_sim2 = cosine_similarity(count_matrix, count_matrix)
    table_form = table_form.reset_index()
    indices = pd.Series(
        table_form.index, index=table_form[['PartitionKey', 'RowKey']])

    recomandation = get_recommendations(
        email, date, type, indices, cosine_sim2, table_form)
    print(recomandation)
    return dict(enumerate(recomandation.flatten(), 1))


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
