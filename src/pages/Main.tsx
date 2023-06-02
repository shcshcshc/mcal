/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";

export function Main(): JSX.Element {
  const navigate = useNavigate();
  return (
    <MainContainer>
      <h2
        onClick={() => {
          navigate("/reborn_flame");
        }}
      >
        환생의 불꽃
      </h2>
    </MainContainer>
  );
}

const MainContainer = styled.div`
  margin-left: 20px;
  h2 {
    cursor: pointer;
    margin-top: 20px;
  }
`;
