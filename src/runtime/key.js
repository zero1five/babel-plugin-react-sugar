import React from 'react';
import {randomStr} from '@/utils/utils';

const addKey = element => {
  const {props} = element;

  return React.cloneElement(element, {
    key: randomStr(),
    ...props,
  });
};

export default addKey;
