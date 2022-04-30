# Backend des Bürgerbüros

## Umgebungsvariablen
Das Backend erwartet das folgende Umgebungsvariablen gesetzt sind:
 - HOSTNAME => Host auf dem der nodejs Server gestartet wird
 - PORT => Port auf dem der nodejs Server gestartet wird
 - DB_HOST => Host-Adresse der Datenbank
 - DB_USERNAME => Benutzername zum Anmelden in der Datenbank
 - DB_PASSWORD => Passwort zum Datenbank Benutzer
 - DB_DATABASE => Datenbankschema das genutzt werden soll
 - RABBIT_USERNAME => Benutzername zum Anmelden des RabbitMQ Servers
 - RABBIT_PASSWORD => Passwort zum RabbitMQ Benutzer
 - RABBIT_SERVER_URL => Host-Adresse des RabbitMQ Servers

## Backend Befehle

### setup
install all dependencies by running `npm install`

### start
to start the backend run `npm run start`

### development
start the server in the development environment `npm run dev`  
uses nodemon to autoreload the server on filechanges