import React from 'react';
import styled from 'styled-components';

const Social = styled.section`
  margin-top:20px;
  background: #00529f;
  padding:20px;
`

const Wrapper = styled.div`
  text-transform: uppercase;
  line-height: 1.4em;
`

const SubTitle = styled.span`
  font-size: 1.1em;
  display:block;
`

const Title = styled.span`
  font-family: 'AvenirB';
  font-size: 1.875em;
  display:block;
`

const List = styled.ul`
  margin-top:10px;
  list-style-type: none;
  font-family: 'socialtype';
  font-size: 5em;
  margin-left:-5px;
`

const ListItem = styled.li`
  display:inline-block;
  &:hover a {
    color:#febe10;
  }
  a {
    line-height:.8em;
  }
`

const SocialMedia = props => {
  return (
    <Social>
      <Wrapper>
        <SubTitle>follow us</SubTitle>
        <Title>social media</Title>
      </Wrapper>
      <List>
        <ListItem>
          <a href='#twitter'>a</a>
        </ListItem>
        <ListItem>
          <a href='#facebook'>b</a>
        </ListItem>
        <ListItem>
          <a href='#google'>c</a>
        </ListItem>
        <ListItem>
          <a href='#youtube'>f</a>
        </ListItem>
      </List>
    </Social>
  )
}

export default SocialMedia;
