import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import ReactChartkick, { LineChart } from 'react-chartkick';
import Chart from 'chart.js';

ReactChartkick.addAdapter(Chart);

const Wrapper = styled.div`
  margin: 10px 20px 20px 20px;
  background:#fff;
  border-radius:3px;
  display:flex;
  justify-content: space-between;
  align-items:center;
`

const Container = styled.div`
  display:flex;
  flex:1 1 350px;
  flex-flow: column nowrap;
  justify-content:space-between;
`

const Info = styled.div`
  padding:20px;
`

const ChangePositive = styled.div`
  color:lightgreen;
  margin-bottom:-6px;
  font-size:1.1em;
`
const ChangeNegative = styled.div`
  color:#ee324e;
  margin-bottom:-6px;
  font-size:1.1em;
`

const NonChange = styled.div`
  color:#c8c8c8;
  margin-bottom:-6px;
  font-size:1.1em;
`

const ArrowUp = styled.span`
  display:inline-block;
  font-family:'SSPBK';
  transform: rotate(90deg);
`

const ArrowDown = styled.span`
  display:inline-block;
  font-family:'SSPBK';
  transform: rotate(-90deg);
`

const Amount = styled.span`
  font-family:'SSP';
  display:block;
  font-size:2.75em;
`

const Title = styled.span`
  font-size:.8em;
  letter-spacing:.5px;
  color:#777777;
  display:block;
  text-transform: uppercase;
`

const User = styled.div`
  display:flex;
  flex:3 1 250px;
  justify-content: flex-start;
  align-items:center;
`

const UserName = styled.span`
  display:block;
`
const UserEmail = styled.span`
  display:block;
  color:#777777;
  font-size:.9em;
`

const UserWrapper = styled.div`
  display:flex;
  padding:10px 20px;
  flex:1;
  align-items:center;
  flex-flow:row wrap;
  justify-content: space-between;
`

const ImageWrapper = styled.figure`
  height:40px;
  width:40px;
  min-height:40px;
  min-width:40px;
  overflow:hidden;
  display:flex;
  justify-content:center;
  align-items:center;
  border-radius:3px;
  margin-right:10px;
`

const Image = styled.img`
  height:40px;
  display:block;
`

const LinkTo = styled(Link)`
  display:block;
  color:#ee324e;
  flex:2.5;
  font-size: .9em;
  text-align: center;
  border-radius: 3px;
  &:hover {
    text-decoration:underline;
  }
`

const UserList = styled.div`
  margin:0 20px;
  padding: 10px 0;
  background:white;
  border-radius:3px;
`

const LastWeekStatsItem = (props) => {
  const { data } = props;
  const diff = data.stats.count - data.stats.oldcount;
  return (
    <Container>
      <Wrapper>
        <Info>
          {
            diff > 0
            ? <ChangePositive>
            {diff} <ArrowUp>&lsaquo;</ArrowUp>
            </ChangePositive>
            : diff === 0
            ? <NonChange>
            {diff} &mdash;
            </NonChange>
            : <ChangeNegative>
            {diff} <ArrowDown>&lsaquo;</ArrowDown>
            </ChangeNegative>
          }
          <Amount>{data.stats.count}</Amount>
          <Title>nowych {data.stats.name}</Title>
        </Info>
        <Info>
          <LineChart
            width="95%"
            height="100%"
            data={data.charts}
            legend={false}
          />
        </Info>
      </Wrapper>
      <UserList>
        {
          data.data.map((item) => {
            return (
              <UserWrapper key={item.email}>
                <User>
                  <ImageWrapper>
                    <Image src={ item.image } alt={item.username} />
                  </ImageWrapper>
                  <div>
                    <UserName>{ item.article ? item.article : item.username }</UserName>
                    <UserEmail>{ item.article ? `dodano przez ${item.username},  ${item.email}` : item.email}</UserEmail>
                  </div>
                </User>
                {
                  item.added
                  ? <UserEmail>{item.added}</UserEmail>
                  : <LinkTo to="/user">pokaż szczegóły</LinkTo>
                }
              </UserWrapper>
            )
          })
        }
      </UserList>
    </Container>
  );
};

export default LastWeekStatsItem;
