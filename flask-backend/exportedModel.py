import pickle
import pandas as pd
from sklearn.ensemble import RandomForestClassifier

randForestModel = pickle.load(open('./exportModel.pkl', 'rb'))


class modelPrediction:

    def  __init__(self, distanceFromHome=0, distanceFromLastTran=0, priceRatio=1, repeatRetail=1, usedChip=0, usedPin=0, onlineOrder=0):
        self.dataFrame = pd.DataFrame(columns=['distance_from_home', 'distance_from_last_transaction',
       'ratio_to_median_purchase_price', 'repeat_retailer', 'used_chip',
       'used_pin_number', 'online_order'])
        
        self.dataFrame['distance_from_home'] = [distanceFromHome]
        self.dataFrame['distance_from_last_transaction'] = [distanceFromLastTran]
        self.dataFrame['ratio_to_median_purchase_price'] = [priceRatio]
        self.dataFrame['repeat_retailer'] = [repeatRetail]
        self.dataFrame['used_chip'] = [usedChip]
        self.dataFrame['used_pin_number'] = [usedPin]
        self.dataFrame['online_order'] = [onlineOrder]

        self.__featureEnginnering()


    def __featureEnginnering(self):

        def numericTrans(colName ,ranges, newName):
            # stores data
            newData = []
            for index,x in self.dataFrame.iterrows():
                # Gets the value at the row
                curVal = x[colName]
                # stores the encoded val in the range
                encodedVal = len(ranges) - 1
                # Loops throught hte range
                for i in range(len(ranges) - 2, -1, -1):
                    # if curval is less than then this value is closer to the target value
                    if curVal <= ranges[i]:
                        encodedVal = i
                    # other wise it's not close to break
                    else:
                        break
                # Adds the encoded value to the data arr
                newData.append(encodedVal)
            # Adds the data to the panda dataframe
            self.dataFrame[newName] = newData

        valRanges = {
            'distance_from_home': [4, 10, 25, 50, 75, 100, 125, 150,250,1000, 5000],
            'distance_from_last_transaction': [0.3, 1, 3, 10, 40, 60, 70, 80, 100, 250, 500, 1000, 5000],
            'ratio_to_median_purchase_price': [0.5, 1, 3, 5, 7.5, 10, 35, 60, 100, 250, 500]
        }
    
        for name, ranges in valRanges.items():
            numericTrans(name, ranges, name + "_encoded")
    
    def predictFraud(self):
        return randForestModel.predict(self.dataFrame)[0]




