CREATE TABLE job
(
    id        UUID    NOT NULL,
    title     VARCHAR(255),
    lieu      VARCHAR(255),
    email     VARCHAR(255),
    telephone VARCHAR(255),
    pays      VARCHAR(255),
    ville     VARCHAR(255),
    debut     date,
    fin       date,
    type      VARCHAR(255),
    contrat   VARCHAR(255),
    langue    VARCHAR(255),
    education VARCHAR(255),
    secteur   VARCHAR(255),
    statut    BOOLEAN NOT NULL,
    CONSTRAINT pk_job PRIMARY KEY (id)
);