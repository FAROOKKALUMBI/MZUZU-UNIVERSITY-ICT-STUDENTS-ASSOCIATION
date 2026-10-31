-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 06, 2019 at 11:09 PM
-- Server version: 10.1.36-MariaDB
-- PHP Version: 5.6.38

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `hostel_management`
--

-- --------------------------------------------------------

--
-- Table structure for table `hostel`
--

CREATE TABLE `hostel` (
  `Building_number` varchar(50) NOT NULL,
  `no_of_rooms` int(50) NOT NULL,
  `no_of_students` varchar(50) NOT NULL,
  `location` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- RELATIONSHIPS FOR TABLE `hostel`:
--

--
-- Dumping data for table `hostel`
--

INSERT INTO `hostel` (`Building_number`, `no_of_rooms`, `no_of_students`, `location`) VALUES
('01kandahar_K1', 20, '40', 'South'),
('02kandahar_K2', 20, '40', 'South'),
('03Community', 16, '32', 'North'),
('04Norah', 30, '60', 'West');

-- --------------------------------------------------------

--
-- Table structure for table `mess`
--

CREATE TABLE `mess` (
  `Mess_Incharge` int(11) NOT NULL,
  `monthly_expenses` int(11) NOT NULL,
  `mess_timing` time DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- RELATIONSHIPS FOR TABLE `mess`:
--

--
-- Dumping data for table `mess`
--

INSERT INTO `mess` (`Mess_Incharge`, `monthly_expenses`, `mess_timing`) VALUES
(1, 102000, '08:30:00'),
(2, 50000, '09:30:00'),
(3, 28000, '09:00:00'),
(4, 70000, '08:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `mess_employee`
--

CREATE TABLE `mess_employee` (
  `Emp_ID` int(11) NOT NULL,
  `Emp_Name` varchar(50) NOT NULL,
  `Address` varchar(50) NOT NULL,
  `phone_number` int(50) NOT NULL,
  `Building_number` varchar(50) DEFAULT NULL,
  `Mess_Incharge` int(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- RELATIONSHIPS FOR TABLE `mess_employee`:
--   `Mess_Incharge`
--       `mess` -> `Mess_Incharge`
--   `Building_number`
--       `hostel` -> `Building_number`
--

--
-- Dumping data for table `mess_employee`
--

INSERT INTO `mess_employee` (`Emp_ID`, `Emp_Name`, `Address`, `phone_number`, `Building_number`, `Mess_Incharge`) VALUES
(1, 'Gladys Chimaliro', '103 Dreamers street', 881463701, '04Norah', 1),
(2, 'Innocent Thomas', '804 four angels high way', 881265381, '03Community', 2),
(3, 'Mimie Sean', 'Mchenga Mchezi four ways', 882563542, '01kandahar_K1', 3),
(4, 'Hendrinah James', '2k/VDA ', 99237453, '02kandahar_K2', 1),
(5, 'Javier Jessica', 'South Victoria', 993625484, '03Community', 4);

-- --------------------------------------------------------

--
-- Table structure for table `room`
--

CREATE TABLE `room` (
  `room_id` int(50) NOT NULL,
  `capacity` int(50) NOT NULL,
  `student_name` varchar(50) NOT NULL,
  `hostel_Building_number` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- RELATIONSHIPS FOR TABLE `room`:
--   `hostel_Building_number`
--       `hostel` -> `Building_number`
--

--
-- Dumping data for table `room`
--

INSERT INTO `room` (`room_id`, `capacity`, `student_name`, `hostel_Building_number`) VALUES
(1, 2, 'Prince James', '01kandahar_K1'),
(2, 2, 'Francis Nsindwa', '01kandahar_K1'),
(3, 3, 'Hadly', '03Community'),
(12, 2, 'Chimwemwe Kajadu', '02kandahar_K2');

-- --------------------------------------------------------

--
-- Table structure for table `student`
--

CREATE TABLE `student` (
  `student_id` int(50) NOT NULL,
  `student_name` varchar(50) NOT NULL,
  `gender` varchar(50) NOT NULL,
  `department` varchar(50) NOT NULL,
  `phone_number` int(50) NOT NULL,
  `age` int(50) NOT NULL,
  `year_level` int(50) NOT NULL,
  `semester_number` int(50) NOT NULL,
  `room_id` int(50) DEFAULT NULL,
  `Building_number` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- RELATIONSHIPS FOR TABLE `student`:
--   `room_id`
--       `room` -> `room_id`
--   `Building_number`
--       `hostel` -> `Building_number`
--

--
-- Dumping data for table `student`
--

INSERT INTO `student` (`student_id`, `student_name`, `gender`, `department`, `phone_number`, `age`, `year_level`, `semester_number`, `room_id`, `Building_number`) VALUES
(1116, 'Hamida Dennis', 'female', 'ICT', 99732637, 19, 3, 5, 12, '04Norah'),
(1216, 'Prince James', 'male', 'ICT', 88742635, 23, 3, 5, 1, '01kandahar_K1'),
(1616, 'Chikondi Shawa', 'female', 'Water', 88842445, 20, 1, 1, 12, '03Community'),
(3216, 'Tiyamike Sharon', 'female', 'Energy', 883426354, 26, 2, 3, 2, '04Norah');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `hostel`
--
ALTER TABLE `hostel`
  ADD PRIMARY KEY (`Building_number`);

--
-- Indexes for table `mess`
--
ALTER TABLE `mess`
  ADD PRIMARY KEY (`Mess_Incharge`);

--
-- Indexes for table `mess_employee`
--
ALTER TABLE `mess_employee`
  ADD PRIMARY KEY (`Emp_ID`),
  ADD KEY `Building_number` (`Building_number`),
  ADD KEY `Mess_Incharge` (`Mess_Incharge`);

--
-- Indexes for table `room`
--
ALTER TABLE `room`
  ADD PRIMARY KEY (`room_id`),
  ADD KEY `fk_room` (`hostel_Building_number`);

--
-- Indexes for table `student`
--
ALTER TABLE `student`
  ADD PRIMARY KEY (`student_id`),
  ADD KEY `room_id` (`room_id`),
  ADD KEY `Building_number` (`Building_number`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `mess_employee`
--
ALTER TABLE `mess_employee`
  ADD CONSTRAINT `mess_employee_ibfk_1` FOREIGN KEY (`Mess_Incharge`) REFERENCES `mess` (`Mess_Incharge`),
  ADD CONSTRAINT `mess_employee_ibfk_2` FOREIGN KEY (`Building_number`) REFERENCES `hostel` (`Building_number`);

--
-- Constraints for table `room`
--
ALTER TABLE `room`
  ADD CONSTRAINT `fk_room` FOREIGN KEY (`hostel_Building_number`) REFERENCES `hostel` (`Building_number`);

--
-- Constraints for table `student`
--
ALTER TABLE `student`
  ADD CONSTRAINT `student_ibfk_1` FOREIGN KEY (`room_id`) REFERENCES `room` (`room_id`),
  ADD CONSTRAINT `student_ibfk_2` FOREIGN KEY (`Building_number`) REFERENCES `hostel` (`Building_number`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
