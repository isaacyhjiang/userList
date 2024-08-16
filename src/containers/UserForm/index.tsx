import React, { useEffect, useState } from "react";
import { UserInfo } from "../../interface";
import { Button, DatePicker, Form, Input, InputNumber } from "antd";
import { useNavigate } from "react-router-dom";
import { addUserData, editUserData } from "../../service";
import Selector from "../../components/Selector";
import dayjs from "dayjs";

interface IProps {
  isCreateMode: boolean;
  userInfo?: UserInfo;
}

const UserForm: React.FC<IProps> = (props: IProps) => {
  const [form] = Form.useForm();
  const {
    userInfo: {
      name,
      height,
      weight,
      gender,
      birthday,
      email,
      id,
      registeredAt,
    } = {},
    isCreateMode,
  } = props;
  const heightInfo = height ? height.toString().split(" ") : [];
  const weightInfo = weight ? weight.toString().split(" ") : [];
  const [heightUnit, setHeightUnit] = useState(
    heightInfo.length ? heightInfo[1] : "cm",
  );
  const [weightUnit, setWeightUnit] = useState(
    weightInfo.length ? weightInfo[1] : "kg",
  );

  const navigate = useNavigate();
  const onHandleEdit = async (values: any) => {
    editUserData({
      ...values,
      id,
      registeredAt,
      weight: `${values.weight} ${values.weightUnit}`,
      height: `${values.height} ${values.heightUnit}`,
    });
    navigate("/", { state: { updated: "true" } });
  };
  const onHandleCreate = async (values: any) => {
    addUserData(values);
    navigate("/", { state: { updated: "true" } });
  };

  useEffect(() => {
    form.setFieldsValue({
      name,
      gender,
      email,
      height: heightInfo?.length ? heightInfo[0] : "",
      weight: weightInfo?.length ? weightInfo[0] : "",
      birthday: birthday ? dayjs(birthday) : null,
      heightUnit: heightInfo?.length ? heightInfo[1] : "",
      weightUnit: weightInfo?.length ? weightInfo[1] : "",
    });
  }, [props.userInfo, form]);

  const unitSelector = (type: string) => {
    return (
      <Form.Item name={type === "weight" ? "weightUnit" : "heightUnit"}>
        <Selector
          value={type === "weight" ? weightUnit : heightUnit}
          options={type === "weight" ? ["kg", "lbs"] : ["cm", "m"]}
          style={{ width: 100 }}
          onHandleChange={(value) => {
            if (type === "weight") {
              setWeightUnit(value);
              form.setFieldsValue({
                weightUnit: value,
              });
            } else {
              setHeightUnit(value);
              form.setFieldsValue({
                heightUnit: value,
              });
            }
          }}
        />
      </Form.Item>
    );
  };
  return (
    <Form
      name="user_form"
      form={form}
      style={{ maxWidth: 600 }}
      onFinish={isCreateMode ? onHandleCreate : onHandleEdit}
    >
      <Form.Item name="name" label="姓名">
        <Input />
      </Form.Item>
      <Form.Item name="email" label="邮箱">
        <Input />
      </Form.Item>
      <Form.Item name="height" label="身高">
        <InputNumber
          style={{ width: "100%" }}
          addonAfter={unitSelector("height")}
        />
      </Form.Item>
      <Form.Item name="weight" label="体重">
        <InputNumber
          style={{ width: "100%" }}
          addonAfter={unitSelector("weight")}
        />
      </Form.Item>
      <Form.Item name="gender" label="性别">
        <Selector
          value={gender || ""}
          options={["male", "female", "other"]}
          onHandleChange={(value) => form.setFieldsValue({ gender: value })}
        />
      </Form.Item>
      <Form.Item name="birthday" label="生日">
        <DatePicker format="YYYY-MM-DD" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          提交
        </Button>
      </Form.Item>
    </Form>
  );
};

export default UserForm;
