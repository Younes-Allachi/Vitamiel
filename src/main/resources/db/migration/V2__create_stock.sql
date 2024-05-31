CREATE TABLE stock
(
    id       UUID             NOT NULL,
    nom      VARCHAR(255),
    quantite INT              NOT NULL,
    CONSTRAINT pk_stock PRIMARY KEY (id)
);

INSERT INTO stock (id, nom, quantite) VALUES
('1e73f7c2-67e6-4f3b-bd24-cf47dd66b6d7', 'Produit A', 100);

