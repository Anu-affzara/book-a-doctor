const checkDoctor = (req, res, next) => {
    if (req.user && req.user.role === 'doctor') {
        next();
    } else {
        return res.status(403).json({ error: 'Access denied. Doctors only.' });
    }
};

module.exports = checkDoctor;
