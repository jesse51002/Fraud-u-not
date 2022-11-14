# Fraud-u-Not

Hello! Welcome to our Fraud-U-Not application! <br /><br />

This is the repository where we will maintain and update our code. Note that, as of right now, the three main technical aspects of the application are being made independently and will be integrated in following weeks. For that reason, the application is limited in functionality - please review the comments in the uploaded GitHub files to better understand the purpose of the code, but note that it will not be possible to test or run the code at this time. <br />
That being said, the progress of the front-end will be kept updated at this link: https://snack.expo.dev/@kristom/fraud-draft. Note again that this UI is built independently of the other elements and is currently static. Please view the comments for more details on its current abilities. <br /><br />

## Machine Learning Model Training

<u>Dataset: https://www.kaggle.com/datasets/dhanushnarayananr/credit-card-fraud<u/> 

<b>Dataset Colums</b>
* distance_from_home - Distance From Home
* distance_from_last_transaction - Distance From Last Transaction
* ratio_to_median_purchase_price - Ratio to median purrcahse
* repeat_retailer - Whether this is there first time shopping at this location
* used_chip - Whether a card chip was used
* used_pin_number - Whether a pin number was used
* online_order - Whether it was an online order
* fraud - Whether or not the purcahse was a fraud

#### Data Exploration

<ins>Binary Values effect on whether or not a purchase was a fraud</ins>

Repeat Retailer
* Whether a purchase was a repeat retailer did not effect the fraud percentage. It stayed consistent at around <b>8.84%</b> of purchases whether

Used Chip
* When a chip was not used it increased the pertange chance of the purchase being a fraud from 6.40% to 10.00% which is an increase by <b>56.44%</b>.

Pin Number
* When a pin number was not used it increased the pertange chance of the purchase being a fraud from 0.27% to 9.68% which is an increase by <b>3470.17%</b>.

Online Order
* When an order was made online it increased the pertange chance of the purchase being a fraud from 1.34% to 12.71% which is an increase by <b>846.9%</b>.


<ins>Continous Values effect on whether or not a purchase was a fraud</ins>

Distance from Home
* When the distance got above 125 milies the fraud percentage raised from <b>6% to 43%</b>
![Distance from Home Graph](gitImages/homeDistanceGraph.png?raw=true "Title")

Distance from Last Purcahse
* When the distance got above 70 milies the fraud percentage raised from <b>8% to 48%</b>
![Distance from Last Purcahse Graph](gitImages/distanceLastTran.png?raw=true "Title")

Price Ratio From Median
* When amount gets more than 7.5x the mdeian purchase the fraud percentage raised from <b>2% to 60%</b>
![Price Ratio From Median Graph](gitImages/ratioFromMedian.png?raw=true "Title")

  
<b>Data Imbalance</b>
  
The Data included 92.3% Non - fraud rows and 8.74% Fraud rows. This amaount of data imbalance called for resampling of the training dataset. 
  
We attemplted to use 3 resampling methods
  * Over Sampling
  * Undersampling
  * SMOTE

  For the final model <ins>Undersmapling</ins> gave us the highest presicion score and the least false positives.
  
  
#### Machine Learning Model
  
We tried 4 different machine learning models
  * XGBBoost
  * Logistic Regression
  * Random Forest
  * K Nearest Neighbors

<ins> Random Forest </ins> gave us the highest accuracy with 
  
Accuracy Score: 0.9999222222222223

Precision Score: 1
![Price Ratio From Median Graph](gitImages/ranForesteatmap.png?raw=true "Title")

  
  
  
  
  
~ The <b>mlmmodel</b> branch contains the ML Model that we are using to flag suspicious purchases <br />
~ The <b>front-end</b> branch contains the React Native scripts used to build the UI <br />
~ The <b>database</b> branch contains the database code for storing account and bank information, as well as user authentication <br /><br />

Please go through the branches for more comments on how each part works! Thank you :D

