export interface WeaponOptionType {
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
