CREATE TABLE produit
(
    id          UUID             NOT NULL,
    nom         VARCHAR(255),
    description VARCHAR(255),
    origine     VARCHAR(255),
    poids       DOUBLE PRECISION NOT NULL,
    prix        DOUBLE PRECISION NOT NULL,
    CONSTRAINT pk_produit PRIMARY KEY (id)
);