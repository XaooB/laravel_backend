import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { dateConverter } from '../../helpers/dateConverter';


const Article = styled.article`
  margin-bottom:35px;
  flex:1 1 245px;
  max-width:280px;

  padding: 0 5px;
  display:flex;
  flex-direction:column;
  color:#1e1e1e;
`

const CategoryAndDate = styled.div`
  font-size: .75em;
  text-transform: uppercase;
`

const Category = styled.span`
  color:#00529f;
  font-family: 'AvenirB';
`

const Added = styled.span`
  font-family: 'AvenirR';
  font-weight:bold;
`

const Title = styled.h3`
  font-size: 1.3em;
  line-height:1em;
  padding:6px 0;
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

const SmallNews = props => {
  const { category, title, create_date, idarticle } = props.data,
          link = `/news/${category.replace(/ /g,'-')}/${idarticle}/${title.replace(/ /g,'-')}`;

  return (
    <Article>
        <CategoryAndDate>
          <Category>{ category }</Category>
          <Added> / { dateConverter.toDateOnly(create_date) }</Added>
        </CategoryAndDate>
        <Title>
          <LinkTo to={link} >
            <Hover>
              { title }
            </Hover>
          </LinkTo>
        </Title>
    </Article>
  )
}

export default SmallNews;
