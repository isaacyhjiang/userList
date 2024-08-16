import { UserInfo } from "../interface";
import { generateRandomId } from "../utils";

export const editUserData = (input: UserInfo) => {
  fetch(`http://localhost:8000/users/${input.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(input),
  })
    .then((response) => response.json())
    .then(() => alert("用户已更新"))
    .catch((error) => console.error("Error:", error));
};

export const addUserData = (input: UserInfo) => {
  fetch("http://localhost:8000/users/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...input,
      id: generateRandomId(),
      registeredAt: new Date().toISOString(),
    }),
  })
    .then((response) => response.json())
    .then(() => alert("已新增用户"))
    .catch((error) => console.error("Error:", error));
};

export const deleteUserData = (id: string) => {
  fetch(`http://localhost:8000/users/${id}`, {
    method: "DELETE",
  })
    .then((response) => response.json())
    .then(() => alert("用户已删除"))
    .catch((error) => console.error("Error:", error));
};
