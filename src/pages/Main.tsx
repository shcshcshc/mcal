/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import { CalList } from "../components/CalList";
import FlameImg from "../imgs/younghwan.png";

export function Main(): JSX.Element {
  return (
    <MainContainer>
      <CalListContainer>
        <CalList title="환생의 불꽃" to="/reborn_flame" src={FlameImg} />
      </CalListContainer>
      <Footer>
        <a
          href="https://open.kakao.com/me/firsthunt"
          target="_blank"
          rel="noreferrer"
        >
          오픈 카톡 문의
        </a>
      </Footer>
    </MainContainer>
  );
}

const MainContainer = styled.div`
  margin-left: 20px;
`;

const CalListContainer = styled.div`
  display: flex;
  height: 80%;
`;

const Footer = styled.div`
  margin-top: 20px;
  font-size: 1em;
`;
