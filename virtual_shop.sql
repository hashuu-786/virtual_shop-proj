-- MySQL dump 10.13  Distrib 8.0.41, for Win64 (x86_64)
--
-- Host: localhost    Database: virtual_shop
-- ------------------------------------------------------
-- Server version	8.0.41

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `order_items`
--

DROP TABLE IF EXISTS `order_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_items` (
  `id` int NOT NULL AUTO_INCREMENT,
  `order_id` int DEFAULT NULL,
  `product_id` int DEFAULT NULL,
  `quantity` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_items`
--

LOCK TABLES `order_items` WRITE;
/*!40000 ALTER TABLE `order_items` DISABLE KEYS */;
INSERT INTO `order_items` VALUES (1,1,101,1),(2,1,3,1),(3,2,101,1),(4,2,3,1),(5,3,101,1),(6,3,3,1),(7,4,101,1),(8,4,3,1),(9,5,101,1),(10,5,3,1),(11,6,101,1),(12,6,3,3),(13,7,101,1),(14,7,3,3),(15,8,3,1),(16,9,3,1);
/*!40000 ALTER TABLE `order_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `total_price` decimal(10,2) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (1,2,528.99,'2025-04-10 12:58:55'),(2,2,528.99,'2025-04-10 08:48:26'),(3,2,528.99,'2025-04-10 08:50:09'),(4,2,528.99,'2025-04-10 08:51:36'),(5,2,528.99,'2025-04-10 09:05:03'),(6,2,588.97,'2025-04-10 09:05:59'),(7,2,588.97,'2025-04-10 09:08:09'),(8,2,29.99,'2025-04-10 14:00:24'),(9,2,29.99,'2025-04-10 14:10:30');
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` text,
  `price` decimal(10,2) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `stock` int NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=122 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (2,'Men T-Shirt','Cotton round-neck t-shirt',19.99,'https://i.pinimg.com/474x/93/20/c7/9320c70997557c15dec74e405d4e4f8d.jpg',100,'2025-03-31 06:15:12'),(3,'Men\'s Hoodie','Warm and comfortable cotton hoodie',29.99,'https://i.pinimg.com/474x/a1/7f/4f/a17f4fa68f3308d4ab18ba42bb258581.jpg',50,'2025-03-31 06:31:09'),(101,'T-Shirt',NULL,499.00,'https://i.pinimg.com/474x/ba/16/0a/ba160a9ff9d6c6217334a672f9a94e9a.jpg',0,'2025-03-31 15:30:32'),(102,'Jeans',NULL,999.00,'https://i.pinimg.com/474x/69/ee/1f/69ee1fe17b24305e2fd03157d5f3e592.jpg',0,'2025-03-31 15:30:32'),(103,'Jacket',NULL,1499.00,'https://i.pinimg.com/474x/b6/79/da/b679da5ab454013b01715bafb370023a.jpg',0,'2025-03-31 15:30:32'),(104,'Men\'s Cotton T-Shirt','Comfortable and breathable cotton t-shirt',499.99,'https://i.pinimg.com/736x/d5/8a/fa/d58afa76559f1f690ac1741ab2376496.jpg',100,'2025-04-10 13:39:21'),(105,'Men\'s Leather Jacket','Stylish leather jacket for all seasons',999.99,'https://i.pinimg.com/474x/75/61/87/75618783d069d68a4ca4027b1855b286.jpg',50,'2025-04-10 13:39:21'),(106,'Men\'s Running Shoes','Durable and stylish running shoes',939.99,'https://i.pinimg.com/736x/33/8b/86/338b8601daca60efc23b171711e085a8.jpg',75,'2025-04-10 13:39:21'),(107,'Men\'s Hoodie','Warm and cozy hoodie for chilly days',734.99,'https://i.pinimg.com/736x/88/10/93/881093eae66fbca3d8ac22c4f56cd96b.jpg',80,'2025-04-10 13:39:21'),(108,'Men\'s Watch','Elegant analog watch for daily use',699.99,'https://i.pinimg.com/736x/7d/9d/7c/7d9d7cee9095db055b253b34f81cb0b0.jpg',40,'2025-04-10 13:39:21'),(109,'Men\'s Sneakers','Fashionable sneakers with good grip',1159.99,'https://i.pinimg.com/474x/c5/7a/be/c57abe4f070b63fab6378f3cfd8dcfcb.jpg',60,'2025-04-10 13:39:21'),(110,'Men\'s Sunglasses','UV protected sunglasses for sunny days',419.99,'https://i.pinimg.com/736x/88/7f/0c/887f0c11bf41e26d9d38518cb85b1afa.jpg',150,'2025-04-10 13:39:21'),(111,'Men\'s Cap','Casual baseball cap for outdoor activities',209.99,'https://i.pinimg.com/474x/c0/df/bd/c0dfbd1a31f36736781173181e4057b5.jpg',130,'2025-04-10 13:39:21'),(112,'Women\'s Cotton T-Shirt','Soft cotton t-shirt for daily wear',18.99,'https://i.pinimg.com/474x/d0/da/d1/d0dad1db2a58ab23e9d6d9c8811fd207.jpg',100,'2025-04-10 13:39:21'),(113,'Women\'s dress','Fashionable dress',822.99,'https://i.pinimg.com/474x/a7/6f/dc/a76fdc7d2822579fb96bf6fda7cfe8e1.jpg',50,'2025-04-10 13:39:21'),(114,'Women\'s Dress','Yellow Ginkgo Leaf Art Print Casual Lace-Up Dress',959.99,'https://i.pinimg.com/474x/62/15/ce/6215ce9283ed1b294c68a57f040d43df.jpg',60,'2025-04-10 13:39:21'),(115,'Women\'s Running Shoes','Light and comfortable running shoes',949.99,'https://i.pinimg.com/474x/c4/35/31/c435310e85927dac4ed7ed0333a44a21.jpg',80,'2025-04-10 13:39:21'),(116,'Women\'s Sunglasses','Fashionable sunglasses with UV protection',819.99,'https://i.pinimg.com/474x/a4/8f/39/a48f3929e66262141565ff8372b07d76.jpg',140,'2025-04-10 13:39:21'),(117,'Women\'s Handbag','Chic handbag for daily use',879.99,'https://i.pinimg.com/474x/cc/6f/25/cc6f25a9add4357a39ada230a002f5f4.jpg',40,'2025-04-10 13:39:21'),(118,'Women\'s Scarf','Soft and cozy scarf for winter',314.99,'https://i.pinimg.com/474x/66/4b/13/664b1335324e1495efcfbc11b5ff666c.jpg',150,'2025-04-10 13:39:21'),(119,'Women\'s Coat','Warm winter coat for cold weather',989.99,'https://i.pinimg.com/736x/c9/b3/81/c9b3810ec57a60e56dbafb5157a25e6e.jpg',55,'2025-04-10 13:39:21'),(120,'Women\'s Heels','Elegant heels for formal and casual events',869.99,'https://i.pinimg.com/474x/ff/04/d1/ff04d10028c11e93b2d017955060e177.jpg',60,'2025-04-10 13:39:21'),(121,'Women\'s Casual Shoes','Comfortable casual shoes for daily wear',39.99,'https://i.pinimg.com/474x/af/8f/0d/af8f0d20e029eb0ede6d0b3d63ad81f4.jpg',90,'2025-04-10 13:39:21');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `shopping_cart`
--

DROP TABLE IF EXISTS `shopping_cart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `shopping_cart` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `product_id` int NOT NULL,
  `quantity` int DEFAULT '1',
  `added_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `shopping_cart_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `shopping_cart_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `shopping_cart`
--

LOCK TABLES `shopping_cart` WRITE;
/*!40000 ALTER TABLE `shopping_cart` DISABLE KEYS */;
INSERT INTO `shopping_cart` VALUES (12,1,3,6,'2025-04-05 04:07:07'),(13,1,101,3,'2025-04-05 04:07:12'),(14,1,3,6,'2025-04-05 04:07:07'),(15,1,3,6,'2025-04-05 04:07:07');
/*!40000 ALTER TABLE `shopping_cart` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `first_name` varchar(100) NOT NULL,
  `last_name` varchar(100) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone_number` varchar(15) NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Bhanu','Prasad','bhanu@example.com','7680923127','$2b$10$9OcTtIAZ4WbaYPwSIG3F8.fjG7vwy0QikJOX2WMA/FBs61jAoO9rG'),(2,'hashu','7','hashu@gmail.com','7878000000','$2b$10$w/aDyhqjZTZ/J6MZl3Vvf.MBCxsfY919ssuHIHRBpgQGsDxjEwIRq'),(3,'Indu','7','indu@gmail.com','9876543210','$2b$10$TkaeWUkiDpiymB/wP5Uk0OzjTK9WUhXxicwkUog4/8z.0nQGnrqtG'),(4,'lasya','7','lasya@gmail.com','7896541230','$2b$10$0rD8UkWMDNcDU0V9VMXfgOih2S9PNcDiPlUSftiII1tpnhL.cSr3a'),(5,'Bhanuprasad','77','v.bhanuprasadnb@gmail.com','7680923127','$2b$10$g/eiqAg/r/wf5/sYT7iV5uSAJ.lwm/PMuCzLgD/HwHdslwb6gxhie'),(6,'vinod','kota','vinod@gmail.com','7788994455','$2b$10$I0oIuZBdy/lbTEI5Qbvzz.He77P09fiw6o1EdQpMznQtvncgM8WbO');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-04-11 20:27:06
