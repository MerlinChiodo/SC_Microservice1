insert into Citizen (firstname, lastname, gender, birthname, place_of_birth, birthdate, email, street, housenumber, city_code, city)
values ("Max", "Mustermann", "m", null, "Musterhausen", "1970-02-25", "max@mustermann.de", "Musterweg", "23a", 12345, "Musterstadt"),
("Miriam", "Mustermann", "w", "Musterfrau", "München", "1971-04-12", "miriam@mustermann.de", "Musterweg", "23a", 12345, "Musterstadt"),
("Linda", "Mustermann", "w", null, "München", "2010-08-12", null, "Musterweg", "23a", 12345, "Musterstadt");

insert into Custody (guardian_id, child_id)
values (1, 3),
(2, 3);

insert into Permit (p_title, p_description)
values ("Baugenehmigung", "Genehmigung für Bauarbeiten am Grundstück des Bürgers"),
("Sachkundenachweis für Hundehalter", "Diese Erlaubnis befähigt den Bürger größere/gefährliche Hunde zu halten.");

insert into Permits (permit_id, citizen_id, date_of_issue, valid_until)
values (1, 1, "2009-11-25", "2010-11-25"),
(2, 1, "2014-01-12", null);

insert into Marriage (partner_1, partner_2)
values (1, 2);

insert into Request (r_title, r_description)
values ("Antrag auf Namensänderung", "Ein Antrag zur Änderung des Namens eines Bürgers."),
("Umzug melden", "Ein Antrag zur Änderung der aktuellen Adresse des Bürgers.");

insert into Requests (request_id, citizen_id, opened, closed, status)
values (1, 1, "2022-2-25 14:16:37", null, "OFFEN");
