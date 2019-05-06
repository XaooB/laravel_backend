import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const ImageWrapper = styled.figure`
  display:none;
  height:inherit;
  justify-content:center;
  flex:1 1 380px;
  max-height:80px
  max-width:100px
  overflow:hidden;
  @media (min-width: 480px) {
    display:flex;
  }
`

const Article = styled.article`
  flex: 1 1 100%;
  height: auto;
  color:#1e1e1e;
  margin:1px 0;
  overflow:hidden;
  @media (min-width: 480px) {
    height: 80px;
  }
`

const Image = styled.img`
  height:inherit;
  align-self:flex-start;
`

const LinkTo = styled(Link)`
  height:inherit;
  display:flex;
  justify-content:space-between;
  flex-flow:row wrap;
`

const Container = styled.div`
  display:flex;
  max-width:fit-content;
  flex:1 1 38%;
  flex-flow: row wrap;
  align-content:space-between;
  padding:15px;
`

const ArticleInfo = styled.header`
  letter-spacing:.5px;
  border-left:3px solid #FEBE10;
  padding:5px 0 5px 8px;
  flex:2;
  line-height:1;
  margin-left:5px;
  color:#1e1e1e;
  width:100%;
`

const Title = styled.h3`
  font-size:1.2em;
  font-weight:lighter;
`

const Category = styled.span`
  display:block;
  margin-top:5px;
  font-size:.8em;
  color:#ee324e;
  font-family:'AvenirLTB'
`

const Description = styled.span`
  display:none;
  margin-top:12px;
  @media (min-width: 480px) {
    display:block;
  }
`

const Stats = styled.div`
  display:none;
  align-items:center;
  justify-content:space-between;
  flex-flow:row nowrap;
  flex:1.5;
  @media (min-width: 640px) {
    display:flex;
  }
`

const StatsInfo = styled.div`
  display:flex;
  color:#1e1e1e;
  margin:0 5px;
  flex-flow:column wrap;
  justify-content:flex-end;
`

const Type = styled.span`
  flex:1;
  font-size:.9em;
`

const Count = styled.span`
  font-family:'AvenirLTD';
  flex:1;
    color:#ee324e;
  text-align:center;
`

const ArticleList = props => {
  const {title, image, category, content, create_date, idarticle, comments_count, views, likes_count} = props.article,
        link = `/app/news/${category.replace(/ /g,'-')}/${idarticle}/${title.replace(/ /g,'-').toLowerCase()}`;

  return (
    <Article>
      <LinkTo to={link}>
        <ImageWrapper>
          <Image src={image} alt={title} title={title} />
        </ImageWrapper>
        <ArticleInfo>
          <Title>{title}</Title>
          <Category>{category}</Category>
        </ArticleInfo>
        <Stats>
          <StatsInfo>
            <Type>Polubienia</Type>
            <Count>{ likes_count }</Count>
          </StatsInfo>
          <StatsInfo>
            <Type>Komentarze</Type>
            <Count>{ comments_count }</Count>
          </StatsInfo>
          <StatsInfo>
            <Type>Wyświetlenia</Type>
            <Count>{ views }</Count>
          </StatsInfo>
        </Stats>
      </LinkTo>
    </Article>
  )
}

export default ArticleList;