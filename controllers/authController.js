const passport = require('passport');

const User = require('../models/User');
const Role = require('../models/Role');

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

exports.requireAuth = (req, res) => {
	if (!req.isAuthenticated()) {
		// res.redirect("/");
		return res.json({ status: false, message: "User not authenticated" });
	}
	return res.json({ status: true, message: "User authenticated" });
}

exports.getRole = async (id) => {
	return Role.findById(id).exec();
}

exports.index = async (req, res) => {
	if (!req.isAuthenticated()) {
		res.render('login');
	}
}



// exports.login = (req, res) => {
// 	passport.authenticate("local")(req, res, async function () {
// 			const loggedInUser = await User.findById(req.user._id)
// 				.populate('roleId')
// 				.exec();

//         if(!loggedInUser){
//           return res.status(404).json({status:false, message: "User not found. Please check your credentials!"});
//         }else{
//           console.log('User found:', loggedInUser);
//         }
//         // const roleDetails = await Role.findById(loggedInUser.roleId._id)
//         // .exec()
//         // .catch(error=>{
//         //   console.error('Error fetching role:', error);
//         // });

//         // if(!roleDetails){
//         //   return res.status(404).json({status: false, message: `Role not found for user ${loggedInUser.username}`});
//         // }
//           res.status(200).json({status: true, message: "Login successful", user: loggedInUser});
// 	});
// }
exports.login = (req, res) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      console.error("Authentication error:", err);
      return res.status(500).json({ status: false, message: "Authentication error" });
    }
    if (!user) {
      return res.status(404).json({ status: false, message: "User not found. Please check your credentials!" });
    }

    // If authentication is successful, continue with your logic
    req.login(user, async (loginErr) => {
      if (loginErr) {
        console.error("Login error:", loginErr);
        return res.status(500).json({ status: false, message: "Login error" });
      }

      const loggedInUser = await User.findById(req.user._id)
        .populate('roleId')
        .exec();

      if (!loggedInUser) {
        return res.status(404).json({ status: false, message: "User not found after login!" });
      }

      console.log('User found:', loggedInUser);

      res.status(200).json({ status: true, message: "Login successful", user: loggedInUser });
    });
  })(req, res);
};


exports.logout = (req, res) => {
	req.logout((err) => {
		if (!err) {
      res.clearCookie('connect.sid', { path: '/' })
      res.status(200).json({ message: 'Logged out successfully' });
			// res.redirect('/');
		}
	});

};