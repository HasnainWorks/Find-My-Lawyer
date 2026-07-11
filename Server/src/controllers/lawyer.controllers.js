import { Lawyer } from "../models/lawyerSchema.js" 
import bcrypt from 'bcrypt'
import { uploadOnCloudinary } from "../utils/cloudinary.js";


const methodForGeneratingAccessToken = async (userID) => {
  try {
    const lawyer = await Lawyer.findById(userID)
    const accessToken = lawyer.generateAccessToken()
    await lawyer.save({validateBeforeSave: false})

    return {accessToken}

  } catch (error) {
    console.log('Failed to generate tokens!!!',error);
    return res.status(500).send('Failed to generate tokens!!!');
  }
}

const options = {
  httpOnly: true,
  secure: false
}

const registerLawyer = async (req, res) => {

  console.log(req.body);
  
  console.log(req.file);

  const {
    name,
    email,
    password,
    cpassword,
    cnic,
    phone,
    city,
    experience,
    qualification,
    expertise,
    description,
  } = req.body;

  // Validate that all required fields are filled

  if (!req.file) {
    return res.status(400).json({ error: "Image is required" });
  }

  if (
    !name ||
    !email ||
    !password ||
    !cpassword ||
    !cnic ||
    !phone ||
    !city ||
    !experience ||
    !description ||
    !qualification ||
    !expertise
  ) {
    return res.status(422).json({ error: "Please fill all the fields properly" });
  }

  try {
    const lawyerExist = await Lawyer.findOne({ email });

    if (lawyerExist) {
      return res.status(422).json({ error: "Email already exists" });
    }

    const imageLocalPath = req.file?.path;

    if(!imageLocalPath){
      return res.status(400).send('image is required!')
    }

    const uploadedImage = await uploadOnCloudinary(imageLocalPath)

    if(!uploadedImage) {
      return res.status(401).send('Failed to upload image to cloudinary!!!')
    }

    if (password !== cpassword) {
      return res.status(422).json({ error: "Password and Confirm Password don't match" });
    }

   
    const lawyer = new Lawyer({
      name,
      email,
      password, 
      cpassword,
      cnic,
      phone,
      city,
      experience,
      qualification,
      expertise,
      description,
      image:uploadedImage.url
    });

    // Save the lawyer to the database
    const register = await lawyer.save();

    if (register) {
      return res.status(201).json({ message: "User registered successfully" });
    } else {
      return res.status(500).json({ error: "Failed to register user, please try again later." });
    }

  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const loginInLawyer = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Please fill all the fields" });
    }

    // Check if the lawyer exists
    const lawyerLogin = await Lawyer.findOne({ email });

    if (!lawyerLogin) {
      return res.status(401).json({ success: false, message: "Invalid email or password" });
    }

    // Verify the password
    const isMatchLawyer = await bcrypt.compare(password, lawyerLogin.password);

    if (!isMatchLawyer) {
      return res.status(401).json({ success: false, message: "Invalid email or password" });
    }

    const {accessToken} = await methodForGeneratingAccessToken(lawyerLogin._id)

    const loggedInLawyer = await Lawyer.findById(lawyerLogin._id).select("-password")

    // setting cookies

    return res
    .status(200)
    .cookie('accessToken',accessToken, options)
    .json({
      message: 'lawyer logged in successfully',
      data: {
        loggedInLawyer,
        accessToken
      }
    })

    
  } catch (err) {
    console.error("Error in loginInLawyer:", err);
    return res.status(500).json({ success: false, message: "Server error. Please try again later." });
  }
};

const logOutLawyer = async (req, res) => {
  try {
    await Lawyer.findByIdAndUpdate(
        req.lawyer._id,
        {
            $set: {refreshToken: undefined}
        },{
            new: true,
        }
    )

    return res
    .status(200)
    .clearCookie('accessToken', options)
    .clearCookie('refreshToken', options)
    .json({
        message: 'lawyer logged out successfully',
    })

} catch (error) {
    return res.status(500).send('Something went wrong while logging out!!!');
}
};

const RefreshedRefreshToken = async (req, res) => {
  try {

      //get refresh token from cookies
      const incomingRefreshToken = req.cookies.refreshToken;


      // check if refresh token is present
      if(!incomingRefreshToken) {
          return res.status(401).send('Refresh token is required!!!');
      }

      // decode the incoming refresh token
      const decodedToken = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET)


      // getting user with the help of refresh token
      const lawyer = await Lawyer.findById(decodedToken._id)
      

      // getting if user exists
      if(!lawyer) {
          return res.status(401).send('lawyer not found!!!');
      }


      // check if incoming refresh token is same as the one in the database
      if( incomingRefreshToken !== lawyer.refreshToken ) {
          return res.status(401).send('Invalid refresh token!!!');
      }


      // generate new access and refresh tokens
      const {accessToken, newRefreshToken} = await generateAccessRefreshToken(lawyer._id);


      // send the new access and refresh tokens in response
      return res
      .status(200)
      .cookie('accessToken', accessToken, options)
      .cookie('refreshToken', newRefreshToken, options) 
      .send('Access and Refresh tokens generated successfully!!!');
  } catch (error) {
      console.log(error);
      return res.status(500).send('Access token refreshed successfully!!!');
  }
};

const getAllLawyers = async (req, res) => {
  try{

    const lawyers= await Lawyer.find({})
    if(!lawyers){
      return res.status(401).send('No lawyers found!!!');
    }

    return res.status(201).send({
      message:'lawyers Found Successfully',
      lawyer:lawyers
    })

}catch(error){
    console.log(error);
    res.status(400).send('Somthing went wrong while finding lawyers')
}
};

const getLawyerById = async (req, res) => {
  try{

    const lawyerId = req.params.id;
    const lawyer = await Lawyer.findById(lawyerId)
    if(!lawyer ){
      res.status(404).send('No lawyers found!!!')
    }

    res.status(201).send({message:"lawyers found successfully", data:lawyer })

}catch(error){
    res.status(401).send('Something went wrong while finding lawyers by id')
    console.log(error);
}
};

const getExperties = async (req, res) => {
  try {
    const expertise = req.params.expertise;
    const getExperties = await Lawyer.find({ expertise:expertise });
    if(!getExperties) {
      res.status(404).send('No experties found')
    }
    return res.status(201).send({
      message:'esperties found successfully',
      data:getExperties
    })
  } catch (error) {
    res.status(400).send('something went wrong while getting experties')
    console.log(error);
    
  }
};

// getting all the lawyers according to their expertise

const getlegalNoticeLawyer = async (req, res) => {
  try {
    const legalNoticeLawyer = await Lawyer.find({
      expertise: "Legal notice"
    })

    if(!legalNoticeLawyer){
      return res.status(404).send('No "Legal notice" lawyer found!!!')
    }

    return res.status(201).send({
      message:'"Legal notice" lawyers found successfully',
      data:legalNoticeLawyer
    })
  } catch (error) {
    console.log(error);
    return res.status(500).send('Somthing went wrong while getting Legal notice lawyers')
  }
};

const getcriminalMatterLawyer = async (req, res) => {
  try {
    const criminalMatterLawyer = await Lawyer.find({
      expertise: "Criminal matter"
    })

    if(!criminalMatterLawyer){
      return res.status(404).send('No criminal matter lawyer found!!!')
    }

    return res.status(201).send({
      message:'criminal matter lawyers found successfully',
      data:criminalMatterLawyer
    })
  } catch (error) {
    console.log(error);
    return res.status(500).send('Somthing went wrong while getting criminal matter lawyers')
  }
};

const getdivorceLawyer = async (req, res) => {
  try {
    const divorceLawyer = await Lawyer.find({
      expertise: "Divorce"
    })

    if(!divorceLawyer){
      return res.status(404).send('No Divorce lawyer found!!!')
    }

    return res.status(201).send({
      message:'Divorce lawyers found successfully',
      data:divorceLawyer
    })
  } catch (error) {
    console.log(error);
    return res.status(500).send('Somthing went wrong while getting Divorce lawyers')
  }
};

const getfamilyMatterLawyer = async (req, res) => {
  try {
    const familyMatterLawyer = await Lawyer.find({
      expertise: "Family Matter"
    })

    if(!familyMatterLawyer){
      return res.status(404).send('No Family Matter lawyer found!!!')
    }

    return res.status(201).send({
      message:'Family Matter lawyers found successfully',
      data:familyMatterLawyer
    })
  } catch (error) {
    console.log(error);
    return res.status(500).send('Somthing went wrong while getting Family Matter lawyers')
  }
};

const getmediationLawyer = async (req, res) => {
  try {
    const mediationLawyer = await Lawyer.find({
      expertise: "Mediation"
    })

    if(!mediationLawyer){
      return res.status(404).send('No Mediation lawyer found!!!')
    }

    return res.status(201).send({
      message:'Mediation lawyers found successfully',
      data:mediationLawyer
    })
  } catch (error) {
    console.log(error);
    return res.status(500).send('Somthing went wrong while getting Mediation lawyers')
  }
};

const getcompanyRegLawyer = async (req, res) => {
  try {
    const companyReg = await Lawyer.find({
      expertise: "Company Reg."
    })

    if(!companyReg){
      return res.status(404).send('No companyReg lawyer found!!!')
    }

    return res.status(201).send({
      message:'companyReg lawyers found successfully',
      data:companyReg
    })
  } catch (error) {
    console.log(error);
    return res.status(500).send('Somthing went wrong while getting companyReg lawyers')
  }
};

const gettrademarkLawyer = async (req, res) => {
  try {
    const tradeMark = await Lawyer.find({
      expertise: "Trademark"
    })

    if(!tradeMark){
      return res.status(404).send('No tradeMark lawyer found!!!')
    }

    return res.status(201).send({
      message:'tradeMark lawyers found successfully',
      data:tradeMark
    })
  } catch (error) {
    console.log(error);
    return res.status(500).send('Somthing went wrong while getting tradeMark lawyers')
  }
};

const gettaxfilingLawyer = async (req, res) => {
  try {
    const taxFiling = await Lawyer.find({
      expertise: "Tax Filing"
    })

    if(!taxFiling){
      return res.status(404).send('No taxFiling lawyer found!!!')
    }

    return res.status(201).send({
      message:'taxFiling lawyers found successfully',
      data:taxFiling
    })
  } catch (error) {
    console.log(error);
    return res.status(500).send('Somthing went wrong while getting taxFiling lawyers')
  }
};

const getrecoveryMatterLawyer = async (req, res) => {
  try {
    const recoveryMatter = await Lawyer.find({
      expertise: "Recovery matter"
    })

    if(!recoveryMatter){
      return res.status(404).send('No recoveryMatter lawyer found!!!')
    }

    return res.status(201).send({
      message:'recoveryMatter lawyers found successfully',
      data:recoveryMatter
    })
  } catch (error) {
    console.log(error);
    return res.status(500).send('Somthing went wrong while getting recoveryMatter lawyers')
  }
};

const getimmigrationLawyer = async (req, res) => {
  try {
    const immigrationLawyer = await Lawyer.find({
      expertise: "Immigration"
    })

    if(!immigrationLawyer){
      return res.status(404).send('No immigration lawyer found!!!')
    }

    return res.status(201).send({
      message:'immigration lawyers found successfully',
      data:immigrationLawyer
    })
  } catch (error) {
    console.log(error);
    return res.status(500).send('Somthing went wrong while getting immigration lawyers')
  }
};

const getserviceMatterLawyer = async (req, res) => {
  try {
    const serviceMatter = await Lawyer.find({
      expertise: "Service matter"
    })

    if(!serviceMatter){
      return res.status(404).send('No serviceMatter lawyer found!!!')
    }

    return res.status(201).send({
      message:'serviceMatter lawyers found successfully',
      data:serviceMatter
    })
  } catch (error) {
    console.log(error);
    return res.status(500).send('Somthing went wrong while getting serviceMatter lawyers')
  }
};

const getcivilMatterLawyer = async (req, res) => {
  try {
    const civilMatter = await Lawyer.find({
      expertise: "Civil matter"
    })

    if(!civilMatter){
      return res.status(404).send('No civilMatter lawyer found!!!')
    }

    return res.status(201).send({
      message:'civilMatter lawyers found successfully',
      data:civilMatter
    })
  } catch (error) {
    console.log(error);
    return res.status(500).send('Somthing went wrong while getting civilMatter lawyers')
  }
};

// sending message to lawyer

const sendMessageToLawyer = async (req, res) => {
  const { name, email, contact, message, recipient } = req.body;
      
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'hirethelawyer.pk@gmail.com', // Replace with your email address
        pass: 'filayfqpdlnoqjbl', // Replace with your email password
      },
    });

    const mailOptions = {
      from: 'hirethelawyer.pk@gmail.com', // Replace with your email address
      to: recipient,
      subject: 'Client Message',
      text: `
        Name: ${name}
        Email: ${email}
        Contact: ${contact}
        Message: ${message}
      `,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error send message' });
      } else {
        console.log('Email sent: ' + info.response);
        res.status(200).json({ message: 'Message sent successfully' });
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
  



export { 
        registerLawyer,
        loginInLawyer,
        getAllLawyers,
        getLawyerById,
        getExperties,
        getlegalNoticeLawyer,
        getcriminalMatterLawyer,
        getdivorceLawyer,
        getfamilyMatterLawyer,
        getmediationLawyer,
        getcompanyRegLawyer,
        gettrademarkLawyer,
        gettaxfilingLawyer,
        getrecoveryMatterLawyer,
        getimmigrationLawyer,
        getserviceMatterLawyer,
        getcivilMatterLawyer,
        sendMessageToLawyer,
        logOutLawyer,
        RefreshedRefreshToken,
      };
