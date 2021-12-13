The application can be used in an online location: https://quizapp-p2.herokuapp.com/
or it can be used locally with the command:

deno run --allow-all --unstable run-locally.js

To run the tests for the application, you can use the command:

deno test --allow-all --unstable

In both cases you need to enter your own database credentials in the database.js file which is in the database folder.

The create table statements to make the needed database tables are below:

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE,
  password CHAR(60)
);

CREATE TABLE questions (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  title VARCHAR(256) NOT NULL,
  question_text TEXT NOT NULL
);

CREATE TABLE question_answer_options (
  id SERIAL PRIMARY KEY,
  question_id INTEGER REFERENCES questions(id),
  option_text TEXT NOT NULL,
  is_correct BOOLEAN DEFAULT false
);

CREATE TABLE question_answers (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  question_id INTEGER REFERENCES questions(id),
  question_answer_option_id INTEGER REFERENCES question_answer_options(id),
  correct BOOLEAN DEFAULT false
);

CREATE UNIQUE INDEX ON users((lower(email)));


Changes in the application/my own extra implementations:

Users cannot add more than 4 answer options for a question and only one of them is correct.
Users have to add 4 answer options and one correct answer option for their questions to show up in the quiz.

Also it was required in the quiz to have a button with the value "Choose" next to the answer options.
I think it looks better when the value of the button is the answer option itself, so I made it look better that way.
