CREATE DATABASE Mzuni_DB;

USE Mzuni_DB;

CREATE TABLE departments (
    deptID INT PRIMARY KEY AUTO_INCREMENT,
    deptName VARCHAR(50),
    -- HODID INT,
    deptDesc VARCHAR(255)
    -- FOREIGN KEY (HODID) REFERENCES stuffmembers(stuffmemberID)
);

CREATE TABLE stuffmembers (
    stuffMemberID INT AUTO_INCREMENT PRIMARY KEY,
    firstname VARCHAR(50),
    lastname VARCHAR(50),
    phoneNumber VARCHAR(20),
    email VARCHAR(50),
    position VARCHAR(20),
    salary INT,
    deptID INT,
    FOREIGN KEY (deptID) REFERENCES departments(deptID)
);

CREATE TABLE student (
    studentID VARCHAR(20) PRIMARY KEY,
    firstname VARCHAR(50),
    lastname VARCHAR(50),
    phoneNumber VARCHAR(20),
    email VARCHAR(40),
    dateOfBirth DATE,
    enrollementDate DATE,
    physicalAddress VARCHAR(50),
    deptID INT,
    FOREIGN KEY (deptID) REFERENCES departments(deptID)
);

CREATE TABLE feesPayment (
    feePaymentID INT AUTO_INCREMENT PRIMARY KEY,
    studentID VARCHAR(30),
    amtPaid INT,
    balance INT,
    paymentDate DATE,
    paymentMethod VARCHAR(50),
    FOREIGN KEY (studentID) REFERENCES student(studentID)
);

CREATE TABLE accomodation (
    accomodationID INT AUTO_INCREMENT PRIMARY KEY,
    studentID VARCHAR(20),
    hostelName VARCHAR(50),
    roomNumber INT,
    accomodationFeePayed INT,
    balance INT,
    FOREIGN KEY (studentID) REFERENCES student(studentID)
);

CREATE TABLE courses (
    courseID INT AUTO_INCREMENT PRIMARY KEY,
    courseName VARCHAR(80),
    deptID INT,
    tutorID INT,
    creditHours INT,
    FOREIGN KEY (deptID) REFERENCES departments(deptID), 
    FOREIGN KEY (tutorID) REFERENCES stuffmembers(stuffmemberID)
);

CREATE TABLE enrollment (
    enrollmentID INT AUTO_INCREMENT PRIMARY KEY,
    studentID VARCHAR(20),
    courseID INT,
    gradeID INT,
    courseEnrollementDate DATE,
    FOREIGN KEY (studentID) REFERENCES student(studentID),
    FOREIGN KEY (courseID) REFERENCES courses(courseID),
    FOREIGN KEY (gradeID) REFERENCES grades(gradeID)
);

CREATE TABLE grades (
    gradeID INT AUTO_INCREMENT PRIMARY KEY,
    studentID VARCHAR(20),
    courseID INT,
    gradeValue INT,
    remarks VARCHAR(50),
    FOREIGN KEY (studentID) REFERENCES student(studentID),
    FOREIGN KEY (courseID) REFERENCES courses(courseID)
);

