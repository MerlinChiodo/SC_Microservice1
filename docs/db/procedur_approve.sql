DROP PROCEDURE `ApproveRequest`;

DELIMITER // 

-- CREATE PROCEDURE `ApproveRequest`(IN request_id INT) BEGIN
CREATE DEFINER=`Tristan`@`%` PROCEDURE `ApproveRequest`(IN `request_id` INT) NOT DETERMINISTIC MODIFIES SQL DATA SQL SECURITY DEFINER BEGIN

DECLARE citizen_id INT DEFAULT 0;
DECLARE citizen_id_new INT DEFAULT 0;
DECLARE firstname varchar(100) DEFAULT NULL;
DECLARE lastname varchar(100) DEFAULT NULL;
DECLARE street varchar(100) DEFAULT NULL;
DECLARE housenumber varchar(5) DEFAULT NULL;
DECLARE city_code int DEFAULT NULL;
DECLARE city varchar(100) DEFAULT NULL;

SELECT
    `Request`.`citizen_id`,
    `NewCitizenData`.`firstname`,
    `NewCitizenData`.`lastname`,
    `NewCitizenData`.`street`,
    `NewCitizenData`.`housenumber`,
    `NewCitizenData`.`city_code`,
    `NewCitizenData`.`city` 
INTO citizen_id, firstname, lastname, street, housenumber, city_code, city
FROM `Request`
JOIN `NewCitizenData` ON `Request`.`citizen_id_new` = `NewCitizenData`.`citizen_id_new`
WHERE `Request`.`request_id` = request_id
LIMIT 1;

IF firstname IS NOT NULL THEN
    UPDATE `Citizen` SET `firstname` = firstname WHERE `Citizen`.`citizen_id` = citizen_id;
END IF;

IF lastname IS NOT NULL THEN
    UPDATE `Citizen` SET `lastname` = lastname WHERE `Citizen`.`citizen_id` = citizen_id;
END IF;

IF street IS NOT NULL THEN
    UPDATE `Citizen` SET `street` = street WHERE `Citizen`.`citizen_id` = citizen_id;
END IF;

IF housenumber IS NOT NULL THEN
    UPDATE `Citizen` SET `housenumber` = housenumber WHERE `Citizen`.`citizen_id` = citizen_id;
END IF;

IF city_code IS NOT NULL THEN
    UPDATE `Citizen` SET `city_code` = city_code WHERE `Citizen`.`citizen_id` = citizen_id;
END IF;

IF city IS NOT NULL THEN
    UPDATE `Citizen` SET `city` = city WHERE `Citizen`.`citizen_id` = citizen_id;
END IF;

UPDATE `Request` SET `status` = 'angenommen', `closed` = NOW() WHERE `Request`.`request_id` = request_id;

END //
DELIMITER ;