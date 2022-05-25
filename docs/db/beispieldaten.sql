/*==============================================================*/
/*                   DELETE OLD DATA ON START                   */
/*==============================================================*/
TRUNCATE `Request`;
DELETE FROM `NewCitizenData`; ALTER TABLE `NewCitizenData` AUTO_INCREMENT = 1; /*Truncate not working on this table*/
TRUNCATE `Permits`;
DELETE FROM `Permit`; ALTER TABLE `Permit` AUTO_INCREMENT = 1; /*Truncate not working on this table*/
DELETE FROM `Custody`;
DELETE FROM `Marriage`;
TRUNCATE `RelationshipChange`;
DELETE FROM `Citizen`; ALTER TABLE `Citizen` AUTO_INCREMENT = 1; /*Truncate not working on this table*/

/*==============================================================*/
/*                        INSERT NEW DATA                       */
/*==============================================================*/
insert into Citizen (firstname, lastname, gender, birthname, place_of_birth, birthdate, email, street, housenumber, city_code, city)
values ("Max", "Mustermann", "m", null, "Musterhausen", "1970-02-25", "max@mustermann.de", "Musterweg", "23a", 12345, "Musterstadt"),
("Miriam", "Mustermann", "w", "Musterfrau", "München", "1971-04-12", "miriam@mustermann.de", "Musterweg", "23a", 12345, "Musterstadt"),
("Linda", "Mustermann", "w", null, "Berlin", "2010-08-12", null, "Musterweg", "23a", 12345, "Musterstadt"),
("Hans", "Müller", "m", null, "Paderborn", "1984-12-23", "hans.müller@gmx.de", "Beispielweg", "5", 12345, "Musterstadt"),
("Peter", "Meier", "m", null, "Bielefeld", "1965-08-22", "peter.meier@gmx.de", "Musterstraße", "7", 12345, "Musterstadt"),
("Paul", "Meyer", "m", null, "Madrid", "1955-01-29", "paul.meyer@gmx.de", "Beispielweg", "23", 12345, "Musterstadt"),
("Anna", "Konda", "w", null, "Oslo", "1975-11-02", "anna.konda@gmx.de", "Musterweg", "1", 12345, "Musterstadt"),
("Rita", "Smith", "w", null, "London", "1999-10-29", "rita.smith@gmx.de", "Musterstraße", "2a", 12345, "Musterstadt"),
("Uwe", "Mueller", "m", null, "Lübeck", "1978-06-12", "uwe.mueller@gmx.de", "Musterweg", "25", 12345, "Musterstadt"),
("Ursula", "Schmitt", "w", null, "München", "1976-01-29", "ursula.schmitt@gmx.de", "Beispielweg", "11", 12345, "Musterstadt"),
("Klaus", "Schmidt", "m", null, "Paris", "2001-01-01", "klaus.schmidt@gmx.de", "Musterstraße", "2b", 12345, "Musterstadt"),
("Karin", "Schmidt", "w", null, "Berlin", "1998-05-03", "karin.schmidt@gmx.de", "Beispielweg", "8", 12345, "Musterstadt"),
("Katharina", "Maier", "w", null, "Sylt", "2003-08-19", "katharina.maier@gmx.de", "Musterstraße", "15", 12345, "Musterstadt"),
("Klaus", "Musterfrau", "m", null, "Münster", "1987-01-03", "klaus.musterfrau@gmx.de", "Beispielweg", "4b", 12345, "Musterstadt"),
("Karin", "Musterfrau", "w", null, "Köln", "1981-09-10", "karin.musterfrau@gmx.de", "Musterweg", "8", 12345, "Musterstadt");

insert into Custody (guardian_id, child_id)
values (1, 3),(2, 3);

insert into Permit (title, description)
values ("Baugenehmigung", "Genehmigung für Bauarbeiten am Grundstück des Bürgers"),
("Sachkundenachweis für Hundehalter", "Diese Erlaubnis befähigt den Bürger größere/gefährliche Hunde zu halten.");

insert into Permits (permit_id, citizen_id, date_of_issue, valid_until, status)
values (1, 1, "2009-11-25", "2010-11-25", "offen"),
(2, 1, "2014-01-12", null, "offen");

insert into Marriage (partner_1, partner_2)
values (1, 2),(11, 12),(14, 15);

insert into NewCitizenData(firstname, lastname, street, housenumber, city_code, city)
values("Maximilian", null, null, null, null, null);

insert into Request(citizen_id, citizen_id_new, opened, status, reasoning)
values(1, 1, NOW(), "offen", "Ich möchte meinen Namen ändern.");
