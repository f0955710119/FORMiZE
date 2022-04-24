import { ChangeEventHandler, FC } from "react";
import styled from "styled-components";
import UISlider from "@mui/material/Slider";
import useCheckValidTimer from "../../../hooks/useCheckValidTimer";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import useGetQuestionIdIndex from "../../../hooks/useGetQuestionIdIndex";
import { userActions } from "../../../store/slice/userSlice";

const SliderWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;
const CustomSlider = styled(UISlider)`
  width: 80%;
  color: ${(props) => props.theme.title};
  & .css-187mznn-MuiSlider-root {
    color: ${(props) => props.theme.title};
  }
  & .MuiSlider-rail {
    color: ${(props) => props.theme.title};
  }
`;

interface SliderProps {
  questionId: string;
  min?: number;
  max?: number;
  unit?: string;
  interval?: number;
}

// 之後做這塊的取值不要用state的方式拿，寫ref去取，不然太耗能(畢竟state跟ref分開)
const Slider: FC<SliderProps> = ({
  questionId,
  min,
  max,
  unit,
  interval,
}: SliderProps) => {
  const dispatch = useAppDispatch();
  const hasMax = max ? max : 100;
  const hasMin = min ? min : 1;
  const questionIdIndex = useGetQuestionIdIndex(questionId);
  const checkValidTimerHandler = useCheckValidTimer();
  const changeSliderHandler = (event: Event) => {
    checkValidTimerHandler(() => {
      if (!event.target) return;
      const { value } = event.target as HTMLInputElement;
      const input = "" + value;
      dispatch(userActions.updateFormAnswer({ questionIdIndex, input }));
    }, 500);
  };
  return (
    <SliderWrapper>
      <span>{unit ? hasMin + unit : hasMin}</span>
      <CustomSlider
        defaultValue={30}
        step={interval ? interval : 1}
        min={hasMin}
        max={hasMax}
        valueLabelDisplay="auto"
        onChange={changeSliderHandler}
      />
      <span>{unit ? hasMax + unit : hasMax}</span>
    </SliderWrapper>
  );
};

export default Slider;
