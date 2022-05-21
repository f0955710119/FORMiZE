import { CaseReducer, PayloadAction } from "@reduxjs/toolkit";
import { text } from "stream/consumers";

import questionDefaultConfig from "../../configs/questionDefaultConfig";
import type { Question, UpdateValue } from "../../types/question";
import type { Validation } from "../../types/validation";
import helper from "../../utils/helper";
import questionActionType from "../actionType/questionActionType";
import type { QuestionState } from "../slice/questionSlice";

const initQuestion: CaseReducer<QuestionState> = (state) => {
  state.accumulatedInValidInputError = [{ id: "", message: "" }];
  state.currentStep = 1;
  state.editingFormPage = 1;
  state.editingQuestionId = null;
  state.questions = [];
  state.willSwitcEditinghQuestion = false;
};

const addNewQuestion: CaseReducer<QuestionState, PayloadAction<Question>> = (
  state,
  action
) => {
  state.questions.push(action.payload);
  state.questions = state.questions.sort((a, b) => a.page - b.page);
};

const deleteExistedQuestion: CaseReducer<
  QuestionState,
  PayloadAction<string>
> = (state, action) => {
  state.questions = state.questions.filter(
    (question) => question.id !== action.payload
  );
};

const updateSiglePropOfQuestion: CaseReducer<
  QuestionState,
  PayloadAction<{
    id: string;
    actionType: string;
    text?: string;
    number?: number;
    stringArr?: string[];
    validations?: Validation;
  }>
> = (state, action) => {
  const { id, actionType, text, number, stringArr, validations } =
    action.payload;

  const responsedActionTypeConfig: { [key: string]: string } = {
    ...questionActionType,
  };

  const updateValueConfig: { [key: string]: UpdateValue } = {
    title: text,
    note: text,
    type: text,
    page: number,
    options: stringArr,
    matrixs: stringArr,
    validations: validations,
  };

  const updateStateKey = responsedActionTypeConfig[actionType.toUpperCase()];
  const updateStateValue = updateValueConfig[updateStateKey];

  state.questions = state.questions.map((question) => {
    if (question.id !== id) return question;
    return {
      ...question,
      [updateStateKey]: updateStateValue,
    };
  });
};

const initRangeDateOfDateQuestion: CaseReducer<
  QuestionState,
  PayloadAction<{
    id: string;
    startDate: string | null;
    endDate: string | null;
  }>
> = (state, action) => {
  state.questions = state.questions.map((question) => {
    if (question.id !== action.payload.id) return question;
    return {
      ...question,
      validations: {
        ...question.validations,
        startDate: action.payload.startDate,
        endDate: action.payload.endDate,
      },
    };
  });
};

const switchEditingQuestion: CaseReducer<
  QuestionState,
  PayloadAction<string | null>
> = (state, action) => {
  state.editingQuestionId = action.payload;
};

const willChangeLimitationValue: CaseReducer<
  QuestionState,
  PayloadAction<boolean>
> = (state, action) => {
  state.willSwitcEditinghQuestion = action.payload;
};

const switchCreatingFormStep: CaseReducer<
  QuestionState,
  PayloadAction<number>
> = (state, action) => {
  state.currentStep = action.payload;
};

const switchEditingFormPage: CaseReducer<
  QuestionState,
  PayloadAction<number>
> = (state, action) => {
  state.editingFormPage = action.payload;
};

const setIsEditingOption: CaseReducer<
  QuestionState,
  PayloadAction<{ setEditingState: boolean; isReset: boolean }>
> = (state, action) => {
  if (action.payload.isReset) {
    state.isEditingOption = false;
    state.editingOptionQuantity = 0;
    return;
  }

  const upateEditingOptionQuantity = action.payload.setEditingState
    ? state.editingOptionQuantity + 1
    : state.editingOptionQuantity - 1;

  state.editingOptionQuantity = upateEditingOptionQuantity;

  const setEditingOption = upateEditingOptionQuantity > 0 ? true : false;
  state.isEditingOption = setEditingOption;
};

const setIsSwitchingEditingOption: CaseReducer<
  QuestionState,
  PayloadAction<boolean>
> = (state, action) => {
  state.isSwitchingEditingOption = action.payload;
};

const setIsEditingMatrix: CaseReducer<
  QuestionState,
  PayloadAction<{ setEditingState: boolean; isReset: boolean }>
> = (state, action) => {
  if (action.payload.isReset) {
    state.editingMatrixQuantity = 0;
    state.isEditingMatrix = false;
    return;
  }

  const upateEditingMatrixQuantity = action.payload.setEditingState
    ? state.editingMatrixQuantity + 1
    : state.editingMatrixQuantity - 1;

  state.editingMatrixQuantity = upateEditingMatrixQuantity;

  const setEditingMatrix = upateEditingMatrixQuantity > 0 ? true : false;
  state.isEditingMatrix = setEditingMatrix;
};

const setIsSwitchingEditingMatrix: CaseReducer<
  QuestionState,
  PayloadAction<boolean>
> = (state, action) => {
  state.isSwitchingEditingMatrix = action.payload;
};

const addNewFormPage: CaseReducer<
  QuestionState,
  PayloadAction<{
    questionType: string;
    newPage: number;
  }>
> = (state, action) => {
  const defaultQuestionType = helper.generateResponsedQuestionDefault(
    action.payload.questionType
  );

  const defaultQuestion = {
    ...questionDefaultConfig[defaultQuestionType],
    id: helper.generateId(8),
    page: action.payload.newPage,
  };

  state.editingQuestionId = defaultQuestion.id;
  state.questions.push(defaultQuestion);
  state.questions = state.questions.sort((a, b) => a.page - b.page);
  state.editingFormPage = action.payload.newPage;
};

const updateQuestionPage: CaseReducer<
  QuestionState,
  PayloadAction<{ page: number; isSwitchMode?: boolean }>
> = (state, action) => {
  if (action.payload.isSwitchMode) {
    state.questions = state.questions.map((question) => {
      return {
        ...question,
        page: 1,
      };
    });
    return;
  }
  state.questions = state.questions.map((question) => {
    if (question.page === 1) return question;
    if (question.page < action.payload.page) return question;
    const updateQuestion = {
      ...question,
      page: question.page - 1,
    };
    return updateQuestion;
  });
};

export default {
  initQuestion,
  addNewQuestion,
  deleteExistedQuestion,
  updateSiglePropOfQuestion,
  initRangeDateOfDateQuestion,
  switchEditingQuestion,
  willChangeLimitationValue,
  switchCreatingFormStep,
  switchEditingFormPage,
  setIsEditingOption,
  setIsSwitchingEditingOption,
  setIsEditingMatrix,
  setIsSwitchingEditingMatrix,
  addNewFormPage,
  updateQuestionPage,
};
