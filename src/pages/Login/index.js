import { connect, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { useState } from "react";
import { handleLogin } from "../../actions/authedUser";
import users from '../../middleware/_DATA';
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import "./style.css";

const dummyUsers = [
  {
    id: 'sarahedo',
    password:'password123',
    name: 'Sarah Edo',
    avatarURL: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjoqVmDYZ24XDeOIjwvaawlp1LL4HHPXpSIQ&s",
    answers: {
      "8xf0y6ziyjabvozdd253nd": 'optionOne',
      "6ni6ok3ym7mf1p33lnez": 'optionOne',
      "am8ehyc8byjqgar0jgpub9": 'optionTwo',
      "loxhs1bqm25b708cmbf3g": 'optionTwo'
    },
    questions: ['8xf0y6ziyjabvozdd253nd', 'am8ehyc8byjqgar0jgpub9']
  },
  {
    id: 'tylermcginnis',
    password:'abc321',
    name: 'Tyler McGinnis',
    avatarURL: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2Y4_lh6ze0cj9OxQ-CYi4Mk7JDNYDJaAseA&s",
    answers: {
      "vthrdm985a262al8qx3do": 'optionOne',
      "xj352vofupe1dqz9emx13r": 'optionTwo',
    },
    questions: ['loxhs1bqm25b708cmbf3g', 'vthrdm985a262al8qx3do'],
  },
  {
    id: 'mtsamis',
    password:'xyz123',
    name: 'Mike Tsamis',
    avatarURL: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdXPF0HAQdqILH6PwvjKI2RHvwm9G6xnjP7Q&s",
    answers: {
      "xj352vofupe1dqz9emx13r": 'optionOne',
      "vthrdm985a262al8qx3do": 'optionTwo',
      "6ni6ok3ym7mf1p33lnez": 'optionOne'
    },
    questions: ['6ni6ok3ym7mf1p33lnez', 'xj352vofupe1dqz9emx13r'],
  },
  {
    id: 'zoshikanlu',
    password:'pass246',
    name: 'Zenobia Oshikanlu',
    avatarURL: "https://img.freepik.com/premium-psd/bear-face-shot-isolated-transparent-background_879541-324.jpg",
    answers: {
      "xj352vofupe1dqz9emx13r": 'optionOne',
    },
    questions: [],
  }
]

const Login = ({ dispatch, loggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  if (loggedIn) {
    const urlParams = new URLSearchParams(window.location.search);
    const redirectUrl = urlParams.get("redirectTo");
    return <Navigate to={redirectUrl ? redirectUrl : "/"} />;
  }

  const handleUsername = (e) => {
    const value = e.target.value;
    setUsername(value);
  };

  const handlePassword = (e) => {
    const value = e.target.value;
    setPassword(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(handleLogin(username, password));
    setUsername("");
    setPassword("");
  };

  const handleLoginWithAcc = (username, password) => {
    dispatch(handleLogin(username, password));
  };

  return (
    <>
      <div className="grid-container-element">
        <div className="grid-child-element login-card">
          <h1
            className="text-3xl text-center font-bold mt-9"
            data-testid="login-heading text-center"
          >
            Login
          </h1>

          <form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="username">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                value={username}
                name="username"
                onChange={handleUsername}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                name="password"
                onChange={handlePassword}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Login
            </Button>
          </form>
            <h1 className="d-flex justify-content-center mb-8">OR</h1>
            <div className="d-flex flex-column">

              {dummyUsers.map((user) => {
              return (
                <Button
                  key={user.id}
                  style={{ marginBottom: "10px", borderRadius: "5px", height: 40 }}
                  onClick={() => {
                    handleLoginWithAcc(user.id, user.password)
                  }}
                >
                  {user.name}
                </Button>
              );
                })}
            </div>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = ({ authedUser }) => ({
  loggedIn: !!authedUser,
});

export default connect(mapStateToProps)(Login);
