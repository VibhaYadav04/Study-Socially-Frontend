import React, { useState, useEffect } from 'react';
import { loadAllPosts, deletePostService } from '../services/post-service';
import { Row, Col } from 'reactstrap';
import Post from './Post';
import { toast } from 'react-toastify';
import InfiniteScroll from 'react-infinite-scroll-component';

const NewsFeed = () => {
  const [postContent, setPostContent] = useState({
    content: [],
    totalPages: '',
    totalElements: '',
    pageSize: '',
    lastPage: false,
    pageNumber: ''
  });

  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    console.log("loading posts");
    console.log(currentPage);
    changePage(currentPage);
  }, [currentPage]);

  const changePage = (pageNumber = 0, pageSize = 5) => {
    if (pageNumber > postContent.pageNumber && postContent.lastPage) {
      return;
    }
    if (pageNumber < postContent.pageNumber && postContent.pageNumber === 0) {
      return;
    }
    loadAllPosts(pageNumber, pageSize).then(data => {
      setPostContent({
        content: [...postContent.content, ...data.content],
        totalPages: data.totalPages,
        totalElements: data.totalElements,
        pageSize: data.pageSize,
        lastPage: data.lastPage,
        pageNumber: data.pageNumber
      });
      console.log(data);
    }).catch(error => {
      toast.error("Error in loading posts");
    });
  };

  const deletePost = (post) => {
    console.log(post);
    deletePostService(post.postId).then(res => {
      console.log(res);
      toast.success("Post is deleted..");
      let newPostContents = postContent.content.filter(p => p.postId !== post.postId);
      setPostContent({ ...postContent, content: newPostContents });
    }).catch(error => {
      console.log(error);
      toast.error("Error in deleting post");
    });
  };

  const changePageInfinite = () => {
    console.log("page changed");
    setCurrentPage(currentPage + 1);
  };

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '20px',
  };

  const itemStyle = {
    backgroundColor: '#ffffff',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.3s, box-shadow 0.3s',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  };

  const itemHoverStyle = {
    transform: 'translateY(-10px)',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
  };

  const titleStyle = {
    textAlign: 'center',
    marginBottom: '10px',
    fontSize: '2.5em',
    fontFamily: 'Georgia, serif',
    color: '#00695c'
  };

  const subtitleStyle = {
    textAlign: 'center',
    fontSize: '1em',
    fontFamily: 'Courier New, monospace',
    color: '#8d6e63',
    marginBottom: '20px'
  };

  
  return (
    <div className="container-fluid">
      <Row>
        <Col md={12}>
          <h1 style={titleStyle}>STUDY SOCIALLY</h1>
          <p style={subtitleStyle}><b>"Digital way to make students study at home"</b></p>
          <h3 style={{ textAlign: 'center', marginBottom: '20px' }}>Notes Count ({postContent?.totalElements})</h3>
          <InfiniteScroll
            dataLength={postContent.content.length}
            next={changePageInfinite}
            hasMore={!postContent.lastPage}
            loader={<h4>Loading...</h4>}
            endMessage={
              <p style={{ textAlign: 'center' }}>
                <b>Yay! You have seen it all</b>
              </p>
            }
          >
            <div style={gridStyle}>
              {postContent.content.map((post, index) => (
                <div 
                  key={index} 
                  style={{ 
                    ...itemStyle, 
                    ...(index % 2 === 0 ? itemHoverStyle : {}),
                    transition: 'transform 0.3s, box-shadow 0.3s' // Ensure transition is applied
                  }}
                  onMouseEnter={() => {
                    const items = document.querySelectorAll('.post-item');
                    items.forEach(item => {
                      if (item !== items[index]) {
                        item.style.transform = 'translateY(0)';
                        item.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
                      }
                    });
                    items[index].style.transform = 'translateY(-10px)';
                    items[index].style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.2)';
                  }}
                  onMouseLeave={() => {
                    const items = document.querySelectorAll('.post-item');
                    items.forEach(item => {
                      item.style.transform = 'translateY(0)';
                      item.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
                    });
                  }}
                  className="post-item"
                >
                  <Post deletePost={deletePost} post={post} />
                </div>
              ))}
            </div>
          </InfiniteScroll>
        </Col>
      </Row>
    </div>
  );
};

export default NewsFeed;
