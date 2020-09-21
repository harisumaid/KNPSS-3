import jwt from 'jsonwebtoken';


const authorize = async (req, res, next)  => {
    const bearerHeader = req.get('Authorization');
    // Check if the authorization header is present or not
    if(bearerHeader === undefined) {
        res.json({error : true, message : "Forbidden"});
    } else {
        // Token is present
        const bearerToken = bearerHeader.split(' ')[1];
        // Verify the token and get the payload
        jwt.verify(bearerToken, process.env.TOKEN_SECRET, (err, token) => {
            // Attach the token to the user object
            req.user = token;
            next();
        })
    }

}


export default authorize;