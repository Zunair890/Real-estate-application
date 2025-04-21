import prisma from "../lib/prisma.js";

if (!prisma) {
    throw new Error("Prisma client not initialized");
}

export const getPosts = async (req, res) => {
    try {
        const posts = await prisma.post.findMany();
        res.status(200).json(posts);
    } catch (error) {
        console.error('Error fetching posts:', error);
        res.status(500).json({ message: 'Error fetching posts', error: error.message });
    }
}
export const getPost= async(req,res)=>{
     const id= req.params.id;
    try {
        const post= await prisma.post.findUnique({
            where:{id},
            include:{
                postDetails:true,
                user:true
            }
        })

        res.status(200).json(post)
    } catch (error) {
        
    }
}
export const addPosts = async (req, res) => {
    try {
        const body = req.body;
        const tokenUserId = req.userId;

        

        if (!tokenUserId) {
            return res.status(401).json({ message: 'User authentication required' });
        }

        const newPost = await prisma.post.create({
            data: {
                ...body.postData,
                userId: tokenUserId,
                postDetail:{
                    create: body.postDetail
                }
            }
        });

        res.status(201).json(newPost);
    } catch (error) {
        console.error('Error creating post:', error);
        if (error.code === 'P2002') { // Duplicate key error
            return res.status(400).json({ message: 'Post with this data already exists' });
        }
        res.status(500).json({ message: 'Error creating post', error: error.message });
    }
}
export const updatePost= async(req,res)=>{
     
    try {

        const posts= await prisma.post.findMany();

        res.status(200).json(posts)
    } catch (error) {
        
    }
}

export const deletePost= async(req,res)=>{
      const id= req.params.id;
      const tokenUserId= req.userId;

    try {

       const post= await prisma.post.findUnique({
        where:{id}
       })

       if(post.userId!== tokenUserId){
        return res.status(403).json({message:"Not Authorized!"})
       }

     await prisma.post.delete({
        where:{id}
     })

        res.status(200).json({message:"Post deleted "})
    } catch (error) {
        
    }
}

