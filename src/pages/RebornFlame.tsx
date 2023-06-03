/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import { useState } from "react";

// step: 0, 1, 2, 3, 4  = 추옵 단계를 의미
// levelstep: 0, 1, 2, 3, 4 = 레벨구간별 추옵 레벨을 의미
const GANGHWAN = [0.2, 0.3, 0.36, 0.14, 0];
const YOUNGHWAN = [0, 0.29, 0.45, 0.25, 0.01];

const LEVEL_TO_STEP = (level: number): number => {
  if (level < 130) return -1;
  else if (level >= 250) return 4;
  else if (level >= 200) return 3;
  else if (level >= 160) return 2;
  else if (level >= 140) return 1;
  else return 0;
};

const SINGLE_STAT = (levelstep: number, step: number): number => {
  if (levelstep < 0 || step > 4) return -1;
  switch (levelstep) {
    case 0:
      return [21, 28, 35, 42, 49][step];
    case 1:
      return [24, 32, 40, 48, 56][step];
    case 2:
      return [27, 36, 45, 54, 63][step];
    case 3:
      return [33, 44, 55, 66, 77][step];
    case 4:
      return [36, 48, 60, 72, 84][step];
  }
  return 0;
};

const DOUBLE_STAT = (levelstep: number, step: number): number => {
  if (levelstep < 0 || step > 4) return -1;
  switch (levelstep) {
    case 0:
      return [12, 16, 20, 24, 28][step];
    case 1:
      return [12, 16, 20, 24, 28][step];
    case 2:
      return [15, 20, 25, 30, 35][step];
    case 3:
      return [18, 24, 30, 36, 42][step];
    case 4:
      return [21, 28, 35, 42, 49][step];
  }
  return 0;
};

const ALLPER_STAT = (step: number) => {
  return step + 3;
};

// 추옵 개수는 19가지인데, 그 중 유효한 추옵은 11개
// 0. 단일 주스텟
// 1. 단일 부스텟1
// 2. 단일 부스텟2
// 3. 이중 주+부1
// 4. 이중 주+부2
// 5. 이중 주+쓰레기
// 6. 이중 부1+부2
// 7. 이중 부1+쓰레기
// 8. 이중 부2+쓰레기
// 9. 공마
// 10. 올스텟

// 하나의 추옵의 환산 스탯
const CAL_STAT = (
  i: number,
  levelstep: number,
  step: number,
  bs1: number,
  bs2: number,
  als: number,
  gm: number
): number => {
  let rv = 0;
  switch (i) {
    case 0:
      rv = SINGLE_STAT(levelstep, step);
      break;
    case 1:
      rv = SINGLE_STAT(levelstep, step) * bs1;
      break;
    case 2:
      rv = SINGLE_STAT(levelstep, step) * bs2;
      break;
    case 3:
      rv = DOUBLE_STAT(levelstep, step) * (1 + bs1);
      break;
    case 4:
      rv = DOUBLE_STAT(levelstep, step) * (1 + bs2);
      break;
    case 5:
      rv = DOUBLE_STAT(levelstep, step);
      break;
    case 6:
      rv = DOUBLE_STAT(levelstep, step) * (bs1 + bs2);
      break;
    case 7:
      rv = DOUBLE_STAT(levelstep, step) * bs1;
      break;
    case 8:
      rv = DOUBLE_STAT(levelstep, step) * bs2;
      break;
    case 9:
      rv = ALLPER_STAT(step) * gm;
      break;
    case 10:
      rv = ALLPER_STAT(step) * als;
      break;
  }
  return rv;
};

const STAT_TO_INDEX = (stat: number): number => {
  return Math.floor(stat / 10);
};

async function CAL_REBORN_FLAME(
  level: number,
  bs1: number,
  bs2: number,
  als: number,
  gm: number,
  tarVal: number
) {
  const levelstep = LEVEL_TO_STEP(level);
  let gangprobs = [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0,
  ];
  let youngprobs = [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0,
  ];
  let gangmax = 0;
  let youngmax = 0;
  let tarGangProb = 0;
  let tarYoungProb = 0;
  for (let i = 0; i < 11; i++) {
    for (let j = i + 1; j < 17; j++) {
      for (let k = j + 1; k < 18; k++) {
        for (let l = k + 1; l < 19; l++) {
          for (let stepi = 0; stepi < 5; stepi++) {
            for (let stepj = 0; stepj < 5; stepj++) {
              for (let stepk = 0; stepk < 5; stepk++) {
                for (let stepl = 0; stepl < 5; stepl++) {
                  const stat =
                    CAL_STAT(i, levelstep, stepi, bs1, bs2, als, gm) +
                    CAL_STAT(j, levelstep, stepj, bs1, bs2, als, gm) +
                    CAL_STAT(k, levelstep, stepk, bs1, bs2, als, gm) +
                    CAL_STAT(l, levelstep, stepl, bs1, bs2, als, gm);
                  const gangprob =
                    (GANGHWAN[stepi] *
                      GANGHWAN[stepj] *
                      GANGHWAN[stepk] *
                      GANGHWAN[stepl]) /
                    3876;
                  const youngprob =
                    (YOUNGHWAN[stepi] *
                      YOUNGHWAN[stepj] *
                      YOUNGHWAN[stepk] *
                      YOUNGHWAN[stepl]) /
                    3876;
                  const statIndex = STAT_TO_INDEX(stat);
                  if (statIndex >= 1 && statIndex < 27) {
                    for (let m = 1; m <= statIndex; m++) {
                      gangprobs[m - 1] += gangprob;
                      youngprobs[m - 1] += youngprob;
                    }
                    if (gangprob > 0 && stat > gangmax) gangmax = stat;
                    if (youngprob > 0 && stat > youngmax) youngmax = stat;
                    if (stat >= tarVal) {
                      tarGangProb += gangprob;
                      tarYoungProb += youngprob;
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }

  return {
    gangprobs,
    youngprobs,
    gangmax,
    youngmax,
    tarGangProb,
    tarYoungProb,
  };
}

const NUMBER_TO_MESO = (num: number): string => {
  if (num === Infinity) return "?";
  if (num < 10000) return num.toString() + "억";
  else if (num < 100000000) return (num / 10000).toFixed(3) + "조";
  else return (num / 100000000).toFixed(3) + "경";
};

const PROB_FORMAT = (prob: number): string => {
  if (1 / prob === Infinity) return "0% (불가능)";
  if (prob < 0.00001)
    return (100 * prob).toFixed(8) + "% (" + Math.floor(1 / prob) + "개)";
  else if (prob < 0.001)
    return (100 * prob).toFixed(5) + "% (" + Math.floor(1 / prob) + "개)";
  else return (100 * prob).toFixed(3) + "%";
};

// 공마, 올스텟은 단계 + 3 = [3,4,5,6,7]
// 보스 장비

export function RebornFlame(): JSX.Element {
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [gangProbs, setGangProbs] = useState<number[]>([
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0,
  ]);
  const [youngProbs, setYoungProbs] = useState<number[]>([
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0,
  ]);
  const [gangMax, setGangMax] = useState(0);
  const [youngMax, setYoungMax] = useState(0);
  const [tarVal, setTarVal] = useState(0);
  const [tarGangProb, setTarGangProb] = useState(0);
  const [tarYoungProb, setTarYoungProb] = useState(0);

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    setSubmitted(true);
    setIsLoading(true);
    const level = parseInt(event.target.level.value);
    const bs1 = parseFloat(event.target.bs1.value);
    const bs2 = parseFloat(event.target.bs2.value);
    const als = parseFloat(event.target.als.value);
    const gm = parseFloat(event.target.gm.value);
    const tarVal = parseFloat(event.target.tarVal.value);
    const result = await CAL_REBORN_FLAME(level, bs1, bs2, als, gm, tarVal);
    setTarVal(tarVal);
    setGangProbs(result.gangprobs);
    setYoungProbs(result.youngprobs);
    setGangMax(result.gangmax);
    setYoungMax(result.youngmax);
    setTarGangProb(result.tarGangProb);
    setTarYoungProb(result.tarYoungProb);
    setIsLoading(false);
  };

  return (
    <RebornFlameContainer>
      <h2>
        환생의 불꽃 기대값 계산기 <span>(보스 장비만 지원합니다.)</span>
      </h2>
      <FormWrapper>
        <FormContainer>
          <form onSubmit={handleSubmit}>
            <label>
              <span>장비 레벨:</span>
              <input
                type="number"
                name="level"
                defaultValue="200"
                required
                step="1"
              />
            </label>
            <div>주스텟 환산값을 입력해주세요.</div>
            <label>
              <span>부스텟1:</span>
              <input
                type="number"
                name="bs1"
                defaultValue="0.1"
                required
                step="0.01"
              />
            </label>
            <label>
              <span>부스텟2:</span>
              <input
                type="number"
                name="bs2"
                defaultValue="0"
                required
                step="0.01"
              />
            </label>
            <label>
              <span>올스탯%:</span>
              <input
                type="number"
                name="als"
                defaultValue="10"
                required
                step="0.01"
              />
            </label>
            <label>
              <span>공마:</span>
              <input
                type="number"
                name="gm"
                defaultValue="3"
                required
                step="0.01"
              />
            </label>
            <label>
              <span>목표 추옵:</span>
              <input
                type="number"
                name="tarVal"
                defaultValue="150"
                required
                step="0.1"
              />
            </label>
            <button type="submit">계산하기</button>
          </form>
          {submitted && !isLoading && (
            <>
              <div>목표 추옵 {tarVal} 이상 확률</div>
              <div>
                강환: {PROB_FORMAT(tarGangProb)} ={" "}
                <b>
                  {NUMBER_TO_MESO(
                    Math.round((100 * 0.0912) / tarGangProb) / 100
                  )}{" "}
                </b>
                메소(리부트)
              </div>
              <div>영환: {PROB_FORMAT(tarYoungProb)}</div>
            </>
          )}
        </FormContainer>
        <div>
          {submitted ? (
            isLoading ? (
              "계산중..."
            ) : (
              <>
                <div>강환 최대 : {gangMax.toFixed(3)}</div>
                <div>영환 최대 : {youngMax.toFixed(3)}</div>
                <ResultContainer>
                  <SectionContainer>
                    <SectionTitle>추옵 누적구간</SectionTitle>
                    <Section>&nbsp;강환 확률</Section>
                    <Section>&nbsp;영환 확률</Section>
                  </SectionContainer>
                  {gangProbs.map((prob, index) => (
                    <SectionContainer key={index}>
                      <SectionTitle>{index * 10 + 10}~</SectionTitle>
                      <Section>&nbsp;{PROB_FORMAT(prob)}</Section>
                      <Section>&nbsp;{PROB_FORMAT(youngProbs[index])}</Section>
                    </SectionContainer>
                  ))}
                </ResultContainer>
              </>
            )
          ) : (
            "입력완료 후 계산하기를 눌러주세요."
          )}
        </div>
      </FormWrapper>
    </RebornFlameContainer>
  );
}

const SectionTitle = styled.div`
  font-weight: 700;
  flex: 1;
  border: 1px solid black;
  text-align: center;
`;

const Section = styled.div`
  flex: 2;
  border: 1px solid black;
`;

const SectionContainer = styled.div`
  display: flex;
  width: 100%;
`;

const ResultContainer = styled.div`
  border: 1px solid black;
  width: 600px;
  margin-top: 5px;
`;

const FormContainer = styled.div``;

const FormWrapper = styled.div`
  display: flex;
`;

const RebornFlameContainer = styled.div`
  margin-left: 20px;
  h2 {
    display: inline-block;
    span {
      font-size: 0.7em;
    }
  }
  form {
    width: 400px;
    margin-right: 20px;
    margin-bottom: 20px;
    div {
      margin-bottom: 10px;
      font-weight: 700;
    }
    label {
      display: block;
      width: 300px;
      margin-bottom: 5px;
      span {
        display: inline-block;
        width: 100px;
        text-align: right;
        margin-right: 5px;
      }
    }
    button {
      width: 200px;
      height: 30px;
      margin-top: 10px;
      margin-left: 40px;
    }
  }
`;
