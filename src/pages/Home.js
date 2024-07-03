import { Row, Col, Container } from "reactstrap";
import Base from "../components/Base";
import NewsFeed from "../components/NewsFeed";
import CategorySideMenu from "../components/CategorySideMenu";

const Home = () => {

  return (
    <Base>
    <Container className="mt-3">
      <Row>
        <Col md={2} className="pt-5">
        <CategorySideMenu />
        </Col>
        <Col md={10}>
        <NewsFeed />
        </Col>
      </Row>
         
    </Container>
    </Base>
  );
};

export default Home;
