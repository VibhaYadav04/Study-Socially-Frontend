import { loadAllCategories } from "./category-service";
import { myAxios, privateAxios } from "./helper";

// create post function -- creating notes
export const createPost = (postData) => {
  // console.log(postData)
  return privateAxios
    .post(
      `/user/${postData.userId}/category/${postData.categoryId}/posts`,
      postData
    )
    .then((response) => {
      return response.data;
    });
};

// get all posts
export const loadAllPosts = (pageNumber, pageSize) => {
  return myAxios
    .get(
      `/posts?&pageNumber=${pageNumber}&pageSize=${pageSize}&sortBy=addedDate&sortDir=desc`
    )
    .then((response) => response.data);
};

//get single post of given id
export const loadPost = (postId) => {
  return myAxios.get("/posts/" + postId).then((response) => response.data);
};

// create comments
export const createComment = (comment, postId) => {
  return privateAxios.post(`/post/${postId}/comments`, comment);
};

// upload image
export const uploadPostImage = (image, postId) => {
  let formData = new FormData();
  formData.append("image", image);

  return privateAxios
    .post(`/post/image/upload/${postId}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => response.data);
};

// get post by category it
// export function loadPostCategoryWise(categoryId)
// {
//   return privateAxios
//     .get(`/category/${categoryId}/posts`)
//     .then((res)=> res.data);
// }
export function loadPostCategoryWise(categoryId) {
  return privateAxios
    .get(`/category/${categoryId}/posts`)
    .then(res => {
      console.log('API response:', res.data);  // Log the response data
      return res.data.content;  // Return the 'content' field
    });
}

// get post by userId
export function loadPostUserWise(userId){
  return privateAxios
     .get(`/user/${userId}/posts`)
     .then((res)=> res.data.content);
}

// delete post
export function deletePostService(postId){
  return privateAxios.delete(`/posts/${postId}`)
  .then((res)=> res.data.content);
}

// update post
export function updatePost(post, postId){
    return privateAxios.put(`/posts/${postId}`, post).then((resp) => resp.data.content);
}