import React from "react";

export interface optionContainer {
  op1: {
    option: string;
    optionValue: number;
  };
  op2: {
    option: string;
    optionValue: number;
  };
  op3: {
    option: string;
    optionValue: number;
  };
}

export interface CubeOptionContextData {
  optionContainers: optionContainer[];
  setOptionContainers: React.Dispatch<React.SetStateAction<optionContainer[]>>;
}

export const CubeOptionContext = React.createContext<CubeOptionContextData>({
  optionContainers: [
    {
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
    },
  ],
  setOptionContainers: () => [],
});
