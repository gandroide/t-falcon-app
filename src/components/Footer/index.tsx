import React from 'react';
import { FooterContainer } from './styles';

export const FooterBar = () => {
  return (
    <FooterContainer>
      &#169; TFalcon Madeira {new Date().getFullYear()}
    </FooterContainer>
  );
};
