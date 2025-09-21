def create_table():
    import sqlite3
    con = sqlite3.connect("hello_world.db")

    mycursor=con.cursor()
    qry1="create table user_details(uid int primary key, name varchar(30), password varchar(20), email varchar(40))"
    qry2="drop table user_details"
    qry3= "insert into user_details values(1,'ishita','ishit123','email')"
    qry4="create table user_profiles(uid int primary key,sports varchar(500),interests varchar(500),foreign key (uid) references user_details(uid))" 
    qry5='''INSERT INTO user_profiles (uid, sports, interests)
    VALUES (2, '{"basketball":0,"football":1}', '{"art":1,"reading":0,"music":1,"movies":0,"cooking":1}')'''
    qry6="select * from user_profiles"
    mycursor.execute(qry6)

    con.commit()


create_table()