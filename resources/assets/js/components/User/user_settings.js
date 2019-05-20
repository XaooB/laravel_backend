import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import MiniLoader from '../Reusable/mini_loader';
import { FaEdit } from "react-icons/fa";
import axios from 'axios';

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

const Info = styled.p`
  align-self:center;
  color:#fff;
`

const UploadButtonWrapper = styled.div`
  display:flex;
  height:75px;
  width:75px;
  position:relative;
  bottom:-15px;
  border-radius:6px;
  overflow:hidden;
  background:#ededed;
`

const UploadButton = styled.button`
  position:absolute;
  top:50%;
  left:50%;
  transform:translate(-50%, -50%);
  text-transform: uppercase;
  color:#333;
  font-family:'AvenirLTB';
  font-size:.8em;
  line-height:1.35;
  border:none;
  background:none;
`

const UploadInput = styled.input`
  position:absolute;
  max-width:75px;
  left:0;
  top:0;
  opacity:0;
  font-size:60px;
`

class UserSettings extends Component {
  constructor(props) {
    super(props);

    this.state = {
      imageModalUpload: false,
      imageUploadStatus: false
    }

    this.changeUserImage = this.changeUserImage.bind(this);
    this.uploadImage = this.uploadImage.bind(this);
  }

  changeUserImage(e) {
    this.setState({imageModalUpload: !this.state.imageModalUpload})
  }

  async uploadImage(e) {
    this.setState({imageUploadStatus: !this.state.imageUploadStatus})

    const { user } = this.props;
    const image = e.target.files[0];
    const data = new FormData();
    data.append('image', image);
    data.append('_method', 'PUT');

    try {
      await axios.post(`/api/users/${user.data.iduser}`, data);
    } catch (e) {
      throw new Error(e);
    } finally {
      this.setState({imageUploadStatus: !this.state.imageUploadStatus})
      await this.props.fetchUserProfile(user.data.iduser);
      this.changeUserImage();

    }
  }

  render() {
    const { user, status, userSession, activity } = this.props;
    const { imageModalUpload, imageUploadStatus } = this.state;

    return (
      <Container>
        {
          status
          ? <MiniLoader margin={20} />
          : user.status !== 200
          ? ''
          : (
            <Fragment>
              <UserWrapper>
              {
                !userSession.user.length
                ? ''
                : userSession.user[0].iduser === user.data.iduser
                ? (
                  <EditImageButton
                    title='Zmień swój avatar'
                    onClick={this.changeUserImage}
                  >
                    <FaEdit /> Zmień zdjęcie
                  </EditImageButton>
                ) : ''
              }
                {
                  !imageModalUpload
                  ? (
                    <ImageWrapper>
                      <Image src={user.data.image} alt={user.data.name} title={user.data.name} />
                    </ImageWrapper>
                    ) : (
                      <UploadButtonWrapper>
                      {
                        !imageUploadStatus
                        ? (
                          <Fragment>
                            <UploadButton>pick an image</UploadButton>
                            <UploadInput
                              type='file'
                              name='image'
                              accept="image/*"
                              onChange={this.uploadImage}
                            />
                          </Fragment>
                        ) : (
                          <MiniLoader />
                        )
                      }
                      </UploadButtonWrapper>
                    )
                  }
                <UserInfo>
                  <UserName>{user.data.name}</UserName>
                  <UserRank>{user.data.privileges}</UserRank>
                </UserInfo>
              </UserWrapper>
              <UserStatsWrapper>
                <UserRegisterInfo>
                  <StatsTitle>zarejestrowany</StatsTitle>
                  <UserMail>{user.data.create_date}</UserMail>
                </UserRegisterInfo>
                <UserRegisterInfo>
                  <StatsTitle>email</StatsTitle>
                  <UserMail>{user.data.email}</UserMail>
                </UserRegisterInfo>
              </UserStatsWrapper>
              <UserStats>
                <h4>Statystyki</h4>
                <UserStatsWrapper>
                  <UserRegisterInfo>
                    <StatsTitle>artykuły</StatsTitle>
                    <UserMail>{user.data.articles_count}</UserMail>
                  </UserRegisterInfo>
                  <UserRegisterInfo>
                    <StatsTitle>komentarze</StatsTitle>
                    <UserMail>{user.data.comments_count}</UserMail>
                  </UserRegisterInfo>
                  <UserRegisterInfo>
                    <StatsTitle>Polubienia</StatsTitle>
                    <UserMail>{activity.likedArticles.length}</UserMail>
                  </UserRegisterInfo>
                </UserStatsWrapper>
              </UserStats>
            </Fragment>
          )
        }
      </Container>
    )
  }
}

export default UserSettings;
