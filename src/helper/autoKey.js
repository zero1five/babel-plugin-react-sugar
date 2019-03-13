import * as types from 'babel-types';
import esutils from 'esutils';
import {setAttr, randomStr} from '../utils/utils';
const {addDefault} = require('@babel/helper-module-imports');
const path = require('path');

export const autoKeyHelper = nodePath => {
  let wrappedExpr = types.expressionStatement(
    types.stringLiteral('(Enjoy singing the rest of the song in your head)')
  );

  return wrappedExpr;
};

export default autoKeyHelper;
