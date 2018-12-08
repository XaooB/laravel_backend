import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { GoCommentDiscussion } from 'react-icons/go';

const Article = styled.article`
  flex:1 1 50%;
  max-width:260px;
`

const ImageWrapper = styled.figure`
  max-height:90px;
  display:flex;
  justify-content:center;
  overflow:hidden;
`

const Image = styled.img`
  height:200px;
`

const Header = styled.header`
  padding:14px 0;
`

const Category = styled.span`
  display:block;
  font-size:.85em;
  text-transform:uppercase;
`

const Title = styled.h3`
  font-family: 'SSPB';
`

const Footer = styled.footer`
  display:flex;
  justify-content:space-between;
  flex-flow: row nowrap;
  align-items:center;
`

const Hover = styled.span`
  border-bottom:0px solid #00529f;
  transition: border .15s;
`

const LinkTo = styled(Link)`
  color:inherit;
  &:hover ${Hover} {
    border-bottom:3px solid #00529f;
    transition: border .15s;
  }
`

const Author = styled.div`
  flex:1;
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
`

const ImageContainer = styled.figure`
  margin-top:-2px;
  display:flex;
  justify-content:center;
  min-width:35px;
  min-height:35px;
  max-width:35px;
  max-height:35px;
  margin-right:10px;
  overflow:hidden;
  align-self:flex-start;
  border-radius:100%;
`

const ImageAuthor = styled.img`
  height:35px;
`

const Count = styled.span`
  display:inline-block;
  margin-left:4px;
  font-size:.9em;
`

const RelatedListItem = props => {
  const { image, category, title, idarticle, comments_count, user } = props.article,
          link = `/news/${category.replace(/ /g,'-')}/${idarticle}/${title.replace(/ /g,'-')}`;

  return (
    <Article>
      <ImageWrapper>
        <Image src={image} title={title} alt={title} />
      </ImageWrapper>
      <Header>
        <LinkTo to={link}>
          <Category>{category}</Category>
          <Title>
            <Hover>{title}</Hover>
          </Title>
        </LinkTo>
      </Header>
      <Footer>
        <Author>
          <ImageContainer>
            <ImageAuthor src={user.image} title={user.name} alt={user.name} />
          </ImageContainer>
          <span>{user.name}</span>
        </Author>
        <Statistics>
          <GoCommentDiscussion />
          <Count>{comments_count}</Count>
        </Statistics>
      </Footer>
    </Article>
  )
}

export default RelatedListItem;
