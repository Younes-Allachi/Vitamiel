CREATE TABLE category
(
    id  UUID NOT NULL,
    nom VARCHAR(255),
    CONSTRAINT pk_category PRIMARY KEY (id),
    category_id UUID not null

);
ALTER TABLE category
    ADD CONSTRAINT fk_category FOREIGN KEY (category_id) REFERENCES produit (id);