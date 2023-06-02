/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";

export function Header(): JSX.Element {
  const navigate = useNavigate();
  return (
    <HeaderContainer>
      <h1
        onClick={() => {
          navigate("/");
        }}
      >
        메이플 계산기
      </h1>
      <h2>Made by 첫사냥</h2>
    </HeaderContainer>
  );
}

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  margin-left: 20px;
  h1 {
    cursor: pointer;
  }
  h2 {
    margin-left: auto;
    margin-right: 20px;
  }
`;
