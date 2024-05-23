CREATE TABLE vitamiel
(
    id UUID  Not Null,
    nom VARCHAR(30) NOT NULL,
    adresse VARCHAR(30) NOT NULL,
    email VARCHAR(30) NOT NULL,
    telephone VARCHAR(30) NOT NULL,
    pays VARCHAR(30) NOT NULL,
    CONSTRAINT pk_vitamiel PRIMARY KEY (id)

);
INSERT INTO vitamiel (id, nom, adresse, email, telephone, pays)
VALUES ('04ece6ce-2690-4152-a5c9-09d40d5891b7', 'Vitamiel', ' Rue royale 123', 'vitamiel@hotmail.com', '04205060',
        'Belgique');