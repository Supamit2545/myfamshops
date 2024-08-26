INSERT INTO psreview(displayname,img,content)
VALUES ('supamit','s',"Hello World")

SELECT * FROM resreview

DELETE FROM psreview BETWEEN 1 AND 5
'
CREATE TABLE IF NOT EXISTS ResReview(
    id SERIAL PRIMARY KEY,
    displayname VARCHAR(255) NOT NULL,
    content VARCHAR(255) NOT NULL,
    rate INT NOT NULL
)