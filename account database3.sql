create table account (
firstname TEXT,
lastname TEXT,
username TEXT,
password TEXT,
email CHAR(255),
phone INTEGER,
City TEXT,
State TEXT,
Country TEXT,
bank TEXT,
banksemail TEXT,
banksphonenumber INTEGER,
associatedcard TEXT
);
/*creating and initliazing a table with all of the attributes and the data types 
INSERT INTO account(firstname, lastname, username, password, email,
 phone, City, State, Country, bank, banksemail,
 banksphonenumber, associatedcard)
/*inserting all attributes into table
 VALUES
 ('sujay','karanam','ohh_yahh', 'thisprojectishard', 'sujaykaranam@gmail.com', 9119119119, 'Barrow', 'Alaska', 'United States', 'Chase', 'chasebank@gmail.com',1191191119, 'credit')
 ('jesse','musa', 'jessiebessie','ml-ai', 'jessemusa@gmail.com', 8688688668, 'Bluff', 'Alaska','United States', 'JP MORGAN', 'jpmorganbank@gmail.com',4454454454, 'debt')
 ('rohan', 'gopinathan', 'rohanisbad','notpassword', 'rohangopinathan@gmail.com', 9898454569, 'Bangs','Texas','United States', 'JP MORGAN', 'jpmorganbank@gmail.com', 4454454454,'credit')
 ('kristine', 'thomas', 'kristineflaming999','1334567789','kristinethomas@gmail.com',1334567789,'Chicken','Alaska','United States', 'JP MORGAN', 'jpmorganbank@gmail.com',4454454454, 'debt')
 ('vranda', 'vijay', 'vrandaisinuganda','Cleveland','vrandavijay@gmail.com', 5465367678, 'Truth or Consequences', 'New Mexico', 'United States', 'Chase', 'chasebank@gmail.com',1191191119, 'credit')
 ;
 /* inserting correspondiing values for all attributes for customers
