SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;


CREATE TABLE `post` (
  `_pid` int(10) NOT NULL,
  `post_title` text NOT NULL,
  `post_content` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

INSERT INTO `post` (`_pid`, `post_title`, `post_content`) VALUES
(24, 'Lorem ipsum', 'Lorem ipsum'),
(25, 'Lorem ipsum', 'Lorem ipsum'),
(26, 'Lorem ipsum', 'Lorem ipsum'),
(27, 'Lorem ipsum', 'Lorem ipsum'),
(28, 'Lorem ipsum', 'Lorem ipsum'),
(29, 'Lorem ipsum', 'Lorem ipsum'),
(30, 'Lorem ipsum', 'Lorem ipsum'),
(31, 'Lorem ipsum', 'Lorem ipsum'),
(32, 'Lorem ipsum', 'Lorem ipsum'),
(33, 'Lorem ipsum', 'Lorem ipsum');


ALTER TABLE `post`
  ADD PRIMARY KEY (`_pid`);


ALTER TABLE `post`
  MODIFY `_pid` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
