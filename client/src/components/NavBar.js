import React from 'react';
import { Link } from 'react-router-dom';
import { ButtonGroup, Button } from '@auth0/cosmos';
import styled from '@auth0/cosmos/styled';

const Container = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  padding: 20px 0;
  border-bottom: 1px solid #ccc;
`;

const Logo = styled.h1`
  a {
    color: #212121;
    font-size: 1.5rem;
    font-weight: 700;
    text-transform: uppercase;
    text-decoration: none;
  }
`;

const Nav = styled.nav`
  ul {
    display: flex;
  }
`;

const StyledLink = styled(Link)`
  margin: 0 10px;
  color: #0a84ae;
  text-decoration: none;
  &:hover {
    border-bottom: 1px solid #0a84ae;
  }
`;

const NavBar = () => (
  <Container align="space-between">
    <Logo>
      <Link to="/">CoolReads</Link>
    </Logo>

    <Nav>
      <ul>
        <li>
          <StyledLink to="/">All Books</StyledLink>
        </li>
        <li>
          <StyledLink to="/create">Add new Book</StyledLink>
        </li>
      </ul>
    </Nav>

    <ButtonGroup>
      <Button appearance="link">Log In</Button>
      <Button appearance="cta">Sign Up</Button>
    </ButtonGroup>
  </Container>
);

export default NavBar;
