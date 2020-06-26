import React, { useContext, useRef, useState } from 'react';
import { AntDesign } from '@expo/vector-icons'
import { View, Text } from 'react-native';
import useEventListener from '../../../../hooks/use-event-listener';
import styled, { ThemeContext } from 'styled-components/native';
import speaker from './speaker.svg';
import ColorId from '../../../../styles/color-id';

const AudioButton = styled.Button`
  width: 1.2em;
  height: 1.2em;
  text-decoration: none;
  margin: 0 8px;
  padding: 0;
  line-height: 1;
  border: none;
  /*
  background: no-repeat left / cover url(${speaker});
  vertical-align: middle;
  user-select: none;
  cursor: pointer;
   */
  
  &:hover,&:focus{
    outline: none;
  }
  &.isActive {
    animation: speaker-playing 1s steps(6) infinite;
  }
  @keyframes speaker-playing {
    from {
      background-position-x: 0;
    }
    70% {
      background-position-x: 100%;
    }
    100% {
      background-position-x: 100%;
    }
  }
`;

interface SpeakerProp {
  src?: string
}

const Speaker: React.FC<SpeakerProp> = (props) => {
  const [playing, setPlaying] = useState(false);
  const audioEle = useRef<HTMLAudioElement>(null);
  const theme = useContext(ThemeContext);

  useEventListener('ended', (event) => {
    setPlaying(false);
  });

  return (
    <View style={{
      margin: 'auto',
      alignItems: 'center',
      justifyContent: 'center',
      marginLeft: 2,
      marginTop: 2,
    }}>
      <AntDesign
        name="sound"
        size={15}
        color={theme[ColorId.word_link]}
      />
      {/*<AudioButton*/}
      {/*  title={'audio'}*/}
      {/*  // className={playing ? 'isActive' : ''}*/}
      {/*>*/}
      {/*  /!*<audio*!/*/}
      {/*  /!*  ref={audioEle}>*!/*/}
      {/*  /!*  {props.src ? <source src={props.src}/> : null}*!/*/}
      {/*  /!*</audio>*!/*/}
      {/*</AudioButton>*/}
    </View>
  );

  async function handleClick() {
    const ref = audioEle?.current;
    if(!ref) {
      return Promise.resolve(); // we may set a timeout here?
    }
    setPlaying(true);
    // https://stackoverflow.com/questions/43577182/react-js-audio-src-is-updating-on-setstate-but-the-audio-playing-doesnt-chang
    await ref.pause();
    await ref.load();
    await ref.play();
  }
};

export default Speaker;
