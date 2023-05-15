import jwt from 'jsonwebtoken'

export default (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    
    try {
        const decoded = jwt.verify(token,"Phrase123");
    } catch (e) {
        return res.status(403).json({
            message: "Token expired"
        });
    }
    next();
}