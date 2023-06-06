/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import { useState } from "react";

export const EquipmentType = [
  "무기",
  "보조",
  "엠블렘",
  "모자",
  "상의",
  "하의",
  "신발",
  "장갑",
  "망토, 벨트, 견장",
  "장신구",
  "심장",
];

export function Cube(): JSX.Element {
  const [equipment, setEquipment] = useState("무기");
  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setEquipment(e.target.value);
  };
  return (
    <CubeContainer>
      <Header>
        <h2>큐브 옵션기대값 계산기&nbsp;</h2>
        <span>(120제 이상 레전 옵션만 지원합니다.)</span>
      </Header>
      <Container>
        <SelectContainer>
          <span>장비 선택: </span>
          <select value={equipment} onChange={handleSelect}>
            {EquipmentType.map((item, index) => (
              <option key={index} value={item}>
                {item}
              </option>
            ))}
          </select>
        </SelectContainer>
      </Container>
    </CubeContainer>
  );
}

const SelectContainer = styled.div`
  display: inline-flex;
  span {
    margin-right: 10px;
  }
`;

const Container = styled.div`
  select {
    width: 200px;
    height: 25px;
  }
`;

const Header = styled.div`
  display: inline-flex;
  align-items: center;
  margin-bottom: 10px;
  h2 {
    margin: 0;
  }
  @media (max-width: 768px) {
    display: block;
  }
`;

const CubeContainer = styled.div`
  margin-left: 20px;
  margin-right: 20px;
`;
