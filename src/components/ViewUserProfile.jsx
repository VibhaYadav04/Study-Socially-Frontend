import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Container,
  Table,
} from "reactstrap";
import { getCurrentUserDetail, isLoggedIn } from "../auth";

const ViewUserProfile = ({ user, updateProfileClick }) => {

  const [currentUser, setCurrentUser] = useState(null)
  const [login, setLogin] = useState(false)
  useEffect(()=>{
    setCurrentUser(getCurrentUserDetail())
    setLogin(isLoggedIn())
  }, [])
  return (
    <Card className="mt-2 border-0  shadow-sm" style={{ maxWidth: "700px", maxHeight: "500px" }}>
      <CardBody>
        <h3 className="text-uppercase">User Information</h3>
        <Container className="text-center">
          <img
            style={{ maxWidth: "150px", maxHeight: "150px" }}
            src={user.image ? user.image : 'https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436178.jpg'}
            alt="user profile picture"
            className="img-fluid rounded-circle"
          ></img>
        </Container>
        <Table
          responsive
          stripped
          hover
          bordered={true}
          className="md-5 text-center"
        >
          <tbody>
            <tr>
              <td>NOTES ID</td>
              <td>{user.id}</td>
            </tr>
            <tr>
              <td>USERNAME</td>
              <td>{user.name}</td>
            </tr>
            <tr>
              <td>USER EMAIL</td>
              <td>{user.email}</td>
            </tr>
            <tr>
              <td>ABOUT</td>
              <td>{user.about}</td>
            </tr>
            <tr>
              <td>ROLE</td>
              <td>
                {user.roles.map((role) => {
                  return <div key={role.id}>{role.name}</div>;
                })}
              </td>
            </tr>
          </tbody>
        </Table>
        {currentUser ? (currentUser.id == user.id)? (
            <CardFooter className="text-center">
          <Button onClick={updateProfileClick} color="warning">Update Profile</Button>
        </CardFooter>): '' : ''}
      </CardBody>
    </Card>
  );
};

export default ViewUserProfile;
