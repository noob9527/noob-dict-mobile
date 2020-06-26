import React from 'react';
import { EngineIdentifier } from '@noob9527/noob-dict-core';
import { SearchPanelState } from '../../panel/search-panel-model';
import { Text } from 'react-native';
import { useSelector } from 'react-redux';
import { ThemedEmpty } from '../../../../components/themed-ui/empty/empty';
import BingDict from '../../../../components/dict/bing/bing-dict';


const EngineView: React.FC = () => {
  const engine = 'BING';
  const state: SearchPanelState = useSelector((state: any) => state.searchPanel);
  const result = state.searchResultMap[engine];

  if (!result) return (<ThemedEmpty/>);

  // return <Text>{JSON.stringify(result)}</Text>

  // noinspection JSRedundantSwitchStatement
  switch (result.engine) {
    case EngineIdentifier.BING:
      // return <></>
      return <BingDict result={result}/>;
    default:
      // return <CommonEngineView result={result}/>;
      return <Text>common engine view</Text>;
  }
};

export default EngineView;
