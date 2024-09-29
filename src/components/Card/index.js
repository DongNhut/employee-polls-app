import { connect } from "react-redux";
import { Link } from "react-router-dom";

import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";

import "./style.css";

const Card = ({ question, author }) => {
  return (
    <div className="dashboard-card">
      <Link to={"questions/" + question.id}>
        <div>
          <div className="pt-2">
            <Image
              className="card-avatar"
              roundedCircle
              src={author?.avatarURL}
              alt={`Author: ${author?.name}`}
            />
          </div>
          <div className="p-3">
          <div className="text-xl font-medium text-black">@{question.author}</div>
                <p className="text-xs italic">{new Date(question.timestamp).toDateString()}</p>
            <Button variant="outline-success" className="card-button">
              See more
            </Button>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default connect()(Card);
