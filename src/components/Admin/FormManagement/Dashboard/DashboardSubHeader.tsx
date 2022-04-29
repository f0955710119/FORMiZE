import { FC } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import FilterComboBox from "./FilterComboBox";
import DisplayButtonGroup from "./DisplayButtonGroup";

import useInitNewForm from "../../../../hooks/useInitNewForm";

const defalutStatusOptions = ["公開", "待上線", "保護", "額滿", "關閉"];
const defalutDateOptions = ["最新創建", "最舊創建", "最新回覆", "最舊創建"];

const HeaderWrapper = styled.header`
  display: flex;
  align-items: center;
  margin: 1rem 0 0.5rem 0;
  padding-bottom: 2rem;
  width: 100%;
  height: 6rem;
`;

const FilterWrapper = styled.div`
  display: flex;
  align-items: center;
  width: calc(100% - 12rem);
  border-radius: 5px;
`;

const ButtonWrapper = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.4rem 1rem;
  width: 12rem;
  height: 4.6rem;
  background-color: #8e9aa2;
  cursor: pointer;
  color: #fff;
  font-family: inherit;

  border-radius: 3px;

  &:hover {
    background-color: #646665;
  }
`;

const ButtonText = styled.span`
  letter-spacing: 1px;
  font-size: 1.4rem;
`;

const DashboardSubHeader: FC = () => {
  const router = useRouter();
  const initHandler = useInitNewForm();

  const goAddNewFormHandler = (): void => {
    initHandler();
    router.push("/admin/new");
  };

  return (
    <HeaderWrapper>
      <FilterWrapper>
        <FilterComboBox
          fieldLabel="問卷狀態"
          options={defalutStatusOptions}
          id="form-status"
          style={{
            width: "15rem",
            radius: 0,
            mr: "2.4rem",
          }}
        />
        <FilterComboBox
          fieldLabel="日期"
          options={defalutDateOptions}
          id="form-date"
          style={{ width: "15rem", radius: 0, mr: "2.4rem" }}
        />
        <DisplayButtonGroup />
      </FilterWrapper>
      <ButtonWrapper onClick={goAddNewFormHandler}>
        <ButtonText>新增問卷</ButtonText>
      </ButtonWrapper>
    </HeaderWrapper>
  );
};

export default DashboardSubHeader;