SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;


CREATE TABLE `account` (
  `_aid` int(10) UNSIGNED ZEROFILL NOT NULL,
  `lastName` text NOT NULL,
  `firstName` text NOT NULL,
  `birthday` text NOT NULL,
  `gender` varchar(10) NOT NULL,
  `address` text NOT NULL,
  `emailAddress` text NOT NULL,
  `contactNo` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `account` (`_aid`, `lastName`, `firstName`, `birthday`, `gender`, `address`, `emailAddress`, `contactNo`) VALUES
(0000000002, 'a', 'n', '2005', 'c', 'd', 'd@gmail.com', '3'),
(0000000003, 'w', 'a', '2023-12-09', 'a', 'a', 'a@gmail.coma', '2'),
(0000000005, 'w', 'a', '2023-12-09', 'a', 'a', 'a@gmail.coma', '2'),
(0000000006, 'w', 'a', '2023-12-09', 'a', 'a', 'a@gmail.coma', '2'),
(0000000007, 'w', 'a', '2023-12-09', 'a', 'a', 'a@gmail.coma', '2'),
(0000000010, 'test', 'test', '2023-12-15', 'test', 'test', 'mrepol742@gmail.com', '3333'),
(0000000011, 'wow', 'android', '2023-12-15', 'test', 'test', 'mrepol742@gmail.com', '3333'),
(0000000016, 'a', 'a', '2023-12-16', 'Female', 'a', 'a@gmail.coma', '0'),
(0000000017, 'a', 'a', '2023-12-16', 'Female', 'a', 'a@gmail.coma', '0'),
(0000000018, 'a', 'a', '2023-12-16', 'Female', 'a', 'a@gmail.coma', '0'),
(0000000019, 'a', 'a', '2023-12-16', 'Other', 'a', 'a@gmail.coma', '111'),
(0000000020, 'a', 'a', '2023-12-16', 'Other', 'a', 'a@gmail.coma', '111'),
(0000000021, 'a', 'a', '2023-12-16', 'Other', 'a', 'a@gmail.coma', '111');


ALTER TABLE `account`
  ADD PRIMARY KEY (`_aid`);


ALTER TABLE `account`
  MODIFY `_aid` int(10) UNSIGNED ZEROFILL NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
