-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               10.1.28-MariaDB - mariadb.org binary distribution
-- Server OS:                    Win32
-- HeidiSQL Version:             10.1.0.5464
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- Dumping database structure for hrpanel
CREATE DATABASE IF NOT EXISTS `hrpanel` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `hrpanel`;

-- Dumping structure for table hrpanel.departments
CREATE TABLE IF NOT EXISTS `departments` (
  `idDept` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `deptName` text NOT NULL,
  PRIMARY KEY (`idDept`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Data exporting was unselected.
-- Dumping structure for table hrpanel.employees
CREATE TABLE IF NOT EXISTS `employees` (
  `idEmployee` int(11) NOT NULL AUTO_INCREMENT,
  `firstname` text NOT NULL,
  `lastname` text NOT NULL,
  `addrStreet` text,
  `addrPostalCode` int(11) DEFAULT NULL,
  `addrCity` text,
  `idDept` int(11) unsigned NOT NULL,
  PRIMARY KEY (`idEmployee`),
  KEY `fk_idDept` (`idDept`),
  CONSTRAINT `fk_idDept` FOREIGN KEY (`idDept`) REFERENCES `departments` (`idDept`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Data exporting was unselected.
-- Dumping structure for table hrpanel.users
CREATE TABLE IF NOT EXISTS `users` (
  `idUser` int(11) NOT NULL AUTO_INCREMENT,
  `email` text NOT NULL,
  `password` text NOT NULL,
  `permLevel` enum('1','2','3') NOT NULL DEFAULT '1',
  `lastLogin` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`idUser`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE USER IF NOT EXISTS 'adminpanel'@'localhost' IDENTIFIED BY 'adminpanelpassword';
GRANT ALL PRIVILEGES ON hrpanel.* TO 'adminpanel'@'localhost';
FLUSH PRIVILEGES;

-- Default department
INSERT INTO `hrpanel`.`departments` (`deptName`) VALUES ('Non-défini');

-- Default admin user, password is "admin"
INSERT INTO `hrpanel`.`users` (`email`, `password`, `permLevel`) VALUES ('admin@localhost.com', '8C6976E5B5410415BDE908BD4DEE15DFB167A9C873FC4BB8A81F6F2AB448A918', '3');

-- Data exporting was unselected.
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
