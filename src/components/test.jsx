import React from 'react';
import {TestStore} from '../stores/test-store';
import Test2 from './test2';

export default class Test extends React.Component {
  render() {
    let store = new TestStore();
    console.log('storeeeeeee');
    return <div><Test2></Test2><p>{store.hoge()}</p></div>;
  }
}
