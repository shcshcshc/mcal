/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";

export function CalList(props: {
  src: string;
  to: string;
  title: string;
}): JSX.Element {
  const navigate = useNavigate();
  const { src, to, title } = props;
  return (
    <h2
      css={css`
        display: inline-flex;
        padding: 10px 10px 10px 10px;
        border: 1px solid black;
        cursor: pointer;
      `}
      onClick={() => {
        navigate(to);
      }}
    >
      <CalListImg src={src} />
      {title}
    </h2>
  );
}

const CalListImg = styled.img`
  width: 30px;
  height: 30px;
  margin-top: 2px;
  margin-right: 10px;
`;
