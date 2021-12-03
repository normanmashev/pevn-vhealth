CREATE TABLE DiseaseType(
	id INT PRIMARY KEY, 
	description VARCHAR(140) 
);

CREATE TABLE Country(
	cname VARCHAR(50) PRIMARY KEY, 
	population BIGINT
);

CREATE TABLE Disease(
	disease_code VARCHAR(50) PRIMARY KEY, 
	pathogen VARCHAR(20), 
	description VARCHAR(140), 
	id INT REFERENCES DiseaseType (id) ON DELETE CASCADE
);

CREATE TABLE Discover(
	cname VARCHAR(50) REFERENCES Country (cname) ON DELETE CASCADE,
	disease_code VARCHAR(50) REFERENCES Disease (disease_code) ON DELETE CASCADE,  
	first_enc_date DATE,
	PRIMARY KEY (cname, disease_code)
);

CREATE TABLE Users(
	id SERIAL,
	email VARCHAR(60) PRIMARY KEY, 
  password TEXT,
	name VARCHAR(30), 
	surname VARCHAR(40), 
	salary INT, 
	phone VARCHAR(20),
	cname VARCHAR(50) REFERENCES Country (cname) ON DELETE CASCADE
);

CREATE TABLE PublicServant(
	email VARCHAR(60) PRIMARY KEY,
	department VARCHAR(50),
	FOREIGN KEY (email) REFERENCES Users (email) ON DELETE CASCADE
);

CREATE TABLE Doctor( 
	email VARCHAR(60) PRIMARY KEY,
	degree VARCHAR(20),
	FOREIGN KEY (email) REFERENCES Users (email) ON DELETE CASCADE
);

CREATE TABLE Specialize(
	id INT REFERENCES DiseaseType (id), 
	email VARCHAR(60),
	FOREIGN KEY (email) REFERENCES Doctor (email) ON DELETE CASCADE
);

CREATE TABLE Record(
  id SERIAL,
	email VARCHAR(60) REFERENCES PublicServant (email) ON DELETE CASCADE,  
	cname VARCHAR(50) REFERENCES Country (cname) ON DELETE CASCADE, 
	disease_code VARCHAR(50) REFERENCES Disease (disease_code) ON DELETE CASCADE,  
	total_deaths INT, 
	total_patients INT,
	PRIMARY KEY (email, disease_code, cname)
);