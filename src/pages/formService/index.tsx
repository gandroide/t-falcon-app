import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/Button';
import { MenuItem } from './styled';
import { Container } from './styled';

export const FormService = () => {
  const LinkComponent = {
    display: 'inline-block',
    padding: '0.7em 1.7em',
    margin: '0 0.3em 0.3em 0',
    minWidth: '160px',
    borderStyle: 'hidden',
    borderRadius: '0.5em',
    textDecoration: 'none',
    fontWeight: '400',
    color: '#ffffff',
    backgroundColor: '#3369ff',
    justifyContent: 'center',
    alignItems: 'center'
  };
  return (
    <Container>
      <MenuItem>FormService</MenuItem>
      <textarea rows={10} cols={40} />
      <MenuItem>
        <Button>Send</Button>
      </MenuItem>
      <MenuItem>
        <Link style={LinkComponent} to="/">
          Go Back
        </Link>
      </MenuItem>
    </Container>
  );
};
