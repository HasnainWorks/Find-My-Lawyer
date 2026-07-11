export const isLawyer = (req, res, next) => {
    try {
      if (!req.lawyer) {
        return res.status(401).json({
          message: "Unauthorized",
        });
      }
  
      // If you have role field in schema
      if (req.lawyer.role && req.lawyer.role !== "lawyer") {
        return res.status(403).json({
          message: "Forbidden: Lawyers only",
        });
      }
  
      next();
  
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "Server error in role check",
      });
    }
  };