import { FC, useState } from "react";
import styled from "styled-components";
import { Question } from "../../types/question";
import type { UserForm } from "../../types/userForm";
import helper from "../../utils/helper";
import questionConfig from "../../configs/questionConfig";

import OneLineText from "./Questions/OneLineText";
import MultipleLineText from "./Questions/MultipleLineText";
import Introduction from "./Questions/Introdction";
import OneChoice from "./Questions/OneChoice";
import MultiChoice from "./Questions/MultipleChoice";
import Martix from "./Questions/Maritx";
import Slider from "./Questions/Slider";
import Sort from "./Questions/Sort";
import Date from "./Questions/Date";
import styleConfig from "../../configs/styleConfig";
import StartPageSection from "./StartPageSection";
import EndPageSection from "./EndPageSection";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useRouter } from "next/router";

type FormProps = UserForm;
interface MainProps {
  font: string;
  backgroundImage: string;
}

const SinglePageMain = styled.main<MainProps>`
  width: 100%;
  height: 100vh;

  font-family: ${(props: MainProps) => {
    const fontKey = styleConfig[`${props.font}_KEYFONT`];
    return `${styleConfig[fontKey]}`;
  }};

  background-image: ${(props: MainProps) => `url(${props.backgroundImage})`};
  background-size: cover;

  overflow-y: scroll;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const MultiPageMain = styled.main<MainProps>`
  width: 100%;
  height: 100vh;

  font-family: ${(props: MainProps) => {
    const fontKey = styleConfig[`${props.font}_KEYFONT`];
    return `${styleConfig[fontKey]}`;
  }};

  /* background-image: ${(props: MainProps) =>
    `url(${props.backgroundImage})`}; */
  /* background-image: linear-gradient(
      to right,
      rgba(255, 255, 255, 0.7),
      rgba(255, 255, 255, 0.7)
    ),
    url("https://images.unsplash.com/photo-1485686531765-ba63b07845a7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1167&q=80"); */

  background-size: cover;

  overflow: hidden;
`;

const SinglePageFormSection = styled.section`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const SinglePageFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 96rem;
`;

const MultiPageFormSection = styled.section`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const MultiPageFormQuestionButtonText = styled.span`
  font-size: 1.4rem;
  color: #fff;
`;

interface MultiPageFormQuestionButtonProps {
  isLastPage: boolean;
}

const MultiPageFormQuestionButton = styled.button<MultiPageFormQuestionButtonProps>`
  position: absolute;
  ${(props: MultiPageFormQuestionButtonProps) =>
    props.isLastPage ? "left: 30%" : "right: 30%"};
  bottom: 4rem;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 16rem;
  height: 4rem;
  background-color: ${(props) => props.theme.title};
  cursor: pointer;

  &:hover {
    background-color: ${(props) => props.theme.note};
  }

  &:hover > ${MultiPageFormQuestionButtonText} {
    color: #333;
  }
`;

const FormContainer = styled.div`
  width: 96rem;
  height: 70%;
  padding: 4rem;
  overflow: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const QuestionContainer = styled.div`
  width: 100%;
  &:not(:last-child) {
    margin-bottom: 4rem;
  }
`;

const Heading = styled.div`
  display: inline-block;
  font-size: 2rem;
  line-break: strict;
  color: ${(props) => {
    return props.theme.title;
  }};

  &:not(:last-child) {
    margin-bottom: 3rem;
  }
`;

const NoteText = styled.div`
  width: 100%;
  color: #aaa;
  font-size: 1.6rem;
  margin-bottom: 2rem;
  color: ${(props) => props.theme.note}; ;
`;

const RequireQuestionTag = styled.div`
  display: inline-block;
  margin-left: 1rem;
  width: 5rem;
  height: 2.4rem;
  border-radius: 30px;
  background-color: ${(props) => props.theme.option};
  text-align: center;
  line-height: 24px;
  color: ${(props) => props.theme.optionText};
`;

const generateResponsedUserFormQuestion = (
  questionType: string,
  question: Question
) => {
  switch (questionType) {
    case questionConfig.ONE_LINE_TEXT: {
      if (!question.validations.length) return;
      return (
        <OneLineText
          textType="text"
          length={question.validations.length}
          questionId={question.id}
        />
      );
    }

    case questionConfig.MULTIPLE_LINE_TEXT: {
      return (
        <MultipleLineText
          maxLength={question.validations.length}
          questionId={question.id}
        />
      );
    }

    case questionConfig.INTRODUCTION: {
      return <Introduction textContent={question.title} />;
    }

    case questionConfig.ONE_CHOICE: {
      if (question.options) {
        return (
          <OneChoice options={question.options} questionId={question.id} />
        );
      }
    }

    case questionConfig.MULTIPLE_CHOICE: {
      if (question.options && question.validations.maxSelected) {
        return (
          <MultiChoice
            options={question.options}
            maxSelected={question.validations.maxSelected}
            questionId={question.id}
          />
        );
      }
    }

    case questionConfig.MARTIX: {
      if (question.options && question.martixs) {
        return (
          <Martix
            options={question.options}
            martixs={question.martixs}
            questionId={question.id}
          />
        );
      }
    }

    case questionConfig.NUMBER: {
      return (
        <OneLineText
          textType="number"
          questionId={question.id}
          max={question.validations.max}
          min={question.validations.min}
          decimal={question.validations.decimal}
        />
      );
    }

    case questionConfig.SLIDER: {
      return (
        <Slider
          questionId={question.id}
          max={question.validations.max && question.validations.max}
          min={question.validations.min && question.validations.min}
          unit={question.validations.unit && question.validations.unit}
          interval={
            question.validations.interval && question.validations.interval
          }
        />
      );
    }

    case questionConfig.SORT: {
      if (question.options && question.validations.maxSelected) {
        return (
          <Sort
            options={question.options}
            maxSelected={question.validations.maxSelected}
            questionId={question.id}
          />
        );
      }
      return;
    }
    case questionConfig.DATE: {
      if (!question.validations.startDate || !question.validations.endDate) {
        return (
          <Date
            questionId={question.id}
            isMultipleDate={question.validations.multipleDate}
            hasRange={question.validations.hasRange}
          />
        );
      }
      return (
        <Date
          questionId={question.id}
          isMultipleDate={question.validations.multipleDate}
          hasRange={question.validations.hasRange}
          startDate={question.validations.startDate}
          endDate={question.validations.endDate}
        />
      );
    }
  }
};

const Form: FC<FormProps> = ({
  responseDocId,
  questions,
  settings,
  styles,
}: FormProps) => {
  const router = useRouter();
  const { formId } = router.query;
  const { answers } = useAppSelector((state) => state.user);

  const [navigatePage, setNavigatePage] = useState<number>(0);
  const [questionPage, setQuestionPage] = useState<number>(0);
  const indexArr = helper.generateQuestionIndexArr(questions);
  const indexInDifferentPageArr = helper.generateQuestionMultiPageIndexArr(
    settings.pageQuantity,
    questions
  );
  const questionsInDiffernetPageArr = helper.generateDifferentPageQuestionsArr(
    settings.pageQuantity,
    questions
  );

  const sendResponses = async () => {
    try {
      const response = await fetch("/api/user/response", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          answers,
          responseDocId,
          formId,
        }),
      });

      const data = await response.json();
      if (data.status !== "success") throw new Error(data.message);
      alert("回應成功!");
      setNavigatePage(2);
    } catch (error) {
      console.error(error);
    }
  };
  console.log(answers);

  return (
    <>
      {settings.mode === "0" && (
        <SinglePageMain
          font={styles.font}
          backgroundImage={styles.backgroundImages[0]}
        >
          <StartPageSection
            title={settings.title}
            imageUrl={settings.startPageImageFile}
            startPageParagraph={settings.startPageParagraph}
            mode={settings.mode}
          />
          <SinglePageFormSection>
            <SinglePageFormContainer>
              {questions.map((question, i) => {
                return (
                  <QuestionContainer key={i}>
                    {question.type !== "2" && (
                      <>
                        <Heading>
                          {helper.generateUserFormQuestionTitle(
                            indexArr[i],
                            question.title
                          )}
                        </Heading>
                        <NoteText>{question.note}</NoteText>
                      </>
                    )}
                    {generateResponsedUserFormQuestion(question.type, question)}
                  </QuestionContainer>
                );
              })}
            </SinglePageFormContainer>
          </SinglePageFormSection>
          <EndPageSection
            endPageParagraph={settings.endPageParagraph}
            imageUrl={settings.endPageImageFile}
          />
        </SinglePageMain>
      )}
      {settings.mode === "1" && (
        <MultiPageMain
          font={styles.font}
          backgroundImage={styles.backgroundImages[0]}
        >
          {navigatePage === 0 && (
            <StartPageSection
              title={settings.title}
              imageUrl={settings.startPageImageFile}
              startPageParagraph={settings.startPageParagraph}
              mode={settings.mode}
              setNavigatePage={setNavigatePage}
            />
          )}

          {navigatePage === 1 && (
            <MultiPageFormSection>
              <FormContainer>
                <MultiPageFormQuestionButton
                  isLastPage
                  onClick={() => {
                    if (questionPage === 0) {
                      setNavigatePage(0);
                      return;
                    }
                    setQuestionPage((prevState) => prevState - 1);
                  }}
                >
                  <MultiPageFormQuestionButtonText>
                    {questionPage === 0 ? "回到歡迎頁" : "上一頁"}
                  </MultiPageFormQuestionButtonText>
                </MultiPageFormQuestionButton>
                <MultiPageFormQuestionButton
                  isLastPage={false}
                  onClick={() => {
                    if (
                      questionPage ===
                      questionsInDiffernetPageArr.length - 1
                    ) {
                      sendResponses();
                      return;
                    }
                    setQuestionPage((prevState) => prevState + 1);
                  }}
                >
                  <MultiPageFormQuestionButtonText>
                    {questionPage === questionsInDiffernetPageArr.length - 1
                      ? "送出問卷回覆"
                      : "下一頁"}
                  </MultiPageFormQuestionButtonText>
                </MultiPageFormQuestionButton>
                {questions
                  .filter((question) => question.page === questionPage + 1)
                  .map((question, i) => {
                    return (
                      <QuestionContainer key={i}>
                        {question.type !== "2" && (
                          <>
                            <Heading>
                              {helper.generateUserFormQuestionTitle(
                                indexInDifferentPageArr[questionPage][i],
                                question.title
                              )}
                            </Heading>
                            {question.validations.required && (
                              <RequireQuestionTag>必填</RequireQuestionTag>
                            )}
                            {question.note !== "" && (
                              <NoteText>{question.note}</NoteText>
                            )}
                          </>
                        )}
                        {generateResponsedUserFormQuestion(
                          question.type,
                          question
                        )}
                      </QuestionContainer>
                    );
                  })}
              </FormContainer>
            </MultiPageFormSection>
          )}

          {navigatePage === 2 && (
            <EndPageSection
              endPageParagraph={settings.endPageParagraph}
              imageUrl={settings.endPageImageFile}
            />
          )}
        </MultiPageMain>
      )}
    </>
  );
};

export default Form;