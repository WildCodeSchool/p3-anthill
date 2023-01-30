DROP TABLE IF EXISTS `badge`, `mood`, `user`, `topic`, `bubble`, `idea`, `comment`, `link`, `user_badge`, `user_topic`, `upvote_comment_user`, `upvote_idea_user`, `upvote_bubble_user`;

CREATE TABLE `badge` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `path` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
); 

CREATE TABLE `mood` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `emoji` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
); 

CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `picture` varchar(255) NULL,
  `email` varchar(255) NOT NULL,
  `pseudo` varchar(255) NULL,
  `description` varchar(255) NULL, 
  `hashedPassword` varchar(600) NULL,
  `fullname` varchar(255) NOT NULL,
  `googleUserId` varchar(255) NULL,
  `mood_id` int NULL,
  UNIQUE(`pseudo`),
  UNIQUE(`email`),
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_user_mood` FOREIGN KEY (`mood_id`) REFERENCES `mood` (`id`)
);


CREATE TABLE `topic` (
  `id` int NOT NULL AUTO_INCREMENT,
  `deadline` datetime DEFAULT NULL,
  `description` varchar(500) NOT NULL,
  `is_private` tinyint(1) NOT NULL DEFAULT 0,
  `creator_id` int NOT NULL DEFAULT 0,
  `title` varchar(255) NOT NULL,
  `is_closed` tinyint(1) NOT NULL DEFAULT 0,
  `is_comment_mode` tinyint(1) NOT NULL DEFAULT 1,
  `slack_channel_link` varchar(500),
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_topic_creator` FOREIGN KEY (`creator_id`) REFERENCES `user` (`id`)
); 

CREATE TABLE `bubble` (
  `id` int NOT NULL AUTO_INCREMENT,
  `content` varchar(255) NOT NULL,
  `mindmap_id` int NOT NULL,
  `creator_id` int NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_bubble_mindmap` FOREIGN KEY (`mindmap_id`) REFERENCES `topic` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_bubble_creator` FOREIGN KEY (`creator_id`) REFERENCES `user` (`id`) ON DELETE CASCADE
); 

CREATE TABLE `idea` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `description` varchar(200) DEFAULT NULL,
  `comment_mode_id` int DEFAULT NULL,
  `creator_id` int NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_idea_topic` FOREIGN KEY (`comment_mode_id`) REFERENCES `topic` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_idea_creator` FOREIGN KEY (`creator_id`) REFERENCES `user` (`id`) ON DELETE CASCADE
); 

CREATE TABLE `comment` (
  `id` int NOT NULL AUTO_INCREMENT,
  `content` varchar(500) NOT NULL,
  `creation_date` datetime NOT NULL,
  `creator_id` int NOT NULL,
  `idea_id` int NOT NULL,
  `comment_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_comment_user` FOREIGN KEY (`creator_id`) REFERENCES `user` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_comment_idea` FOREIGN KEY (`idea_id`) REFERENCES `idea` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_comment_comment` FOREIGN KEY (`comment_id`) REFERENCES `comment` (`id`) ON DELETE CASCADE
);

CREATE TABLE `link` (
  `source_id` int NOT NULL,
  `target_id` int NOT NULL,
  PRIMARY KEY (`source_id`, `target_id`),
  CONSTRAINT `fk_link_source` FOREIGN KEY (`source_id`) REFERENCES `bubble` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_link_target` FOREIGN KEY (`target_id`) REFERENCES `bubble` (`id`) ON DELETE CASCADE
); 

CREATE TABLE `user_badge` (
  `user_id` int NOT NULL,
  `badge_id` int NOT NULL,
  PRIMARY KEY (`user_id`, `badge_id`),
  CONSTRAINT `fk_user_badge_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_user_badge_badge` FOREIGN KEY (`badge_id`) REFERENCES `badge` (`id`) ON DELETE CASCADE
);

CREATE TABLE `user_topic` (
  `user_id` int NOT NULL,
  `topic_id` int NOT NULL,
  PRIMARY KEY (`user_id`, `topic_id`),
  CONSTRAINT `fk_user_topic_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_user_topic_topic` FOREIGN KEY (`topic_id`) REFERENCES `topic` (`id`) ON DELETE CASCADE
);

CREATE VIEW TopicData (id, is_comment_mode, title, creator_id, fullname, description, deadline, nb_idea, nb_bubble, slack_channel_link) 
AS (SELECT t.id, t.is_comment_mode, t.title, u.id, u.fullname, t.description, t.deadline, count(i.id), count(b.id), t.slack_channel_link
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
  LEFT JOIN user AS u ON u.id = c.creator_id
  LEFT JOIN user AS u2 ON u2.id = i.creator_id
  LEFT JOIN user AS u3 ON u3.id = t.creator_id
  ORDER BY c.creation_date DESC
  );

CREATE TABLE `upvote_idea_user` (
  `idea_id` int NOT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`idea_id`, `user_id`),
  CONSTRAINT `fk_upvote_idea_idea` FOREIGN KEY (`idea_id`) REFERENCES `idea` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_upvote_idea_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE
); 

CREATE TABLE `upvote_comment_user` (
  `comment_id` int NOT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`comment_id`, `user_id`),
  CONSTRAINT `fk_upvote_comment_comment` FOREIGN KEY (`comment_id`) REFERENCES `comment` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_upvote_comment_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE
); 

CREATE VIEW IdeaUpvotes (idea_id, nbr_upvotes) 
AS (SELECT i.id, count(uiu.idea_id) AS nbr_upvotes
  FROM idea AS i 
  LEFT JOIN upvote_idea_user AS uiu ON i.id = uiu.idea_id GROUP by i.id)
;

CREATE VIEW IdeaData(id, idea_title, idea_description, idea_creator_name, nb_comment, comment_mode_id, nbr_upvotes_idea)
AS (SELECT i.id, MIN(i.title), MIN(i.description), MIN(u.fullname), count(c.id), i.comment_mode_id, iu.nbr_upvotes
  FROM idea AS i
  LEFT JOIN topic AS t ON t.id = i.comment_mode_id
  LEFT JOIN user AS u ON u.id = i.creator_id
  LEFT JOIN comment AS c ON c.idea_id = i.id
  LEFT JOIN IdeaUpvotes AS iu ON iu.idea_id = i.id
  GROUP BY i.id)
;

CREATE VIEW CommentUpvotes (comment_id, nbr_upvotes) 
AS (SELECT c.id, count(ucu.comment_id) AS nbr_upvotes
  FROM comment AS c 
  LEFT JOIN upvote_comment_user AS ucu ON c.id = ucu.comment_id GROUP by c.id)
;

CREATE VIEW CommentData(id, content, up_vote, user_id, creation_date, pseudo, picture, idea_id)
AS (
SELECT c.id, c.content, cu.nbr_upvotes, c.creator_id, c.creation_date, u.pseudo, u.picture, i.id
FROM comment AS c 
LEFT JOIN idea AS i ON i.id = c.idea_id 
LEFT JOIN user AS u ON u.id = c.creator_id
LEFT JOIN CommentUpvotes AS cu ON cu.comment_id = c.id
)
;

CREATE VIEW BubbleUpvotes (bubble_id, nbr_upvotes) 
AS (SELECT b.id, count(ubu.bubble_id) AS nbr_upvotes
  FROM bubble AS b 
  LEFT JOIN upvote_bubble_user AS ubu ON b.id = ubu.bubble_id GROUP by b.id)
;

CREATE VIEW BubbleData (id, mindmap_id, bubble_creator_name, bubble_content, bubble_nbr_upvotes)
AS (SELECT b.id, b.mindmap_id, u.fullname, b.content, bu.nbr_upvotes
  FROM bubble AS b
  LEFT JOIN user AS u ON u.id = b.creator_id
  LEFT JOIN BubbleUpvotes AS bu ON bu.bubble_id = b.id GROUP BY b.id);