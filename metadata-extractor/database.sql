CREATE TABLE Author (
  Id   serial,
  AuthorName varchar --UNIQUE
);

ALTER TABLE Author ADD CONSTRAINT pkAuthor PRIMARY KEY (Id);
CREATE INDEX akAuthorName ON Author (AuthorName);

CREATE TABLE Publisher (
  Id              serial,
  PublisherName   varchar NOT NULL,
  License_rights  varchar,
  Data            date NOT NULL
);

ALTER TABLE Publisher ADD CONSTRAINT pkPublisher PRIMARY KEY (Id);
CREATE INDEX akPublisher ON Publisher (Data);

CREATE TABLE  Languages (
  Id serial,
  Language varchar NOT NULL
);

ALTER TABLE Languages ADD CONSTRAINT pkLanguages PRIMARY KEY (Id);

CREATE TABLE Book (
  Id        serial,
  -- Name      varchar NOT NULL,
  -- Title     varchar UNIQUE NOT NULL,
  Title      varchar NOT NULL,
  Subjects   varchar[] NOT NULL,
  PublisherId integer,
  LanguageId  integer
);

ALTER TABLE Book ADD CONSTRAINT pkBook PRIMARY KEY (Id);
CREATE INDEX akBookTitle ON Book (Title);
ALTER TABLE Book ADD CONSTRAINT pkBookPublisherId FOREIGN KEY (PublisherId) REFERENCES Publisher (Id) ON DELETE RESTRICT;
ALTER TABLE Book ADD CONSTRAINT pkBookLanguageId FOREIGN KEY (LanguageId) REFERENCES Languages (Id) ON DELETE RESTRICT;

CREATE TABLE AuthorBook (
  AuthorId integer NOT NULL,
  BookId   integer NOT NULL
);

ALTER TABLE AuthorBook ADD CONSTRAINT pkAuthorBook PRIMARY KEY (AuthorId, BookId);
ALTER TABLE AuthorBook ADD CONSTRAINT fkAuthorBookAuthorId FOREIGN KEY (AuthorId) REFERENCES Author (Id) ON DELETE RESTRICT;
ALTER TABLE AuthorBook ADD CONSTRAINT fkAuthorBookBookId FOREIGN KEY (BookId) REFERENCES Book (Id) ON DELETE RESTRICT;
