import { FC } from "react";

import styled from "styled-components";
import DeleteSharpIcon from "@mui/icons-material/DeleteSharp";

import CreatedQuestion from "./CreatedQuestion";

import helper from "../../../../../utils/helper";

const CreatedQuestionWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin-top: 2rem;
`;

const DeleteButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 5rem;
  height: 100%;
`;

interface SingplePageProps {
  id: string;
  type: string;
  title: string;
  note: string;
  deleteQuestionHandler: (questionId: string) => void;
}

const SinglePage: FC<SingplePageProps> = ({
  id,
  type,
  title,
  note,
  deleteQuestionHandler,
}: SingplePageProps) => {
  return (
    <CreatedQuestionWrapper>
      <DeleteButtonWrapper onClick={() => deleteQuestionHandler(id)}>
        <DeleteSharpIcon
          sx={{
            width: "100%",
            height: "2rem",
            fill: "#c8c8c8",
            cursor: "pointer",
          }}
        />
      </DeleteButtonWrapper>
      <CreatedQuestion
        title={type === "2" ? "引言" : title}
        note={note}
        questionType={type}
      />
    </CreatedQuestionWrapper>
  );
};

export default SinglePage;