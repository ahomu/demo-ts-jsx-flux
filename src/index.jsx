import React from 'react';
import Test from './components/test';

React.render(
  React.createFactory(Test)(),
  document.getElementById('app')
);
