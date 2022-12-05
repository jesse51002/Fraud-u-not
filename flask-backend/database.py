#first install packae mysql-connector-python
import mysql.connector
#first connect to database

"""
db = mysql.connector.connect(
    host="localhost",
    user="root",
    #insertpassword
    passwd="password",
    database="fraudunotproject"
)
mycursor = db.cursor(buffered=True)
"""
#run mysql once
mycursor = None

def init(cursor):
    global mycursor
    mycursor = cursor

#gets persons details

def getdetailssqlfunction(username):
    sql = "SELECT * FROM accountssscustomerss WHERE username = '" + username + "'";
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
    sql = "DELETE FROM accountssscustomerss WHERE username = " + "'" +username +"'"
    mycursor.execute(sql)
    sql = "DROP TABLE " + username + "spurchasesshistory"
    mycursor.execute(sql)


def updatepersnsdetails(varname,varvalue,username):
    sql = "UPDATE accountssscustomerss SET " + varname + " = "  + "'" + varvalue +"'" + " WHERE username = " + "'" + username + "'"
    mycursor.execute(sql)

def getpersnsdetails(varname,username):
    sql = "SELECT " + varname + " FROM accountssscustomerss WHERE " + "username = '" + username + "'" 
    mycursor.execute(sql)
    return mycursor.fetchall()[0][0]


#updatepersnsdetails('lastname','karanam','sujay')
#getdetailssqlfunction('sujay')

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
