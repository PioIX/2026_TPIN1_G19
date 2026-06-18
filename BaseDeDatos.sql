CREATE TABLE IF NOT EXISTS Usuarios(
    dni INT AUTO_INCREMENT UNIQUE NOT NULL,
    nombre VARCHAR(255),
    cont VARCHAR(255),
    is_admin boolean,
    PRIMARY KEY (dni)
);

CREATE TABLE Partidas(
    id INT AUTO_INCREMENT UNIQUE NOT NULL,
    puntaje INT,
    rondas INT,
    fallidas INT,
    momento DATETIME,
    dni INT,  
    PRIMARY KEY (id),
    FOREIGN KEY (dni) REFERENCES Usuarios(dni)
);

CREATE TABLE Ligas(
    id INT AUTO_INCREMENT UNIQUE NOT NULL,
    nombre VARCHAR(255)
);

CREATE TABLE Paises(
    id INT AUTO_INCREMENT UNIQUE NOT NULL,
    nombre VARCHAR(255)
);

CREATE TABLE Equipos(
    id INT AUTO_INCREMENT UNIQUE NOT NULL,
    nombre VARCHAR(255)
);

CREATE TABLE Posicion(
    id INT AUTO_INCREMENT UNIQUE NOT NULL,
    nombre VARCHAR(255)
);

CREATE TABLE Jugadores(
    id INT AUTO_INCREMENT UNIQUE NOT NULL,
    nombre VARCHAR(255),
    id_liga INT,
    id_pais INT,
    id_equipo INT,
    id_posicion INT,
    PRIMARY KEY (id),
    FOREIGN KEY (id_liga) REFERENCES Ligas(id),
    FOREIGN KEY (id_pais) REFERENCES Paises(id),
    FOREIGN KEY (id_equipo) REFERENCES Equipos(id),
    FOREIGN KEY (id_posicion) REFERENCES Posicion(id)
);

INSERT INTO Usuarios(nombre, cont, is_admin) VALUES 
('agustinp', 'eloso', TRUE),
('agustinf', 'liniers', TRUE),
('facug', 'tanque', TRUE),
('bautim', 'boquita', TRUE);

INSERT INTO Ligas(nombre) VALUES
('Premier League'),
('La Liga'),
('Serie A'),
('Liga Francesa'),
('Liga Argentina'),
('Bundesliga'),
('Brasileirao');

INSERT INTO Paises(nombre) VALUES
('Noruega'),
('Portugal'),
('España'),
('Brasil'),
('Inglaterra'),
('Francia'),
('Egipto'),
('Paises Bajos'),
('Argentina'),
('Ecuador'),
('Camerún'),
('Bélgica'),
('Suecia'),
('Japón'),
('Uruguay'),
('Alemania'),
('Eslovenia'),
('Ghana'),
('Turquía'),
('Suiza'),
('Italia'),
('Serbia'),
('Marruecos'),
('Ucrania'),
('Colombia'),
('Perú'),
('Bolivia'),
('China'),
('Canadá'),
('Estados Unidos');
    
INSERT INTO Equipos(nombre) VALUES
('Man City'),
('Arsenal'),
('Liverpool'),
('Chelsea'),
('Man United'),
('Tottenham'),
('Aston Villa'),
('Newcastle'),
('Brighton'),
('West Ham'),
('Real Madrid'),
('Barcelona'),
('Atlético Madrid'),
('Athletic Bilbao'),
('Real Sociedad'),
('Girona'),
('Inter'),
('Juventus'),
('Milan'),
('Napoli'),
('Roma'),
('Como'),
('Atalanta'),
('Psg'),
('Marseille'),
('Monaco'),
('Lyon'),
('Boca Juniors'),
('River Plate'),
('Racing Club'),
('Independiente'),
('San Lorenzo'),
('Estudiantes LP'),
('Independiente de Avellaneda'),
('Ferrocarril Oeste'),
('Sacachispas'),
('Olimpo');

INSERT INTO Posicion(nombre) VALUES
('Delantero'),
('Mediocampista'),
('Defensor'),
('Arquero');

INSERT INTO Jugadores(nombre, id_liga, id_pais, id_equipo, id_posicion) VALUES
('Erling Haaland', 1, 1, 1, 1),
('Bernardo Silva', 1, 2, 1, 2),
('Rodri Hernández', 1, 3, 1, 2),
('Rúben Dias', 1, 2, 1, 3),
('Ederson Moraes', 1, 4, 1, 4),
('Bukayo Saka', 1, 5, 2, 2),
('Martin Ødegaard', 1, 1, 2, 2),
('William Saliba', 1, 6, 2, 3),
('David Raya', 1, 3, 2, 4),
('Mohamed Salah', 1, 7, 3, 1),
('Virgil van Dijk', 1, 8, 3, 3),
('Alisson Becker', 1, 4, 3, 4),
('Alexis Mac Allister', 1, 9, 3, 2),
('Cole Palmer', 1, 5, 4, 2),
('Enzo Fernández', 1, 9, 4, 2),
('Robert Sánchez', 1, 3, 4, 4),
('Bruno Fernandes', 1, 2, 5, 2),
('André Onana', 1, 11, 5, 4),
('Lisandro Martínez', 1, 9, 5, 3),
('James Maddison', 1, 5, 6, 2),
('Cristian Romero', 1, 9, 6, 3),
('Guglielmo Vicario', 1, 21, 6, 4),
('Ollie Watkins', 1, 5, 7, 1),
('Emiliano Martínez', 1, 9, 7, 4),
('Alexander Isak', 1, 13, 8, 1),
('Bruno Guimarães', 1, 4, 8, 2),
('Kaoru Mitoma', 1, 14, 9, 2),
('Bart Verbruggen', 1, 8, 9, 4),
('Mohammed Kudus', 1, 18, 10, 2),
('Jarrod Bowen', 1, 5, 10, 1),
('Jude Bellingham', 2, 5, 11, 2),
('Vinícius Júnior', 2, 4, 11, 1),
('Kylian Mbappé', 2, 6, 11, 1),
('Thibaut Courtois', 2, 12, 11, 4),
('Antonio Rüdiger', 2, 16, 11, 3),
('Pedri González', 2, 3, 12, 2),
('Raphinha', 2, 4, 12, 1),
('Marc-André ter Stegen', 2, 16, 12, 4),
('Ronald Araújo', 2, 15, 12, 3),
('Antoine Griezmann', 2, 6, 13, 1),
('Jan Oblak', 2, 17, 13, 4),
('Nico Williams', 2, 3, 14, 1),
('Unai Simón', 2, 3, 14, 4),
('Mikel Oyarzabal', 2, 3, 15, 1),
('Martín Zubimendi', 2, 3, 15, 2),
('Artem Dovbyk', 2, 24, 16, 1),
('Aleix García', 2, 3, 16, 2),
('Lautaro Martínez', 3, 9, 17, 1),
('Nicolò Barella', 3, 21, 17, 2),
('Yann Sommer', 3, 20, 17, 4),
('Dušan Vlahović', 3, 22, 18, 1),
('Manuel Locatelli', 3, 21, 18, 2),
('Rafael Leão', 3, 2, 19, 1),
('Mike Maignan', 3, 6, 19, 4),
('Theo Hernández', 3, 6, 19, 3),
('Romelu Lukaku', 3, 12, 20, 1),
('Giovanni Di Lorenzo', 3, 21, 20, 3),
('Paulo Dybala', 3, 9, 21, 1),
('Bryan Cristante', 3, 21, 21, 2),
('Patrick Cutrone', 3, 21, 22, 1),
('Marten de Roon', 3, 8, 23, 2),
('Ousmane Dembélé', 4, 6, 24, 1),
('Gianluigi Donnarumma', 4, 21, 24, 4),
('Marquinhos', 4, 4, 24, 3),
('Vitinha', 4, 2, 24, 2),
('Mason Greenwood', 4, 5, 25, 1),
('Leonardo Balerdi', 4, 9, 25, 3),
('Folarin Balogun', 4, 30, 26, 1),
('Thilo Kehrer', 4, 16, 26, 3),
('Alexandre Lacazette', 4, 6, 27, 1),
('Corentin Tolisso', 4, 6, 27, 2),
('Edinson Cavani', 5, 15, 28, 1),
('Sergio Romero', 5, 9, 28, 4),
('Franco Mastantuono', 5, 9, 29, 2),
('Leandro González Pírez', 5, 9, 29, 3),
('Gabriel Rojas', 5, 9, 30, 3);
