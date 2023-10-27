import { Feather } from '@expo/vector-icons';
import { Container, Text, Input, IInputProps } from 'native-base';

import React, { useState } from 'react';



export type InputProps = IInputProps & {
  value?: string;
  label?: string;
  error?: string;
}

export function InputBase({  value, label, error,  ...rest }: InputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  function handleInputFocus() {
    setIsFocused(true);
  }

  function handleInputBlur() {
    setIsFocused(false);
    setIsFilled(!!value)
  }

  return (
    < >
      <Text fontSize={16} fontWeight={'medium'}  mt={2}> {label ? label : ''}</Text>

      <Input
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        isFocused={isFocused}
        value={value}
        borderWidth={2}
        borderColor={'gray.300'}
        height={47}
        padding={2}
        fontSize={18}
        fontWeight={'light'}
        focusOutlineColor={'transparent'}
        mt={2}
        borderRadius={4}
        {...rest}
      />
      {error ? <Text color={'red.300'} mt={1} paddingLeft={2}>{error}</Text> : null }
    </>
  );
}