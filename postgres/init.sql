CREATE TABLE Stonks (
  id integer NOT NULL PRIMARY KEY,
  address char(64) NOT NULL,
  name TEXT NOT NULL,
  SYMBOL TEXT NOT NULL,
  denom int NOT NULL
);

CREATE TABLE UserStonks (
  user_address char(64) NOT NULL,
  stonk_id int NOT NULL,
  balance int NOT NULL,
  PRIMARY KEY (user_address, stonk_id),
  FOREIGN KEY (stonk_id) REFERENCES Stonks(id)
);

CREATE TABLE UserSpendingPower (
  user_address char(64) NOT NULL PRIMARY KEY,
  spending_power int NOT NULL
);
