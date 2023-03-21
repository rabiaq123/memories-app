import express from 'express';
import mongoose from 'mongoose';

import PostMessage from '../models/postMessage.js';
import UserModel from "../models/user.js";

const router = express.Router();

export const getPosts = async (req, res) => {
    const { page } = req.query;
    
    try {
        const LIMIT = 4;
        const startIndex = (Number(page) - 1) * LIMIT; // get the starting index of every page
    
        const total = await PostMessage.countDocuments({});
        const posts = await PostMessage.find().sort({ _id: -1 }).limit(LIMIT).skip(startIndex);

        // return data, current page, and number of pages to actions (client)
        console.log("posts", posts)
        res.json({ data: posts, currentPage: Number(page), numberOfPages: Math.ceil(total / LIMIT)});
    } catch (error) {    
        res.status(404).json({ message: error.message });
    }
}

export const getPostsBySearch = async (req, res) => {
    const { searchQuery, tags } = req.query;

    try {
        const title = new RegExp(searchQuery, "i");

        const posts = await PostMessage.find({ $or: [ { title }, { tags: { $in: tags.split(',') } } ]});

        res.json({ data: posts });
    } catch (error) {    
        res.status(404).json({ message: error.message });
    }
}

export const getPostsByCreator = async (req, res) => {
    const { name } = req.query;

    try {
        const posts = await PostMessage.find({ name });

        res.json({ data: posts });
    } catch (error) {    
        res.status(404).json({ message: error.message });
    }
}

export const getPostsByCreatorId = async (req, res) => {
    const { id } = req.query;

    try {
        const posts = await PostMessage.find({ creator: id});

        res.json({ data: posts });
    } catch (error) {    
        res.status(404).json({ message: error.message });
    }
}


export const getPost = async (req, res) => { 
    const { id } = req.params;

    try {
        const post = await PostMessage.findById(id);
        
        res.status(200).json(post);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createPost = async (req, res) => {
    const post = req.body;

    const newPostMessage = new PostMessage({ ...post, creator: req.userId, createdAt: new Date().toISOString() })

    try {
        await newPostMessage.save();

        res.status(201).json(newPostMessage);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const updatePost = async (req, res) => {
    const { id } = req.params;
    const { title, message, creator, selectedFile, tags } = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    const updatedPost = { creator, title, message, tags, selectedFile, _id: id };

    await PostMessage.findByIdAndUpdate(id, updatedPost, { new: true });

    res.json(updatedPost);
}

export const deletePost = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    await PostMessage.findByIdAndRemove(id);

    res.json({ message: "Post deleted successfully." });
}

export const likePost = async (req, res) => {
    const { id } = req.params;

    if (!req.userId) {
        return res.json({ message: "Unauthenticated" });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
    
    const post = await PostMessage.findById(id);

    const index = post.likes.findIndex((id) => id ===String(req.userId));

    if (index === -1) {
      post.likes.push(req.userId);
    } else {
      post.likes = post.likes.filter((id) => id !== String(req.userId));
    }

    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true });

    res.status(200).json(updatedPost);
}

export const commentPost = async (req, res) => {
    const { id } = req.params;
    const { value } = req.body;

    const post = await PostMessage.findById(id);

    post.comments.push(value);

    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true });

    res.json(updatedPost);
};


export const getPostFromFollowing = async (req, res) => {
    const { id } = req.params;
    console.log ("_id is: " + id);
    const { page } = req.query;
    console.log ("hello from the get followers post endpoint");
    let user;
    let posts;
    const LIMIT = 4;
    const startIndex = (Number(page) - 1) * LIMIT; // get the starting index of every page

    try {
      // return all posts if user is not signed in
      if (id == undefined) {
        console.log("The user id is undefined. Returning all posts.");
        posts = await PostMessage.find().sort({ id: -1 }).limit(LIMIT).skip(startIndex);
        res.json({ data: posts, currentPage: Number(page), numberOfPages: Math.ceil(posts.length / LIMIT)});  
        return
      }

      // checking to see if the user exists in database
      user = await UserModel.findById(id);
      if (user == null){
        console.log("The user with id: " + id + " was not found");
        res.status(400).json({ 'message': "The user id: " + id + " was not found"});
        return
      }
    
  
      // // iterating through each of the following users to get their posts
      // for (var i = 0; i < user.following.length; i++) { 
      //   // console.log(user.following[i]); 
      //   let posts = await PostMessage.find({ creator: user.following[i]});
      //   // console.log("Founds posts are:")
      //   // console.log(posts);
      //   if (posts.length != 0){
      //     for (var j = 0; j < posts.length; j++) { 
      //       console.log("Found a post and pushing it onto the array")
      //       found_following_posts.push(posts[j]);
      //     }
      //   }
      // }
      // console.log(...user.following)
      posts = await PostMessage.find({creator: {$in: [user.following]}}).sort({ id: -1 }).limit(LIMIT).skip(startIndex);

      res.json({ data: posts, currentPage: Number(page), numberOfPages: Math.ceil(total / LIMIT)});  
      return
    }catch (error) {
      res.status(500).json({ message: error.message });
      return
    }
  
};

export default router;