USE `p3-anthill-db`;

INSERT INTO badge (name, path) VALUES ("Creator", "/creator.png"), ("Likes", "/likesGiver.png"), ("Thinker", "/thinker.png"), ("Visitor", "/visitor.png");


INSERT INTO mood (name, emoji) VALUES ("mood_name_1", "mood_emoji_1"), ("mood_name_2", "mood_emoji_2"), ("mood_name_3", "mood_emoji_3"), ("mood_name_4", "mood_emoji_4");

INSERT INTO user (description, pseudo, picture, email, hashedPassword, fullname, googleUserId, mood_id) 
VALUES 
  ("description_1", "Laser", "https://i.postimg.cc/NjMzrjn2/Huy.png", "email_1@gmail.com", "user_hashedPassword_1", "Huy", "user_google_id_1", 1), 
  ("description_2", "Angeloox", "https://i.postimg.cc/ncn5pkYk/Quentin.png", "email_2@gmail.com", "user_hashedPassword_2", "Quentin", "user_google_id_2", 2), 
  ("description_3", "Xx_D4rk_Sir_Hyle_xX", "https://i.postimg.cc/QC3zBkLj/Cyril.png", "email_3@gmail.com", "user_hashedPassword_3", "Cyril", "user_google_id_3", 3), 
  ("description_4", "Morticia", "https://i.postimg.cc/13CbWqFK/Audrey.png", "email_4@gmail.com", "user_hashedPassword_4", "Audrey", "user_google_id_4", 4), 
  ("description_5", "Jojodu75", "https://i.postimg.cc/MGgNwJdM/Johanna.png", "email_5@gmail.com", "user_hashedPassword_5", "Johanna", "user_google_id_5", 1),
  ("description_6", "HMP180", "https://i.postimg.cc/W3rKbYH9/Herschel.png", "email_6@gmail.com", "user_hashedPassword_5", "Herschell", "user_google_id_6", 1),
  ("description_7", "Fransoué", "https://i.postimg.cc/7hhZp5w4/Eric.jpg", "email_7@gmail.com", "user_hashedPassword_5", "François", "user_google_id_7", 1),
  ("description_8", "Mago", "https://i.postimg.cc/fbSqBgDw/Margot.png", "email_8@gmail.com", "user_hashedPassword_5", "Magomhed", "user_google_id_8", 1),
  ("description_9", "Cass_la_menace", "https://i.postimg.cc/YSvZTCfB/Celia.png", "email_9@gmail.com", "user_hashedPassword_5", "Cassandra", "user_google_id_9", 1),
  ("description_10", "Gwenzouz", "https://i.postimg.cc/xjv7w7H8/Gwenael.png", "email_10@gmail.com", "user_hashedPassword_5", "Gwenaël", "user_google_id_10", 1),
  ("description_11", "Mika_comme_le_chanteur", "https://i.postimg.cc/7hnWSGD0/Mickael.png", "email_11@gmail.com", "user_hashedPassword_5", "Mickaël", "user_google_id_11", 1)
;

INSERT INTO topic (deadline, description, is_private, creator_id, title, is_closed, is_comment_mode) 
VALUES 
  (curdate(), "How should we rename Gwenaël  ?", 0, 1, "Gwenaël Nickname", 0, 1), 
  (curdate(), "Which day should we fire Johanna ?", 0, 2, "Johanna's departure", 0, 1), 
  (curdate(), "All know that we don't drink just one coffee per day. How could the cafe service at WCS be improved?", 0, 3, "Coffee problem", 0, 1), 
  (curdate(), "Which bar should we go to on Friday nights?", 0, 4, "New bar ?", 0, 1), 
  ("2023-04-01 12:00:00", "Would you be intereseted in a lan party ? Please respond by a simple 'no' or propose a day and a game", 0, 5, "Fridays party ?", 0, 1)
;

-- INSERT INTO bubble (content, mindmap_id, creator_id) 
-- VALUES 
--   ("bubble_content_1", 8, 1),
--   ("bubble_content_2", 8, 1),
--   ("bubble_content_3", 8, 1),
--   ("bubble_content_4", 9, 3),
--   ("bubble_content_5", 10, 4),
--   ("bubble_content_6", 11, 2)
-- ;

INSERT INTO idea (title, description, comment_mode_id, creator_id) 
VALUES 
  ("Gwenkolokante", "Because he play for the Chelsea", 1, 1),
  ("Da Gwe", "He likes WCS rappers", 1, 2),
  ("Gwecamole", "He eats avocados everyday", 1, 5),
  ("Agree", "But she have to buy a cake for everyone first", 2, 3),
  ("Disgree", "Dont let her go pls", 2, 2),
  ("Disgree", "I love you forever", 2, 9),
  ("Disgree", "Noone want you leave, tell me who want and I will kick him", 2, 6),
  ("2 dose per day", "Give us 2 please", 3, 4),
  ("10 please", "I really want 5 for the morning and 5 for the afternoon", 3, 10),
  ("Heaven", "where we can drink immilit beers", 4, 4),
  ("Wonderland", "you can drinks beers with Mr Rabbits", 4, 2), 
  ("Nowhere", "Dont go to the bar, lets go to the Cassandra's house", 4, 5), 
  ("WCSchool", "You can drinks with Tidus, and plays with him", 4, 10), 
  ("Playing chess", "Chess party playgames is great", 5, 8)
;

INSERT INTO comment (creation_date, content, creator_id, idea_id, comment_id) 
VALUES 
  (NOW(),"comment_content_1", 1, 1, 1), 
  (NOW(), "comment_content_2", 2, 1, null), 
  (NOW(), "comment_content_3", 3, 1, null), 
  (NOW(), "comment_content_4", 3, 2, null)
;

-- INSERT INTO link (source_id, target_id) VALUES (1, 1);


INSERT INTO user_badge (user_id, badge_id) VALUES (1, 1), (1, 2), (1, 3), (1, 4), (2, 2), (3, 3), (4, 4);

INSERT INTO user_topic (user_id, topic_id) VALUES (1, 1), (1, 4), (1, 5), (1, 2), (1, 3), (2, 1), (3, 4);


INSERT IGNORE INTO upvote_idea_user (user_id, idea_id) VALUES (1, 4), (2, 4), (3, 4), (4, 4), (5, 4), (1, 3), (2, 3), (3, 3), (4, 3), (5, 3);

INSERT IGNORE INTO upvote_comment_user (user_id, comment_id) VALUES (1, 4), (2, 4), (3, 4), (4, 4), (5, 4), (1, 3), (2, 3), (3, 3), (4, 3), (5, 3);

INSERT IGNORE INTO upvote_comment_user (user_id, comment_id) VALUES (1, 4), (2, 4), (3, 4), (4, 4), (5, 4), (1, 3), (2, 3), (3, 3), (4, 3), (5, 3);

INSERT IGNORE INTO upvote_bubble_user (user_id, bubble_id) VALUES (1, 4), (2, 4), (3, 4), (4, 4), (5, 4), (1, 3), (2, 3), (3, 3), (4, 3), (5, 3);
