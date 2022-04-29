insert into CITIZEN (citizen_id, firstname, lastname, gender, birthname, place_of_birth, birthdate, email, street, housenumber, city_code, city)
values ('aaaaa', 'Max', 'Mustermann', 'm', null, 'Musterhausen', '1970-02-25', 'max@mustermann.de', 'Musterweg', '23a', 12345, 'Musterstadt'),
('bbbbb', 'Miriam', 'Mustermann', 'w', 'Musterfrau', 'München', '1971-04-12', 'miriam@mustermann.de', 'Musterweg', '23a', 12345, 'Musterstadt'),
('ccccc', 'Linda', 'Mustermann', 'w', null, 'München', '2010-08-12', null, 'Musterweg', '23a', 12345, 'Musterstadt');

insert into CUSTODY (guardian_id, child_id)
values ('aaaaa', 'ccccc'),
('bbbbb', 'ccccc');

insert into PERMIT (p_title, p_description)
values ('Baugenehmigung', 'Genehmigung für Bauarbeiten am Grundstück des Bürgers'),
('Sachkundenachweis für Hundehalter', 'Diese Erlaubnis befähigt den Bürger größere/gefährliche Hunde zu halten.');

insert into PERMITS (permit_id, citizen_id, date_of_issue, valid_until)
values (1, 'aaaaa', '2009-11-25', null);

insert into MARRIAGE (partner_1, partner_2)
values ('aaaaa', 'bbbbb');

insert into REQUEST (r_title, r_description)
values ('Antrag auf Namensänderung', 'Ein Antrag zur Änderung des Namens eines Bürgers.'),
('Umzug melden', 'Ein Antrag zur Änderung der aktuellen Adresse des Bürgers.');

insert into REQUESTS (request_id, citizen_id, opened, closed, status)
values (1, 'aaaaa', '2022-2-25 14:16:37', null, 'OFFEN');
