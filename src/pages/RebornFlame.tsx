/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";

const GANGHWAN = [0.2, 0.3, 0.36, 0.14, 0];
const YOUNGHWAN = [0, 0.29, 0.45, 0.25, 0.01];

// 공마, 올스텟은 단계 + 3 = [3,4,5,6,7]
// 보스 장비

export function RebornFlame(): JSX.Element {
  return (
    <RebornFlameContainer>
      <h2>환생의 불꽃 기대값 계산기</h2>
      <h3>보스장비 기대값만 지원합니다.(일반장비 x)</h3>
    </RebornFlameContainer>
  );
}

const RebornFlameContainer = styled.div`
  margin-left: 20px;
`;
