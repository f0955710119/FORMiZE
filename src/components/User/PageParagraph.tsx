import { FC } from "react";
import styled from "styled-components";

const PageParagraphWrapper = styled.textarea`
  width: 100%;
  color: ${(props) => props.theme.title};
  font-size: 1.8rem;
  line-height: 1.38;
  white-space: pre-line;
  margin: 2rem auto 4rem 0;
  border: none;
  overflow: hidden;
  resize: none;
  word-break: normal;
  text-align: justify;

  &:disabled {
    background-color: transparent;
  }
`;

interface PageParagraphProps {
  paragraph: string;
  className?: string;
}

const PageParagraph: FC<PageParagraphProps> = ({ paragraph, className }) => {
  return (
    <PageParagraphWrapper
      className={className}
      rows={10}
      readOnly
      disabled
      cols={1}
    >
      {paragraph}
    </PageParagraphWrapper>
  );
};

export default PageParagraph;
