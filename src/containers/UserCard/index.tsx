import React from "react";
import { Button, Modal } from "antd";
import { UserInfo } from "../../interface";
import { Link } from "react-router-dom";
import { AppDispatch } from "../../store";
import { useDispatch } from "react-redux";
import { removeUser, updateSelectedUser } from "../../slices/user";
import { deleteUserData } from "../../service";
import "./index.css";

interface IProps {
  user: UserInfo;
}

const UserCard: React.FC<IProps> = (props: IProps) => {
  const dispatch: AppDispatch = useDispatch();
  const {
    user: {
      id,
      name,
      gender,
      age,
      email,
      weight,
      height,
      birthday,
      registeredAt,
    },
  } = props;
  const onHandleClick = () => {
    dispatch(updateSelectedUser(props.user.id));
  };
  const onHandleDelete = () => {
    Modal.confirm({
      title: "确认删除",
      content: "确定要删除这个用户吗？",
      okText: "确定",
      cancelText: "取消",
      onOk: () => {
        dispatch(removeUser(id));
        deleteUserData(id);
      },
    });
  };
  return (
    <div className="CardContainer">
      <p>{`用户ID：${id}`}</p>
      <p>{`姓名：${name}`}</p>
      <p>{`性别：${gender}`}</p>
      <p>{`年龄：${age}`}</p>
      <p>{`邮箱：${email}`}</p>
      <p>{`身高：${height}`}</p>
      <p>{`体重：${weight}`}</p>
      <p>{`生日：${birthday}`}</p>
      <p>{`注册时间：${registeredAt}`}</p>
      <div>
        <Button
          type="primary"
          style={{ backgroundColor: "red", borderColor: "red" }}
          onClick={onHandleDelete}
        >
          删除
        </Button>
        <Button type="primary" onClick={onHandleClick}>
          <Link to="/detail">详情</Link>
        </Button>
      </div>
    </div>
  );
};

export default UserCard;
