/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import React, { useContext, useState } from "react";
import { OptionName } from "./CubeOptions/OptionType";
import { CubeOptionContext } from "../providers/CubeOptionContext";

export type CubeOptionSelectProps = {
  options: string[];
  index: number;
  disabled?: boolean;
};

export function CubeOptionSelect(
  props: CubeOptionSelectProps
): React.ReactElement {
  const { options, index, disabled } = props;
  // options = ["none", "str", ...]
  const { optionContainers, setOptionContainers } =
    useContext(CubeOptionContext);
  const [option1, setOption1] = useState<string>("none");
  const [option2, setOption2] = useState<string>("none");
  const [option3, setOption3] = useState<string>("none");
  const [value1, setValue1] = useState<number>(0);
  const [value2, setValue2] = useState<number>(0);
  const [value3, setValue3] = useState<number>(0);

  const handleOptionChange =
    (i: number) => (e: React.ChangeEvent<HTMLSelectElement>) => {
      const newOption = e.target.value;
      let newOptionContainers = [...optionContainers];
      switch (i) {
        case 1:
          newOptionContainers[index].op1.option = newOption;
          setOption1(newOption);
          break;
        case 2:
          newOptionContainers[index].op2.option = newOption;
          setOption2(newOption);
          break;
        case 3:
          newOptionContainers[index].op3.option = newOption;
          setOption3(newOption);
          break;
      }
      setOptionContainers(newOptionContainers);
    };

  const handleValueChange =
    (i: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
      let newValue = Number(e.target.value);
      if (newValue < 0) newValue = 0;
      let newOptionContainers = [...optionContainers];
      switch (i) {
        case 1:
          newOptionContainers[index].op1.optionValue = newValue;
          setValue1(newValue);
          break;
        case 2:
          newOptionContainers[index].op2.optionValue = newValue;
          setValue2(newValue);
          break;
        case 3:
          newOptionContainers[index].op3.optionValue = newValue;
          setValue3(newValue);
          break;
      }
      setOptionContainers(newOptionContainers);
    };

  const SelectComponent = (props: {
    selectedOption: string;
    handleChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  }) => {
    const { selectedOption, handleChange } = props;
    return (
      <StyledSelect
        value={selectedOption}
        onChange={handleChange}
        disabled={disabled}
      >
        {options.map((item, index) => (
          <option
            key={index}
            value={item}
            hidden={
              item !== "none" &&
              (item === option1 || item === option2 || item === option3)
            }
          >
            {OptionName[item]}
          </option>
        ))}
      </StyledSelect>
    );
  };

  const InputComponent = (props: {
    value: number;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  }) => {
    const { value, handleChange } = props;
    return <StyledInput type="number" value={value} onChange={handleChange} />;
  };

  return (
    <Container>
      <OptionFlexContainer>
        <span>옵션1: </span>
        <SelectComponent
          selectedOption={option1}
          handleChange={handleOptionChange(1)}
        />
        <InputComponent value={value1} handleChange={handleValueChange(1)} />
      </OptionFlexContainer>
      <OptionFlexContainer>
        <span>옵션2: </span>
        <SelectComponent
          selectedOption={option2}
          handleChange={handleOptionChange(2)}
        />
        <InputComponent value={value2} handleChange={handleValueChange(2)} />
      </OptionFlexContainer>
      <OptionFlexContainer>
        <span>옵션3: </span>
        <SelectComponent
          selectedOption={option3}
          handleChange={handleOptionChange(3)}
        />
        <InputComponent value={value3} handleChange={handleValueChange(3)} />
      </OptionFlexContainer>
    </Container>
  );
}

const StyledSelect = styled.select`
  margin-right: 10px;
`;

const StyledInput = styled.input`
  width: 40px;
`;

const OptionFlexContainer = styled.div`
  display: inline-flex;
  margin-top: 10px;
  span {
    margin-right: 10px;
  }
`;

const Container = styled.div`
  width: 330px;
  padding: 10px 20px 20px 20px;
  margin: 10px;
  border: 1px solid black;
`;
