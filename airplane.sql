/*
 Navicat Premium Data Transfer

 Source Server         : MariaDB
 Source Server Type    : MySQL
 Source Server Version : 100413
 Source Host           : localhost:3306
 Source Schema         : filght_manager

 Target Server Type    : MySQL
 Target Server Version : 100413
 File Encoding         : 65001

 Date: 22/05/2022 00:02:42
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for airplane
-- ----------------------------
DROP TABLE IF EXISTS `airplane`;
CREATE TABLE `airplane`  (
  `AIRPLANE_ID` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `AIRPLANE_NAME` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `CAPACITY` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `brand` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `link_img_brand` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`AIRPLANE_ID`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of airplane
-- ----------------------------
INSERT INTO `airplane` VALUES (1, 'BOEING-747', '300', 'BAMBOO', 'https://rubicmarketing.com/wp-content/uploads/2021/12/y-nghia-logo-bamboo-airways.jpg');
INSERT INTO `airplane` VALUES (2, 'AIRBUS-A350', '150', 'VietNam Airlines', 'https://www.vietnamairlines.com/~/media/Images/VNANew/Home/Logo%20Header/logo_vna.png');
INSERT INTO `airplane` VALUES (3, 'AIRBUS-A321', '100', 'VietJet', 'https://qualitytravel.com.vn/wp-content/uploads/2018/03/vietjetair-logo.jpg');
INSERT INTO `airplane` VALUES (4, 'BOEING-727', '180', 'VietNam Airlines', 'https://www.vietnamairlines.com/~/media/Images/VNANew/Home/Logo%20Header/logo_vna.png');

-- ----------------------------
-- Table structure for airport_geo
-- ----------------------------
DROP TABLE IF EXISTS `airport_geo`;
CREATE TABLE `airport_geo`  (
  `AIRPORT_GEO_ID` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `LOCATION_ID` int UNSIGNED NULL DEFAULT NULL,
  `AIRPORT_NAME` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `DESCRIPTION` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`AIRPORT_GEO_ID`) USING BTREE,
  INDEX `LOCATION_ID`(`LOCATION_ID`) USING BTREE,
  CONSTRAINT `airport_geo_ibfk_1` FOREIGN KEY (`LOCATION_ID`) REFERENCES `location` (`LOCATION_ID`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 15 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of airport_geo
-- ----------------------------
INSERT INTO `airport_geo` VALUES (1, 1, 'Nội Bài', 'beautiful');
INSERT INTO `airport_geo` VALUES (2, 3, 'Đà Nẵng', 'good');
INSERT INTO `airport_geo` VALUES (3, 4, 'Tân Sơn Nhất', 'beautiful');
INSERT INTO `airport_geo` VALUES (4, 4, 'Long Thành', 'beautiful');
INSERT INTO `airport_geo` VALUES (5, 5, 'Phú Quốc', 'beautiful');
INSERT INTO `airport_geo` VALUES (6, 6, 'Cát Bi', 'beautiful');
INSERT INTO `airport_geo` VALUES (7, 7, 'Phú Bài', 'beautiful');
INSERT INTO `airport_geo` VALUES (8, 8, 'Năm Căn', 'beautiful');
INSERT INTO `airport_geo` VALUES (9, 9, 'Côn Đảo', 'beautiful');
INSERT INTO `airport_geo` VALUES (10, 10, 'Cam Ranh', 'beautiful');
INSERT INTO `airport_geo` VALUES (11, 11, 'Lào Cai Airport', NULL);
INSERT INTO `airport_geo` VALUES (12, 12, 'Copenhagen Airport', NULL);
INSERT INTO `airport_geo` VALUES (14, 14, 'Denver International Airport', NULL);

-- ----------------------------
-- Table structure for flight
-- ----------------------------
DROP TABLE IF EXISTS `flight`;
CREATE TABLE `flight`  (
  `FLIGHT_ID` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `FLIGHT_NO` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `FROM_AIRPORT_ID` int UNSIGNED NULL DEFAULT NULL,
  `TO_AIRPORT_ID` int UNSIGNED NULL DEFAULT NULL,
  `AIRPLANE_ID` int UNSIGNED NULL DEFAULT NULL,
  PRIMARY KEY (`FLIGHT_ID`) USING BTREE,
  INDEX `FROM_AIRPORT_ID`(`FROM_AIRPORT_ID`) USING BTREE,
  INDEX `TO_AIRPORT_ID`(`TO_AIRPORT_ID`) USING BTREE,
  INDEX `AIRPLANE_ID`(`AIRPLANE_ID`) USING BTREE,
  INDEX `FLIGHT_NO`(`FLIGHT_NO`) USING BTREE,
  CONSTRAINT `flight_ibfk_1` FOREIGN KEY (`FROM_AIRPORT_ID`) REFERENCES `airport_geo` (`AIRPORT_GEO_ID`) ON DELETE CASCADE ON UPDATE RESTRICT,
  CONSTRAINT `flight_ibfk_2` FOREIGN KEY (`TO_AIRPORT_ID`) REFERENCES `airport_geo` (`AIRPORT_GEO_ID`) ON DELETE CASCADE ON UPDATE RESTRICT,
  CONSTRAINT `flight_ibfk_3` FOREIGN KEY (`AIRPLANE_ID`) REFERENCES `airplane` (`AIRPLANE_ID`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of flight
-- ----------------------------
INSERT INTO `flight` VALUES (1, 'DN1234', 1, 2, 2);
INSERT INTO `flight` VALUES (2, 'HN789', 2, 1, 1);
INSERT INTO `flight` VALUES (3, 'HN123', 1, 3, 3);
INSERT INTO `flight` VALUES (4, 'DN567', 3, 5, 4);
INSERT INTO `flight` VALUES (5, 'HCM768', 4, 2, 2);

-- ----------------------------
-- Table structure for flight_log
-- ----------------------------
DROP TABLE IF EXISTS `flight_log`;
CREATE TABLE `flight_log`  (
  `FLIGHT_LOG_ID` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `LOG_DATE` datetime(6) NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP(6),
  `USERNAME` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `FLIGHT_ID` int UNSIGNED NULL DEFAULT NULL,
  `FLIGHT_NO_OLD` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `FLIGHT_NO_NEW` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`FLIGHT_LOG_ID`) USING BTREE,
  INDEX `USERNAME`(`USERNAME`) USING BTREE,
  INDEX `FLIGHT_ID`(`FLIGHT_ID`) USING BTREE,
  INDEX `FLIGHT_NO_OLD`(`FLIGHT_NO_OLD`) USING BTREE,
  INDEX `FLIGHT_NO_NEW`(`FLIGHT_NO_NEW`) USING BTREE,
  CONSTRAINT `flight_log_ibfk_1` FOREIGN KEY (`USERNAME`) REFERENCES `user` (`USERNAME`) ON DELETE CASCADE ON UPDATE RESTRICT,
  CONSTRAINT `flight_log_ibfk_2` FOREIGN KEY (`FLIGHT_ID`) REFERENCES `flight` (`FLIGHT_ID`) ON DELETE CASCADE ON UPDATE RESTRICT,
  CONSTRAINT `flight_log_ibfk_3` FOREIGN KEY (`FLIGHT_NO_OLD`) REFERENCES `flight` (`FLIGHT_NO`) ON DELETE CASCADE ON UPDATE RESTRICT,
  CONSTRAINT `flight_log_ibfk_4` FOREIGN KEY (`FLIGHT_NO_NEW`) REFERENCES `flight` (`FLIGHT_NO`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of flight_log
-- ----------------------------
INSERT INTO `flight_log` VALUES (1, '2022-03-15 20:43:18.386362', 'longpp', 2, 'DN1234', 'HN789');
INSERT INTO `flight_log` VALUES (2, '2022-03-15 20:43:42.753435', 'longpp', 2, 'HN789', 'HN789');

-- ----------------------------
-- Table structure for flight_news
-- ----------------------------
DROP TABLE IF EXISTS `flight_news`;
CREATE TABLE `flight_news`  (
  `flight_news_id` int NOT NULL AUTO_INCREMENT,
  `author` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `content` varchar(4000) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `created_time` datetime(0) NULL DEFAULT NULL,
  `main_image` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `title` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `update_by` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `updated_time` datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (`flight_news_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of flight_news
-- ----------------------------

-- ----------------------------
-- Table structure for flight_news_image
-- ----------------------------
DROP TABLE IF EXISTS `flight_news_image`;
CREATE TABLE `flight_news_image`  (
  `flight_news_image_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `flight_news_id` int NULL DEFAULT NULL,
  PRIMARY KEY (`flight_news_image_id`) USING BTREE,
  INDEX `FKhu351xqu2ne3ej3a4xbrfj8lj`(`flight_news_id`) USING BTREE,
  CONSTRAINT `FKhu351xqu2ne3ej3a4xbrfj8lj` FOREIGN KEY (`flight_news_id`) REFERENCES `flight_news` (`flight_news_id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of flight_news_image
-- ----------------------------

-- ----------------------------
-- Table structure for flight_schedule
-- ----------------------------
DROP TABLE IF EXISTS `flight_schedule`;
CREATE TABLE `flight_schedule`  (
  `FLIGHT_SCHEDULE_ID` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `START_TIME` datetime(6) NOT NULL,
  `END_TIME` datetime(6) NOT NULL,
  `FLIGHT_NO` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `AVAILABLE_SEAT` bigint UNSIGNED NOT NULL,
  `flight_state` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`FLIGHT_SCHEDULE_ID`) USING BTREE,
  INDEX `flight_no`(`FLIGHT_NO`) USING BTREE,
  INDEX `FLIGHT_SCHEDULE_ID`(`FLIGHT_SCHEDULE_ID`) USING BTREE,
  CONSTRAINT `flight_schedule_ibfk_1` FOREIGN KEY (`FLIGHT_NO`) REFERENCES `flight` (`FLIGHT_NO`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of flight_schedule
-- ----------------------------
INSERT INTO `flight_schedule` VALUES (1, '2022-03-08 21:56:54.000000', '2022-03-08 23:56:54.000000', 'DN1234', 50, 'FLIGHT_ON');
INSERT INTO `flight_schedule` VALUES (2, '2022-03-09 21:56:54.000000', '2022-03-09 23:56:54.000000', 'HN789', 80, 'FLIGHT_ON');

-- ----------------------------
-- Table structure for location
-- ----------------------------
DROP TABLE IF EXISTS `location`;
CREATE TABLE `location`  (
  `LOCATION_ID` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `COUNTRY_CODE` int UNSIGNED NOT NULL,
  `COUNTRY_NAME` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `LONGITUDE` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `LATITUDE` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `city_id` int NULL DEFAULT NULL,
  `city_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`LOCATION_ID`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 15 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of location
-- ----------------------------
INSERT INTO `location` VALUES (1, 10, 'Việt Nam', '10', '11', 1, 'Hà Nội');
INSERT INTO `location` VALUES (2, 221, 'Liên Bang Nga', '12', '23', 2, 'Moscow');
INSERT INTO `location` VALUES (3, 120, 'Việt Nam', '10', '11', 3, 'Đà Nẵng');
INSERT INTO `location` VALUES (4, 120, 'Việt Nam', '10', '11', 4, 'TP Hồ Chí Minh');
INSERT INTO `location` VALUES (5, 120, 'Việt Nam', '10', '11', 5, 'Phú Quốc');
INSERT INTO `location` VALUES (6, 120, 'Việt Nam', '10', '11', 6, 'Hải Phòng');
INSERT INTO `location` VALUES (7, 120, 'Việt Nam', '10', '11', 7, 'Đà Lạt');
INSERT INTO `location` VALUES (8, 120, 'Việt Nam', '10', '11', 8, 'Cà Mau');
INSERT INTO `location` VALUES (9, 120, 'Việt Nam', '10', '11', 9, 'Bà Rịa - Vũng Tàu');
INSERT INTO `location` VALUES (10, 120, 'Việt Nam', '10', '11', 10, 'Khánh Hoà');
INSERT INTO `location` VALUES (11, 10, 'Việt Nam', '10', '11.0', 2, 'Lào Cai');
INSERT INTO `location` VALUES (12, 11, 'Đan Mạch', '11', '12.0', 3, 'Copenhagen');
INSERT INTO `location` VALUES (14, 12, 'America', '12', '13.0', 4, 'Denver');

-- ----------------------------
-- Table structure for passenger
-- ----------------------------
DROP TABLE IF EXISTS `passenger`;
CREATE TABLE `passenger`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `fullname` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `phone_no` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of passenger
-- ----------------------------
INSERT INTO `passenger` VALUES (1, 'abc@gmail.com', 'Nguyen Van', '0968123131');

-- ----------------------------
-- Table structure for password_reset_token
-- ----------------------------
DROP TABLE IF EXISTS `password_reset_token`;
CREATE TABLE `password_reset_token`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `expiry_date` datetime(0) NULL DEFAULT NULL,
  `token` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `user_ID` int UNSIGNED NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `user_ID`(`user_ID`) USING BTREE,
  CONSTRAINT `password_reset_token_ibfk_1` FOREIGN KEY (`user_ID`) REFERENCES `user` (`ID`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of password_reset_token
-- ----------------------------

-- ----------------------------
-- Table structure for ticket
-- ----------------------------
DROP TABLE IF EXISTS `ticket`;
CREATE TABLE `ticket`  (
  `TICKET_ID` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `FLIGHT_SCHEDULE_ID` int UNSIGNED NULL DEFAULT NULL,
  `ROW_SEAT` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `PRICE` bigint NULL DEFAULT NULL,
  `UID` int UNSIGNED NULL DEFAULT NULL,
  `BOOKING_STATE` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `weight_package` int NULL DEFAULT NULL,
  `ticket_type` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `total_adult` int NULL DEFAULT 0,
  `total_children` int NULL DEFAULT 0,
  `total_baby` int NULL DEFAULT 0,
  `total_price` bigint NULL DEFAULT 0,
  PRIMARY KEY (`TICKET_ID`) USING BTREE,
  INDEX `FLIGHT_SCHEDULE_ID`(`FLIGHT_SCHEDULE_ID`) USING BTREE,
  INDEX `UID`(`UID`) USING BTREE,
  CONSTRAINT `ticket_ibfk_1` FOREIGN KEY (`FLIGHT_SCHEDULE_ID`) REFERENCES `flight_schedule` (`FLIGHT_SCHEDULE_ID`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 14 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of ticket
-- ----------------------------
INSERT INTO `ticket` VALUES (9, 2, 'H06', 1650000, NULL, 'AVAILABLE', 20, 'ECONOMY_CLASS', 0, 0, 0, 0);
INSERT INTO `ticket` VALUES (10, 1, 'H06', 1800000, 1, 'BOOKED', 20, 'ECONOMY_CLASS', 1, 1, 0, 3000000);
INSERT INTO `ticket` VALUES (11, 1, 'H07', 1500000, NULL, 'AVAILABLE', 20, 'ECONOMY_CLASS', 0, 0, 0, 0);
INSERT INTO `ticket` VALUES (12, 1, 'H08', 1500000, NULL, 'AVAILABLE', 23, 'ECONOMY_CLASS', 0, 0, 0, 0);
INSERT INTO `ticket` VALUES (13, 1, 'H10', 1500000, 1, 'BOOKED', 23, 'BUSINESS_CLASS', 1, 0, 0, 1500000);

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `ID` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `EMAIL` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `USERNAME` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `PASSWORD` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `EMAIL_VERIFIED` tinyint UNSIGNED NULL DEFAULT 0,
  `DOB` date NULL DEFAULT NULL,
  `GENDER` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `PHONE` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `ROLE` tinyint UNSIGNED NULL DEFAULT 0,
  `VERIFICATION_CODE` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `UID` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`ID`) USING BTREE,
  UNIQUE INDEX `EMAIL`(`EMAIL`) USING BTREE,
  UNIQUE INDEX `USERNAME_2`(`USERNAME`) USING BTREE,
  INDEX `USERNAME`(`USERNAME`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES (1, 'abc@gmail', 'long', 'long', 1, NULL, NULL, NULL, 0, NULL, '');
INSERT INTO `user` VALUES (2, 'phamphilong4101999@gmail.com', 'longpp', '$2a$10$QG3qqrSURLACZGK2CgBjDOKoUQveCnJsTJZb5dCCpMetJKi8txLcG', 1, NULL, NULL, NULL, 0, NULL, 'ff278dd4-53fd-4450-950c-45a07233c119');

SET FOREIGN_KEY_CHECKS = 1;
