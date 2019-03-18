import React, {Component, Fragment} from 'react';
import styled from 'styled-components';
import { GoCommentDiscussion } from 'react-icons/go';
import { IoIosEye, IoIosHeart } from 'react-icons/io';
import {incLikesCount, decLikesCount} from '../../actions/';
import { connect } from 'react-redux';

const Header = styled.header`
  background:white;
  color:#1e1e1e;
  margin-bottom:40px;
`

const Title = styled.h2`
  display:block;
  font-family:'SSPBK';
  font-size:1.7em;
  @media (min-width: 640px) {
    font-size:2.6em;
  }
`

const Wrapper = styled.div`
  margin-top:15px;
  display:flex;
  justify-content:flex-start;
  flex-flow: row nowrap;
`

const Item = styled.div`
  display:flex;
  cursor:default;
  align-items:center;
  color:#c8c8c8;
  &:not(:last-child) {
    margin-right:8px;
  }
  &:nth-child(2) {
    svg:hover {
      color:#ee324e;
      cursor:pointer;
    }
  }
  svg {
    color:#c8c8c8;
  }
`

const Count = styled.span`
  display:inline-block;
  margin-left:4px;
  font-size:.95em;
`

class ArticleTitle extends Component {
  constructor(props) {
    super(props);

    this.state = {
      articleLikes: null
    }

    this.handleLikeButton = this.handleLikeButton.bind(this);
    this.handleDislikeButton = this.handleDislikeButton.bind(this);
  }

  async componentDidMount() {
    const {likes_count} = this.props.article.data;
    await this.setState({articleLikes: likes_count});
  }

  componentDidUpdate(prevProps) {
    const prev_likes_count = prevProps.article.data.likes_count,
          actual_likes_count = this.props.article.data.likes_count;

    if(prev_likes_count !== actual_likes_count) {
      this.setState({articleLikes: actual_likes_count})
    }
  }

  async handleLikeButton() {
    const {idarticle} = this.props.article.data;
    if(!this.props.article.blockLikeButton) return this.props.incLikesCount({idreference: idarticle});
  }

  async handleDislikeButton() {
    const {idarticle} = this.props.article.data;
    if(!this.props.article.blockLikeButton) return await this.props.decLikesCount(idarticle);
  }

  render() {
    const {title, likes_count, comments_count, views, liked} = this.props.article.data,
          {articleLikes} = this.state,
          {user} = this.props.user;

    return (
      <Header>
        <Title>{title}</Title>
        <Wrapper>
          <Item title='komentarze'>
            <GoCommentDiscussion />
            <Count>{comments_count}</Count>
          </Item>
          <Item title='polubienia'>
          {
           liked && user.length
           ? <Fragment>
               <IoIosHeart style={{color:'#ee324e'}} onClick = {this.handleDislikeButton} />
               <Count>{articleLikes}</Count>
             </Fragment>
           : <Fragment>
            { user.length
              ? <IoIosHeart onClick = {this.handleLikeButton} />
              : <IoIosHeart />
            }
               <Count>{articleLikes}</Count>
            </Fragment>
          }
          </Item>
          <Item title='wyświetlenia'>
            <IoIosEye />
            <Count>{views}</Count>
          </Item>
        </Wrapper>
      </Header>
    )
  }
}

const mapStateToProps = ({article, user}) => ({article, user});
export default connect(mapStateToProps, {incLikesCount, decLikesCount})(ArticleTitle);
