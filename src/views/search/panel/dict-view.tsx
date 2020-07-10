import React from 'react';
import styled from 'styled-components/native';
import { SearchTabItem } from './search-tab-item';


const DictContainer = styled.View`
  flex: 1;
`;

export const DictView: React.FC = () => {
  return (
    <>
      <DictContainer>
        <SearchTabItem/>
      </DictContainer>
    </>
  );
};

