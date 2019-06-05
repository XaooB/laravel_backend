import React from 'react';
import styled from 'styled-components';
import dateConverter from '../../helpers/dateConverter';
import { FaRegClock } from "react-icons/fa";
import { GoCommentDiscussion } from 'react-icons/go';
import { Link } from 'react-router-dom';

const Article = styled.article`
  position:relative;
  width:100%;
  max-height:500px;
  &:hover img {
    transform:scale(1.03);
  }
`

const Image = styled.img`
  height:350px;
  transition: all .2s ease-in-out;
  @media (min-width: 640px) {
    width:100%;
    height:100%;
  }
`

const ImageWrapper = styled.figure`
  height: 350px
  display:flex;
  justify-content:center;
  flex-flow:row wrap;
  overflow:hidden;
  @media (min-width: 480px) {
    max-height: 500px;
    height:auto;
    font-size:2.6em;
  }
`

const Category = styled.span`
  display:inline-block;
  margin-top:10px;
  background:#FEBE10;
  padding:5px 10px;
  font-size:.75em;
  color:#ab7521;
  font-family:'TruenoSBlack';
`

const Title = styled.h2`
  font-family: 'RSBold';
  font-size:1.6em;
  line-height: 1.1em;
  color:#ffffff;
  @media (min-width: 480px) {
    font-size: 1.9em;
  }
  @media (min-width: 640px) {
    line-height: 1em;
    font-size: 2.5em;
  }
`

const LinkTo = styled(Link)`
  margin:0 10px;
  max-width:700px;
  color:inherit;
  &:hover ${Category} {
    &:before {
      width:calc(100% - 101px);
    }
  }
`

const Test = styled.div`
  margin:0 auto;
  max-width:1300px;
`

const BlackOverlay = styled.div`
  position:absolute;
  background: linear-gradient(180deg,rgba(0,0,0,0) 0%,rgba(0,0,0,0.75) 65%);
  padding-top:100px;
  padding-bottom:50px;
  width:100%;
  bottom:0;
  left:0;
  @media (min-width: 640px) {
    padding-top:150px;
  }
`


const Meta = styled.div`
  font-size:.8em;
  margin-bottom:5px;
  svg {
    position:relative;
    top:2px;
    margin-right:3px;
  }
  @media (min-width: 640px) {
    font-size:.95em;
  }
`

const Date = styled.time`
  display:inline-block;
  margin-right:10px;
`

const Comments = styled.span`
  display:inline-block;
`

const MainArticle = props => {
  const { image, category, idarticle,  title, create_date, comments_count } = props.mainArticle[0],
          link = `/app/news/${category.replace(/ /g,'-')}/${idarticle}/${title.replace(/ /g,'-').toLowerCase()}`;

  return (
    <Article>
      <ImageWrapper>
        <Image src={image}  title={title} alt={title} />
      </ImageWrapper>
      <BlackOverlay>
      <Test>
        <LinkTo to={link}>
          <Meta>
            <Date><FaRegClock/> {dateConverter.toStageDate(create_date)}</Date>
            <Comments><GoCommentDiscussion /> {comments_count} komentarzy</Comments>
          </Meta>
          <Title>{title}</Title>
          <Category>{category}</Category>
        </LinkTo>
        </Test>
      </BlackOverlay>
    </Article>
  )
}

export default MainArticle;
