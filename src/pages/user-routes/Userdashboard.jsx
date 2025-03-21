import React, { useEffect, useState } from "react";
import Base from "../../components/Base";
import AddPost from "../../components/AddPost";
import { Container } from "reactstrap";
import { getCurrentUserDetail } from "../../auth";
import {
  deletePostService,
  loadPostUserWise,
} from "../../services/post-service";
import { toast } from "react-toastify";
import Post from "../../components/Post";

const Userdashboard = () => {
  const [user, setUser] = useState({});
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    console.log(getCurrentUserDetail());
    setUser(getCurrentUserDetail());
    loadPostData()
   
  }, [])


  // load post data
  function loadPostData(){
  loadPostUserWise(getCurrentUserDetail().id)
  .then((data) => {
    console.log(data);
    setPosts([...data]);
  })
  .catch((error) => {
    console.log(error);
    toast.error("Error loading User notes");
  });
}
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
      <Container className="p-3">
        <AddPost />

        <h2 className="my-3">Notes Count :({posts.length})</h2>
        {posts.map((post, index) => {
          return <Post post={post} key={index} deletePost={deletePost} />;
        })}
      </Container>
    </Base>
  );
};

export default Userdashboard;
