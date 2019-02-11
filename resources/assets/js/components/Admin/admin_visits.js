import React from 'react';
import styled from 'styled-components';
import ReactChartkick, { LineChart } from 'react-chartkick';
import Chart from 'chart.js';

const FlexWrapper = styled.div`
  display:flex;
  justify-content:space-between;
  flex-flow: column wrap;
  align-items:flex-start;
  margin:0 20px 20px 20px;
  background:#fff;
  border-radius:3px;
  color:#1c232e;
  padding:30px 5px;
`

const Title = styled.span`
  margin-left:10px;
  font-size:1.1;
  font-family:'SSPB';
`

const SubTitle = styled.span`
  margin-bottom:20px;
  margin-left:10px;
  font-family:'SSPL';
  font-size:.95em;
`

ReactChartkick.addAdapter(Chart);

const Visits = () => (
  <FlexWrapper>
    <Title>Wyświetlenia</Title>
    <SubTitle>Unikatowa liczba dziennych wyświetleń</SubTitle>
    <LineChart
      data={{
        '2019-01-21': 34,
        '2019-01-22': 21,
        '2019-01-23': 15,
        '2019-01-24': 51,
        '2019-01-25': 22,
        '2019-01-26': 66,
        '2019-01-27': 81,
      }
    }
      colors={['#1c232e']}
      xtitle="Dzień tygodnia"
      ytitle="Wyświetlenia"
      messages={{ empty: 'Brak danych' }}
    />
  </FlexWrapper>
)


export default Visits;
