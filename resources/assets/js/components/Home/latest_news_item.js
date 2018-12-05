import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Article = styled.article`
  flex: 1 1 365px;
  min-width: 300px;
  color:#1e1e1e;
  padding:10px;
`

const ImageWrapper = styled.figure`
  overflow:hidden;
  flex:1;
  display:flex;
  justify-content:center;
  align-items:center;
  max-height:150px;
`

const Container = styled.div`
  display:flex;
  justify-content:flex-start;
  flex:1;
  font-family:'AvenirR';
`

const Category = styled.span`
  display:inline-block;
  text-transform: uppercase;
  font-size:.75em;
  font-family:'AvenirD';
  margin-bottom:10px;
  letter-spacing:1px;
`

const Title = styled.h3`
  font-family: 'AvenirD';
  font-size:1.55em;
  line-height:1.1em;
  margin-bottom:3px;
`

const Added = styled.span`
  display:inline-block;
  font-family:'AvenirD';
  font-size:.72em;
  margin-bottom:12px;
`

const Summary = styled.p`
  font-size:.9em;
  padding-bottom:15px;
  font-family:'AvenirR';
  line-height:1.2em;
  text-align:justify;
`

const Image = styled.img`
  width:100%;
  align-self: flex-start;
`

const Hover = styled.span`
  border-bottom:0px solid #00529f;
  transition: border .15s;
`

const LinkTo = styled(Link)`
  color:inherit;
  padding:15px 0;
  &:hover ${Hover} {
    border-bottom:3px solid #00529f;
    transition: border .15s;
  }
`


const LatestNewsItem = props => {
  const {title, image, category, content, create_date} = props.article;

  return (
    <Article>
      <ImageWrapper>
        <Image src={image} alt='isco' title='isco' />
      </ImageWrapper>
      <Container>
        <LinkTo to='/jakis newst'>
          <Category>{category}</Category>
          <Title>
            <Hover>{title}</Hover>
          </Title>
          <Added>{create_date}</Added>
          <Summary>{content}</Summary>
        </LinkTo>
      </Container>
    </Article>
  )
}

export default LatestNewsItem;
