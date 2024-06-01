CREATE TABLE personne
(
    id     UUID NOT NULL,
    nom    VARCHAR(255),
    prenom VARCHAR(255),
    pays   VARCHAR(255),
    CONSTRAINT pk_personne PRIMARY KEY (id)
);