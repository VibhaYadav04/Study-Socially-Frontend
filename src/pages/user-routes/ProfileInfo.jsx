import React, { useContext } from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Button, Card, CardBody, CardFooter, Col, Container, Input, Row, Table } from 'reactstrap'
import Base from '../../components/Base'
import ViewUserProfile from '../../components/ViewUserProfile'
import userContext from '../../context/userContext'
import { getUser } from '../../services/user-service'
function ProfileInfo() {
  const object = useContext(userContext)

  const [user, setUser] = useState(null)
  const [updateFlag, setUpdateFlag] = useState(false)
  const { userId } = useParams()
  // console.log(userId);


  useEffect(() => {
    getUser(userId).then(data => {
      console.log(data);
      setUser({ ...data })
    })
  }, [])

  const toggleUpdateFlag = (value) => {
    setUpdateFlag(value)
  }

  //show update profile
  const showUpdateProfile = () => {
    toggleUpdateFlag(true)
  }

  //show view profile
  const viewUpdateProflie = () => {
    toggleUpdateFlag(false)
  }


  /*  view user profile */
  const userView = () => {
    return (

      <ViewUserProfile updateProfileClick={showUpdateProfile} user={user} />

    )
  }

  const viewUserProfile = () => {
    return (

      <div>
        {user ? userView() : 'Loading user Data...'}
      </div>

    )
  }

  // END view user Profile

  //upate profile
  const updateUserProfile = () => {
    return (
      <div>
        <Card className='mt-2 border-0 rounded-0 shadow-sm'>
          <CardBody>
            <h3 className='text-uppercase'>user Information</h3>

            <Container className='text-center'>
              <img style={{ maxWidth: '200px', maxHeight: '200px' }} src={user.image ? user.image : 'https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436178.jpg'} alt="user profile picture" className='img-fluid  rounded-circle' />
            </Container>
            <Table responsive striped hover bordered={true} className='text-center mt-5'>
              <tbody>
                <tr>
                  <td >
                    NOTES ID
                  </td>
                  <td>
                    {user.id}
                  </td>
                </tr>
                <tr>
                  <td >
                    USERNAME
                  </td>
                  <td>
                    <Input type='text' value={user.name} />
                  </td>
                </tr>
                <tr>
                  <td >
                    USER EMAIL
                  </td>
                  <td>
                    {user.email}
                  </td>
                </tr>
                <tr>
                  <td >
                    ABOUT
                  </td>
                  <td>
                    <Input type='textarea' value={user.about} />
                  </td>

                </tr>
                <tr>
                  <td>
                    ROLE
                  </td>
                  <td>
                    {user.roles.map((role) => {
                      return (
                        <div key={role.id}>{role.name}</div>
                      )
                    })}
                  </td>
                </tr>
              </tbody>
            </Table>



          </CardBody>
          <CardFooter className='text-center'>
            <Button color='success'>Update Profile</Button>
          </CardFooter>
        </Card>
      </div>
    )
  }

  //END update profile

  return (
    <Base>
      <Row>
        <Col md={{ size: 6, offset: 3 }}>

          <Container>
            {updateFlag ? updateUserProfile() : viewUserProfile()}
          </Container>
        </Col>
      </Row>
    </Base>
  )
}

export default ProfileInfo