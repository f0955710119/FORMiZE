import { FC } from "react";
import styled from "styled-components";
import { Autocomplete, TextField } from "@mui/material";

import SectionWrapper from "../UI/Section";
import SectionHeading from "../UI/SectionHeading";
import Field from "../UI/Field";
import Label from "../UI/Label";
import Input from "../UI/Input";

const defalutFormStatus = ["公開", "待上線", "保護", "額滿", "關閉"];

const CustomedComboBox = styled(Autocomplete)`
  & div {
    border-radius: 0px;
    height: 100%;
  }

  & input {
    transform: translate(0, -8px);
  }

  & button {
    transform: translate(0, 3px);
  }
`;

const SectionNormal: FC = () => {
  return (
    <SectionWrapper>
      <SectionHeading>一般設定</SectionHeading>
      <Field>
        <Label>標題</Label>
        <Input type="text" />
      </Field>
      <Field>
        <Label>問卷狀態</Label>
        <CustomedComboBox
          disablePortal
          defaultValue="公開"
          options={defalutFormStatus}
          sx={{
            width: "calc(100% - 12rem)",
            height: "100%",
            borderRadius: `${0}px`,
            borderColor: "#f90",
          }}
          renderInput={(params) => <TextField {...params} label={""} />}
        />
      </Field>
      <Field>
        <Label>頁面模式</Label>
        <CustomedComboBox
          disablePortal
          defaultValue="一頁式"
          options={["一頁式", "分頁式"]}
          sx={{
            width: "calc(100% - 12rem)",
            height: "100%",
            borderRadius: `${0}px`,
            borderColor: "#f90",
          }}
          renderInput={(params) => <TextField {...params} label={""} />}
        />
      </Field>
      <Field>
        <Label>填答時間限制</Label>
        <Input type="text" value="10分鐘" disabled />
      </Field>
      <Field>
        <Label>上限回應筆數</Label>
        <Input type="text" value="20份" disabled />
      </Field>
    </SectionWrapper>
  );
};

export default SectionNormal;