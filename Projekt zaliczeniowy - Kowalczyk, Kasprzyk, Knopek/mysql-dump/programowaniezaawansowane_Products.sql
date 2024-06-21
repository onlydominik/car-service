-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: programowaniezaawansowane
-- ------------------------------------------------------
-- Server version	8.0.37

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `Products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Products` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `Name` varchar(45) NOT NULL,
  `Model` varchar(45) NOT NULL,
  `Price` varchar(45) NOT NULL,
  `Description` varchar(150) NOT NULL,
  `quantity` int NOT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `Products` WRITE;
/*!40000 ALTER TABLE `Products` DISABLE KEYS */;
INSERT INTO `Products` VALUES (12,'Klocki hamulcowe','Ford Fiesta 11.2012, ST.','653','Tarox®* Komplet przednich klocków hamulcowych Ford Performance Strada 122 (do jazdy szybkiej) ',7),(13,'Filtr oleju','Volkswagen OE 04E115561H','60','FILTR OLEJU ORGINAŁ VW, AUDI, SEAT 04E115561H',4),(14,'Akumulator','Varta Blue Dynamic 60Ah','450','Trwały akumulator o dużej pojemności do aut osobowych.',2),(15,'Świece zapłonowe','NGK BKR6EQUP','50','Wysokiej jakości świece do efektywnego spalania.',3),(16,'Pompa paliwa','Bosch 0580314070','320','Niezawodna pompa paliwa do samochodów benzynowych.',1),(17,'Pasek rozrządu','Gates T251','140.00 PLN','Wytrzymały pasek rozrządu dla precyzyjnej pracy silnika.',4),(18,'Amortyzatory','KYB Excel-G 341275','280','Wysokiej jakości amortyzatory do lepszej stabilności.',2),(19,'Filtr powietrza','K&N 33-2995','160','Wydajny filtr powietrza dla lepszej mocy silnika.',5);
/*!40000 ALTER TABLE `Products` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-06-20 23:33:47
