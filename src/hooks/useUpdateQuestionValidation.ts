import questionActionType from "../store/actionType/questionActionType";
import { questionActions } from "../store/slice/questionSlice";
import type { Question } from "../types/question";
import sweetAlert from "../utils/sweetAlert";
import useAppDispatch from "./useAppDispatch";

const useUpdateQuestionValidation = (
  id: string,
  key: string,
  isNumber: boolean = true,
  question: Question,
  valiationHandler?: (value: string) => string | null
) => {
  const dispatch = useAppDispatch();

  const dispatchHandler = (value: string | null) => {
    try {
      if (question === undefined) return;
      if (value === null) {
        dispatch(
          questionActions.updateSiglePropOfQuestion({
            id,
            actionType: questionActionType.VALIDATIONS,
            validations: {
              ...question.validations,
              [`${key}`]: value,
            },
          })
        );
        return;
      }

      if (valiationHandler) {
        const inValidErrorMessage = valiationHandler(value);
        if (inValidErrorMessage) {
          sweetAlert.errorReminderAlert(inValidErrorMessage);
          throw inValidErrorMessage;
        }
      }

      dispatch(
        questionActions.updateSiglePropOfQuestion({
          id,
          actionType: questionActionType.VALIDATIONS,
          validations: {
            ...question.validations,
            [`${key}`]: isNumber ? +value : value,
          },
        })
      );
    } catch (error: any) {
      console.error(error.message);
    }
  };
  return dispatchHandler;
};

export default useUpdateQuestionValidation;
