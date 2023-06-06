/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import { CalList } from "../components/CalList";
import FlameImg from "../imgs/younghwan.png";
import CubeImg from "../imgs/cube.png";
import { useState } from "react";

export function Main(): JSX.Element {
  const [ratio, setRatio] = useState(3);
  const [prob, setProb] = useState(95);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRatio(Number(e.target.value));
  };
  const handleProbChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (Number(e.target.value) > 100) {
      setProb(100);
      return;
    }
    if (Number(e.target.value) < 0) {
      setProb(0);
      return;
    }
    setProb(Number(e.target.value));
  };
  return (
    <MainContainer>
      <CalListContainer>
        <CalList title="환생의 불꽃" to="/reborn_flame" src={FlameImg} />
        <CalList title="큐브" to="/cube" src={CubeImg} />
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
      <span>
        환불, 큐브 같이 완전한 독립시행의 기대값은 말 그대로 기대값으로써,
        이보다 더 많은 비용이 들 수 있습니다.
      </span>
      <span>
        기대값만큼 사용했을 때 원하는 옵션이 뜨지 않을 확률은 36.8% 정도입니다.
      </span>
      <span>
        기대값의{" "}
        <StyledInput type="number" value={ratio} onChange={handleChange} /> 배를
        사용했을 때 원하는 옵션이 뜰 확률은{" "}
        {Math.round((1 - Math.pow(0.3678794412, ratio)) * 10000000000) /
          100000000}
        % 정도입니다.
      </span>
      <span>
        <StyledInput type="number" value={prob} onChange={handleProbChange} />%
        확률로 원하는 옵션을 얻으려면 기대값의{" "}
        {Math.round(Math.log(1 - prob / 100) * -10000000000) / 10000000000}배를
        사용해야 합니다.
      </span>
      <span>* 스타포스는 독립시행이 아니므로 적용되지 않습니다.</span>
    </MainContainer>
  );
}

const StyledInput = styled.input`
  width: 50px;
`;

const MainContainer = styled.div`
  margin-left: 20px;
  span {
    display: block;
    font-size: 0.8em;
    font-weight: bold;
    margin-bottom: 5px;
  }
`;

const CalListContainer = styled.div`
  display: flex;
  height: 80%;
`;

const Footer = styled.div`
  margin-top: 20px;
  margin-bottom: 20px;
  font-size: 1em;
`;
