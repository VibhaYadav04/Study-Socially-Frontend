import {
  CardBody,
  CardHeader,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
  Container,
  Col,
  Card,
  Button,
} from "reactstrap";
import Base from "../components/Base";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import { loginUser } from "../services/user-service";
import { doLogin } from "../auth";
import { useNavigate } from "react-router-dom";
import userContext from "../context/userContext";

const Login = () => {

  const userContextData = useContext(userContext);
  const navigate=useNavigate()

  const [loginDetail, setLoginDetail] = useState({
    username: "",
    password: "",
  });

  const handleChange = (event, field) => {
    let actualValue = event.target.value;
    setLoginDetail({
      ...loginDetail,
      [field]: actualValue,
    });
  };

  // reset content
  const handleReset = () => {
    setLoginDetail({
      username: "",
      password: "",
    });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    console.log(loginDetail);

    //validation
    if (
      loginDetail.username.trim() === "" ||
      loginDetail.password.trim() === ""
    ) {
      toast.error("Username or Password is required !!");
      return;
    }

    //submit the data to server to generate  token
    loginUser(loginDetail)
      .then((data) => {
        console.log("user login: ");
        console.log(data);

        //save the data to local storage
        doLogin(data, () => {
          console.log("Login detail is saved to local storage");
          //redirect to user dashboard page
          userContextData.setUser({
            data: data.user,
            login: true
          });
          navigate("/user/dashboard")
        });

        toast.success("Login Success");
      })
      .catch((error) => {
        console.log(error);
        if (error.response.status === 400 || error.response.status === 404)
          toast.error(error.response.data.message);
        else toast.error("Something went wrong on server!");
      });
  };

  return (
    <Base>
      <Container>
        <Row className="mt-4">
          <Col
            sm={{
              size: 6,
              offset: 3,
            }}
          >
            <Card color="dark" inverse>
              <CardHeader>
                <h3>Enter details to Login !!</h3>
              </CardHeader>
              <CardBody>
                <Form onSubmit={handleFormSubmit}>
                  {/* Email Field */}
                  <FormGroup>
                    <Label for="email">Enter Email</Label>
                    <Input
                      type="text"
                      placeholder="Enter Here"
                      id="email"
                      value={loginDetail.username}
                      onChange={(e) => handleChange(e, "username")}
                    />
                  </FormGroup>

                  {/* Password Field */}
                  <FormGroup>
                    <Label for="password">Enter Password</Label>
                    <Input
                      type="password"
                      placeholder="Enter Here"
                      id="password"
                      value={loginDetail.password}
                      onChange={(e) => handleChange(e, "password")}
                    />
                  </FormGroup>

                  <Container className="text-center">
                    <Button outline color="light">
                      Login
                    </Button>
                    <Button
                      onClick={handleReset}
                      className="ms-2"
                      color="secondary"
                    >
                      Reset
                    </Button>
                  </Container>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Base>
  );
};

export default Login;
