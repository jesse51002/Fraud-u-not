CREATE DATABASE IF NOT EXISTS fraudunotproject;
USE fraudunotproject;

/*create tables for customers purchase history*/

/*
create table IF NOT EXISTS sujaysspurchasesshistory(
purchasedate TEXT,
purchaseamount TEXT,
purchaseorg TEXT);
create table IF NOT EXISTS rohansspurchasesshistory(
purchasedate TEXT,
purchaseamount TEXT,
purchaseorg TEXT);
create table IF NOT EXISTS vrandasspurchasesshistory(
purchasedate TEXT,
purchaseamount TEXT,
purchaseorg TEXT);
create table IF NOT EXISTS jessesspurchasesshistory(
purchasedate TEXT,
purchaseamount TEXT,
purchaseorg TEXT);
create table IF NOT EXISTS kristinesspurchasesshistory(
purchasedate TEXT,
purchaseamount TEXT,
purchaseorg TEXT);
*/

create table IF NOT EXISTS accountssscustomerss(
firstname TEXT,
lastname TEXT,
username TEXT,
password3 TEXT,
email CHAR(255),
phone TEXT,
City TEXT,
State TEXT,
Country TEXT,
streetadress TEXT,
zipcode TEXT,
bank TEXT,
banksemail TEXT,
banksphonenumber TEXT,
associatedcard TEXT,
accountnum TEXT,
routingnum INTEGER,
notificationmethod TEXT,
authorizationmethod TEXT,
);
/*creating and initliazing a table with all of the attributes and the data types*/
INSERT INTO accountssscustomerss(firstname, lastname, username, password3, email,phone, City, State, Country,streetadress,zipcode, bank, banksemail,banksphonenumber, associatedcard, accountnum, routingnum,notificationmethod,authorizationmethod)
VALUES
 ('sujay','karanam','ohh_yahh', 'thisprojectishard', 'sujaykaranam@gmail.com', 9119119119, 'Barrow', 'Alaska', 'United States','#4 Privet Drive','56565', 'Chase', 'chasebank@gmail.com',1191191119, 'credit',6696696699,739557487,'Fraud notifications only','phone'),
 ('jesse','musa', 'jessiebessie','ml-ai', 'jessemusa@gmail.com', 8688688668, 'Bluff', 'Alaska','United States','56 Hogwartslane','00004', 'JP MORGAN', 'jpmorganbank@gmail.com',4454454454, 'debt',9969969966,756756857,'all notifications','email'),
 ('rohan', 'gopinathan', 'rohanisbad','notpassword', 'rohangopinathan@gmail.com', 9898454569, 'Bangs','Texas','United States','89 Bang drive','99090', 'JP MORGAN', 'jpmorganbank@gmail.com', 4454454454,'credit',3434343434,756865897,'all notifications','phone'),
 ('kristine', 'thomas', 'kristineflaming999','1334567789','kristinethomas@gmail.com',1334567789,'Chicken','Alaska','United States','33 kristineadressdrive','97687', 'JP MORGAN', 'jpmorganbank@gmail.com',4454454454, 'debt',9996669966,909909909,'fraud notifications only','email'),
 ('vranda', 'vijay', 'vrandaisinuganda','Cleveland','vrandavijay@gmail.com', 5465367678, 'Truth or Consequences', 'New Mexico', 'United States','78 Santafe drive','33334', 'Chase', 'chasebank@gmail.com',1191191119, 'credit',6669996699,099099099,'fraud notifications only','email')
 ;

 /*
INSERT INTO sujaysspurchasesshistory(purchasedate,purchaseamount,purchaseorg)
VALUES
 ('August 30, 2022','879$','Amazon'),
 ('September 14, 2022','999$','Amazon');
INSERT INTO jessesspurchasesshistory(purchasedate,purchaseamount,purchaseorg)
VALUES
 ('October 30,2022','987$','Amazon');
INSERT INTO rohansspurchasesshistory(purchasedate,purchaseamount,purchaseorg)
VALUES
 ('February 13,2022','879$','Amazon');
INSERT INTO vrandasspurchasesshistory(purchasedate,purchaseamount,purchaseorg)
VALUES
 ('January 18,2022','980$','Amazon');
INSERT INTO kristinesspurchasesshistory(purchasedate,purchaseamount,purchaseorg)
VALUES 
 ('January 5,2022','89$','Amazon');
*/
 /* inserting correspondiing values for all attributes for customers/*