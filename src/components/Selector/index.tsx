import { Select } from "antd";
import React from "react";

interface IProps {
  value: string;
  options: string[];
  style?: React.CSSProperties;
  onHandleChange?: (value: string) => void;
}

const { Option } = Select;

const Selector: React.FC<IProps> = (props: IProps) => {
  const { value, options, onHandleChange, style } = props;
  return (
    <Select value={value} style={style} onChange={onHandleChange}>
      {options.map((item: string) => (
        <Option value={item} key={item}>
          {item}
        </Option>
      ))}
    </Select>
  );
};

export default Selector;
