use idecide;

INSERT INTO users (name, email, GroupId)
values ("Kobe Bryant", "kobe@gmail.com", "1"),
("Lebron James", "lbj@gmail.com", "1"),
("Eddie Murphy", "eddie@gmail.com", "1"),
("Hans Solo", "solo@gmail.com", "2"),
("Bruce Wayn", "batman@gmail.com", "2"),
("John Snow", "snow@gmail.com", "2"),
("Hermoine Granger", "granger@gmail.com", "3"),
("Michael Myers", "big_knife@gmail.com", "3");

insert into ideas (idea, vote_val, GroupId)
values ("Bahamas", 0, "1"),
("Trinidad", 0, "1"),
("Kenya", 0, "1"),
("Antigua", 0, "1")
("Burger Bar", 0, "2"),
("Arepa Bar", 0, "2"),
("Taco Bar", 0, "2"),
("Rice Bowl Bar", 0, "2")
("Facial Recognition App", 0, "3"),
("Instagram for Senior Citizens", 0, "3"),
("Dating App for Dentists", 0, "3"),
("Photo Recognition App", 0, "3");


INSERT INTO groups (admin_name, admin_email, group_name, decide_on, time, votes, password)
values ("Barack Obama", "obama@gmail.com", "Barack's Group", "Where are we Vacationing?", 10, 5, 1222),
("Guy Fieri", "fieri@gmail.com", "Guy's Group", "What food should be the theme of the food bar for the party?", 10, 5, 1222),
("Bill Gates", "gates@gmail.com", "Gates' Group", "What kind of app should we build?", 10, 5, 1222);