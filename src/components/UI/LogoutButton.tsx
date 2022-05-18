import { useRouter } from "next/router";

import { FC } from "react";

import styled from "styled-components";

import firebase from "../../utils/firebase";
import sweetAlert from "../../utils/sweetAlert";

const ButtonWrapper = styled.button`
  padding: 0.4rem 1rem;
  width: 10rem;
  height: 3.2rem;
  font-size: 1.6rem;
  line-height: 2.4rem;
  border-radius: 3px;
  background-color: #aaa;
  color: #fff;

  &:hover {
    background-color: #333;
  }
`;

const LogoutButton: FC = () => {
  const router = useRouter();
  const logoutHandler = async (logoutString: string = "登出成功，將回首頁") => {
    await firebase.nativeSignOut();
    sweetAlert.loadedReminderAlert(logoutString);
    setTimeout(() => {
      sweetAlert.closeAlert();
    }, 1500);
    router.push("/");
  };

  return (
    <ButtonWrapper
      type="button"
      onClick={() => {
        if (router.asPath === "/admin/new") {
          sweetAlert.clickToConfirmAlert(
            {
              title: "登出提醒",
              text: "您還在編輯狀態，\n直接登出會遺失該份問卷，\n確定要離開嗎?",
              cancelButtonText: "繼續編輯",
              confirmButtonText: "我要登出",
            },
            logoutHandler
          );
          return;
        }
        logoutHandler();
      }}
    >
      登出
    </ButtonWrapper>
  );
};

export default LogoutButton;
