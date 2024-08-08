import styled from '@emotion/styled';

import { MOBILE_MEDIA_QUERY } from '@/src/styles/const';

export const Wrapper = styled.div`
  display: flex;
  width: 100%;
  margin: 40px 0;
  justify-content: center;
  border-bottom: 1px solid ${({ theme }) => theme.color.gray60};
`;

export const TextSection = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  padding: 40px 0;
  font-size: 18px;
  gap: 12px;
  line-height: 1.2;
  b {
    font-weight: 800;
  }
  @media ${MOBILE_MEDIA_QUERY} {
    padding-top: 40px;
    font-size: 15px;
  }
`;