import React, { useEffect } from "react";
import { AppDispatch, RootState } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import { UserInfo } from "../../interface";
import { fetchUserList, sortList } from "../../slices/user";
import { Button } from "antd";
import { Link } from "react-router-dom";
import UserCard from "../UserCard";
import Selector from "../../components/Selector";
import "./index.css";

const UserList: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const userList = useSelector((state: RootState) => state.user.userList);
  const sortType = useSelector((state: RootState) => state.user.sortType);
  useEffect(() => {
    dispatch(fetchUserList());
  }, []);
  const onHandleChangeSort = (value: string) => {
    dispatch(sortList(value));
  };

  return (
    <div className="Container">
      <div className="ButtonContainer">
        <Button type="primary">
          <Link to="/create">创建用户</Link>
        </Button>
        <Selector
          value={sortType}
          options={[
            "id increase",
            "id decrease",
            "age increase",
            "age decrease",
          ]}
          onHandleChange={onHandleChangeSort}
        />
      </div>
      <div className="ListContainer">
        {userList.map((item: UserInfo) => (
          <UserCard user={item} key={item.id} />
        ))}
      </div>
    </div>
  );
};

export default UserList;
