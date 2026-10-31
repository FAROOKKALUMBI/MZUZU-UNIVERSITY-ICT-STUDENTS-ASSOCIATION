-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Jan 13, 2023 at 11:48 AM
-- Server version: 5.7.36
-- PHP Version: 7.4.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `workson`
--

-- --------------------------------------------------------

--
-- Table structure for table `department`
--

DROP TABLE IF EXISTS `department`;
CREATE TABLE IF NOT EXISTS `department` (
  `Department_No` varchar(2) NOT NULL,
  `Department_Name` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`Department_No`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `employee`
--

DROP TABLE IF EXISTS `employee`;
CREATE TABLE IF NOT EXISTS `employee` (
  `Emp_No` varchar(6) NOT NULL,
  `Emp_Name` varchar(20) DEFAULT NULL,
  `B_Date` date DEFAULT NULL,
  `Title` varchar(50) DEFAULT NULL,
  `Salary` int(25) DEFAULT NULL,
  `Department_No` varchar(2) DEFAULT NULL,
  PRIMARY KEY (`Emp_No`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `projects`
--

DROP TABLE IF EXISTS `projects`;
CREATE TABLE IF NOT EXISTS `projects` (
  `Proj_No` varchar(2) NOT NULL,
  `Proj_Name` char(20) DEFAULT NULL,
  `Budget` int(25) DEFAULT NULL,
  `Department_No` varchar(2) DEFAULT NULL,
  PRIMARY KEY (`Proj_No`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `workson`
--

DROP TABLE IF EXISTS `workson`;
CREATE TABLE IF NOT EXISTS `workson` (
  `Emp_No` varchar(10) DEFAULT NULL,
  `Proj_No` varchar(2) DEFAULT NULL,
  `Responsibility` char(30) DEFAULT NULL,
  `Hours` int(2) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
