CREATE TABLE stock
(
    id       UUID             NOT NULL,
    nom      VARCHAR(255),
    prix     DOUBLE PRECISION NOT NULL,
    quantite INT              NOT NULL,
    CONSTRAINT pk_stock PRIMARY KEY (id)
);

INSERT INTO stock (id, nom, prix, quantite) VALUES
    ('1e73f7c2-67e6-4f3b-bd24-cf47dd66b6d7', 'Produit A', 10.99, 100);

