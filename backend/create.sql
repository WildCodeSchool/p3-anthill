DROP DATABASE IF EXISTS `p3-anthill-db`;

CREATE DATABASE `p3-anthill-db`;

USE `p3-anthill-db`;

DROP TABLE IF EXISTS `badge`, `mood`, `user`, `topic`, `bubble`, `idea`, `comment`, `link`, `user_badge`, `user_topic`;

CREATE TABLE `badge` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `picture` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
); 

INSERT INTO badge (name, picture) VALUES ("badge_name_1", "badge_picture_1"), ("badge_name_2", "badge_picture_2"), ("badge_name_3", "badge_picture_3"), ("badge_name_4", "badge_picture_4");

CREATE TABLE `mood` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `emoji` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
); 

INSERT INTO mood (name, emoji) VALUES ("mood_name_1", "mood_emoji_1"), ("mood_name_2", "mood_emoji_2"), ("mood_name_3", "mood_emoji_3"), ("mood_name_4", "mood_emoji_4");

CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `picture` varchar(255) NULL,
  `email` varchar(255) NOT NULL,
  `pseudo` varchar(255) NULL,
  `description` varchar(255) NULL, 
  `password` varchar(600) NULL,
  `fullname` varchar(255) NOT NULL,
  `googleUserId` varchar(255) NULL,
  `mood_id` int NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_user_mood` FOREIGN KEY (`mood_id`) REFERENCES `mood` (`id`)
);

INSERT INTO user (description, pseudo, picture, email, password, fullname, googleUserId, mood_id) 
VALUES 
  ("description_1", "pseudo_1", "picture_user_1", "email_1@gmail.com", "user_password_1", "user_fullname_1", "user_google_id_1", 1), 
  ("description_2", "pseudo_2", "picture_user_2", "email_2@gmail.com", "user_password_2", "user_fullname_2", "user_google_id_2", 2), 
  ("description_3", "pseudo_3", "picture_user_3", "email_3@gmail.com", "user_password_3", "user_fullname_3", "user_google_id_3", 3), 
  ("description_4", "pseudo_4", "picture_user_4", "email_4@gmail.com", "user_password_4", "user_fullname_4", "user_google_id_4", 4), 
  ("description_5", "pseudo_5", "picture_user_5", "email_5@gmail.com", "user_password_5", "user_fullname_5", "user_google_id_5", 1)
;

CREATE TABLE `topic` (
  `id` int NOT NULL AUTO_INCREMENT,
  `deadline` datetime DEFAULT NULL,
  `description` varchar(500) NOT NULL,
  `is_private` tinyint(1) NOT NULL DEFAULT 0,
  `creator_id` int NOT NULL DEFAULT 0,
  `title` varchar(255) NOT NULL,
  `is_closed` tinyint(1) NOT NULL DEFAULT 0,
  `is_comment_mode` tinyint(1) NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_topic_creator` FOREIGN KEY (`creator_id`) REFERENCES `user` (`id`)
); 

INSERT INTO topic (deadline, description, is_private, creator_id, title, is_closed, is_comment_mode) 
VALUES 
  (curdate(), "topic_description_1", 0, 1, "topic_title_1", 0, 1), 
  (curdate(), "topic_description_2", 0, 2, "topic_title_2", 0, 1), 
  (curdate(), "topic_description_3", 0, 3, "topic_title_3", 0, 1), 
  (curdate(), "topic_description_4", 0, 4, "topic_title_4", 0, 1), 
  (curdate(), "topic_description_5", 0, 1, "topic_title_5", 0, 1), 
  (curdate(), "topic_description_6", 0, 1, "topic_title_6", 0, 1), 
  (curdate(), "topic_description_7", 0, 1, "topic_title_7", 0, 0), 
  (curdate(), "topic_description_8", 0, 1, "topic_title_8", 0, 0), 
  (curdate(), "topic_description_9", 0, 1, "topic_title_9", 1, 0), 
  (curdate(), "topic_description_10", 0, 2, "topic_title_10", 0, 0), 
  (curdate(), "topic_description_11", 0, 2, "topic_title_11", 1, 0)
;

CREATE TABLE `bubble` (
  `id` int NOT NULL AUTO_INCREMENT,
  `content` varchar(255) NOT NULL,
  `mindmap_id` int NOT NULL,
  `creator_id` int NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_bubble_mindmap` FOREIGN KEY (`mindmap_id`) REFERENCES `topic` (`id`),
  CONSTRAINT `fk_bubble_creator` FOREIGN KEY (`creator_id`) REFERENCES `user` (`id`)
); 

INSERT INTO bubble (content, mindmap_id, creator_id) 
VALUES 
  ("bubble_content_1", 8, 1),
  ("bubble_content_2", 8, 1),
  ("bubble_content_3", 8, 1),
  ("bubble_content_4", 9, 3),
  ("bubble_content_5", 10, 4),
  ("bubble_content_6", 11, 2)
;

CREATE TABLE `idea` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `description` varchar(200) DEFAULT NULL,
  `up_vote` int DEFAULT 0 CHECK(up_vote >= 0),
  `comment_mode_id` int DEFAULT NULL,
  `creator_id` int NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_idea_topic` FOREIGN KEY (`comment_mode_id`) REFERENCES `topic` (`id`),
  CONSTRAINT `fk_idea_creator` FOREIGN KEY (`creator_id`) REFERENCES `user` (`id`)
); 

INSERT INTO idea (title, description, up_vote, comment_mode_id, creator_id) 
VALUES 
  ("idea_title_1", "idea_description_1", 1, 1, 1), 
  ("idea_title_2", "idea_description_2", 11, 1, 2), 
  ("idea_title_3", "idea_description_3", 31, 1, 5), 
  ("idea_title_4", "idea_description_4", 1, 2, 4),  
  ("idea_title_5", "idea_description_5", 1, 3, 4),  
  ("idea_title_6", "idea_description_6", 1, 4, 4)
;

CREATE TABLE `comment` (
  `id` int NOT NULL AUTO_INCREMENT,
  `content` varchar(500) NOT NULL,
  `creation_date` datetime NOT NULL,
  `up_vote` int DEFAULT 0 CHECK(up_vote >= 0),
  `user_id` int NOT NULL,
  `idea_id` int NOT NULL,
  `comment_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_comment_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
  CONSTRAINT `fk_comment_idea` FOREIGN KEY (`idea_id`) REFERENCES `idea` (`id`),
  CONSTRAINT `fk_comment_comment` FOREIGN KEY (`comment_id`) REFERENCES `comment` (`id`)
);

INSERT INTO comment (creation_date, content, up_vote, user_id, idea_id, comment_id) 
VALUES 
  (NOW(),"comment_content_1", 1, 1, 1, null), 
  (NOW(), "comment_content_2", 5, 2, 1, 1), 
  (NOW(), "comment_content_3", 5, 3, 1, null), 
  (NOW(), "comment_content_4", 2, 3, 2, null)
;

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

INSERT INTO user_badge (user_id, badge_id) VALUES (1, 1), (1, 2), (1, 3), (1, 4), (2, 2), (3, 3), (4, 4);

CREATE TABLE `user_topic` (
  `user_id` int NOT NULL,
  `topic_id` int NOT NULL,
  PRIMARY KEY (`user_id`, `topic_id`),
  CONSTRAINT `fk_user_topic_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
  CONSTRAINT `fk_user_topic_topic` FOREIGN KEY (`topic_id`) REFERENCES `topic` (`id`)
);

INSERT INTO user_topic (user_id, topic_id) VALUES (1, 1), (1, 4), (1, 5), (1, 2), (1, 3), (2, 1), (2, 6), (2, 11), (3, 4), (4, 6), (5, 7), (1, 8), (2, 9), (3, 10);

CREATE VIEW TopicData (id, is_comment_mode, title, creator_id, fullname, description, deadline, nb_idea, nb_bubble) 
AS (SELECT t.id, t.is_comment_mode, t.title, u.id, u.fullname, t.description, t.deadline, count(i.id), count(b.id) 
  FROM topic AS t 
  LEFT JOIN idea AS i ON i.comment_mode_id = t.id
  LEFT JOIN bubble as b ON b.mindmap_id = t.id 
  LEFT JOIN user AS u ON u.id = t.creator_id GROUP BY t.id)
;

CREATE VIEW AllFromOneTopic 
  (comment_id, comment_content, comment_creator, idea_id, idea_title, idea_description, idea_creator, topic_id, topic_creator, topic_title, topic_description, topic_is_comment_mode)
  AS (SELECT c.id, c.content, u.fullname, i.id, i.title, i.description, u2.fullname, t.id, u3.fullname, t.title, t.description, t.is_comment_mode
  FROM comment AS c
  LEFT JOIN idea AS i ON i.id = c.idea_id
  LEFT JOIN topic AS t ON t.id = i.comment_mode_id
  LEFT JOIN user AS u ON u.id = c.user_id
  LEFT JOIN user AS u2 ON u2.id = i.creator_id
  LEFT JOIN user AS u3 ON u3.id = t.creator_id
  ORDER BY c.creation_date DESC
  );
