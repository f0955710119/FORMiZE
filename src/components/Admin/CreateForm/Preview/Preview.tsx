import { FC } from "react";
import { useAppSelector } from "../../../../hooks/useAppSelector";

import styled from "styled-components";
import QuestionField from "./QuestionField";

import Layout from "../UI/Layout";

interface PreviewLayoutProps {
  fontFamily: string;
}

const PreviewLayout = styled(Layout)<PreviewLayoutProps>`
  @font-face {
    font-family: "jf-openhuninn";
    src: url("/fonts/jf-openhuninn-1.1.ttf") format("truetype");
  }
  @font-face {
    font-family: "HanaMinA";
    src: url("/fonts/HanaMinA.ttf") format("truetype");
  }
  @font-face {
    font-family: "TaipeiSansTC-Bold";
    src: url("/fonts/TaipeiSansTCBeta-Bold.ttf") format("truetype");
  }

  font-family: ${(props: PreviewLayoutProps) => props.fontFamily};

  display: flex;
  justify-content: center;
  align-items: center;
  width: 60%;
  padding: 0rem;
  background-image: linear-gradient(
      to bottom right,
      rgba(255, 255, 255, 0.7),
      rgba(255, 255, 255, 0.7)
    ),
    url("/images/stacked-waves-haikei.svg");
`;

const QuestionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 75%;
  height: 70%;

  overflow-y: scroll;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const Preview: FC = () => {
  const { questions } = useAppSelector((state) => state.question);
  const { font } = useAppSelector((state) => state.style);
  return (
    <PreviewLayout fontFamily={font}>
      <QuestionWrapper>
        {questions.map((question) => (
          <QuestionField question={question} key={question.id} />
        ))}
      </QuestionWrapper>
    </PreviewLayout>
  );
};

export default Preview;
