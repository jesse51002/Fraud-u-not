#python server.py to start the server

from flask import Flask, request
from flask_cors import CORS

from exportedModel import modelPrediction
#from database import *

app = Flask(__name__)
CORS(app)

# Member API rooute

@app.route('/fraudPred', methods=['POST', 'GET'])

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

# Will update this to get purchase data from database
def getAveragePurchase(username):
    return 50

# Runs the app
if __name__ == '__main__':
    app.run(debug=True)
    
    #from waitress import serve
    #serve(app, host="127.0.0.1", port=5000)