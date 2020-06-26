import React from 'react';
import styled from 'styled-components/native';
import ColorId from '../../../../styles/color-id';
import { ThemedText } from '../../../themed-ui/text/text';

const Sentence = styled(ThemedText)`
`;

const NormalView = styled(ThemedText)`

`;

const HighlightView = styled(ThemedText)`
  color: ${props => props.theme[ColorId.word_highlight]};
`;

interface HighlightProp {
  sentence: string
  // array of [startIndex, endIndex]
  posList?: [number, number][]
  highlightWords?: Set<string>
}

interface PosHighlightProp {
  sentence: string
  posList: [number, number][]
}

interface WordHighlightProp {
  sentence: string
  highlightWords: Set<string>
}

const PosHighlight: React.FC<PosHighlightProp> = (props) => {
  const { sentence } = props;
  return <Sentence>{sentence}</Sentence>;
};

const WordHighlight: React.FC<WordHighlightProp> = (props) => {
  const { sentence, highlightWords } = props;
  const words = sentence.split(/\s+/);
  // return <Sentence>{sentence}</Sentence>;
  return <Sentence>{words.map((e, i) =>
    (highlightWords.has(e)
        ? <HighlightView key={i}>{e} </HighlightView>
        : <NormalView key={i}>{e} </NormalView>
    ))
  }
  </Sentence>;
};

const Highlight: React.FC<HighlightProp> = (props) => {
  const { posList, highlightWords, sentence } = props;

  if (posList && posList.length)
    return <PosHighlight sentence={sentence} posList={posList}/>;

  if (highlightWords && highlightWords.size)
    return <WordHighlight sentence={sentence} highlightWords={highlightWords}/>;

  return <Sentence>{sentence}</Sentence>;
};

export default Highlight;
