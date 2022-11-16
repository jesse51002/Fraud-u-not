CREATE DATABASE IF NOT EXISTS fraudunot;
USE fraudunot;
create table IF NOT EXISTS accounts(
firstname TEXT,
lastname TEXT,
username TEXT,
password3 TEXT,
email CHAR(255),
phone TEXT,
City TEXT,
State TEXT,
Country TEXT,
bank TEXT,
banksemail TEXT,
banksphonenumber TEXT,
associatedcard TEXT,
accountnum TEXT,
routingnum INTEGER
);
/*creating and initliazing a table with all of the attributes and the data types*/
INSERT INTO accounts(firstname, lastname, username, password3, email,phone, City, State, Country, bank, banksemail,banksphonenumber, associatedcard, accountnum, routingnum)
VALUES
 ('sujay','karanam','ohh_yahh', 'thisprojectishard', 'sujaykaranam@gmail.com', 9119119119, 'Barrow', 'Alaska', 'United States', 'Chase', 'chasebank@gmail.com',1191191119, 'credit',6696696699,739557487),
 ('jesse','musa', 'jessiebessie','ml-ai', 'jessemusa@gmail.com', 8688688668, 'Bluff', 'Alaska','United States', 'JP MORGAN', 'jpmorganbank@gmail.com',4454454454, 'debt',9969969966,756756857),
 ('rohan', 'gopinathan', 'rohanisbad','notpassword', 'rohangopinathan@gmail.com', 9898454569, 'Bangs','Texas','United States', 'JP MORGAN', 'jpmorganbank@gmail.com', 4454454454,'credit',3434343434,756865897),
 ('kristine', 'thomas', 'kristineflaming999','1334567789','kristinethomas@gmail.com',1334567789,'Chicken','Alaska','United States', 'JP MORGAN', 'jpmorganbank@gmail.com',4454454454, 'debt',9996669966,909909909),
 ('vranda', 'vijay', 'vrandaisinuganda','Cleveland','vrandavijay@gmail.com', 5465367678, 'Truth or Consequences', 'New Mexico', 'United States', 'Chase', 'chasebank@gmail.com',1191191119, 'credit',6669996699,099099099)
 ;
 
 /* inserting correspondiing values for all attributes for customers/*