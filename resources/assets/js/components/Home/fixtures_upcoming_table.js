import React, { Fragment } from 'react';
import styled from 'styled-components';
import { dateConverter } from '../../helpers/dateConverter';

const Title = styled.span`
  font-family:'SSPBK';
  display:inline-block;
  font-size:1em;
  font-weight:lighter;
  flex:1;
  text-transform: uppercase;
  color:#c0c0c0;
  text-align:left;
  position:relative;
  &:first-child {
    flex:2;
  }
  &:last-child {
    flex:1.4;
  }
  &:before {
    content:'';
    position:absolute;
    width:30px;
    height:2px;
    bottom:-2px;
    left:0;
    background:#1140a4;
  }
`

const TableField = styled.div`
  font-size:1.05em;
  color:#1e1e1e;
  flex:1;
  text-transform: uppercase;
  &:first-child {
    flex:2;
  }
  &:last-child {
    flex:1.4;
  }
`

const TableRow = styled.div`
  width:100%;
  display:flex;
  flex-flow:row wrap;
  justify-content:space-between;
  &:first-child {
    margin-bottom:10px;
  }
  &:not(:first-child) {
    padding:4px 0;
  }
`

const Fixtures = props => {
  const { schedule } = props;

  return (
      <Fragment>
        <TableRow>
          <Title>fixture</Title>
          <Title>date</Title>
          <Title>opponent</Title>
        </TableRow>
          {schedule ? schedule.map((item, i) => {
            const { league, date, club } = item;
            return (
            <TableRow key={i}>
              <TableField>{ league }</TableField>
              <TableField>{ dateConverter.toDateOnly(date) }</TableField>
              <TableField>{ club.short_name }</TableField>
            </TableRow>)}
            ) : (
        <TableRow>
          <TableField>There's no data</TableField>
        </TableRow>)}
      </Fragment>
  )
}

export default Fixtures;
