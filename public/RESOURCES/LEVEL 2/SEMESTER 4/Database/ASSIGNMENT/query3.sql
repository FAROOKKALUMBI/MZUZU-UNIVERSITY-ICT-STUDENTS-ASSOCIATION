-- Create Books Table
CREATE TABLE Books (
    ISBN INT PRIMARY KEY,
    Title VARCHAR(100),
    AuthorName VARCHAR(100),
    Genre VARCHAR(50),
    PublicationDate DATE,
    CopiesAvailable INT
);

-- Create Loans Table
CREATE TABLE Loans (
    LoanID INT PRIMARY KEY,
    ISBN INT,
    studentID varchar(20),
    LibrarianID INT,
    LoanDate DATE,
    ReturnDate DATE,
    FOREIGN KEY (ISBN) REFERENCES Books(ISBN),
    FOREIGN KEY (LibrarianID) REFERENCES stuffmembers(stuffMemberID),
    FOREIGN KEY (studentID) REFERENCES student(studentID)
);
