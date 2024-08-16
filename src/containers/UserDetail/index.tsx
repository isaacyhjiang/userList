import React from "react";
import { RootState } from "../../store";
import { useSelector } from "react-redux";
import UserForm from "../UserForm";
import { UserInfo } from "../../interface";
import "./index.css";

interface IProps {
  isCreateMode: boolean;
}

const UserDetail: React.FC<IProps> = (props: IProps) => {
  const { isCreateMode } = props;
  const currentUser: UserInfo = useSelector(
    (state: RootState) => state.user.selectedUserInfo,
  );

  return (
    <div className="DetailContainer">
      {isCreateMode ? null : <p>{`用户ID：${currentUser.id}`}</p>}
      {isCreateMode ? null : <p>{`注册时间：${currentUser.registeredAt}`}</p>}
      <UserForm
        isCreateMode={isCreateMode}
        userInfo={isCreateMode ? undefined : currentUser}
      />
    </div>
  );
};

export default UserDetail;
