import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { dateConverter } from '../../helpers/dateConverter';

const Article = styled.article`
  display:flex;
  flex-flow:row nowrap;
  background:#ee324e;
  max-width:430px;
`

const Added = styled.footer`
  font-size: .72em;
  font-family: 'AvenirR';
  margin-top:10px;
  letter-spacing:.5px;
`

const Category = styled.span`
  display:block;
  text-transform: uppercase;
  color:white;
  font-size: .75em;
  letter-spacing:1px;
  margin-bottom:6px;

`

const Title = styled.h2`
  line-height: 1.2em;
  font-family: 'AvenirD';
  font-size: 1.25em;
`

const Content = styled.div`
  flex:1;
  padding:15px;
`

const ImageWrapper = styled.figure`
  display:flex;
  flex:1;
  justify-content: center
  overflow:hidden;
`

const Image = styled.img`
  height:180px;
  align-self:flex-start;
`

const Hover = styled.span`
  border-bottom:0px solid #febe10;
  transition: border .15s;
`

const LinkTo = styled(Link)`
  color:inherit;
  &:hover ${Hover} {
    border-bottom:3px solid #febe10;
    transition: border .15s;
  }
`

const ArticleInfo = props => {
  const { image, title, category, create_date } = props.data;

  return (
    <LinkTo to='/'>
      <Article>
        <ImageWrapper>
          <Image src={ image } alt={ title } title={ title } />
        </ImageWrapper>
        <Content>
          <header style={{paddingTop: 3}}>
            <Category>{ category }</Category>
            <Title>
              <Hover>{ title }</Hover>
            </Title>
          </header>
          <Added>{ dateConverter.toDateOnly(new Date(create_date)) }</Added>
        </Content>
      </Article>
      </LinkTo>
  )
}

export default ArticleInfo;
