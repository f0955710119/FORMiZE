import { FC, useContext } from "react";

import styled from "styled-components";

import breakpointConfig from "../../../../../configs/breakpointConfig";
import questionConfig from "../../../../../configs/questionConfig";
import useAppDispatch from "../../../../../hooks/useAppDispatch";
import useAppSelector from "../../../../../hooks/useAppSelector";
import useSwitchCurrentStep from "../../../../../hooks/useSwitchCurrentStep";
import settingActinoType from "../../../../../store/actionType/settingActionType";
import { settingContext } from "../../../../../store/context/settingContext";
import { questionActions } from "../../../../../store/slice/questionSlice";
import sweetAlert from "../../../../../utils/sweetAlert";
import scrollBar from "../../../../UI/scrollBar";
import Layout from "../../UI/Layout";
import { Heading } from "../../UI/SectionHeading";
import OptionItem from "./OptionItem";

const OptionsLayout = styled(Layout)`
  width: 18%;
  overflow: scroll;

  &::-webkit-scrollbar {
    display: none;
  }

  @media ${breakpointConfig.laptopM} {
    width: 100%;
    order: 3;
    height: 49vh;
    padding: 2rem 3rem 0 3rem;
    margin-bottom: 1rem;
  }

  @media ${breakpointConfig.tablet} {
    padding: 0 6rem 0 6rem;
  } ;
`;

const OptionHeading = styled(Heading)`
  margin-bottom: 2rem;
  color: #c9ab59;
  border-bottom: 1px solid #c9ab59;
  cursor: default;
`;

const OptionList = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
  padding-right: 1rem;
  width: 100%;
  height: 65vh;
  overflow-y: scroll;
  ${scrollBar}

  @media ${breakpointConfig.desktopM} {
    height: 60vh;
  }

  @media ${breakpointConfig.desktopS} {
    height: 55vh;
  }

  @media ${breakpointConfig.laptopM} {
    height: 25vh;
  }

  @media ${breakpointConfig.tabletS} {
    height: 26vh;
  }
`;

const ButtonWrapper = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem 3rem;
  width: 100%;
  height: 4rem;
  background-color: #c8c8c8;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #ffc652c2;
  }

  &:not(:last-child) {
    margin-bottom: 1rem;
  }
`;

const ButtonText = styled.span`
  font-size: 1.4rem;
`;

const AddPageButton = styled(ButtonWrapper)`
  background-color: #c8c8c8;
  &:hover {
    color: #fff;
    background-color: #333;
  }
`;

const NavigatorButton = styled(ButtonWrapper)`
  background-color: #c8c8c8;
`;

const customIconStyleString = `
  transform: translateY(-0.6rem);
`;

const questionList = Array(10)
  .fill(null)
  .map((_, i) => questionConfig[i]);

const questionListConfig: { [key: string]: string } = {};

questionList.forEach((question, i) => {
  questionListConfig[question] = question;
});

interface OptionItem {
  title: string;
  questionType: string;
  iconComponent: JSX.Element;
}

const QuestionOptions: FC = () => {
  const dispatch = useAppDispatch();
  const { questions } = useAppSelector((state) => state.question);
  const { pageQuantity, mode, setField } = useContext(settingContext);
  const switchStepHandler = useSwitchCurrentStep();

  const addNewFormPageHandler = (selectedNewQuestion: string) => {
    dispatch(
      questionActions.addNewFormPage({
        questionType: selectedNewQuestion,
        newPage: pageQuantity + 1,
      })
    );
    setField(settingActinoType.PAGE_QUANTITY, pageQuantity + 1);
  };

  return (
    <OptionsLayout>
      <OptionHeading>??????</OptionHeading>
      <OptionList>
        {questionList.map((title, i) => (
          <OptionItem title={title} questionType={`${i}`} key={title} />
        ))}
      </OptionList>

      <OptionHeading>????????????</OptionHeading>
      {mode === "1" && (
        <AddPageButton
          type="button"
          onClick={async () => {
            if (questions.length === 0) {
              sweetAlert.errorReminderAlert(
                "??????????????????????????????????????????????????????????????????????????????"
              );
              return;
            }
            const selectedNewQuestionType = await sweetAlert.selectInputAlert({
              title: "?????????????????????",
              text: "????????????????????????????????????????????????????????????\n???????????????????????????????????????",
              inputOptions: questionListConfig,
              inputPlaceholder: "????????????",
            });
            const selectedQuestionTypeTitle = selectedNewQuestionType.value;
            const selectedQuestionType = Object.values(
              questionListConfig
            ).indexOf(selectedQuestionTypeTitle);

            if (selectedQuestionType === -1) return;

            addNewFormPageHandler(`${selectedQuestionType}`);
          }}
        >
          <ButtonText>????????????</ButtonText>
        </AddPageButton>
      )}

      <NavigatorButton
        type="button"
        onClick={() => {
          switchStepHandler(3);
        }}
      >
        <ButtonText>????????????????????????</ButtonText>
      </NavigatorButton>
      <ButtonWrapper
        type="button"
        onClick={() => {
          switchStepHandler(1);
        }}
      >
        <ButtonText>??????????????????</ButtonText>
      </ButtonWrapper>
    </OptionsLayout>
  );
};

export default QuestionOptions;
