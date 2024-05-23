const User = require('../models/User');

/**
 * Middleware to ensure user has a specific role
 * @param {String} roleTitle - The role title to check against
 * @returns {Function} Middleware function
 */
const makeSureIs = function(roleTitle) {
    return async (req, res, next) => {
        try {
          // console.log(req.user._id)
            if (req.isAuthenticated()) {
                const user = await User.findById(req.user._id).populate('roleId').exec();
                if (!user) {
                    return res.status(404).render('unauthorized');
                }

                const role = user.roleId.title;
                if (role === roleTitle) {
                    return next();
                } else {
                    return res.status(403).render('unauthorized'); 
                }
            } else {
                console.log("Not authenticated");
                // return res.status(401).redirect("/"); // Redirect to home or login page
            }
        } catch (error) {
            console.error(error);
            return res.status(500).send('Internal Server Error');
        }
    }
}

module.exports = { makeSureIs };
