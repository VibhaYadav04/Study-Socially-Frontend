import {
  Card,
  CardBody,
  CardHeader,
  Container,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Row,
  Col,
  FormFeedback,
} from "reactstrap";
import Base from "../components/Base";
import { useState } from "react";
import { signUp } from "../services/user-service";
import { toast } from "react-toastify";

const Signup = () => {
  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
    about: '',
  });

  const [error, setError] = useState({
    name: '',
    email: '',
    password: '',
    about: '',
  });

  const [isError, setIsError] = useState(false);

  const handleChange = (event, property) => {
    setData({ ...data, [property]: event.target.value });

    // Clear error message when user starts typing
    setError({ ...error, [property]: '' });
  };

  const validateData = () => {
    let valid = true;
    let errorMessages = {
      name: '',
      email: '',
      password: '',
      about: '',
    };

    if (!data.name || data.name.length < 4) {
      errorMessages.name = "Username must be min of 4 characters !!";
      valid = false;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!data.email || !emailPattern.test(data.email)) {
      errorMessages.email = "Email address is not valid !!";
      valid = false;
    }

    if (!data.password || data.password.length < 3 || data.password.length > 10) {
      errorMessages.password = "Password must be min of 3 chars and max of 10 chars !!";
      valid = false;
    }

    if (!data.about) {
      errorMessages.about = "About field cannot be empty !!";
      valid = false;
    }

    setError(errorMessages);
    setIsError(!valid);

    return valid;
  };

  const resetData = () => {
    setData({
      name: '',
      email: '',
      password: '',
      about: ''
    });
    setError({
      name: '',
      email: '',
      password: '',
      about: '',
    });
    setIsError(false);
  };

  const submitForm = (event) => {
    event.preventDefault();

    if (!validateData()) {
      toast.error("Form data is invalid, correct all details then submit");
      return;
    }

    signUp(data).then((resp) => {
      console.log(resp);
      toast.success("User is registered successfully, with user id " + resp.id);
      resetData();
    }).catch((error) => {
      console.log(error);
      setError({
        ...error.errors?.response?.data,
        isError: true,
      });
    });
  };

  return (
    <Base>
      <Container>
        <Row className="mt-4">
          <Col sm={{ size: 6, offset: 3 }}>
            <Card color="dark" inverse>
              <CardHeader>
                <h3>Enter details to Register !!</h3>
              </CardHeader>
              <CardBody>
                <Form onSubmit={submitForm}>
                  {/* Name Field */}
                  <FormGroup>
                    <Label for="name">Enter Name</Label>
                    <Input
                      type="text"
                      placeholder="Enter Here"
                      id="name"
                      onChange={(e) => handleChange(e, 'name')}
                      value={data.name}
                      invalid={!!error.name}
                    />
                    <FormFeedback>
                      {error.name}
                    </FormFeedback>
                  </FormGroup>
                  {/* Email Field */}
                  <FormGroup>
                    <Label for="email">Enter Email</Label>
                    <Input
                      type="email"
                      placeholder="Enter Here"
                      id="email"
                      onChange={(e) => handleChange(e, 'email')}
                      value={data.email}
                      invalid={!!error.email}
                    />
                    <FormFeedback>
                      {error.email}
                    </FormFeedback>
                  </FormGroup>
                  {/* Password Field */}
                  <FormGroup>
                    <Label for="password">Enter Password</Label>
                    <Input
                      type="password"
                      placeholder="Enter Here"
                      id="password"
                      onChange={(e) => handleChange(e, 'password')}
                      value={data.password}
                      invalid={!!error.password}
                    />
                    <FormFeedback>
                      {error.password}
                    </FormFeedback>
                  </FormGroup>
                  {/* About Field */}
                  <FormGroup>
                    <Label for="about">Enter About Yourself</Label>
                    <Input
                      type="textarea"
                      placeholder="Enter Here"
                      id="about"
                      onChange={(e) => handleChange(e, 'about')}
                      value={data.about}
                      invalid={!!error.about}
                    />
                    <FormFeedback>
                      {error.about}
                    </FormFeedback>
                  </FormGroup>
                  <Container className="text-center">
                    <Button outline color="light">
                      Register
                    </Button>
                    <Button onClick={resetData} color="secondary" type="reset" className="ms-2">
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

export default Signup;
