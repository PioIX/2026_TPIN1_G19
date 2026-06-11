CREATE TABLE IF NOT EXISTS Usuarios(
    dni INT AUTO_INCREMENT UNIQUE NOT NULL,
    nombre VARCHAR(255),
    cont VARCHAR(255),
    is_admin BOOL(255),
    PRIMARY KEY (dni)
);

CREATE TABLE Partidas(
    id INT AUTO_INCREMENT UNIQUE NOT NULL,
    puntaje int,
    rondas int,
    fallidas int,
    dni int,  
    PRIMARY KEY (id),
    FOREIGN KEY (dni) REFERENCES Usuarios(dni)
);

CREATE TABLE Jugadores(
    id_jugador INT AUTO_INCREMENT UNIQUE NOT NULL,
    liga VARCHAR(255),
    equipo VARCHAR(255),
    pais VARCHAR(255),
    posicion VARCHAR(255),
    nombre VARCHAR(255)

INSERT INTO Usuarios(nombre, cont, is_admin) VALUES 
('agustinp', 'eloso', TRUE),
('agustinf', 'liniers', TRUE),
('facug', 'tanque', TRUE),
('bautim', 'boquita', TRUE)

INSERT INTO Partidas(puntaje, rondas, fallidas, dni) VALUES 
();

INSERT INTO Jugadores(liga, equipo, pais, posicion, nombre) VALUES 

('Premier League', 'Man City', 'Noruega', 'Delantero', 'Erling Haaland')
('Premier League', 'Man City', 'Portugal', 'Mediocampista', 'Bernardo Silva')
('Premier League', 'Man City', 'España', 'Mediocampista', 'Rodri Hernández')
('Premier League', 'Man City', 'Portugal', 'Defensor', 'Rúben Dias')
('Premier League', 'Man City', 'Brasil', 'Arquero', 'Ederson Moraes')
('Premier League', 'Arsenal', 'Inglaterra', 'Mediocampista', 'Declan Rice')
('Premier League', 'Arsenal', 'Inglaterra', 'Delantero', 'Bukayo Saka')
('Premier League', 'Arsenal', 'Noruega', 'Mediocampista', 'Martin Ødegaard')
('Premier League', 'Arsenal', 'Francia', 'Defensor', 'William Saliba')
('Premier League', 'Arsenal', 'Brasil', 'Defensor', 'Gabriel Magalhães')
('Premier League', 'Liverpool', 'Egipto', 'Delantero', 'Mohamed Salah')
('Premier League', 'Liverpool', 'Países Bajos', 'Defensor', 'Virgil van Dijk')
('Premier League', 'Liverpool', 'Argentina', 'Mediocampista', 'Alexis Mac Allister')
('Premier League', 'Liverpool', 'Francia', 'Delantero', 'Hugo Ekitike')
('Premier League', 'Liverpool', 'Brasil', 'Arquero', 'Alisson Becker')
('Premier League', 'Chelsea', 'Inglaterra', 'Mediocampista', 'Cole Palmer')
('Premier League', 'Chelsea', 'Ecuador', 'Mediocampista', 'Moisés Caicedo')
('Premier League', 'Chelsea', 'Argentina', 'Mediocampista', 'Enzo Fernández')
('Premier League', 'Chelsea', 'Francia', 'Delantero', 'Pedro Neto')
('Premier League', 'Chelsea', 'España', 'Defensor', 'Marc Cucurella')
('Premier League', 'Man United', 'Portugal', 'Mediocampista', 'Bruno Fernandes')
('Premier League', 'Man United', 'Camerún', 'Delantero', 'Bryan Mbeumo')
('Premier League', 'Man United', 'Argentina', 'Defensor', 'Lisandro Martínez')
('Premier League', 'Man United', 'Brasil', 'Delantero', 'Matheus Cunha')
('Premier League', 'Man United', 'Bélgica', 'Arquero', 'Senne Lamens')
('Premier League', 'Tottenham', 'Inglaterra', 'Delantero', 'Dominik Solanke')
('Premier League', 'Tottenham', 'Inglaterra', 'Mediocampista', 'James Maddison')
('Premier League', 'Tottenham', 'Argentina', 'Defensor', 'Cristian Romero')
('Premier League', 'Aston Villa', 'Argentina', 'Arquero', 'Emiliano Martínez')
('Premier League', 'Aston Villa', 'Inglaterra', 'Delantero', 'Ollie Watkins')
('Premier League', 'Aston Villa', 'Bélgica', 'Mediocampista', 'Youri Tielemans')
('Premier League', 'Liverpool', 'Suecia', 'Delantero', 'Alexander Isak')
('Premier League', 'Newcastle', 'Brasil', 'Mediocampista', 'Bruno Guimarães')
('Premier League', 'Brighton', 'Japón', 'Delantero', 'Kaoru Mitoma')
('Premier League', 'West Ham', 'Inglaterra', 'Delantero', 'Jarrod Bowen')
('La Liga', 'Real Madrid', 'Francia', 'Delantero', 'Kylian Mbappé')
('La Liga', 'Real Madrid', 'Inglaterra', 'Mediocampista', 'Jude Bellingham')
('La Liga', 'Real Madrid', 'Brasil', 'Delantero', 'Vinícius Júnior')
('La Liga', 'Real Madrid', 'Uruguay', 'Mediocampista', 'Federico Valverde')
('La Liga', 'Real Madrid', 'Brasil', 'Delantero', 'Rodrygo Goes')
('La Liga', 'Real Madrid', 'Francia', 'Mediocampista', 'Eduardo Camavinga')
('La Liga', 'Real Madrid', 'Alemania', 'Defensor', 'Antonio Rüdiger')
('La Liga', 'Real Madrid', 'Bélgica', 'Arquero', 'Thibaut Courtois')
('La Liga', 'Barcelona', 'España', 'Delantero', 'Ferran Torres')
('La Liga', 'Barcelona', 'España', 'Delantero', 'Lamine Yamal')
('La Liga', 'Barcelona', 'España', 'Mediocampista', 'Pedri González')
('La Liga', 'Barcelona', 'España', 'Mediocampista', 'Gavi Páez')
('La Liga', 'Barcelona', 'Países Bajos', 'Mediocampista', 'Frenkie de Jong')
('La Liga', 'Barcelona', 'Uruguay', 'Defensor', 'Ronald Araújo')
('La Liga', 'Barcelona', 'España', 'Arquero', 'Joan García')
('La Liga', 'Atlético Madrid', 'Noruega', 'Delantero', 'Alexander Sorloth')
('La Liga', 'Atlético Madrid', 'Argentina', 'Delantero', 'Julián Álvarez')
('La Liga', 'Atlético Madrid', 'Argentina', 'Mediocampista', 'Thiago Almada')
('La Liga', 'Atlético Madrid', 'Eslovenia', 'Arquero', 'Jan Oblak')
('La Liga', 'Athletic Bilbao', 'España', 'Delantero', 'Nico Williams')
('La Liga', 'Athletic Bilbao', 'Ghana', 'Delantero', 'Iñaki Williams')
('La Liga', 'Real Sociedad', 'Japón', 'Mediocampista', 'Takefusa Kubo')
('La Liga', 'Barcelona', 'Brasil', 'Delantero', 'Raphinha')
('La Liga', 'Girona', 'Ucrania', 'Delantero', 'Viktor Tsygankov')
('La Liga', 'Real Madrid', 'Alemania', 'Defensor', 'Antonio Rudiger')
('Serie A', 'Inter', 'Argentina', 'Delantero', 'Lautaro Martínez')
('Serie A', 'Inter', 'Italia', 'Mediocampista', 'Nicolò Barella')
('Serie A', 'Inter', 'Turquía', 'Mediocampista', 'Hakan Çalhanoğlu')
('Serie A', 'Inter', 'Italia', 'Defensor', 'Alessandro Bastoni')
('Serie A', 'Inter', 'Suiza', 'Arquero', 'Yann Sommer')
('Serie A', 'Juventus', 'Serbia', 'Delantero', 'Dušan Vlahović')
('Serie A', 'Juventus', 'Turquía', 'Delantero', 'Kenan Yıldız')
('Serie A', 'Juventus', 'Brasil', 'Defensor', 'Bremer Silva')
('Serie A', 'Juventus', 'Italia', 'Mediocampista', 'Manuel Locatelli')
('Serie A', 'Milan', 'Portugal', 'Delantero', 'Rafael Leão')
('Serie A', 'Milan', 'Francia', 'Defensor', 'Kalulu')
('Serie A', 'Milan', 'Estados Unidos', 'Delantero', 'Christian Pulisic')
('Serie A', 'Milan', 'Francia', 'Arquero', 'Mike Maignan')
('Serie A', 'Napoli', 'Bélgica', 'Delantero', 'Romelu Lukaku')
('Serie A', 'Napoli', 'Italia', 'Defensor', 'Giovanni Di Lorenzo')
('Serie A', 'Roma', 'Argentina', 'Delantero', 'Paulo Dybala')
('Serie A', 'Roma', 'Italia', 'Mediocampista', 'Bryan Cristante')
('Serie A', 'Como', 'Argentina', 'Mediocampista', 'Nico Paz')
('Serie A', 'Atalanta', 'Italia', 'Delantero', 'Gianluca Scamacca')
('Serie A', 'Como', 'Argentina', 'Mediocampista', 'Máximo Perrone')
('Liga Francesa', 'Psg', 'Francia', 'Mediocampista', 'Warren Zaïre-Emery')
('Liga Francesa', 'Psg', 'Francia', 'Delantero', 'Ousmane Dembélé')
('Liga Francesa', 'Psg', 'Portugal', 'Mediocampista', 'Vitinha Ferreira')
('Liga Francesa', 'Psg', 'Marruecos', 'Defensor', 'Achraf Hakimi')
('Liga Francesa', 'Psg', 'Brasil', 'Defensor', 'Marquinhos Correa')
('Liga Francesa', 'Psg', 'Italia', 'Arquero', 'Gianluigi Donnarumma')
('Liga Francesa', 'Marseille', 'Inglaterra', 'Delantero', 'Mason Greenwood')
('Liga Francesa', 'Monaco', 'Suiza', 'Mediocampista', 'Denis Zakaria')
('Liga Francesa', 'Psg', 'Ecuador', 'Defensor', 'William Pacho')
('Liga Francesa', 'Lyon', 'Francia', 'Delantero', 'Alexandre Lacazette')
('Liga Argentina', 'Boca Juniors', 'Uruguay', 'Delantero', 'Edinson Cavani')
('Liga Argentina', 'Boca Juniors', 'Argentina', 'Mediocampista', 'Tomás Aranda')
('Liga Argentina', 'Boca Juniors', 'Argentina', 'Defensor', 'Lautaro Di Lollo')
('Liga Argentina', 'River Plate', 'Argentina', 'Mediocampista', 'Fausto Vera')
('Liga Argentina', 'River Plate', 'Argentina', 'Defensor', 'Germán Pezzella')
('Liga Argentina', 'Racing Club', 'Argentina', 'Delantero', 'Adrián Martínez')
('Liga Argentina', 'Racing Club', 'Colombia', 'Delantero', 'Luis Vergara')
('Liga Argentina', 'Independiente', 'Argentina', 'Mediocampista', 'Iván Marcone')
('Liga Argentina', 'San Lorenzo', 'Argentina', 'Mediocampista', 'Facundo Gulli')
('Liga Argentina', 'Estudiantes LP', 'Argentina', 'Mediocampista', 'Mikel Amondaraín')