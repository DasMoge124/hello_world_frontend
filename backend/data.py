def create_table():
    import sqlite3
    con = None  # Initialize connection to None
    try:
        con = sqlite3.connect("hello_world.db")
        mycursor = con.cursor()

        # Your SQL queries
        qry1="create table user_details(uid int primary key, name varchar(30), password varchar(20), email varchar(40))"
        qry2="drop table user_details"
        qry3= "insert into user_details values(2,'kevin','kevin123','kevin@gmail.com')"
        qry4="create table user_profiles(uid int primary key,sports varchar(500),interests varchar(500),foreign key (uid) references user_details(uid))" 
        qry5='''INSERT INTO user_profiles (uid, sports, interests)
        VALUES (2, '{"basketball":0,"football":1}', '{"art":1,"reading":0,"music":1,"movies":0,"cooking":1}')'''
        qry6="select * from user_profiles"
        
        # Execute your query
        mycursor.execute(qry3)

        # Commit changes
        con.commit()
        
    except sqlite3.OperationalError as e:
        print(f"Database error: {e}")
    finally:
        if con:
            con.close() # Close the connection
            print("Database connection closed.")

create_table()