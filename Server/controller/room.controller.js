import { Room } from "../schema/room.schema.js";

export const ListRoom = async(req,res)=>{
    try {
        
        const{title, category, images, location, price, description, beds, baths, sqft, status } = req.body

        if(!title || !category || !images || !location || !price || !description || !beds || !baths || !sqft || !status){
            return res.status(400).json({
                message:"Filled are Missing"
            })
        }

        const room = await Room.create({
            title,
            category,
            images,
            location,
            description,
            price,
            beds,
            baths,
            sqft,
            status
        })
        return res.status(200).json({
            message:"Room Listed Successfully",
            data:room
            
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message:"Internal Server Error"
        })
        
    }
}


export const getRoom = async (req, res) => {
    try {
        const data = await Room.find();
        
        return res.status(200).json({
            success: true,
            count: data.length,
            data
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Server Error",
            error: error.message
        });
    }
};



