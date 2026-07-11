import {v2 as cloudinary} from 'cloudinary' 
import fs from 'fs';


cloudinary.config({ 
    cloud_name: 'dyxamtpod', 
    api_key: '867338771593614', 
    api_secret: 'QoxX0JU2V1w2hIC8q14q_HGw2r4' // Click 'View API Keys' above to copy your API secret
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if(!localFilePath) return null

        const response = await cloudinary.uploader.upload(localFilePath,{
            resource_type:'auto'
        })
        console.log('File has been uploaded successfully',response.url);
        return response
        
    } catch (error) {
        fs.unlinkSync(localFilePath) // remove the locally saved temporary file as the upload operation got failed
        console.log(error);
        return null
    }
}


export {
    uploadOnCloudinary
}