DROP DATABASE IF EXISTS `p3-anthill-db`;

CREATE DATABASE `p3-anthill-db`;

USE `p3-anthill-db`;

DROP TABLE IF EXISTS `badge`, `mood`, `user`, `topic`, `mindmap_mode`, `bubble`, `comment_mode`, `idea`, `comment`, `link`, `user_badge`, `user_topic`;

CREATE TABLE `badge` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `picture` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
); 

INSERT INTO badge (name, picture) VALUES ("badge_name_1", "badge_picture_1");

CREATE TABLE `mood` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `emoji` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
); 

INSERT INTO mood (name, emoji) VALUES ("mood_name_1", "mood_emoji_1");

CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `picture` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(600) DEFAULT NULL,
  `fullname` varchar(255) NOT NULL,
  `googleUserId` varchar(255) NOT NULL,
  `mood_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
   CONSTRAINT `fk_user_mood` FOREIGN KEY (`mood_id`) REFERENCES `mood` (`id`)
);

INSERT INTO user (picture, email, password, fullname, googleUserId, mood_id) VALUES ("picture_user_1", "email_1@gmail.com", "user_password_1", "user_fullname_1", "user_google_id_1", 1);

CREATE TABLE `topic` (
  `id` int NOT NULL AUTO_INCREMENT,
  `deadline` datetime DEFAULT NULL,
  `description` varchar(500) NOT NULL,
  `is_private` tinyint(1) NOT NULL,
  `creator_id` int NOT NULL,
  `title` varchar(255) NOT NULL,
  `is_closed` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_topic_creator` FOREIGN KEY (`creator_id`) REFERENCES `user` (`id`)
); 

INSERT INTO topic (deadline, description, is_private, creator_id, title, is_closed) VALUES (curdate(), "topic_description_1", 0, 1, "topic_title_1", 0);

CREATE TABLE `mindmap_mode` (
  `id` int NOT NULL AUTO_INCREMENT,
  `topic_id` int NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_mindmap_mode_topic` FOREIGN KEY (`topic_id`) REFERENCES `topic` (`id`)
); 

INSERT INTO mindmap_mode (topic_id) VALUES (1);

CREATE TABLE `bubble` (
  `id` int NOT NULL AUTO_INCREMENT,
  `content` varchar(255) NOT NULL,
  `mindmap_id` int NOT NULL,
  `creator_id` int NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_bubble_mindmap` FOREIGN KEY (`mindmap_id`) REFERENCES `mindmap_mode` (`id`),
  CONSTRAINT `fk_bubble_creator` FOREIGN KEY (`creator_id`) REFERENCES `user` (`id`)
); 

INSERT INTO bubble (content, mindmap_id, creator_id) VALUES ("bubble_content_1", 1, 1);

CREATE TABLE `comment_mode` (
  `id` int NOT NULL AUTO_INCREMENT,
  `topic_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_comment_mode_topic` FOREIGN KEY (`topic_id`) REFERENCES `topic` (`id`)
); 

INSERT INTO comment_mode (topic_id) VALUES (1);

CREATE TABLE `idea` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `description` varchar(200) DEFAULT NULL,
  `up_vote` int DEFAULT 0,
  `comment_mode_id` int DEFAULT NULL,
  `creator_id` int NOT NULL,
  PRIMARY KEY (`id`)
); 

INSERT INTO idea (title, description, up_vote, comment_mode_id, creator_id) VALUES ("idea_title_1", "idea_description_1", 1, 1, 1);

CREATE TABLE `comment` (
  `id` int NOT NULL AUTO_INCREMENT,
  `content` varchar(500) NOT NULL,
  `up_vote` int DEFAULT 0,
  `user_id` int NOT NULL,
  `idea_id` int NOT NULL,
  `comment_id` int DEFAULT NULL,
  PRIMARY KEY (`id`)
);

INSERT INTO comment (content, up_vote, user_id, idea_id, comment_id) VALUES ("comment_content_1", 1, 1, 1, 1);

ALTER TABLE `idea` ADD CONSTRAINT `fk_idea_comment_mode` FOREIGN KEY (`comment_mode_id`) REFERENCES `comment_mode` (`id`);
ALTER TABLE `idea` ADD CONSTRAINT `fk_idea_creator` FOREIGN KEY (`creator_id`) REFERENCES `user` (`id`);

ALTER TABLE `comment` ADD CONSTRAINT `fk_comment_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);
ALTER TABLE `comment` ADD CONSTRAINT `fk_comment_idea` FOREIGN KEY (`idea_id`) REFERENCES `idea` (`id`);
ALTER TABLE `comment` ADD CONSTRAINT `fk_comment_comment` FOREIGN KEY (`comment_id`) REFERENCES `comment` (`id`);

CREATE TABLE `link` (
  `source_id` int NOT NULL,
  `target_id` int NOT NULL,
  PRIMARY KEY (`source_id`, `target_id`),
  CONSTRAINT `fk_link_source` FOREIGN KEY (`source_id`) REFERENCES `bubble` (`id`) ,
  CONSTRAINT `fk_link_target` FOREIGN KEY (`target_id`) REFERENCES `bubble` (`id`)
); 

INSERT INTO link (source_id, target_id) VALUES (1, 1);

CREATE TABLE `user_badge` (
  `user_id` int NOT NULL,
  `badge_id` int NOT NULL,
  PRIMARY KEY (`user_id`, `badge_id`),
  CONSTRAINT `fk_user_badge_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
  CONSTRAINT `fk_user_badge_badge` FOREIGN KEY (`badge_id`) REFERENCES `badge` (`id`)
);

INSERT INTO user_badge (user_id, badge_id) VALUES (1, 1);

CREATE TABLE `user_topic` (
  `user_id` int NOT NULL,
  `topic_id` int NOT NULL,
  PRIMARY KEY (`user_id`, `topic_id`),
  CONSTRAINT `fk_user_topic_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
  CONSTRAINT `fk_user_topic_topic` FOREIGN KEY (`topic_id`) REFERENCES `topic` (`id`)
);

INSERT INTO user_topic (user_id, topic_id) VALUES (1, 1);





