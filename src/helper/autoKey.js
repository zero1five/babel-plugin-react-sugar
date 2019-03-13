import * as types from 'babel-types';
import esutils from 'esutils';
import {setAttr, randomStr} from '../utils/utils';
const {addDefault} = require('@babel/helper-module-imports');
const path = require('path');

export const autoKeyHelper = nodePath => {
  nodePath.node.arguments[1].properties.push(
    types.jSXAttribute(
      types.jSXIdentifier('key'),
      types.stringLiteral(randomStr())
    )
  );

  return nodePath;
};

export default autoKeyHelper;
