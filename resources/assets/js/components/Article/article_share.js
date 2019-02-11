import React from 'react';
import styled from 'styled-components';
import {FacebookShareButton, FacebookIcon,
        GooglePlusShareButton, GooglePlusIcon,
        TwitterShareButton, TwitterIcon} from 'react-share';

const ArticleFooter = styled.footer`
  margin-top:10px;
`

const List = styled.ul`
  list-style-type:none;
  display:flex;
  flex-flow:row wrap;
  justify-content:flex-end;
  align-items:flex-start;
`

const ListItem = styled.li`
  margin-top:10px;
  cursor:pointer;
  display:flex;
  flex-flow:column nowrap;
  align-items:center;
  justify-content: center;
  &:not(:last-child) {
    margin-right:6px;
  }
`

const ListLink = styled.a`
  display:inline-block;
  color:#e0e0e0;
  &:hover {
    color:#00529f;
  }
`

const ShareCount = styled.span`
  cursor:default;
  font-size:15px;
  color:#c8c8c8;
  font-family:'SSP'
`

const Share = props => {
  const {url} = props;

  return (
    <ArticleFooter>
      <List>
        <ListItem title='Udostępnij na Twitterze'>
        <TwitterShareButton url={`https://portal-wertykalny.herokuapp.com${url}`}>
          <TwitterIcon size={32} round={true} />
        </TwitterShareButton>
        </ListItem>
        <ListItem title='Udostępnij na Facebooku'>
          <FacebookShareButton url={`https://portal-wertykalny.herokuapp.com${url}`}>
            <FacebookIcon size={32} round={true} />
          </FacebookShareButton>
        </ListItem>
        <ListItem title='Udostępnij na Google+'>
          <GooglePlusShareButton url={`https://portal-wertykalny.herokuapp.com${url}`}>
            <GooglePlusIcon size={32} round={true} />
          </GooglePlusShareButton>
        </ListItem>
      </List>
    </ArticleFooter>
  )
}

export default Share;
