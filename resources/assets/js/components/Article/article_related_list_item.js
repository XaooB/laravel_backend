import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { GoCommentDiscussion } from 'react-icons/go';
import createLink from '../../helpers/createLink';

const Article = styled.article`
  flex:1 1 160px;
  max-width:260px;
  margin-bottom:10px;
  transition: all .2s ease-in-out;
  &:hover {
    transform:scale(1.03);
    h3 {
      color:#ee324e;
    }
  }
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

const LinkTo = styled(Link)`
  color:inherit;
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
    </Article>
  )
}

export default RelatedListItem;
