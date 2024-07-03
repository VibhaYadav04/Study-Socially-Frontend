import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Row, Col, Container } from "reactstrap";
import CategorySideMenu from '../components/CategorySideMenu';
import { deletePostService, loadPostCategoryWise } from '../services/post-service';
import Base from '../components/Base';
import { toast } from 'react-toastify';
import Post from '../components/Post';

function Categories() {
    const [posts, setPosts] = useState([]);
    const { categoryId } = useParams();

    useEffect(() => {
        console.log('categoryId:', categoryId);
        loadPostCategoryWise(categoryId)
            .then(data => {
                console.log('Fetched data:', data);
                if (Array.isArray(data)) {
                    setPosts(data);
                } else {
                    toast.error("Received data is not a valid array");
                }
            })
            .catch(error => {
                console.log('Error:', error);
                toast.error("Error in loading notes");
            });
    }, [categoryId]);
// function to delete post
function deletePost(post) {
    // going to delete post
    deletePostService(post.postId)
      .then((res) => {
        console.log(res);
        toast.success("Notes deleted");
        let newPosts = posts.filter(p => p.postId != post.postId)
      setPosts([...newPosts])
      })
      .catch((error) => {
        console.log(error);
        toast.error("Error loading User notes");
      });
  }
    return (
        <Base>
            <Container className="mt-3">
                <Row>
                    <Col md={2} className="pt-5">
                        <CategorySideMenu />
                    </Col>
                    <Col md={10}>
                        <h1>Notes Count ({posts.length})</h1>
                        {
                          posts && posts.map((post, index) => {
                            return(
                            <Post key={index} post={post} deletePost={deletePost} />
                            )
                          })
                        }

                       {posts.length<=0 ?<h1>No notes in this category</h1>:'' }

                    </Col>
                </Row>
            </Container>
        </Base>
    );
}

export default Categories;
