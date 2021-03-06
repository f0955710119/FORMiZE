import { FC, useState } from "react";

import { FormControl, RadioGroup, Radio } from "@mui/material";
import styled from "styled-components";

import useAppDispatch from "../../../hooks/useAppDispatch";
import useAppSelector from "../../../hooks/useAppSelector";
import useCheckAnswerValid from "../../../hooks/useCheckAnswerValid";
import useGetQuestionIdIndex from "../../../hooks/useGetQuestionIdIndex";
import { userActions } from "../../../store/slice/userSlice";
import {
  CustomIcon,
  CustomCheckedIcon,
  CustomFormLabel,
} from "./ChoiceIcon/icon";

const CustomFormControl = styled(FormControl)`
  width: 100%;
  display: block;

  & .MuiTypography-root {
    margin-left: 1rem;
    font-family: inherit;
    font-size: 1.8rem;
  }

  & .MuiFormControlLabel-root {
    margin-right: 0;
    width: 100%;
  }

  & .MuiRadio-root:hover {
    background-color: transparent;
  }
`;

const CustomRadioGroup = styled(RadioGroup)`
  align-items: end;
`;

const CustomRadio = styled(Radio)``;

interface OneChoiceProps {
  options: string[];
  questionId: string;
  isCreatingProcess: boolean;
}

const OneChoice: FC<OneChoiceProps> = ({
  options,
  questionId,
  isCreatingProcess = false,
}) => {
  const dispatch = useAppDispatch();
  const { answers } = useAppSelector((state) => state.user);
  const showInvalidHandler = useCheckAnswerValid(questionId);
  const questionIdIndex = useGetQuestionIdIndex(questionId);
  const existingInput = answers[questionIdIndex]
    ? answers[questionIdIndex].input
    : "";
  const [previewChecked, setPreviewChecked] = useState<string>("");

  return (
    <CustomFormControl>
      <CustomRadioGroup
        aria-labelledby="one-choice-question"
        name="one-choice-question-radio-buttons-group"
        onChange={(event) => {
          const input = event.target.value;
          if (isCreatingProcess) {
            setPreviewChecked(input);
            return;
          }
          dispatch(userActions.updateFormAnswer({ questionIdIndex, input }));
          showInvalidHandler("");
        }}
      >
        {options.map((option, i) => {
          const checkedForCreatingProcess =
            previewChecked === `${i + 1}.${option}`;
          const checkedForUserFillingProcess =
            existingInput === `${i + 1}.${option}`;
          const renderCheckedStatus = isCreatingProcess
            ? checkedForCreatingProcess
            : checkedForUserFillingProcess;

          return (
            <CustomFormLabel
              active={renderCheckedStatus ? "true" : "false"}
              value={`${i + 1}.${option}`}
              control={
                <CustomRadio
                  disableRipple
                  disableTouchRipple
                  checked={renderCheckedStatus}
                  icon={<CustomIcon />}
                  checkedIcon={<CustomCheckedIcon />}
                  size="medium"
                />
              }
              label={option}
              key={i}
            />
          );
        })}
      </CustomRadioGroup>
    </CustomFormControl>
  );
};

export default OneChoice;
