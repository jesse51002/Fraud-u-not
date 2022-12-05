#python server.py to start the server

from flask import Flask, request
from flask_cors import CORS
from flask_mysqldb import MySQL

from exportedModel import modelPrediction
from database import *

app = Flask(__name__)
CORS(app)

app.config['MYSQL_HOST'] ="localhost"
app.config['MYSQL_USER'] ="root"
app.config['MYSQL_PASSWORD'] ="password"
app.config['MYSQL_DB'] ="fraudunotproject"

mysql = MySQL(app)



# Member API rooute

@app.route('/fraudPred_page', methods=['POST', 'GET'])
def fraudPred():
    # Gets the request data
    reqData = request.get_json()
    print(reqData)

    # Instantiates the model prediction class
    predClass = modelPrediction(
        distanceFromHome= int(reqData['DistanceFromHome']), 
        distanceFromLastTran= int(reqData['DistanceFromLastPurchase']), 
        priceRatio= int(reqData['Amount']) / getAveragePurchase(reqData['Username']), 
        repeatRetail= reqData['RepeatRetailer'],    
        usedChip=reqData['UsedChip'], 
        usedPin=reqData['UsedPin'], 
        onlineOrder=reqData['OnlineOrder']
    )
    print("hi11")
    response = {"FraudPrediction": predClass.predictFraud()}
    print(response)
    print("hi33")
    # Sends the prediction back to the front end
    return response

@app.route('/bankDetails', methods=['POST', 'GET'])
def bankDetails_page():
    init(mysql.connection.cursor())

    reqData = request.get_json()    

    if request.method == "POST":
        username = reqData['username']
        for key, value in reqData.items():
            updatepersnsdetails(key, value, username)
    
        return True
    elif request.method == "GET":
        username = reqData['username']

        neededVals = ["bank", "banksemail", "banksphonenumber" , "associatedcard" , "accountnum" , "routingnum"]

        response = {}

        for val in neededVals:
            response[val] = getpersnsdetails(val, username)

        return response
    
    return None


@app.route('/accountDetails', methods=['POST'])
def accountDetails_page():
    init(mysql.connection.cursor())
    reqData = request.get_json()    
    reqType = reqData['type']
    reqData.pop('type', None)

    if reqType == "SET":
        print("in account post")
        username = reqData['username']

        reqData['firstname'] = reqData['name'].split()[0]
        reqData['lastname'] = reqData['name'].split()[1]
        reqData.pop('name', None)

        reqData['streetadress'] = reqData['address'] 
        reqData.pop('address', None)
        reqData['City'] = ''
        reqData['State'] = ''
        reqData['Country'] = ''
        reqData['zipcode'] = ''

        for key, value in reqData.items():
            updatepersnsdetails(key, value, username)
    
        return {"Success":True}
    elif reqType == "GET":
        print("in account get")
        username = reqData['username']

        neededVals = ['firstname', 'lastname', 'username', 'password3', 'email','phone', 'City', 'State', 'Country','streetadress','zipcode']

        response = {}

        for val in neededVals:
            response[val] = getpersnsdetails(val, username)

        response['name'] = response['firstname'] + " " + response['lastname']
        response.pop('firstname', None)
        response.pop('lastname', None)
        
        response['address'] = response['streetadress'] + ", " + response['City'] + ", " + response['State']+ ", " + response['Country']+ ", " + response['zipcode']

        response.pop('streetadress', None)
        response.pop('City', None)
        response.pop('State', None)
        response.pop('Country', None)
        response.pop('zipcode', None)

        print(response)

        return response
    
    return None

# Will update this to get purchase data from database
def getAveragePurchase(username):
    return 50

# Runs the app
if __name__ == '__main__':
    app.run(debug=True)
    
    #from waitress import serve
    #serve(app, host="127.0.0.1", port=5000)