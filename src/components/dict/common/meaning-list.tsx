import React from 'react';
import { Meaning } from '@noob9527/noob-dict-core';
import styled from 'styled-components/native';
import { ThemedText } from '../../themed-ui/text/text';

const Container = styled.View`
  margin-top: 10px;
`

const ListContainer = styled.View`
`;

const ItemContainer = styled.View`
  flex-direction: row;
  margin-top: 8px;
`;

const ItemContent = styled.View`
  flex-direction: column;
  padding-left: 8px;
`;

interface MeaningItemProp {
  meaning: Meaning
}

interface MeaningListProp {
  meanings: Meaning[]
}

const MeaningItem: React.FC<MeaningItemProp> = (props: MeaningItemProp) => {
  const { meaning } = props;
  return (
    <ItemContainer>
      <ThemedText>{'\u2022'}</ThemedText>
      <ItemContent>
        <ThemedText>{meaning.EN}</ThemedText>
        {meaning.ZH ? <ThemedText style={{ marginTop: 3 }}>{meaning.ZH}</ThemedText> : null}
      </ItemContent>
    </ItemContainer>
  );
};

const MeaningList: React.FC<MeaningListProp> = (props: MeaningListProp) => {
  const { meanings } = props;
  return (
    <Container>
      <ThemedText>Meanings:</ThemedText>
      <ListContainer>
        {meanings.map((def, i) => (<MeaningItem meaning={def} key={i}/>))}
      </ListContainer>
    </Container>
  );
};

export default MeaningList;
