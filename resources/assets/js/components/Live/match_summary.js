import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.section`
  position:absolute;
  left:50%;
  transform: translateX(-50%);
  z-index:99;
  top:220px;
  display:flex;
  width:600px;
  justify-content: space-between;
  flex-flow: row wrap;
  font-family:'DoHyeon';
  letter-spacing:1.5px;
`

const TeamWrapper = styled.div`
  display:flex;
  flex-flow:row nowrap;
  justify-content:center;
  flex:7;
  align-items:flex-start;
`

const Team = styled.div`
  display:flex;
  flex-flow:column nowrap;
  justify-content:center;
`

const Scorer = styled.span`
  display:block;
  font-size:.85em;
  letter-spacing:1.5px;
  font-family: 'AvenirR';
`

const Goalscorers = styled.div`
  margin-top:20px;
  line-height:1.5;
`

const Result = styled.div`
  margin-top:15px;
  display:flex;
  flex-flow:column nowrap;
  justify-content: center;
  align-self:flex-start;
  flex:4;
`

const Image = styled.img`
  height:100px;
  align-self: center;
`

const TeamName = styled.span`
  text-transform: uppercase;
  display:block;
  margin-top:12px;
  text-align:center;
  word-break:none;
`

const Fixtures = styled.div`
  font-family:'AvenirR';
  font-size:.8em;
  text-transform:uppercase;
  margin:0 auto;
  & span + span {
    font-size:.85em;
  }
`

const FixturesInfo = styled.span`
  text-align:center;
  line-height:1.4em;
  display:block;
`

const Score = styled.span`
  margin:8px auto;
  font-size:2.8em;
`

const MatchInfo = props => {
  return (
      <Wrapper>
        <TeamWrapper>
          <Team>
            <Image src='https://upload.wikimedia.org/wikipedia/en/4/47/FC_Barcelona_%28crest%29.svg' />
            <TeamName>fc barcelona</TeamName>
            <Goalscorers>
              <Scorer>11' Coutinho</Scorer>
              <Scorer>30' L. Suárez</Scorer>
              <Scorer>75' L. Suárez</Scorer>
              <Scorer>83' L. Suárez</Scorer>
              <Scorer>87' A. Vidal</Scorer>
            </Goalscorers>
          </Team>
        </TeamWrapper>
        <Result>
          <Fixtures><FixturesInfo>La Liga</FixturesInfo><FixturesInfo>21.10.2018</FixturesInfo></Fixtures>
          <Score>5 : 1</Score>
        </Result>
        <TeamWrapper>
          <Team>
            <Image src='https://upload.wikimedia.org/wikipedia/en/5/56/Real_Madrid_CF.svg' />
            <TeamName>real madrid</TeamName>
            <Goalscorers>
              <Scorer>50' Marcelo</Scorer>
            </Goalscorers>
          </Team>
        </TeamWrapper>
      </Wrapper>
  )
}

export default MatchInfo;
