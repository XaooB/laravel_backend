import React, { Component } from 'react';
import styled from 'styled-components';
import Logo from '../../../components/Admin/admin_logo';
import Header from '../../../components/Admin/admin_header';
import Content from '../../../components/Admin/admin_content';
import Title from '../../../components/Admin/admin_pageTitle';
import Navigation from '../../../components/Admin/admin_navigation';

const Overlay = styled.div`
  position:absolute;
  width:100%;
  min-height:100%;
  background:#F3F4F8;
  left:0;
  top:0;
  z-index:99999;
  color:#1c232e;
`

const Wrapper = styled.div`
  display:flex;
  justify-content: space-between;
  flex-flow:row nowrap;
  height:100%;
`

const Column = styled.div`
  width:100%;
`

class AdminPanel extends Component {
  render() {
    return (
      <Overlay>
        <Wrapper>
          <div>
            <Logo />
            <Navigation />
          </div>
          <Column>
            <Header />
            <Title title='Dashboard' />
            <Content />
          </Column>
        </Wrapper>
      </Overlay>
    )
  }
}

export default AdminPanel;
