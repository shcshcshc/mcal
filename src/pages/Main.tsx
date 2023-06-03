/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import { CalList } from "../components/CalList";
import FlameImg from "../imgs/younghwan.png";

export function Main(): JSX.Element {
  return (
    <MainContainer>
      <CalList title="환생의 불꽃" to="/reborn_flame" src={FlameImg} />
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
