import axios from 'axios';

// TODO: figure out why I don't see an error in the Network tab 
// when using http://localhost:5000 to access /user/:name, but 
// I do when using the Heroku link
const API = axios.create({ baseURL: 'http://localhost:5500' });
// const API = axios.create({ baseURL: 'https://memories-server-cis4250.herokuapp.com' });



API.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
  }

  return req;
});

export const fetchPost = (id) => API.get(`/posts/${id}`);
export const fetchPosts = (page) => API.get(`/posts?page=${page}`);

// export const fetchPostsByCreator = (name) => API.get(`/posts/creator/${name}`);
// export const fetchPostsByCreatorId = (id) => API.get(`/posts/creator/${id}`);
export const fetchPostsByCreator = (name) => API.get(`/posts/creator?name=${name}`);
export const fetchPostsByCreatorId = (id) => API.get(`/posts/creatorId?id=${id}`);

export const fetchPostsBySearch = (searchQuery) => API.get(`/posts/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}`);
export const createPost = (newPost) => API.post('/posts', newPost);
export const likePost = (id) => API.patch(`/posts/${id}/likePost`);
export const comment = (value, id) => API.post(`/posts/${id}/commentPost`, { value });
export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`/posts/${id}`);
export const getFollowingPosts = (id) => API.get(`/posts/getfollowingposts?id=${id}`);

export const signIn = (formData) => API.post('/user/signin', formData);
export const signUp = (formData) => API.post('/user/signup', formData);
export const fetchUserId = (id) => API.get(`/user/${id}`);
export const getUser = (name) => API.get(`/user/${name}`);
export const getUsers = () => API.get('/user');
export const updateUser = (updatedUser) => API.post(`/user/editprofile`, updatedUser);
export const addNewFollower = (followerInfo) => API.post(`/user/add-follower`, followerInfo);
export const addRemoveFollowerAPICall = (followerInfo) => API.post(`/user/remove-follower`, followerInfo);
