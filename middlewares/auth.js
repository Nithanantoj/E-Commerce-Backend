const jwt = require('jsonwebtoken')

const auth = (req, res, next) => {
    //const token = req.header('Authorization').replace("Bearer", "")
    //or
    const token = req.header('Authorization').split(" ")[1];
    if(!token) return res.status(401).json({error: "Token required"});

    try {
        //console.log(token)
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.userId;
        //console.log(req.user)
        next();
    }catch(err){
        console.log(err)
        res.status(401).json({error : "Invalid Token"})
    }
};

module.exports = auth;