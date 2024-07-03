import React, { useEffect, useState } from 'react'
import { ListGroup, ListGroupItem } from 'reactstrap'
import { loadAllCategories} from '../services/category-service'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'
function CategorySideMenu() {

    const [categories, setCategories] = useState([])
    useEffect(()=>{
        loadAllCategories().then(data=>{
            setCategories([...data])
        }).catch(error=>{
            console.log(error);
            toast.error("Error in loading categories")
        })
    },[])
    const subjectStyle = {
        textAlign: 'center',
        fontSize: '1.5em',
        fontFamily: 'Arial, sans-serif',
        color: '#4caf50',
        marginBottom: '10px'
      };

  return (
    <div>
        
        <ListGroup>
           <ListGroupItem >
           <h2 style={subjectStyle}>--Subjects--</h2>
           </ListGroupItem>
            <ListGroupItem tag={Link} to="/" action={true} className="border-0 mt-1" >
                All Notes
            </ListGroupItem>
        {categories && categories.map((cat,index)=>{
            return(
                <ListGroupItem tag={Link} to={'/categories/'+cat.categoryId} className='border-0 shadow-0 mt-1'key={index} action={true}>
                    {cat.categoryTitle}
                </ListGroupItem>
            )
        })}
        </ListGroup>
    </div>
  )
}

export default CategorySideMenu
