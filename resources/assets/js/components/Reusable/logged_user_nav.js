import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  min-width:220px;
  position:absolute;
  z-index:999;
  top:50px;
  color:#1e1e1e;
  right:0;
  border-radius:10px;
  background:#fff;
  border:1px solid #ededed;
  a {
    display:block;
    margin:2px 0;
    padding:10px 12px;
    cursor:pointer;
    color:#777;
    font-size: .85em;
    &:hover {
      color:#00529f;
      background:#ededed;
    }
    &:last-child {
      border-bottom-left-radius:8px;
      border-bottom-right-radius:8px;
      margin-bottom:0;
    }
  }
  &:before {
    content:'';
    position:absolute;
    border-left: 10px solid #fff;
    border-bottom: 10px solid #ededed;
    border-right: 10px solid #fff;
    right:15px;
    top:-10px;
    z-index:9999;
  }
`

const Label = styled.span`
  display:block;
  background:#ededed;
  padding:10px 12px;
  font-family: 'AvenirLTB';
  text-transform: uppercase;
  font-size:.7em;
  &:hover {
    background:#ededed;
    color:#1e1e1e;
  }
  &:first-child {
    border-top-left-radius:8px;
    border-top-right-radius:8px;
  }
`

class LoggedUserNav extends Component {
  constructor(props) {
    super(props);

    this.setWrapperRef = this.setWrapperRef.bind(this);
  }

  componentDidMount() {
    document.addEventListener('click', (e) => this.handleClick(e));
  }

  componentWillMount() {
    document.removeEventListener('click', (e) => this.handleClick(e));
  }

  setWrapperRef(node) {
    this.wrapperRef = node;
   }

  handleClick(event) {
   if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
     this.props.closeNav();
   }
  }

  render() {
    const { user } = this.props;

    return (
      <Container ref={ this.setWrapperRef }>
        <Label>Konto</Label>
        <Link to={`/app/user/${user[0].iduser}`}>Mój profil</Link>
        <Link to='/app/user/messages'>Wiadomości</Link>
        <Link to='/app/user/notifications'>Powiadomienia</Link>
        {
          user[0].tier > 1 ?
          (
            <Link to='/admin/dashboard'>Panel Administracyjny</Link>
          ) :
          (
            ''
          )
        }
        <Label>Inne</Label>
        <a href='/api/auth/google/logout'>Wyloguj się</a>
      </Container>
    )
  }
}

export default LoggedUserNav;
