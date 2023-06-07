/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import { useState } from "react";
import { WeaponOption } from "../components/CubeOptions/Weapon";
import { CubeOptionSelect } from "../components/CubeOptionSelect";
import { CubeOptionContext } from "../providers/CubeOptionContext";

export type EquipmentType =
  | "무기"
  | "보조"
  | "엠블렘"
  | "모자"
  | "모자(에테르넬)"
  | "상의"
  | "상의(에테르넬)"
  | "하의"
  | "하의(에테르넬)"
  | "신발"
  | "장갑"
  | "망토, 벨트, 견장"
  | "견장(에테르넬)"
  | "장신구"
  | "심장";

export const Equipments: EquipmentType[] = [
  "무기",
  "보조",
  "엠블렘",
  "모자",
  "모자(에테르넬)",
  "상의",
  "상의(에테르넬)",
  "하의",
  "하의(에테르넬)",
  "신발",
  "장갑",
  "망토, 벨트, 견장",
  "견장(에테르넬)",
  "장신구",
  "심장",
];

export const Options: Record<EquipmentType, string[]> = {
  무기: WeaponOption,
  보조: ["none"],
  엠블렘: ["none"],
  모자: ["none"],
  "모자(에테르넬)": ["none"],
  상의: ["none"],
  "상의(에테르넬)": ["none"],
  하의: ["none"],
  "하의(에테르넬)": ["none"],
  신발: ["none"],
  장갑: ["none"],
  "망토, 벨트, 견장": ["none"],
  "견장(에테르넬)": ["none"],
  장신구: ["none"],
  심장: ["none"],
};

const EMPTY_OPTIONS = {
  op1: {
    option: "none",
    optionValue: 0,
  },
  op2: {
    option: "none",
    optionValue: 0,
  },
  op3: {
    option: "none",
    optionValue: 0,
  },
};

export function Cube(): JSX.Element {
  const [equipment, setEquipment] = useState<EquipmentType>("무기");
  const [optionContainers, setOptionContainers] = useState([EMPTY_OPTIONS]);
  const [optionsNumber, setOptionsNumber] = useState<number>(1);
  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setEquipment(e.target.value as EquipmentType);
    setOptionContainers([EMPTY_OPTIONS]);
  };

  return (
    <CubeContainer>
      <Header>
        <h2>큐브 옵션기대값 계산기&nbsp;</h2>
        <span>(120제 이상 레전 옵션만 지원합니다.)</span>
      </Header>
      <Container>
        <CubeOptionContext.Provider
          value={{ optionContainers, setOptionContainers }}
        >
          <SelectContainer>
            <span>장비 선택: </span>
            <select value={equipment} onChange={handleSelect}>
              {Equipments.map((item, index) => (
                <option key={index} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </SelectContainer>
          <CubeOptionSelect options={Options[equipment]} index={0} />
          {Array.from({ length: optionsNumber - 1 }, (_, i) => (
            <AdditionalOptionContainer key={i + 1}>
              <CubeOptionSelect options={Options[equipment]} index={i + 1} />
              <button
                onClick={() => {
                  setOptionsNumber(optionsNumber - 1);
                  let newOptionContainers = [...optionContainers];
                  setOptionContainers(newOptionContainers.splice(i + 1, 1));
                }}
              >
                x
              </button>
            </AdditionalOptionContainer>
          ))}
        </CubeOptionContext.Provider>
        <AddButton
          onClick={() => {
            setOptionContainers([...optionContainers, { ...EMPTY_OPTIONS }]);
            setOptionsNumber(optionsNumber + 1);
          }}
        >
          옵션그룹 추가하기
        </AddButton>
      </Container>
    </CubeContainer>
  );
}

const AdditionalOptionContainer = styled.div`
  display: flex;
  button {
    margin-left: -24px;
    height: 24px;
  }
`;

const AddButton = styled.button`
  margin-left: 10px;
`;

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
