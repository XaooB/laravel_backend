import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { GoCommentDiscussion } from 'react-icons/go';
import createLink from '../../helpers/createLink';

const Article = styled.article`
  flex:1 1 160px;
  max-width:260px;
  margin-bottom:10px;
  &:not(:last-child) {
    padding-right:5px;
  }
  @media only screen and (max-width: 900px) {
    max-width:100%;
  }
  @media only screen and (max-width: 480px) {
    font-size:14px;
  }
`

const ImageWrapper = styled.figure`
  height:70px;
  display:flex;
  overflow:hidden;
`

const Image = styled.img`
   width:100%;
   align-self:center;
`

const Header = styled.header`
  padding:14px 0;
`

const Category = styled.span`
  display:block;
  font-size:.7em;
  font-family:'AvenirLTB';
  text-transform:uppercase;
`

const Footer = styled.footer`
  display:flex;
  justify-content:space-between;
  flex-flow: row nowrap;
  align-items:center;
`

const LinkTo = styled(Link)`
  color:inherit;
`

const Author = styled.div`
  flex:2;
  display:flex;
  flex-flow: row nowrap;
  jutsify-content:space-between;
  align-items:center;
`

const Statistics = styled.div`
  flex:1;
  display:flex;
  align-items:center;
  justify-content: flex-end;
  cursor:default;
`

const ImageContainer = styled.figure`
  margin-top:-2px;
  display:flex;
  justify-content:center;
  min-width:25px;
  min-height:25px;
  max-width:25px;
  max-height:25px;
  margin-right:10px;
  overflow:hidden;
  align-self:flex-start;
  border-radius:100%;
`

const ImageAuthor = styled.img`
  height:25px;
`

const UserName = styled.span`
  font-size:.9em;
`

const Count = styled.span`
  display:inline-block;
  margin-left:4px;
  font-size:.9em;
`

const Title = styled.h3`
  font-weight:lighter;
`

const RelatedListItem = props => {
  const { image, category, title, idarticle, comments_count, user } = props.article,
          link = createLink(props.article);

  return (
    <Article>
      <ImageWrapper>
        <Image src={image} title={title} alt={title} />
      </ImageWrapper>
      <Header>
        <LinkTo to={link}>
          <Category>{category}</Category>
          <Title>{title}</Title>
        </LinkTo>
      </Header>
      <Footer>
        <Author>
          <ImageContainer>
            <ImageAuthor src={user.image} title={user.name} alt={user.name} />
          </ImageContainer>
          <UserName>{user.name}</UserName>
        </Author>
        <Statistics title='komentarze'>
          <GoCommentDiscussion />
          <Count>{comments_count}</Count>
        </Statistics>
      </Footer>
    </Article>
  )
}

export default RelatedListItem;
