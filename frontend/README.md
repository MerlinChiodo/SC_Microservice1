# Frontend des Bürgerbüros

## Frontend Befehle
Die Befehle müssen im Ordner *frontend* ausgeführt werden.

### `npm start`
Startet das Frontend im Entwicklungsmodus.  
Rufe [http://localhost:3000](http://localhost:3000) im Browser auf, um die Seite anzusehen.  
  
Die Seite wird, bei Änderungen am Sourcecode, automatisch neugeladen.

### `npm test`
Startet alle Tests die im Frontend gefunden werden konnten.

### `npm run build`
Baut das Projekt im `build` Ordner.  
Mit der Umgebungsvariable `BUILD_PATH="../public"` wird das Projekt in dem *public* Ordner gebaut, damit das Backend darauf zugreifen kann.
