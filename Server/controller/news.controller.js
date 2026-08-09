import { News } from "../schema/news.schema.js";

const createNews = async(req,res)=>{
    try {
       const {headline, image, description, author, publisher} = req.body

       if(!headline || !image || !description || !author || !publisher){
        return res.status(404).json({
            message:"Some Fields are missing"
        })
       }

       const data = await News.create({
        headline,
        image,
        description,
        author,
        publisher
       })

       return res.status(200).json({
        message:"News are Created Successfully",
        data:data
       })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"Internal Server Error"
        })
    }
}

export default createNews


export const getNews = async(req,res)=>{
    try {
        const data = await News.find()
        return res.status(200).json({
            message:"News fetch successfully",
            data:data
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"Internal Server Error"
        })
    }
}


export const getNewsById = async(req,res)=>{
    try {
        const {id} = req.params

        const data = await News.findById(id) 

        if(!data){
            return res.status(400).json({
                success:false,
                message:"News Not Found"
            })
        }

        return res.status(200).json({
            success:true,
            data
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"Internal Server Error"
        })
    }
}
