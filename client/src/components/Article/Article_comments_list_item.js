import React, { Component } from 'react';
import styled from 'styled-components';
import User from './article_user';
import { FaHeart, FaReply, FaBan } from 'react-icons/fa';

const ListItem = styled.li`
  display:flex;
  flex-flow:row nowrap;
  justify-content:space-between;
  &:not(:last-child) {
    margin-bottom:50px;
  }
`

const Article = styled.article`
  margin-left:10px;
`

const Header = styled.header`
  display:flex;
  justify-content:space-between;
  align-items:baseline;
`

const UserName = styled.span`
  font-family:'AvenirD';
`

const Added = styled.span`
  font-size:.8em;
  letter-spacing:.6px;
`

const Content = styled.p`
  padding:8px 0;
`

const Footer = styled.footer`
  margin-top:6px;
  display:flex;
  flex-flow:row nowrap;
  align-items:center;
  justify-content:flex-start;

`

const ActionName = styled.span`
  display:inline-block;
  margin-left:3px;
  position:relative;
  top:-1px;
`

const FooterItem = styled.button`
  background:none;
  font-size:.85em;
  outline:none;
  position:relative;
  padding:3px;
  border:none;
  color:rgb(169,169,169);
  cursor:pointer;
  &:not(:last-child) {
    margin-right:8px;
    &:after {
      position: absolute;
      content:'';
      right:-4px;
      top:3px;
      height:15px;
      width:1px;
      background:#e0e0e0;
    }
  }
  &:hover {
    color:#00529f;
  }
`

class SingleComment extends Component {
  render() {
    return (
      <ListItem>
        <User />
        <Article>
          <Header>
            <UserName>Xaoo</UserName>
            <Added>13 hours ago</Added>
          </Header>
          <Content>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris nunc orci, commodo lobortis libero vestibulum, molestie gravida elit. <br/><br/> Nulla sed massa libero. Pellentesque tempor mauris nunc, vitae lacinia ante lobortis eget. Nulla vitae justo ut leo vehicula suscipit. Vivamus ullamcorper felis dui, vitae feugiat augue scelerisque et.</Content>
          <Footer>
            <FooterItem>
              <FaHeart />
            </FooterItem>
            <FooterItem>
              <FaReply />
              <ActionName>Reply</ActionName>
            </FooterItem>
            <FooterItem>
              <FaBan />
              <ActionName>Report</ActionName>
            </FooterItem>
          </Footer>
        </Article>
      </ListItem>
    )
  }
}

export default SingleComment;
