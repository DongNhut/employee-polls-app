import { connect } from "react-redux";
import Card from "../../components/Card";

import "./style.css";
import { useState } from "react";

const Dashboard = ({ authedUser, questions, users }) => {
  const [active, setActive] = useState(0);

  console.log("usersusers", users);
  const unanswered = (question) =>
    !question.optionOne.votes.includes(authedUser.id) &&
    !question.optionTwo.votes.includes(authedUser.id);

  const answered = (question) =>
    question.optionOne.votes.includes(authedUser.id) ||
    question.optionTwo.votes.includes(authedUser.id);

  return (
    <div className="p-5 dashboard container m-auto">
      <h1 className="text-3xl font-bold mt-9 text-center" data-testid="heading">
        Dashboard
      </h1>
      <div className="questions">
        <div className="button">
          <button
            className={active === 0 ? "active" : "unactive"}
            onClick={() => setActive(0)}
          >
            Unanswered
          </button>
          <button
            className={active === 1 ? "active" : "unactive"}
            onClick={() => setActive(1)}
          >
            Answered
          </button>
        </div>
        <div className="content">
          <ul className={active === 0 ? "block" : "none"}>
            {questions.filter(unanswered).map((question) => (
              <li key={question.id}>
                <Card question={question} author={users[question.author]} />
              </li>
            ))}
          </ul>
          <ul className={active === 1 ? "block" : "none"}>
            {questions.filter(answered).map((question) => (
              <li key={question.id}>
                <Card question={question} author={users[question.author]} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ authedUser, questions, users }) => ({
  authedUser,
  questions: Object.values(questions).sort((a, b) => b.timestamp - a.timestamp),
  users,
});

export default connect(mapStateToProps)(Dashboard);
