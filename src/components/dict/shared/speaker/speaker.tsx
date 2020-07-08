import React, { useContext, useEffect, useState } from 'react';
import { AntDesign } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import { ThemeContext } from 'styled-components/native';
import ColorId from '../../../../styles/color-id';
import { Audio } from 'expo-av';
import logger from '../../../../utils/logger';

interface SpeakerProp {
  src?: string
}

const log = logger.getLogger('Speaker');

const Speaker: React.FC<SpeakerProp> = (props) => {
  const theme = useContext(ThemeContext);
  const src = props.src;
  const color = src ? theme[ColorId.word_link] : theme[ColorId.foreground_disabled];

  let sound: Audio.Sound | null = null;
  useEffect(() => {
    if (src) {
      Audio.Sound.createAsync({
        uri: props.src,
      }, {}, (...args) => {
      }, true).then((res) => {
        sound = res.sound;
      }).catch(err => {
        log.error(err);
      });
    }
  }, [src]);

  function handlePress() {
    if (sound) {
      sound.replayAsync().then(() => {
        log.log('play audio');
      }).catch((err) => {
        log.error(err);
      });
    }
  }

  return (
    <TouchableOpacity
      disabled={!src}
      onPress={handlePress}
      style={{
        margin: 'auto',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 2,
        marginTop: 2,
      }}>
      <AntDesign
        name="sound"
        size={15}
        color={color}
      />
    </TouchableOpacity>
  );
};

export default Speaker;
