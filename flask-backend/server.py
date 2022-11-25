#python server.py to start the server

from flask import Flask, request

from exportedModel import modelPrediction

app = Flask(__name__)

# Member API rooute

@app.route('/fraudPred', methods=['POST', 'GET'])

def fraudPred():
    # Gets the request data
    reqData = request.get_json()
    print(reqData)
    
    # Instantiates the model prediction class
    predClass = modelPrediction(
        distanceFromHome= reqData['DistanceFromHome'], 
        distanceFromLastTran= reqData['DistanceFromLastPurchase'], 
        priceRatio= reqData['Amount'] / getAveragePurchase(reqData['Username']), 
        repeatRetail=reqData['RepeatRetail'], 
        usedChip=reqData['UsedChip'], 
        usedPin=reqData['UsedPin'], 
        onlineOrder=reqData['OnlineOrder']
    )

    # Sends the prediction back to the front end
    return {"FraudPrediction": predClass.predictFraud()}

# Will update this to get purchase data from database
def getAveragePurchase(username):
    return 50

# Runs the app
if __name__ == '__main__':
    app.run(debug=True)