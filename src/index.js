'use strict';

import {declare} from '@babel/helper-plugin-utils';
import helper from '@babel/helper-builder-react-jsx';
import * as types from 'babel-types';
import jsx from 'babel-plugin-syntax-jsx';

export default declare((api, options) => {
  api.assertVersion(7);

  const visitor = () => {};

  return {
    name: 'react-sugar',
    inherits: jsx,
    visitor,
  };
});
