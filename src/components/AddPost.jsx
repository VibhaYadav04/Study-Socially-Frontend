import { Button, Card, CardBody, Container, Form, Input, Label } from "reactstrap"
import { loadAllCategories } from "../services/category-service"
import { useEffect, useRef, useState } from "react"
import JoditEditor from "jodit-react"
import { createPost as doCreatePost, uploadPostImage } from "../services/post-service"
import { getCurrentUserDetail } from "../auth"
import { toast } from "react-toastify";
const AddPost = ()=>{

    const editor=useRef(null)
   // const [content, setContent]= useState('')
    const [categories, setCategories]=useState([])
    const [user, setUser] = useState(undefined)

    const [post, setPost]= useState({
        title:'',
        content:'',
        categoryId:''
    })

    const [image, setImage]=useState(null)

    useEffect(
        ()=>{
            setUser(getCurrentUserDetail())
            loadAllCategories().then((data)=>{
                console.log(data)
                setCategories(data)
            }).catch(error=>{
                console.log(error)
            })
        },
        []
    )


    //Field changed function
    const fieldChanged=(event)=>{
        setPost({...post, [event.target.name]:event.target.value})
    }
    
    //Content Field changed function
    const contentFieldChanged=(data)=>{
        setPost({...post, 'content':data})
    } 

    // Create Post
    const createPost= (event) => {
        event.preventDefault();
       // console.log(post)

        if(post.title.trim() === ''){
            toast.error("Chapter Name is required !!")
            return;
        }

        if(post.content.trim() === ''){
            toast.error("Chapter Content is require !!")
            return;
        }

        if(post.categoryId === ''){
            toast.error("Select Subject Category !!")
            return;
        }

        // Submit form on server
        post['userId'] = user.id
        doCreatePost(post).then(data=>{
            uploadPostImage(image, data.postId)
            .then(data=>{
                toast.success("Image Uploaded!")
            }).catch(error=>{
                toast.error("Error in uploading image")
                console.log(error)
            })


            toast.success("Notes created!")
            setPost({
                title:'',
                content:'',
                categoryId:''
            })
            //console.log(post)
        }).catch((error)=>{
            toast.error("Notes not created due to some error!!")
            //console.log(error)
        })
            
    }

    // Reset content
    const handleReset = () => {
        setPost({
            title:'',
            content:'',
            categoryId:''
        })
    }

    // handling file change event
    const handleFileChange=(event)=>{
        console.log(event.target.files[0])
        setImage(event.target.files[0])
    }

    return(
        <div className="wrapper">
           <Card className="shadow border-0 mt-2">
            <CardBody>
                {/* {JSON.stringify(post)} */}
                <h3>What's going on in your mind?</h3>
                <Form onSubmit={createPost}>
                  <div className="my-3">
                    <Label for="title"> Chapter Name</Label> 
                    <Input 
                    type="text" 
                    id="title" 
                    placeholder="Enter here"
                    className="rounded-0"
                    name="title"
                    onChange={fieldChanged}/>
                  </div>

                  <div className="my-3">
                    <Label for="content"> Chapter Content</Label> 
                    {/* <Input 
                    type="textarea" 
                    id="content" 
                    placeholder="Enter here"
                    className="rounded-0"
                    style={{height:'100px'}}/>
                   */}
                   <JoditEditor 
                   ref={editor}
                   value={post.content}
                   onChange={contentFieldChanged}
                   />
                  </div>

                  {/* File feild to take image as input */}
                  <div className="mt-3">
                    <Label for="image"> Select Figure </Label>
                    <Input id="image" type="file" onChange={handleFileChange} accept="image/*" />

                  </div>


                  <div className="my-3">
                    <Label for="category"> Subject Category</Label> 
                    <Input 
                    type="select" 
                    id="category" 
                    placeholder="Enter here"
                    className="rounded-0"
                    name="categoryId"
                    onChange={fieldChanged}
                    defaultValue={0}>
                    <option disabled value={0}>--Select Subject--</option>    
                    {
                        categories.map((category)=>(
                        <option value={category.categoryId} key={category.categoryId}>
                            {category.categoryTitle}
                        </option>
                        ))
                    }    
                        
                    </Input>
                  </div>
                  <Container className="text-center">
                    <Button type="submit" className="rounded-0" color="primary">Create Notes</Button>
                    <Button onClick={handleReset} className="rounded-0 ms-2" color="danger">Reset Content</Button>
                  </Container>
                </Form>
            </CardBody>
           </Card>
        </div>
    )
}

export default  AddPost