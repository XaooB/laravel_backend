import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import MatchSummary from '../../components/Live/match_summary';
import Squad from '../../components/Live/match_squad';
import Commentary from '../../components/Live/match_commentary';
import Footer from '../../components/Reusable/footer'
import CommentSection from '../../components/Article/article_comments';
import { Helmet } from 'react-helmet';
import Wrapper from '../../components/Reusable/wrapper';

const Main = styled.main`
  width:100%;
`

const Image = styled.img`
  width:100%;
`

const ImageWrapper = styled.div`
  display:flex;
  align-items:flex-end;
  max-height:600px;
  position:relative;
  z-index:-1;
  &:before {
    position:absolute;
    content: '';
    background: #00529f;
    width:100%;
    mix-blend-mode: hard-light;
    height:100%;
    left:0;
    top:0;
  }
`

const Section = styled.section`
  margin:0 auto;
  padding:0 10px;
  margin-top:50px;
  color:#1e1e1e;
  max-width:1300px;
`

const LiveCentre = styled.section`
  display:flex;
  flex:3;
  background:white;
  flex-flow: column wrap;
  align-self:flex-start;
  margin:0 30px;
`

const HOME = [
  {
    "number": 1,
    "name": 'Thibaut',
    'surname': 'Courtois'
  },
  {
    "number": 19,
    "name": 'Álvaro',
    'surname': 'Odriozola'
  },
  {
    "number": 6,
    "name": 'Nacho',
    'surname': 'Fernández'
  },
  {
    "number": 4,
    "name": 'Sergio',
    'surname': 'Ramos'
  },
  {
    "number": 23,
    "name": 'Sergio',
    'surname': 'Reguilón'
  },
  {
    "number": 10,
    "name": 'Luka',
    'surname': 'Modrić'
  },
  {
    "number": 14,
    "name": '',
    'surname': 'Casemiro'
  },
  {
    "number": 8,
    "name": 'Toni',
    'surname': 'Kroos'
  },
  {
    "number": 17,
    "name": 'Lucas',
    'surname': 'Vázquez'
  },
  {
    "number": 9,
    "name": 'Karim',
    'surname': 'Benzema'
  },
  {
    "number": 11,
    "name": 'Gareth',
    'surname': 'Bale'
  },
]
const AWAY = [
  {
    "number": 1,
    "name": 'Thibaut',
    'surname': 'Courtois'
  },
  {
    "number": 19,
    "name": 'Álvaro',
    'surname': 'Odriozola'
  },
  {
    "number": 6,
    "name": 'Nacho',
    'surname': 'Fernández'
  },
  {
    "number": 4,
    "name": 'Sergio',
    'surname': 'Ramos'
  },
  {
    "number": 23,
    "name": 'Sergio',
    'surname': 'Reguilón'
  },
  {
    "number": 10,
    "name": 'Luka',
    'surname': 'Modrić'
  },
  {
    "number": 14,
    "name": '',
    'surname': 'Casemiro'
  },
  {
    "number": 8,
    "name": 'Toni',
    'surname': 'Kroos'
  },
  {
    "number": 17,
    "name": 'Lucas',
    'surname': 'Vázquez'
  },
  {
    "number": 9,
    "name": 'Karim',
    'surname': 'Benzema'
  },
  {
    "number": 11,
    "name": 'Gareth',
    'surname': 'Bale'
  },
]

class Live extends Component {

  componentDidMount() {
    window.scrollTo(0,0);
  }

  render() {
    return (
        <Fragment>
          <Helmet>
            <title>Na żywo - portal-wertykalny</title>
          </Helmet>
          <Main>
            <ImageWrapper>
              <Image src='/img/ballPit.jpg' alt='pit' />
              <MatchSummary />
            </ImageWrapper>
            <Section>
              <Wrapper>
                <Squad team='fc barcelona' squad={AWAY} />
                <LiveCentre>
                  <Commentary />

                </LiveCentre>
                <Squad team='real madrid' squad={HOME} />
              </Wrapper>
            </Section>
          </Main>
          <Footer />
        </Fragment>
    )
  }
}

export default Live;
