import sweetAlert from "../utils/sweetAlert";
import useAppSelector from "./useAppSelector";
import useCheckQuestionArraySameString from "./useCheckQuestionArraySameString";
import useGetQuestionTitleIndex from "./useGetQuestionTitleIndex";

const useCheckEditingStateOfTextEditingField = () => {
  const { editingQuestionId, questions, isEditingOption, isEditingMatrix } = useAppSelector(
    (state) => state.question
  );
  const checkHasNoSameArrayStringNameHandler = useCheckQuestionArraySameString();
  const getTitleIndexHandler = useGetQuestionTitleIndex();
  const isEditingState = isEditingOption || isEditingMatrix;

  const checkHandler = (openEditingInputHandler: () => void, id: string) => {
    const willSwitchDifferentEditingQuestion =
      editingQuestionId !== null && editingQuestionId !== id;

    if (willSwitchDifferentEditingQuestion) {
      const hasNoSameStringName = checkHasNoSameArrayStringNameHandler();
      if (!hasNoSameStringName) return;
    }

    if (isEditingState && editingQuestionId !== null && editingQuestionId !== id) {
      const questionTitleIndex = getTitleIndexHandler(editingQuestionId);
      const question = questions.find((question) => question.id === id);

      sweetAlert.clickToConfirmAlert(
        {
          title: "準備切換編輯題目",
          text: `發現「${questionTitleIndex}.${
            question ? question.title : ""
          }」\n還有正在編輯的內容，\n直接切換編輯題目將不會存儲，\n確定要直接切換嗎?`,
          cancelButtonText: "取消",
          confirmButtonText: "確定",
        },
        openEditingInputHandler
      );
      return;
    }

    openEditingInputHandler();
  };

  return checkHandler;
};

export default useCheckEditingStateOfTextEditingField;
