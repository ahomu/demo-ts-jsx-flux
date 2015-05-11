import ChatApp from './components/ChatApp';
import ChatExampleData from './ChatExampleData';
import ChatWebAPIUtils from './utils/ChatWebAPIUtils';
import * as React from 'react';

window['React'] = React; // export for http://fb.me/react-devtools

ChatExampleData.init(); // load example data into localstorage
ChatWebAPIUtils.getAllMessages();

React.render(
  React.createFactory(ChatApp)(),
  document.getElementById('app')
);
