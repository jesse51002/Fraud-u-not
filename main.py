#first install packae mysql-connector-python
import mysql.connector
#first connect to database

db = mysql.connector.connect(
    host="localhost",
    user="root",
    #insertpassword
    passwd="",
    database="fraudunotproject"
)
mycursor = db.cursor(buffered=True)
#run mysql once

#gets persons details

def getdetailssqlfunction(personfname):
    sql = "SELECT * FROM accountssscustomerss WHERE firstname = '" + personfname + "'";
    print(sql)
    mycursor.execute(sql)

#if u wanna get specific data from a person just replace * with the variable name

#TEST

getdetailssqlfunction('sujay')

#inserts persons details

def insertpersonfunction(firstname, lastname, username, password3, email,phone, City, State, Country,streetadress,zipcode, bank, banksemail,banksphonenumber, associatedcard, accountnum, routingnum):
    sql = "Insert INTO accountssscutomerss (firstname, lastname, username, password3, email,phone, City, State, Country,streetadress,zipcode, bank, banksemail,banksphonenumber, associatedcard, accountnum, routingnum) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)"
    val = (firstname,lastname,username,password3,email,phone,City,State,Country,streetadress,zipcode,bank,banksemail,banksphonenumber,associatedcard,accountnum,routingnum)
    print(sql)
    mycursor.execute(sql,val)
    sql = "CREATE TABLE IF NOT EXISTS " + firstname + "spurchasesshistory(purchasedate TEXT,purchaseamount TEXT, purchaseorg TEXT);"
    print(sql)
    mycursor.execute(sql)


#TEST

#insertpersonfunction('darth','vader','sith','palp','email','9899899898','Alderran','Coruscant','tatooine','chase','email','8888888888','credit','890543','980343')
#getdetailssqlfunction('darth')


#deletes a person from database


def deleteperson(fname):
    sql = "DELETE FROM accountssscustomerss WHERE firstname = " + "'" +fname +"'"
    mycursor.execute(sql)
    sql = "DROP TABLE " + fname + "spurchasesshistory"
    mycursor.execute(sql)

#TEST

#deleteperson('darth')
#getdetailssqlfunction('darth')

def updatepersnsdetails(varname,varvalue,fname):
    sql = "UPDATE accountssscustomerss SET " + varname + " = "  + "'" + varvalue +"'" + " WHERE firstname = " + "'" + fname + "'"
    print(sql)
    mycursor.execute(sql)

#TEST

#updatepersnsdetails('lastname','karanam','sujay')
#getdetailssqlfunction('sujay')

def getpaymentdetails(fname):
    sql = "SELECT * FROM " + fname + "spurchasesshistory;"
    mycursor.execute(sql)

def insertpaymentdetail(fname,purchasedate,purchaseamount,purchaseorg):
    sql = "INSERT INTO " + fname + "spurchasesshistory(purchasedate,purchaseamount,purchaseorg)VALUES(%s,%s);"
    val = (purchasedate,purchaseamount,purchaseorg)
    print(sql)
    mycursor.execute(sql,val)

#TEST

#insertpaymentdetail('darth','August 6, 4545','79$')
#deleteperson('darth')
#getpaymentdetails('darth')
for x in mycursor:
    print(x)
