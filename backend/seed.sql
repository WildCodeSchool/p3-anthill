
INSERT INTO badge (name, path) VALUES ("Creator", "/creator.png"), ("Likes", "/likesGiver.png"), ("Thinker", "/thinker.png"), ("Visitor", "/visitor.png");


INSERT INTO mood (name, emoji) VALUES ("mood_name_1", "mood_emoji_1"), ("mood_name_2", "mood_emoji_2"), ("mood_name_3", "mood_emoji_3"), ("mood_name_4", "mood_emoji_4");

INSERT INTO user (description, pseudo, picture, email, hashedPassword, fullname, googleUserId, mood_id) 
VALUES 
  ("description_1", "pseudo_1", "picture_user_1", "email_1@gmail.com", "user_hashedPassword_1", "user_fullname_1", "user_google_id_1", 1), 
  ("description_2", "pseudo_2", "picture_user_2", "email_2@gmail.com", "user_hashedPassword_2", "user_fullname_2", "user_google_id_2", 2), 
  ("description_3", "pseudo_3", "picture_user_3", "email_3@gmail.com", "user_hashedPassword_3", "user_fullname_3", "user_google_id_3", 3), 
  ("description_4", "pseudo_4", "picture_user_4", "email_4@gmail.com", "user_hashedPassword_4", "user_fullname_4", "user_google_id_4", 4), 
  ("description_5", "pseudo_5", "picture_user_5", "email_5@gmail.com", "user_hashedPassword_5", "user_fullname_5", "user_google_id_5", 1)
;

INSERT INTO topic (deadline, description, is_private, creator_id, title, is_closed, is_comment_mode) 
VALUES 
  (curdate(), "How should we rename Gwenaël  ?", 0, 1, "Gwenaël Nickname", 0, 1), 
  (curdate(), "Which day should we fire Johanna ?", 0, 2, "Johanna's departure", 0, 1), 
  (curdate(), "Which cake for the departure of Johanna", 0, 1, "Johanna's leaving party's cake", 0, 1), 
  (curdate(), "We all know that we don't drink just one coffee a day. How could the cafe service at Wild Code School be improved?", 0, 3, "Coffee problem", 0, 1), 
  (curdate(), "Which bar should we go to on Friday nights?", 0, 4, "New bar ?", 0, 1), 
  (curdate(), "Would you be intereseted in a lan party ? Please respond by a simple 'no' or propose a day and a game", 0, 1, "Lan party ?", 0, 1), 
  (curdate(), "Feature incomming", 0, 1, "Mindmap Topic Mode", 0, 0), 
  (curdate(), "Feature incomming", 0, 1, "Mindmap Topic Mode", 0, 0), 
  (curdate(), "Feature incomming", 0, 1, "Mindmap Topic Mode", 1, 0), 
  (curdate(), "Feature incomming", 0, 2, "Mindmap Topic Mode", 0, 0), 
  (curdate(), "Feature incomming", 0, 2, "Mindmap Topic Mode", 1, 0)
;
INSERT INTO bubble (content, mindmap_id, creator_id) 
VALUES 
  ("bubble_content_1", 8, 1),
  ("bubble_content_2", 8, 1),
  ("bubble_content_3", 8, 1),
  ("bubble_content_4", 9, 3),
  ("bubble_content_5", 10, 4),
  ("bubble_content_6", 11, 2)
;

INSERT INTO idea (title, description, comment_mode_id, creator_id) 
VALUES 
  ("idea_title_1", "idea_description_1", 1, 1), 
  ("idea_title_2", "idea_description_2", 1, 2), 
  ("idea_title_3", "idea_description_3", 1, 5), 
  ("idea_title_4", "idea_description_4", 2, 4),  
  ("idea_title_5", "idea_description_5", 3, 4),  
  ("idea_title_6", "idea_description_6", 4, 4)
;

INSERT INTO comment (creation_date, content, creator_id, idea_id, comment_id) 
VALUES 
  (NOW(),"comment_content_1", 1, 1, 1), 
  (NOW(), "comment_content_2", 2, 1, null), 
  (NOW(), "comment_content_3", 3, 1, null), 
  (NOW(), "comment_content_4", 3, 2, null)
;

INSERT INTO link (source_id, target_id) VALUES (1, 1);


INSERT INTO user_badge (user_id, badge_id) VALUES (1, 1), (1, 2), (1, 3), (1, 4), (2, 2), (3, 3), (4, 4);

INSERT INTO user_topic (user_id, topic_id) VALUES (1, 1), (1, 4), (1, 5), (1, 2), (1, 3), (2, 1), (2, 6), (2, 11), (3, 4), (4, 6), (5, 7), (1, 8), (2, 9), (3, 10);


INSERT IGNORE INTO upvote_idea_user (user_id, idea_id) VALUES (1, 4), (2, 4), (3, 4), (4, 4), (5, 4), (1, 3), (2, 3), (3, 3), (4, 3), (5, 3);

INSERT IGNORE INTO upvote_comment_user (user_id, comment_id) VALUES (1, 4), (2, 4), (3, 4), (4, 4), (5, 4), (1, 3), (2, 3), (3, 3), (4, 3), (5, 3);
CREATE TABLE `upvote_bubble_user` (
  `bubble_id` int NOT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`bubble_id`, `user_id`),
  CONSTRAINT `fk_upvote_bubble_bubble` FOREIGN KEY (`bubble_id`) REFERENCES `bubble` (`id`),
  CONSTRAINT `fk_upvote_bubble_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
); 

INSERT IGNORE INTO upvote_comment_user (user_id, comment_id) VALUES (1, 4), (2, 4), (3, 4), (4, 4), (5, 4), (1, 3), (2, 3), (3, 3), (4, 3), (5, 3);

INSERT IGNORE INTO upvote_bubble_user (user_id, bubble_id) VALUES (1, 4), (2, 4), (3, 4), (4, 4), (5, 4), (1, 3), (2, 3), (3, 3), (4, 3), (5, 3);
