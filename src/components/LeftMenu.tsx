/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import { Button, Menu } from "antd";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { listSelector } from "../stores/selector";
import { isLogout } from "../stores/action";
interface IItemMenu {
  key: string;
  label: JSX.Element | string;
  icon?: JSX.Element;
  children?: IItemMenu[];
}

type ItemType = IItemMenu & {
  key: string;
  label: JSX.Element | string;
  icon?: JSX.Element;
  children?: IItemMenu[];
  hidden?: boolean;
};

const LeftMenu: React.FC = () => {
  const [key, setKey] = useState("/");
  const dispatch = useDispatch();
  const listUser = useSelector(listSelector);
  const UserCurrentLogin = () => {
    const usernames = Object.values(listUser)
      .filter((user: any) => user.status === "Active")
      .map((user: any) => user.username);

    return usernames;
  };
  const UserIdCurrentLogin = () => {
    const usernames = Object.values(listUser)
      .filter((user: any) => user.status === "Active")
      .map((user: any) => user.id);

    return usernames;
  };
  const menuItems: ItemType[] = [
    {
      key: "home",
      label: (
        <Link style={{ textDecoration: "none" }} to="/home">
          Home
        </Link>
      ),
    },
    {
      key: "leaderboard",
      label: (
        <Link style={{ textDecoration: "none" }} to="/leaderboard">
          Leaderboard
        </Link>
      ),
    },
    {
      key: "addQuestion",
      label: (
        <Link style={{ textDecoration: "none" }} to="/add">
          New
        </Link>
      ),
    },
  ];
  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#001529",
      }}
    >
      <div style={{ padding: 16, color: "#fff" }}>Hello, {UserCurrentLogin() || ""}</div>
      <Menu selectedKeys={[key]} theme="dark" mode="inline" items={menuItems} />
      <div style={{ padding: 16 }}>
        <Button
          type="primary"
          onClick={() => {
            dispatch(isLogout(UserIdCurrentLogin().toString()));
            localStorage.removeItem("redirectUrl");
          }}
        >
          Logout
        </Button>
      </div>
    </div>
  );
};
export default LeftMenu;
