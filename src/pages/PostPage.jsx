import { Link, useParams } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  CardText,
  Col,
  Container,
  Input,
  Row,
} from "reactstrap";
import Base from "../components/Base";
import { useEffect, useState } from "react";
import { createComment, loadPost } from "../services/post-service";
import { toast } from "react-toastify";
import { BASE_URL } from "../services/helper";
import { isLoggedIn } from "../auth";
const PostPage = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [comment, setComment] = useState({
    content:''
  })
  //load post of postId
  useEffect(() => {
    //load post of postId
    loadPost(postId)
      .then((data) => {
        console.log(data);
        setPost(data);
      })
      .catch((error) => {
        console.log(error);
        toast.error("Error in loading notes");
      });
  }, []);

  // to print date
  const printDate = (numbers) => {
    return new Date(numbers).toLocaleDateString();
  };

  // to submit the comment
  const submitPost=()=>{
    if(!isLoggedIn()){
        toast.error("Need to login first !!")
        return
    }
    if(comment.content.trim()==='') return
    createComment(comment, post.postId)
    .then(data=>{
        console.log(data)
        toast.success("Comment Added")
        setPost({
            ...post,
            comments:[...post.comments, data.data]
        })
        setComment({
           content:''
        })
    }).catch(error=>{
        console.log(error)
    })
  }

  return (
    <Base>
      <Container className="mt-2">
        <Link to="/">Home</Link> / {post && <Link to="">{post.title}</Link>}
        <Row>
          <Col
            md={{
              size: 12,
            }}
          >
            <Card className="mt-1 border-0 shadow-sm">
              {post && (
                <CardBody>
                  <CardText>
                    Posted By <b>{post.user.name}</b> on{" "}
                    <b>{printDate(post.addedDate)}</b>
                  </CardText>
                  <CardText>
                    <span className="text-muted">
                      {post.category.categoryTitle}
                    </span>
                  </CardText>
                  <div
                    className="divider"
                    style={{
                      width: "100%",
                      height: "1px",
                      background: "#e2e2e2",
                    }}
                  ></div>
                  <CardText className="mt-1">
                    <h3>{post.title}</h3>
                  </CardText>
                  <div
                    className="image-container mt-4"
                    style={{ maxWidth: "50%", margin: "0 auto"  }}
                  >
                    <img
                      className="img-fluid"
                      src={BASE_URL + "/post/image/" + post.imageName}
                      alt=""
                    ></img>
                  </div>
                  <CardText
                    className="mt-2"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                  ></CardText>
                </CardBody>
              )}
            </Card>
          </Col>
        </Row>
        <Row className="my-3">
          <Col
            md={{
              size: 9,
              offset: 1,
            }}
          >
            <h3>Discussions ({post ? post.comments.length : 0})</h3>
            {post &&
              post.comments.map((c, index) => (
                <Card className="mt-3 border-0" key={index}>
                  <CardBody>
                    <CardText>{c.content}</CardText>
                  </CardBody>
                </Card>
              ))}

            <Card className="mt-3 border-0">
              <CardBody>
                <CardText>
                  <Input type="textarea"
                   placeholder="Enter comment here"
                   value={comment.content}
                   onChange={(event)=>setComment({content:event.target.value})} 
                  />
                  <Button onClick={submitPost} className="mt-2" color="primary">
                    Submit
                  </Button>
                </CardText>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Base>
  );
};

export default PostPage;
