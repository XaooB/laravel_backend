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

const Visits = props => {
  const { uniqueVisits } = props;
  const month = ['styczeń', 'luty', 'marzec', 'kwiecień', 'maj', 'czerwiec', 'lipiec', 'sierpień', 'wrzesień', 'październik', 'listopad', 'grudzień'];
  const newArray = uniqueVisits.totalVisitorsAndPageViews
    .map( item => ({[new Date(item.date.date).getDate() + ' ' + month[new Date(item.date.date).getMonth()]]: item.pageViews}))
    .sort()
    .reduce((obj1, obj2) => Object.assign(obj1, obj2), {})

  return (
    <FlexWrapper>
      <Title>Wyświetlenia</Title>
      <SubTitle>Unikatowa liczba dziennych wyświetleń</SubTitle>
      <LineChart
        data={newArray}
        colors={['#1c232e']}
        xtitle='Dzień tygodnia'
        ytitle="Wyświetlenia"
        messages={{ empty: 'Brak danych' }}
      />
    </FlexWrapper>
  )
}


export default Visits;
