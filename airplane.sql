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

 Date: 09/05/2022 19:38:42
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
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of airplane
-- ----------------------------
INSERT INTO `airplane` VALUES (1, 'BOEING-747', '300', 'BAMBOO', 'https://rubicmarketing.com/wp-content/uploads/2021/12/y-nghia-logo-bamboo-airways.jpg');
INSERT INTO `airplane` VALUES (2, 'AIRBUS-A350', '150', 'VietName Airlines', 'https://www.vietnamairlines.com/~/media/Images/VNANew/Home/Logo%20Header/logo_vna.png');

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
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of airport_geo
-- ----------------------------
INSERT INTO `airport_geo` VALUES (1, 1, 'NOIBAI', 'beautiful');
INSERT INTO `airport_geo` VALUES (2, 1, 'DANANG', 'good');

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
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of flight
-- ----------------------------
INSERT INTO `flight` VALUES (1, 'DN1234', 1, 2, 2);
INSERT INTO `flight` VALUES (2, 'HN789', 2, 1, 1);

-- ----------------------------
-- Table structure for flight_common
-- ----------------------------
DROP TABLE IF EXISTS `flight_common`;
CREATE TABLE `flight_common`  (
  `flight_id` int NOT NULL,
  `airplane_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `available_seat` int NULL DEFAULT NULL,
  `end_time` datetime(0) NULL DEFAULT NULL,
  `flight_no` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `from_airport_id` int NULL DEFAULT NULL,
  `start_time` datetime(0) NULL DEFAULT NULL,
  `to_airport_id` int NULL DEFAULT NULL,
  PRIMARY KEY (`flight_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of flight_common
-- ----------------------------

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
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of flight_news
-- ----------------------------
INSERT INTO `flight_news` VALUES (1, 'QuangNV34', 'không cho vào là null hoặc để số 0 với id không cho vào là null hoặc để số 0 với id không cho vào là null hoặc để số 0 với id không cho vào là null hoặc để số 0 với id không cho vào là null hoặc để số 0 với id không cho vào là null hoặc để số 0 với id không cho vào là null hoặc để số 0 với id không cho vào là null hoặc để số 0 với id không cho vào là null hoặc để số 0 với id không cho vào là null hoặc để số 0 với id không cho vào là null hoặc để số 0 với id không cho vào là null hoặc để số 0 với id không cho vào là null hoặc để số 0 với id không cho vào là null hoặc để số 0 với id không cho vào là null hoặc để số 0 với id không cho vào là null hoặc để số 0 với id ', '2022-05-08 21:19:59', 'bg1.jpg', 'Mua he cua chung ta', NULL, '2022-05-08 21:20:04');

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
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of flight_news_image
-- ----------------------------
INSERT INTO `flight_news_image` VALUES (1, 'bg1.jpg', 1);

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
INSERT INTO `flight_schedule` VALUES (1, '2022-03-08 21:56:54.000000', '2022-03-08 23:56:54.000000', 'DN1234', 143, 'FLIGHT_ON');
INSERT INTO `flight_schedule` VALUES (2, '2022-03-09 21:56:54.000000', '2022-03-09 23:56:54.000000', 'HN789', 77, 'FLIGHT_ON');

-- ----------------------------
-- Table structure for flight_ticket_entity
-- ----------------------------
DROP TABLE IF EXISTS `flight_ticket_entity`;
CREATE TABLE `flight_ticket_entity`  (
  `flight_id` int NOT NULL,
  `end_time` datetime(0) NULL DEFAULT NULL,
  `flight_no` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `price` bigint NULL DEFAULT NULL,
  `start_time` datetime(0) NULL DEFAULT NULL,
  `weight_package` int NULL DEFAULT NULL,
  `flight_schedule_id` int NULL DEFAULT NULL,
  `ticket_id` int NULL DEFAULT NULL,
  `airplane_id` int NOT NULL,
  `brand` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `link_img_brand` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`flight_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of flight_ticket_entity
-- ----------------------------

-- ----------------------------
-- Table structure for location
-- ----------------------------
DROP TABLE IF EXISTS `location`;
CREATE TABLE `location`  (
  `LOCATION_ID` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `COUNTRY_CODE` int UNSIGNED NOT NULL,
  `CITY_CODE` int UNSIGNED NOT NULL,
  `COUNTRY_NAME` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `LONGITUDE` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `LATITUDE` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `city_id` int NULL DEFAULT NULL,
  `city_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`LOCATION_ID`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of location
-- ----------------------------
INSERT INTO `location` VALUES (1, 10, 1, 'VIETNAM', '10', '11', 1, 'HÀ NỘI (HN)');
INSERT INTO `location` VALUES (2, 221, 22, 'RUSSIA', '12', '23', 3, 'MOSCOW');
INSERT INTO `location` VALUES (3, 10, 2, 'VIETNAM', NULL, NULL, 2, 'HỒ CHÍ MINH (HCM)');

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
) ENGINE = InnoDB AUTO_INCREMENT = 10 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of passenger
-- ----------------------------
INSERT INTO `passenger` VALUES (3, 'demo@gmail.com', 'long', '097878778');
INSERT INTO `passenger` VALUES (9, 'a@gmail.com', 'a', 'a');

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
  `SEAT_NUMBER` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `PRICE` bigint NULL DEFAULT NULL,
  `UID` int UNSIGNED NULL DEFAULT NULL,
  `BOOKING_STATE` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `weight_package` int NULL DEFAULT NULL,
  `ticket_type` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`TICKET_ID`) USING BTREE,
  INDEX `FLIGHT_SCHEDULE_ID`(`FLIGHT_SCHEDULE_ID`) USING BTREE,
  INDEX `UID`(`UID`) USING BTREE,
  CONSTRAINT `ticket_ibfk_1` FOREIGN KEY (`FLIGHT_SCHEDULE_ID`) REFERENCES `flight_schedule` (`FLIGHT_SCHEDULE_ID`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 15 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of ticket
-- ----------------------------
INSERT INTO `ticket` VALUES (9, 2, 'H06', 1650000, 3, 'BOOKED', 20, 'ECONOMY_CLASS');
INSERT INTO `ticket` VALUES (10, 1, 'H06', 1800000, 3, 'BOOKED', 20, 'ECONOMY_CLASS');
INSERT INTO `ticket` VALUES (11, 1, 'H07', 1500000, 9, 'BOOKED', 20, 'ECONOMY_CLASS');
INSERT INTO `ticket` VALUES (12, 1, 'H08', 1500000, 1, 'AVAILABLE', 23, 'ECONOMY_CLASS');
INSERT INTO `ticket` VALUES (13, 1, 'H10', 1500000, 1, 'BOOKED', 23, 'BUSINESS_CLASS');
INSERT INTO `ticket` VALUES (14, 2, 'H11', 200000, 1, 'AVAILABLE', 40, 'ECONOMY_CLASS');

-- ----------------------------
-- Table structure for ticket_common
-- ----------------------------
DROP TABLE IF EXISTS `ticket_common`;
CREATE TABLE `ticket_common`  (
  `ticket_id` int NOT NULL,
  `airplane_id` int NULL DEFAULT NULL,
  `airplane_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `available_seat` int NULL DEFAULT NULL,
  `booking_state` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `end_time` datetime(0) NULL DEFAULT NULL,
  `flight_id` int NULL DEFAULT NULL,
  `flight_no` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `flight_schedule_id` int NULL DEFAULT NULL,
  `from_airport_id` int NULL DEFAULT NULL,
  `price` bigint NULL DEFAULT NULL,
  `seat_number` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `start_time` datetime(0) NULL DEFAULT NULL,
  `to_airport_id` int NULL DEFAULT NULL,
  `username` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`ticket_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of ticket_common
-- ----------------------------

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
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES (1, 'abc@gmail', 'long', '$10$QG3qqrSURLACZGK2CgBjDOKoUQveCnJsTJZb5dCCpMetJKi8txLcG', 1, NULL, NULL, NULL, 0, NULL, '');
INSERT INTO `user` VALUES (2, 'phamphilong4101999@gmail.com', 'longpp', '$2a$10$QG3qqrSURLACZGK2CgBjDOKoUQveCnJsTJZb5dCCpMetJKi8txLcG', 1, NULL, NULL, NULL, 0, NULL, 'ff278dd4-53fd-4450-950c-45a07233c119');
INSERT INTO `user` VALUES (3, 'a', 'quangnguyen', '$2a$10$V/ziENG8CaKvt2X/Hq0y9eRfXqqGwOHnpHJLOSt8/dIE1duIEKVuW', 1, NULL, NULL, NULL, 1, 'K6lEWEbe2TE7XC2snbR8Y6t6thFRWzxekYb4c5SA7py1yx9xEm26f8hE3ti225Yl', '73b1fe5c-a24f-49de-bbc1-60f32e7e2afd');

SET FOREIGN_KEY_CHECKS = 1;
