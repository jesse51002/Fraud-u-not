#first install packae mysql-connector-python
import mysql.connector
#first connect to database
import time
import random
import json

#run mysql once
mycursor = None
connection = None
def init(con):
    
    global mycursor
    global connection
    connection = con
    mycursor = connection.cursor()

    updatepersnsdetails('phone', '99999999', 'rohanisbad')
  

#gets persons details

def getdetailssqlfunction(username):
    sql = "SELECT * FROM accountsssscustomerss WHERE username = '" + username + "'";
    print(sql)
    mycursor.execute(sql)

    return mycursor.fetchall()[0]


#inserts persons details

def insertpersonfunction(firstname, lastname, username, password3, email,phone, City, State, Country,streetadress,zipcode, bank, banksemail,banksphonenumber, associatedcard, accountnum, routingnum):
    sql = "Insert INTO accountssscutomerss (firstname, lastname, username, password3, email,phone, City, State, Country,streetadress,zipcode, bank, banksemail,banksphonenumber, associatedcard, accountnum, routingnum) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)"
    val = (firstname,lastname,username,password3,email,phone,City,State,Country,streetadress,zipcode,bank,banksemail,banksphonenumber,associatedcard,accountnum,routingnum)
    #print(sql)
    mycursor.execute(sql,val)

    """
    sql = "CREATE TABLE IF NOT EXISTS " + firstname + "spurchasesshistory(purchasedate TEXT,purchaseamount TEXT, purchaseorg TEXT);"
    print(sql)
    mycursor.execute(sql)
    """


#TEST

#insertpersonfunction('darth','vader','sith','palp','email','9899899898','Alderran','Coruscant','tatooine','chase','email','8888888888','credit','890543','980343')
#getdetailssqlfunction('darth')


#deletes a person from database

def deleteperson(username):
    sql = "DELETE FROM accountsssscustomerss WHERE username = " + "'" +username +"'"
    mycursor.execute(sql)
    sql = "DROP TABLE " + username + "spurchasesshistory"
    mycursor.execute(sql)


def updatepersnsdetails(varname,varvalue,username):
    mycursor.execute("SET SQL_SAFE_UPDATES = 0")
    sql = "UPDATE accountsssscustomerss SET " + varname + " = "  + "'" + varvalue +"'" + " WHERE username = " + "'" + username + "'"
    mycursor.execute(sql)



def updatemultpersnsdetails(vars,username):
    # mycursor.execute("SET SQL_SAFE_UPDATES = 0")
    varsString = ""

    for varname, varvalue in vars.items():
        varsString += varname + " = "  + "'" + varvalue +"', "
    
    varsString = varsString[0:-2]

    sql = "UPDATE accountsssscustomerss SET " + varsString + " WHERE username = " + "'" + username + "'"
    mycursor.execute(sql)

    time.sleep(5)

    

    return True

def getpersnsdetails(varname,username):
    sql = "SELECT " + varname + " FROM accountsssscustomerss WHERE " + "username = '" + username + "'" 
    mycursor.execute(sql)
    return mycursor.fetchall()[0][0]


#updatepersnsdetails('lastname','karanam','sujay')
#getdetailssqlfunction('rohanisbad')

"""
def getpaymentdetails(fname):
    sql = "SELECT * FROM " + fname + "spurchasesshistory;"
    mycursor.execute(sql)

def insertpaymentdetail(fname,purchasedate,purchaseamount,purchaseorg):
    sql = "INSERT INTO " + fname + "spurchasesshistory(purchasedate,purchaseamount,purchaseorg)VALUES(%s,%s);"
    val = (purchasedate,purchaseamount,purchaseorg)
    print(sql)
    mycursor.execute(sql,val)
"""

def closeCur():
    connection.commit()
    mycursor.close()


if __name__ == "__main__":
    db = mysql.connector.connect(
        host="localhost",
        user="root",
        #insertpassword
        passwd="password",
        database="fraudunotproject"
    )
    mycursor = db.cursor(buffered=True)

    sql = """
     SELECT firstname, lastname 
     FROM accountsssscustomerss
     """
    mycursor.execute(sql)
    names = mycursor.fetchall()
    print(names)
    for x in names:
        banks = ['Wells Fargo', 'Capital One', 'Citi', 'Bank Of America', 'Chase']

        data = {
            'banks': [
                {
                'bankname': banks[random.randint(0,len(banks) - 1)],
                'cardholder': x[0] + ' ' + x[1],
                'cardnumber': str(random.randint(
                    1000000000000000,
                    9999999999999999
                    )),
                'expdate': '09/2089',
                'cvv': random.randint(100,999),
                'cardtype': 'Debit',
                },
                {
                'bankname': 'Capital One',
                'cardholder': x[0] + ' ' + x[1],
                'cardnumber': str(random.randint(
                    1000000000000000,
                    9999999999999999
                    )),                'expdate': '12/2043',
                'cvv': random.randint(100,999),
                'cardtype': 'Credit',
                }
            ]
        }

        jsonData = json.dumps(data)
        updateSql = """
        UPDATE  accountsssscustomerss
        SET bank=%s
        WHERE firstname=%s
        """
        mycursor.execute(updateSql,(jsonData, x[0]))
    db.commit()

        
