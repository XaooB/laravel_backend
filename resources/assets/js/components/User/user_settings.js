import React, { Fragment } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import MiniLoader from '../Reusable/mini_loader';
import { FaEdit } from "react-icons/fa";

const Container = styled.section`
  width:100%;
  order:1;
  @media (min-width: 820px) {
    order:2;
    width:27%;
    padding-left:20px;
  }
`

const UserWrapper = styled.div`
  margin-bottom:30px;
  position:relative;
  background:#00529f;
  border-top-left-radius:6px;
  border-top-right-radius:6px;
  min-height:80px;
  display:flex;
  padding-left:15px;
  flex-flow:row wrap;
  align-items:flex-end;
  justify-content:flex-start;
`

const ImageWrapper = styled.figure`
  height:75px;
  width:75px;
  background:#fff;
  position:relative;
  overflow:hidden;
  bottom:-15px;
  display:flex;
  justify-content:center;
  align-items:center;
  border:4px solid #fff;
  border-radius:6px;
`

const Image = styled.img`
  height:67px;
`

const UserStats = styled.div`
  margin-top:10px;
  h4 {
    padding:5px 0;
    color:inherit;
    border-bottom:1px solid #00529f;
  }
`

const UserStatsWrapper = styled.div`
  margin-top:10px;
  color:inherit;
  display:flex;
  flex-flow:row wrap;
  justify-content:space-between;
`

const UserName = styled.p`
  font-size:.95em;
  margin-left:10px;
  color:inherit;
  text-transform: lowercase;
`
const UserRank = styled.p`
  font-size:.8em;
  font-family:'AvenirLTD';
  margin-left:10px;
  color:inherit;
  text-transform: lowercase;
`

const UserInfo = styled.div`
  margin-bottom:5px;
  color:#fff;
`

const UserRegisterInfo = styled.span`
  display:block;
  padding:0 4px;
  flex:1;
  margin-bottom:10px;
`

const UserCounter = styled.span`
  display:block;
  font-size:.85em;
  flex:1;
`

const StatsTitle = styled.span`
  text-transform: uppercase;
  font-size:.7em;
  font-family:'AvenirLTB';
`

const UserMail = styled.span`
  display:block;
  font-size:.9em;
`

const EditImageButton = styled.button`
  outline:none;
  border-radius:6px;
  border:none;
  background:#fff;
  cursor:pointer;
  color:#00529f;
  position:absolute;
  padding:6px;
  font-size:.75em;
  right:10px;
  top:10px;
  &:hover {

  }
  svg {
    position:relative;
    top:1px;
    font-size: 1.1em;
  }
`

const UserSettings = props => {
  const { user } = props;

  return (
    <Container>
      {
        !user.length ?
        (
          <MiniLoader />
        ) : (
          <Fragment>
            <UserWrapper>
              <EditImageButton title='Zmień swój avatar'>
                <FaEdit /> Zmień zdjęcie
              </EditImageButton>
              <ImageWrapper>
                <Image src={user[0].image} alt={user[0].name} title={user[0].name} />
              </ImageWrapper>
              <UserInfo>
                <UserName>{user[0].name}</UserName>
                <UserRank>{user[0].privileges}</UserRank>
              </UserInfo>
            </UserWrapper>
            <UserStatsWrapper>
              <UserRegisterInfo>
                <StatsTitle>zarejestrowany</StatsTitle>
                <UserMail>{user[0].create_date}</UserMail>
              </UserRegisterInfo>
              <UserRegisterInfo>
                <StatsTitle>email</StatsTitle>
                <UserMail>{user[0].email}</UserMail>
              </UserRegisterInfo>
            </UserStatsWrapper>
            <UserStats>
              <h4>Statystyki</h4>
              <UserStatsWrapper>
                <UserRegisterInfo>
                  <StatsTitle>artykuły</StatsTitle>
                  <UserMail>{user[0].articles_count}</UserMail>
                </UserRegisterInfo>
                <UserRegisterInfo>
                  <StatsTitle>komentarze</StatsTitle>
                  <UserMail>{user[0].comments_count}</UserMail>
                </UserRegisterInfo>
                <UserRegisterInfo>
                  <StatsTitle>Polubienia</StatsTitle>
                  <UserMail>4</UserMail>
                </UserRegisterInfo>
              </UserStatsWrapper>
            </UserStats>
          </Fragment>
        )
      }
    </Container>
  )
}

const mapStateToProps = ({user}) => user;
export default connect(mapStateToProps)(UserSettings);
