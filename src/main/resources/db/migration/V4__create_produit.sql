CREATE TABLE produit
(
    id          UUID             NOT NULL,
    nom         VARCHAR(255),
    description VARCHAR(255),
    origine     VARCHAR(255),
    poids       DOUBLE PRECISION NOT NULL,
    prix        DOUBLE PRECISION NOT NULL,
    stock_id UUID not null,
    CONSTRAINT pk_produit PRIMARY KEY (id),
    CONSTRAINT fk_stock_id FOREIGN KEY (stock_id) REFERENCES stock (id)

);

