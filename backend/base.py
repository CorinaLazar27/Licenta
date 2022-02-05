from azure.core.credentials import AzureNamedKeyCredential
from azure.data.tables import TableEntity
from azure.data.tables import TableServiceClient
from flask import Flask, request
from flask import jsonify

api = Flask(__name__)

credential = AzureNamedKeyCredential(
    "storagecorina", "Z6MCaQlKoDsfm6mFx3afBpKR3thzCvI0JimQVT0aXKUlMNb6z564Y6LZY66/PiqsjI6JZDHoUhjDs6dwDT7/Ng==")
table_service = TableServiceClient(
    endpoint="https://storagecorina.table.core.windows.net/", credential=credential)


@api.route('/elements', methods=["GET"])
def elements():

    table_client = table_service.get_table_client(table_name="Login")
    tasks = table_client.list_entities()
    lst = list(tasks)
    print(lst)
    return jsonify(results=lst)


@api.route('/register', methods=["POST"])
def register():
    name = request.json.get("name", None)
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    table_client = table_service.get_table_client(table_name="Login")
    print(email)
    print(name)
    print(password)
    task = {u'PartitionKey': email, u'RowKey': name,
            u'Password': password}
    table_client.create_entity(entity=task)
    return "Done"


@api.route('/login', methods=["POST"])
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
            return "OK"
    return {"msg": "Wrong email or password"}, 401
