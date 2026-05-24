/*M!999999\- enable the sandbox mode */ 
-- MariaDB dump 10.19-12.2.2-MariaDB, for Win64 (AMD64)
--
-- Host: localhost    Database: theatre_booking
-- ------------------------------------------------------
-- Server version	12.2.2-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*M!100616 SET @OLD_NOTE_VERBOSITY=@@NOTE_VERBOSITY, NOTE_VERBOSITY=0 */;

--
-- Table structure for table `reservation_seats`
--

DROP TABLE IF EXISTS `reservation_seats`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `reservation_seats` (
  `reservation_seat_id` int(11) NOT NULL AUTO_INCREMENT,
  `reservation_id` int(11) NOT NULL,
  `seat_id` int(11) NOT NULL,
  PRIMARY KEY (`reservation_seat_id`),
  KEY `reservation_id` (`reservation_id`),
  KEY `seat_id` (`seat_id`),
  CONSTRAINT `1` FOREIGN KEY (`reservation_id`) REFERENCES `reservations` (`reservation_id`),
  CONSTRAINT `2` FOREIGN KEY (`seat_id`) REFERENCES `seats` (`seat_id`)
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reservation_seats`
--

SET @OLD_AUTOCOMMIT=@@AUTOCOMMIT, @@AUTOCOMMIT=0;
LOCK TABLES `reservation_seats` WRITE;
/*!40000 ALTER TABLE `reservation_seats` DISABLE KEYS */;
/*!40000 ALTER TABLE `reservation_seats` ENABLE KEYS */;
UNLOCK TABLES;
COMMIT;
SET AUTOCOMMIT=@OLD_AUTOCOMMIT;

--
-- Table structure for table `reservations`
--

DROP TABLE IF EXISTS `reservations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `reservations` (
  `reservation_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `showtime_id` int(11) DEFAULT NULL,
  `total_price` decimal(10,2) DEFAULT NULL,
  `status` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`reservation_id`),
  KEY `user_id` (`user_id`),
  KEY `showtime_id` (`showtime_id`),
  CONSTRAINT `1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  CONSTRAINT `2` FOREIGN KEY (`showtime_id`) REFERENCES `showtimes` (`showtime_id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reservations`
--

SET @OLD_AUTOCOMMIT=@@AUTOCOMMIT, @@AUTOCOMMIT=0;
LOCK TABLES `reservations` WRITE;
/*!40000 ALTER TABLE `reservations` DISABLE KEYS */;
INSERT INTO `reservations` VALUES
(10,2,1,20.00,'cancelled'),
(11,2,1,10.00,'cancelled'),
(12,2,1,10.00,'cancelled'),
(13,2,1,10.00,'cancelled'),
(14,2,1,10.00,'cancelled'),
(15,2,5,40.00,'cancelled'),
(16,5,1,10.00,'cancelled'),
(17,5,1,10.00,'cancelled'),
(18,2,1,36.00,'cancelled'),
(19,2,1,36.00,'cancelled'),
(20,6,1,36.00,'cancelled'),
(21,6,1,36.00,'cancelled'),
(22,6,3,16.00,'cancelled');
/*!40000 ALTER TABLE `reservations` ENABLE KEYS */;
UNLOCK TABLES;
COMMIT;
SET AUTOCOMMIT=@OLD_AUTOCOMMIT;

--
-- Table structure for table `seats`
--

DROP TABLE IF EXISTS `seats`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `seats` (
  `seat_id` int(11) NOT NULL AUTO_INCREMENT,
  `showtime_id` int(11) DEFAULT NULL,
  `row_label` varchar(10) DEFAULT NULL,
  `seat_number` int(11) DEFAULT NULL,
  `category` varchar(30) DEFAULT NULL,
  `is_reserved` tinyint(1) DEFAULT 0,
  PRIMARY KEY (`seat_id`),
  KEY `showtime_id` (`showtime_id`),
  CONSTRAINT `1` FOREIGN KEY (`showtime_id`) REFERENCES `showtimes` (`showtime_id`)
) ENGINE=InnoDB AUTO_INCREMENT=310 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `seats`
--

SET @OLD_AUTOCOMMIT=@@AUTOCOMMIT, @@AUTOCOMMIT=0;
LOCK TABLES `seats` WRITE;
/*!40000 ALTER TABLE `seats` DISABLE KEYS */;
INSERT INTO `seats` VALUES
(60,1,'A',1,'VIP',0),
(61,2,'A',1,'VIP',0),
(62,3,'A',1,'VIP',0),
(63,4,'A',1,'VIP',0),
(64,5,'A',1,'VIP',0),
(65,1,'A',2,'VIP',0),
(66,2,'A',2,'VIP',0),
(67,3,'A',2,'VIP',0),
(68,4,'A',2,'VIP',0),
(69,5,'A',2,'VIP',0),
(70,1,'A',3,'VIP',0),
(71,2,'A',3,'VIP',0),
(72,3,'A',3,'VIP',0),
(73,4,'A',3,'VIP',0),
(74,5,'A',3,'VIP',0),
(75,1,'A',4,'VIP',0),
(76,2,'A',4,'VIP',0),
(77,3,'A',4,'VIP',0),
(78,4,'A',4,'VIP',0),
(79,5,'A',4,'VIP',0),
(80,1,'A',5,'VIP',0),
(81,2,'A',5,'VIP',0),
(82,3,'A',5,'VIP',0),
(83,4,'A',5,'VIP',0),
(84,5,'A',5,'VIP',0),
(85,1,'A',6,'VIP',0),
(86,2,'A',6,'VIP',0),
(87,3,'A',6,'VIP',0),
(88,4,'A',6,'VIP',0),
(89,5,'A',6,'VIP',0),
(90,1,'A',7,'VIP',0),
(91,2,'A',7,'VIP',0),
(92,3,'A',7,'VIP',0),
(93,4,'A',7,'VIP',0),
(94,5,'A',7,'VIP',0),
(95,1,'A',8,'VIP',0),
(96,2,'A',8,'VIP',0),
(97,3,'A',8,'VIP',0),
(98,4,'A',8,'VIP',0),
(99,5,'A',8,'VIP',0),
(100,1,'A',9,'VIP',0),
(101,2,'A',9,'VIP',0),
(102,3,'A',9,'VIP',0),
(103,4,'A',9,'VIP',0),
(104,5,'A',9,'VIP',0),
(105,1,'A',10,'VIP',0),
(106,2,'A',10,'VIP',0),
(107,3,'A',10,'VIP',0),
(108,4,'A',10,'VIP',0),
(109,5,'A',10,'VIP',0),
(110,1,'B',1,'VIP',0),
(111,2,'B',1,'VIP',0),
(112,3,'B',1,'VIP',0),
(113,4,'B',1,'VIP',0),
(114,5,'B',1,'VIP',0),
(115,1,'B',2,'VIP',0),
(116,2,'B',2,'VIP',0),
(117,3,'B',2,'VIP',0),
(118,4,'B',2,'VIP',0),
(119,5,'B',2,'VIP',0),
(120,1,'B',3,'VIP',0),
(121,2,'B',3,'VIP',0),
(122,3,'B',3,'VIP',0),
(123,4,'B',3,'VIP',0),
(124,5,'B',3,'VIP',0),
(125,1,'B',4,'VIP',0),
(126,2,'B',4,'VIP',0),
(127,3,'B',4,'VIP',0),
(128,4,'B',4,'VIP',0),
(129,5,'B',4,'VIP',0),
(130,1,'B',5,'VIP',0),
(131,2,'B',5,'VIP',0),
(132,3,'B',5,'VIP',0),
(133,4,'B',5,'VIP',0),
(134,5,'B',5,'VIP',0),
(135,1,'B',6,'VIP',0),
(136,2,'B',6,'VIP',0),
(137,3,'B',6,'VIP',0),
(138,4,'B',6,'VIP',0),
(139,5,'B',6,'VIP',0),
(140,1,'B',7,'VIP',0),
(141,2,'B',7,'VIP',0),
(142,3,'B',7,'VIP',0),
(143,4,'B',7,'VIP',0),
(144,5,'B',7,'VIP',0),
(145,1,'B',8,'VIP',0),
(146,2,'B',8,'VIP',0),
(147,3,'B',8,'VIP',0),
(148,4,'B',8,'VIP',0),
(149,5,'B',8,'VIP',0),
(150,1,'B',9,'VIP',0),
(151,2,'B',9,'VIP',0),
(152,3,'B',9,'VIP',0),
(153,4,'B',9,'VIP',0),
(154,5,'B',9,'VIP',0),
(155,1,'B',10,'VIP',0),
(156,2,'B',10,'VIP',0),
(157,3,'B',10,'VIP',0),
(158,4,'B',10,'VIP',0),
(159,5,'B',10,'VIP',0),
(160,1,'C',1,'Regular',0),
(161,2,'C',1,'Regular',0),
(162,3,'C',1,'Regular',0),
(163,4,'C',1,'Regular',0),
(164,5,'C',1,'Regular',0),
(165,1,'C',2,'Regular',0),
(166,2,'C',2,'Regular',0),
(167,3,'C',2,'Regular',0),
(168,4,'C',2,'Regular',0),
(169,5,'C',2,'Regular',0),
(170,1,'C',3,'Regular',0),
(171,2,'C',3,'Regular',0),
(172,3,'C',3,'Regular',0),
(173,4,'C',3,'Regular',0),
(174,5,'C',3,'Regular',0),
(175,1,'C',4,'Regular',0),
(176,2,'C',4,'Regular',0),
(177,3,'C',4,'Regular',0),
(178,4,'C',4,'Regular',0),
(179,5,'C',4,'Regular',0),
(180,1,'C',5,'Regular',0),
(181,2,'C',5,'Regular',0),
(182,3,'C',5,'Regular',0),
(183,4,'C',5,'Regular',0),
(184,5,'C',5,'Regular',0),
(185,1,'C',6,'Regular',0),
(186,2,'C',6,'Regular',0),
(187,3,'C',6,'Regular',0),
(188,4,'C',6,'Regular',0),
(189,5,'C',6,'Regular',0),
(190,1,'C',7,'Regular',0),
(191,2,'C',7,'Regular',0),
(192,3,'C',7,'Regular',0),
(193,4,'C',7,'Regular',0),
(194,5,'C',7,'Regular',0),
(195,1,'C',8,'Regular',0),
(196,2,'C',8,'Regular',0),
(197,3,'C',8,'Regular',0),
(198,4,'C',8,'Regular',0),
(199,5,'C',8,'Regular',0),
(200,1,'C',9,'Regular',0),
(201,2,'C',9,'Regular',0),
(202,3,'C',9,'Regular',0),
(203,4,'C',9,'Regular',0),
(204,5,'C',9,'Regular',0),
(205,1,'C',10,'Regular',0),
(206,2,'C',10,'Regular',0),
(207,3,'C',10,'Regular',0),
(208,4,'C',10,'Regular',0),
(209,5,'C',10,'Regular',0),
(210,1,'D',1,'Regular',0),
(211,2,'D',1,'Regular',0),
(212,3,'D',1,'Regular',0),
(213,4,'D',1,'Regular',0),
(214,5,'D',1,'Regular',0),
(215,1,'D',2,'Regular',0),
(216,2,'D',2,'Regular',0),
(217,3,'D',2,'Regular',0),
(218,4,'D',2,'Regular',0),
(219,5,'D',2,'Regular',0),
(220,1,'D',3,'Regular',0),
(221,2,'D',3,'Regular',0),
(222,3,'D',3,'Regular',0),
(223,4,'D',3,'Regular',0),
(224,5,'D',3,'Regular',0),
(225,1,'D',4,'Regular',0),
(226,2,'D',4,'Regular',0),
(227,3,'D',4,'Regular',0),
(228,4,'D',4,'Regular',0),
(229,5,'D',4,'Regular',0),
(230,1,'D',5,'Regular',0),
(231,2,'D',5,'Regular',0),
(232,3,'D',5,'Regular',0),
(233,4,'D',5,'Regular',0),
(234,5,'D',5,'Regular',0),
(235,1,'D',6,'Regular',0),
(236,2,'D',6,'Regular',0),
(237,3,'D',6,'Regular',0),
(238,4,'D',6,'Regular',0),
(239,5,'D',6,'Regular',0),
(240,1,'D',7,'Regular',0),
(241,2,'D',7,'Regular',0),
(242,3,'D',7,'Regular',0),
(243,4,'D',7,'Regular',0),
(244,5,'D',7,'Regular',0),
(245,1,'D',8,'Regular',0),
(246,2,'D',8,'Regular',0),
(247,3,'D',8,'Regular',0),
(248,4,'D',8,'Regular',0),
(249,5,'D',8,'Regular',0),
(250,1,'D',9,'Regular',0),
(251,2,'D',9,'Regular',0),
(252,3,'D',9,'Regular',0),
(253,4,'D',9,'Regular',0),
(254,5,'D',9,'Regular',0),
(255,1,'D',10,'Regular',0),
(256,2,'D',10,'Regular',0),
(257,3,'D',10,'Regular',0),
(258,4,'D',10,'Regular',0),
(259,5,'D',10,'Regular',0),
(260,1,'E',1,'Economy',0),
(261,2,'E',1,'Economy',0),
(262,3,'E',1,'Economy',0),
(263,4,'E',1,'Economy',0),
(264,5,'E',1,'Economy',0),
(265,1,'E',2,'Economy',0),
(266,2,'E',2,'Economy',0),
(267,3,'E',2,'Economy',0),
(268,4,'E',2,'Economy',0),
(269,5,'E',2,'Economy',0),
(270,1,'E',3,'Economy',0),
(271,2,'E',3,'Economy',0),
(272,3,'E',3,'Economy',0),
(273,4,'E',3,'Economy',0),
(274,5,'E',3,'Economy',0),
(275,1,'E',4,'Economy',0),
(276,2,'E',4,'Economy',0),
(277,3,'E',4,'Economy',0),
(278,4,'E',4,'Economy',0),
(279,5,'E',4,'Economy',0),
(280,1,'E',5,'Economy',0),
(281,2,'E',5,'Economy',0),
(282,3,'E',5,'Economy',0),
(283,4,'E',5,'Economy',0),
(284,5,'E',5,'Economy',0),
(285,1,'E',6,'Economy',0),
(286,2,'E',6,'Economy',0),
(287,3,'E',6,'Economy',0),
(288,4,'E',6,'Economy',0),
(289,5,'E',6,'Economy',0),
(290,1,'E',7,'Economy',0),
(291,2,'E',7,'Economy',0),
(292,3,'E',7,'Economy',0),
(293,4,'E',7,'Economy',0),
(294,5,'E',7,'Economy',0),
(295,1,'E',8,'Economy',0),
(296,2,'E',8,'Economy',0),
(297,3,'E',8,'Economy',0),
(298,4,'E',8,'Economy',0),
(299,5,'E',8,'Economy',0),
(300,1,'E',9,'Economy',0),
(301,2,'E',9,'Economy',0),
(302,3,'E',9,'Economy',0),
(303,4,'E',9,'Economy',0),
(304,5,'E',9,'Economy',0),
(305,1,'E',10,'Economy',0),
(306,2,'E',10,'Economy',0),
(307,3,'E',10,'Economy',0),
(308,4,'E',10,'Economy',0),
(309,5,'E',10,'Economy',0);
/*!40000 ALTER TABLE `seats` ENABLE KEYS */;
UNLOCK TABLES;
COMMIT;
SET AUTOCOMMIT=@OLD_AUTOCOMMIT;

--
-- Table structure for table `shows`
--

DROP TABLE IF EXISTS `shows`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `shows` (
  `show_id` int(11) NOT NULL AUTO_INCREMENT,
  `theatre_id` int(11) DEFAULT NULL,
  `title` varchar(150) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `duration` int(11) DEFAULT NULL,
  `age_rating` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`show_id`),
  KEY `theatre_id` (`theatre_id`),
  CONSTRAINT `1` FOREIGN KEY (`theatre_id`) REFERENCES `theatres` (`theatre_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `shows`
--

SET @OLD_AUTOCOMMIT=@@AUTOCOMMIT, @@AUTOCOMMIT=0;
LOCK TABLES `shows` WRITE;
/*!40000 ALTER TABLE `shows` DISABLE KEYS */;
INSERT INTO `shows` VALUES
(1,1,'Οιδίπους Τύραννος','Αρχαία τραγωδία του Σοφοκλή',120,'15+'),
(2,1,'Ηλέκτρα','Τραγωδία με σύγχρονη σκηνοθετική προσέγγιση',110,'15+'),
(3,2,'Περιμένοντας τον Γκοντό','Θεατρικό έργο του Samuel Beckett',130,'12+'),
(4,3,'Το Μεγάλο μας Τσίρκο','Ιστορικό και πολιτικό έργο',140,'12+');
/*!40000 ALTER TABLE `shows` ENABLE KEYS */;
UNLOCK TABLES;
COMMIT;
SET AUTOCOMMIT=@OLD_AUTOCOMMIT;

--
-- Table structure for table `showtimes`
--

DROP TABLE IF EXISTS `showtimes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `showtimes` (
  `showtime_id` int(11) NOT NULL AUTO_INCREMENT,
  `show_id` int(11) DEFAULT NULL,
  `show_date` date DEFAULT NULL,
  `show_time` time DEFAULT NULL,
  `hall_name` varchar(100) DEFAULT NULL,
  `base_price` decimal(10,2) DEFAULT NULL,
  PRIMARY KEY (`showtime_id`),
  KEY `show_id` (`show_id`),
  CONSTRAINT `1` FOREIGN KEY (`show_id`) REFERENCES `shows` (`show_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `showtimes`
--

SET @OLD_AUTOCOMMIT=@@AUTOCOMMIT, @@AUTOCOMMIT=0;
LOCK TABLES `showtimes` WRITE;
/*!40000 ALTER TABLE `showtimes` DISABLE KEYS */;
INSERT INTO `showtimes` VALUES
(1,1,'2026-06-20','20:00:00','Κεντρική Αίθουσα',18.00),
(2,1,'2026-06-21','21:00:00','Κεντρική Αίθουσα',18.00),
(3,2,'2026-06-22','20:30:00','Σκηνή Α',16.00),
(4,3,'2026-06-23','19:30:00','Μικρή Σκηνή',14.00),
(5,4,'2026-06-24','21:15:00','Μεγάλη Σκηνή',20.00);
/*!40000 ALTER TABLE `showtimes` ENABLE KEYS */;
UNLOCK TABLES;
COMMIT;
SET AUTOCOMMIT=@OLD_AUTOCOMMIT;

--
-- Table structure for table `theatres`
--

DROP TABLE IF EXISTS `theatres`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `theatres` (
  `theatre_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `location` varchar(150) DEFAULT NULL,
  `description` text DEFAULT NULL,
  PRIMARY KEY (`theatre_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `theatres`
--

SET @OLD_AUTOCOMMIT=@@AUTOCOMMIT, @@AUTOCOMMIT=0;
LOCK TABLES `theatres` WRITE;
/*!40000 ALTER TABLE `theatres` DISABLE KEYS */;
INSERT INTO `theatres` VALUES
(1,'Εθνικό Θέατρο','Αθήνα','Κεντρική σκηνή με κλασικές και σύγχρονες παραστάσεις'),
(2,'Θέατρο Τέχνης','Αθήνα','Μικρότερη σκηνή με έμφαση στο σύγχρονο έργο'),
(3,'Δημοτικό Θέατρο Πειραιά','Πειραιάς','Ιστορικό θέατρο με μεγάλες παραγωγές');
/*!40000 ALTER TABLE `theatres` ENABLE KEYS */;
UNLOCK TABLES;
COMMIT;
SET AUTOCOMMIT=@OLD_AUTOCOMMIT;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `password_hash` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

SET @OLD_AUTOCOMMIT=@@AUTOCOMMIT, @@AUTOCOMMIT=0;
LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES
(1,'Andreas','andreas@example.com','hashed_password_here'),
(2,'Andreas','andreas@test.com','$2b$10$Ujz2NcHVMTGTCO9JdSt2nOf3ZDuFlpzXVmjhxKeQ/ZE/xIvnT48jq'),
(3,'mitsotakis','mitsotakis@test.com','$2b$10$LONVvPpxmMmXEXjp1.jEl.ejKWRKYLCVKScZxbZ/y9lTv1jPp9xRu'),
(4,'giannakopoulos','giannakopoulos@test.com','$2b$10$45pJ6/pSgUQBLdIYvP7yrO.hPOaO.Bc/jwGLVxfcl/WepFFWjm.yC'),
(5,'marianna','marianna@test.com','$2b$10$/iionHYqxpMjq2GNcmQ8BeuQvu6Tg/fPw5HFjqO4CJUiZqSGgoUC.'),
(6,'Tsalpas','tsalpas@gmail.com','$2b$10$7VTzQdETihPqWXK.1HKYxOUAoeSlgAIlIqghyMQOHmCdVbTzIYV4S');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
COMMIT;
SET AUTOCOMMIT=@OLD_AUTOCOMMIT;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*M!100616 SET NOTE_VERBOSITY=@OLD_NOTE_VERBOSITY */;

-- Dump completed on 2026-05-24 21:16:53
