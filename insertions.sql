INSERT INTO DiseaseType VALUES 
	(1, 'infectious diseases'),
	(2, 'deficiency diseases'),
	(3, 'hereditary diseases'),
	(4, 'physiological diseases'),
	(5, 'virology');

INSERT INTO Country VALUES 
	('Kazakhstan', 18000000),
	('Russia', 145912025),
	('Uzbekistan', 33935763),
	('Kyrgyzstan', 6628356),
	('USA', 332915073),
	('Canada', 38067903),
	('China', 1444216107),
	('India', 1393409038),
	('Mexico', 130262216),
	('Japan', 126050804);

INSERT INTO Disease VALUES 
	('B01*', 'bacteria', 'Chickenpox', 1),
	('J00', 'virus', 'Common cold', 1),
	('A36.9','bacteria', 'Diphtheria', 1),
	('E54', 'fungi', 'Scurvy', 2),
	('E52', 'virus', 'Pellagra', 2),
	('H53', 'bacteria', 'Night Blindness (Nyctalopia)', 2),
	('E84.9','virus', 'Cystic fibrosis',  3),
	('D68.311','bacteria', 'Hemophilia', 3),
	('F60.9','virus', 'Personality disorders', 4),
	('F43.10','bacteria', 'Post-traumatic stress disorder', 4),
	('covid-19','virus', 'Dangerous virus of 2019', 1);

INSERT INTO Discover VALUES 
	('Mexico', 'B01*', '1989-10-11'),
	('China', 'J00', '1995-05-28'),
	('Canada', 'E54', '2000-02-03'),
	('Canada', 'H53', '1854-04-01'),
	('Kazakhstan', 'E52', '1823-07-09'),
	('USA', 'D68.311', '1991-09-15'),
	('Japan', 'A36.9', '1988-04-21'),
	('Russia', 'E84.9', '1990-01-01'),
	('Uzbekistan', 'F43.10', '1800-11-19'),
	('China', 'covid-19', '2019-03-05');

INSERT INTO Users (email, name, surname, salary, phone, cname) VALUES 
	('anton.ivanov@gmail.com', 'Anton', 'Ivanov', 3000, '+77011231212', 'Kazakhstan'),
	('kerim.hvan@gmail.com', 'Kerim', 'Hvan', 5000, '+77023124212', 'Japan'),
	('michael.jerdan@mail.com', 'Michael', 'Jerdan', 3500, '+77054326545', 'USA'),
	('joe.buden@yandex.com', 'Joe', 'Buden', 4000, '+77011231212', 'Canada'),
	('donald.tramp@gmail.com', 'Donald', 'Tramp', 2000, '+77082938475', 'USA'),
	('masha.ten@mail.com', 'Masha', 'Ten', 4212, '+77715635241', 'Uzbekistan'),
	('vasya.pupkin@gmail.com', 'Vasya', 'Pupkin', 1000, '+77026374432', 'Kyrgyzstan'),
	('svetlana.li@gmail.com', 'Svetlana', 'Li', 2000, '+77082938475', 'USA'),
	('kesha.lopez@gmail.com', 'Kesha', 'Lopez', 3333, '+77078098732', 'India'),
	('seka.beka@gmail.com', 'Seka', 'Beka', 2222, '+77064531234', 'Russia'),
	('sasha.fox@gmail.com', 'Sasha', 'Fox', 31454, '+77006736251', 'Russia'),
	('sergey.blok@gmail.com', 'Sergey', 'Blok', 5342, '+77752918374', 'Kyrgyzstan'),
	('alex.white@gmail.com', 'Alex', 'White', 5346, '+77779018283', 'China'),
	('norman.mashev@gmail.com', 'Norman', 'Mashev', 6326, '+77084861314', 'Kazakhstan'),
	('zigran.kolab@gmail.com', 'Zigran', 'Kolab', 31241, '+777756473621', 'Uzbekistan'),
	('liyag.jaldyr@gmail.com', 'Liyag', 'Jaldyr', 49812, '+77008909212', 'China'),
	('ilanama.borib@gmail.com', 'Ilanama', 'Borib', 77777, '+77777777777', 'Kyrgyzstan'),
	('regnemek.latob@gmail.com', 'Regnemek', 'Latob', 76153, '+77017541374', 'Canada'),
	('ekreka.turmu@gmail.com', 'Ekreka', 'Turmu', 33421, '+77021237864', 'Japan'),
	('zarina.bekbol@gmail.com', 'Zarina', 'Bolbol', 91243, '+77784613241', 'Uzbekistan'),
	('alibek.zoarov@gmail.com', 'Alibek', 'Bolatbek', 0, '+77072346812', 'India'),
	('beskultan.kemel@gmail.com', 'Beksultan', 'Ebekmel', 0, '+770071029837', 'Russia'),
	('nurbek.shitok@gmail.com', 'Nurbek', 'Shitok', 0, '+77029018734', 'Mexico');

INSERT INTO PublicServant VALUES 
	('anton.ivanov@gmail.com', 'education'),
	('kerim.hvan@gmail.com', 'politics'),
	('michael.jerdan@mail.com', 'economics'),
	('joe.buden@yandex.com', 'education'),
	('donald.tramp@gmail.com', 'healthcare'),
	('masha.ten@mail.com', 'military'),
	('vasya.pupkin@gmail.com', 'military'),
	('svetlana.li@gmail.com', 'social'),
	('kesha.lopez@gmail.com', 'social'),
	('seka.beka@gmail.com', 'emergency');

INSERT INTO Doctor VALUES 
	('sasha.fox@gmail.com', 'PhD'),
	('sergey.blok@gmail.com', 'Masters'),
	('alex.white@gmail.com', 'PhD'),
	('norman.mashev@gmail.com', 'Masters'),
	('zigran.kolab@gmail.com', 'PhD'),
	('liyag.jaldyr@gmail.com', 'Masters'),
	('regnemek.latob@gmail.com', 'PhD'),
	('ekreka.turmu@gmail.com',  'PhD'),
	('zarina.bekbol@gmail.com', 'PhD'),
	('ilanama.borib@gmail.com', 'PhD');

INSERT INTO Specialize VALUES
	(2, 'sasha.fox@gmail.com'),
	(1, 'sergey.blok@gmail.com'),
	(2, 'sergey.blok@gmail.com'),
	(1, 'alex.white@gmail.com'),
	(2, 'alex.white@gmail.com'),
	(3, 'alex.white@gmail.com'),
	(5, 'alex.white@gmail.com'),
	(2, 'norman.mashev@gmail.com'),
	(3, 'norman.mashev@gmail.com'),
	(5, 'norman.mashev@gmail.com'),
	(5, 'zigran.kolab@gmail.com'),
	(5, 'liyag.jaldyr@gmail.com');

INSERT INTO Record VALUES 
	('anton.ivanov@gmail.com', 'Kazakhstan', 'covid-19', 3000, 4000),
	('anton.ivanov@gmail.com', 'Russia', 'covid-19', 2000, 3000),
	('anton.ivanov@gmail.com', 'Uzbekistan', 'covid-19', 999, 2100),
	('kerim.hvan@gmail.com', 'Mexico', 'covid-19', 1000, 1500),
	('kerim.hvan@gmail.com', 'Russia', 'covid-19', 1000, 1500),
	('kerim.hvan@gmail.com', 'Kyrgyzstan', 'covid-19', 1000, 1500),
	('kerim.hvan@gmail.com', 'Uzbekistan', 'covid-19', 1000, 1500),
	('michael.jerdan@mail.com', 'Kazakhstan', 'J00', 20000, 100000),
	('michael.jerdan@mail.com', 'China', 'covid-19', 20000, 76543),
	('michael.jerdan@mail.com', 'Canada', 'covid-19', 20000, 203456),
	('joe.buden@yandex.com', 'USA', 'E52', 332211, 999999),
	('joe.buden@yandex.com', 'USA', 'covid-19', 332211, 3),
	('donald.tramp@gmail.com', 'Japan', 'H53', 1000, 123456),
	('masha.ten@mail.com', 'Canada', 'F60.9', 875, 32189),
	('vasya.pupkin@gmail.com', 'Canada', 'F43.10', 123, 982),
	('svetlana.li@gmail.com', 'India', 'A36.9', 205000, 587000),
	('kesha.lopez@gmail.com', 'India', 'D68.311', 19700, 123987),
	('seka.beka@gmail.com', 'China', 'E54', 45321, 103450);








