export interface optionType {
  type: "red" | "black";
  order: "first" | "second" | "third";
  name:
    | "str"
    | "dex"
    | "int"
    | "luk"
    | "gongper"
    | "maper"
    | "criprob"
    | "damage"
    | "allstat"
    | "gong"
    | "ma"
    | "ignoredef"
    | "bossdamage";
  value: number;
  prob: number;
  options?: string;
}

export const OptionName: Record<string, string> = {
  none: "-",
  str: "STR %",
  dex: "DEX %",
  int: "INT %",
  luk: "LUK %",
  gongper: "공격력 %",
  maper: "마력 %",
  criprob: "크리티컬 확률 %",
  damage: "데미지 %",
  allstat: "올스텟 %",
  gong: "공격력",
  ma: "마력",
  ignoredef: "방어율 무시 %",
  bossdamage: "보스 몬스터 공격 시 데미지 %",
};

export function getOption(optionName: string): string {
  return (
    Object.keys(OptionName).find((key) => OptionName[key] === optionName) ??
    "none"
  );
}
