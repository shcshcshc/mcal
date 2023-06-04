/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import MapleImg from "../imgs/maple.png";

export function Header(): JSX.Element {
  const navigate = useNavigate();
  return (
    <HeaderContainer>
      <h1
        css={css`
          display: inline-flex;
        `}
        onClick={() => {
          navigate("/mcal");
        }}
      >
        <HeaderImg src={MapleImg} />
        메이플 계산기
      </h1>
      <h2>Made by 첫사냥</h2>
    </HeaderContainer>
  );
}

const HeaderImg = styled.img`
  width: 40px;
  height: 40px;
  margin-top: 2px;
  margin-right: 5px;
`;

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  margin-left: 20px;
  h1 {
    cursor: pointer;
    align-items: center;
    @media (max-width: 768px) {
      font-size: 1.5em;
    }
  }
  h2 {
    margin-left: auto;
    margin-right: 20px;
    @media (max-width: 768px) {
      font-size: 1em;
    }
  }
`;
