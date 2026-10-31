ALTER TABLE Departments
ADD COLUMN HODID INT,
ADD CONSTRAINT fk_hodid_stuffmembers
FOREIGN KEY (HODID) REFERENCES StuffMembers(stuffmemberID);
