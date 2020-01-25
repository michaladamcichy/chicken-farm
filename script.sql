CREATE TABLE IF NOT EXISTS Customers(
id INT PRIMARY KEY AUTO_INCREMENT,
name VARCHAR(20) NOT NULL);

CREATE TABLE IF NOT EXISTS Products(
id INT PRIMARY KEY AUTO_INCREMENT,
name VARCHAR(20) NOT NULL,
unit_cost FLOAT NOT NULL CHECK (unit_cost>0));

CREATE TABLE IF NOT EXISTS Transactions(
id INT PRIMARY KEY AUTO_INCREMENT,
date DATE NOT NULL,
time TIME NOT NULL,
total decimal NOT NULL CHECK (total > 0),
customer_id INT NOT NULL,
CONSTRAINT customer_id_FK FOREIGN KEY(customer_id) REFERENCES Customers(id),
UNIQUE(date, time, customer_id));

CREATE TABLE IF NOT EXISTS Transaction_Items(
amount FLOAT NOT NULL CHECK (amount >= 0),
product_id INT NOT NULL,
CONSTRAINT Item_product_FK FOREIGN KEY(product_id) REFERENCES Products(id),
transaction_id INT NOT NULL,
CONSTRAINT Item_transaction_FK FOREIGN KEY(transaction_id) REFERENCES Transactions(id),
PRIMARY KEY(product_id, transaction_id));

CREATE TABLE IF NOT EXISTS StorageRecords(
date DATE NOT NULL,
time TIME NOT NULL,
amount FLOAT NOT NULL CHECK (amount >= 0),
type VARCHAR(3) NOT NULL CHECK (type IN ('in','out')),
product_id INT NOT NULL,
CONSTRAINT Storage_Prod_FK FOREIGN KEY(product_id) REFERENCES Products(id),
CONSTRAINT Storage_PK PRIMARY KEY(product_id, date, time));

CREATE TABLE IF NOT EXISTS ChickenHouses(
id INT PRIMARY KEY AUTO_INCREMENT,
size INT NOT NULL CHECK (size>0));

CREATE TABLE IF NOT EXISTS Chickens(
id INT PRIMARY KEY AUTO_INCREMENT,
birthdate DATE NOT NULL,
weight FLOAT NOT NULL CHECK (weight >= 0),
type VARCHAR(11) NOT NULL CHECK (type IN ('meatchicken','roaster','layer')),
chickenhouse_id INT NOT NULL,
CONSTRAINT chickenhouse_id_FK FOREIGN KEY(chickenhouse_id) REFERENCES ChickenHouses(id));

CREATE TABLE IF NOT EXISTS Eggs(
date DATE,
time TIME,
chicken_id INT NOT NULL,
CONSTRAINT chicken_id_FK FOREIGN KEY(chicken_id) REFERENCES Chickens(id),
CONSTRAINT Eggs_PK PRIMARY KEY(date, time, chicken_id));


CREATE TABLE IF NOT EXISTS Feedings(
date DATE NOT NULL,
time TIME NOT NULL,
fodder_amount FLOAT NOT NULL CHECK(fodder_amount>=0),
chickenhouse_id INT NOT NULL,
CONSTRAINT Feedings_chickenhouse_id_FK FOREIGN KEY(chickenhouse_id) REFERENCES ChickenHouses(id),
PRIMARY KEY(date,time,chickenhouse_id));

CREATE TABLE IF NOT EXISTS FarmWorkers(
id INT PRIMARY KEY AUTO_INCREMENT,
first_name VARCHAR(20) NOT NULL,
last_name VARCHAR(20) NOT NULL,
salary FLOAT NOT NULL CHECK(salary >= 0));

CREATE TABLE IF NOT EXISTS Chickenhouses_FarmWorkers(
chickenhouse_id INT NOT NULL,
FOREIGN KEY(chickenhouse_id) REFERENCES ChickenHouses(id),
worker_id INT NOT NULL,
FOREIGN KEY(worker_id) REFERENCES FarmWorkers(id),
CONSTRAINT ChickenHouses_Workers_PK PRIMARY KEY(chickenhouse_id,worker_id)
);

DELIMITER $$
CREATE FUNCTION KillWholeChickenHouse
(pIdHouse INT) 
RETURNS INT
DETERMINISTIC
  BEGIN
	DECLARE vChickensNumber INT;
    
 	SELECT COUNT(*)
 	INTO vChickensNumber
 	FROM Chickens
 	WHERE chickenhouse_id = pIdHouse;

	DELETE FROM Eggs
    WHERE chicken_id IN (SELECT id from chickens WHERE chickenhouse_id = pIdHouse);
    
 	DELETE FROM Chickens
 	WHERE chickenhouse_id = pIdHouse;
    
 	RETURN vChickensNumber;
  END$$
DELIMITER ;



DELIMITER $$
CREATE PROCEDURE FeedWholeFarm()
BEGIN
	DECLARE Co INT DEFAULT 0;
	DECLARE MAX INT;
 	SELECT COUNT(*) INTO MAX FROM chickenhouses;
 
 	WHILE Co < MAX DO
		INSERT INTO Feedings VALUES(CURRENT_DATE,CURRENT_TIME,
		5, (SELECT id FROM chickenhouses ORDER BY id LIMIT Co,1));
		SET Co = Co + 1;
	END WHILE;
END$$
DELIMITER ;


CREATE INDEX custom_name_idx ON customers(name);
CREATE INDEX prod_name_idx ON products(name);

/*
DROP TABLE  eggs, chickens, chicken.`customers`, chicken.`chickenhouses_farmworkers`, chicken.`feedings`, chicken.`farmworkers`,
 chicken.`products`, chicken.`transaction_items`, chicken.`transactions`, chicken.`storagerecords`,
chicken.`chickenhouses`;*/

