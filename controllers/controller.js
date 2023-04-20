const bcrypt = require("bcrypt");
const User = require("../models/user.model");
const Jobs = require("../models/jobs.model");
const jwt = require("jsonwebtoken");
const register = async (req, res, next) => {
  const oldUser = await User.findOne({ email: req.body.email });
  if (oldUser) {
    res.status(400).json("User already Exists");
  } else {
    const hashPassword = bcrypt.hashSync(req.body.password, 10);
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashPassword,
      verified:1
    });
    user.save();
    res.send(user);
  }
};
const login = async (req, res, next) => {
  const user = await User.findOne({ email: req.query.email });
  if (!user) {
    return res.status(401).json("User doesn't exists");
  }
  
  const validPassword = await bcrypt.compare(req.query.password, user.password);
  console.log(validPassword);
  if (!validPassword) return res.status(401).json("Incorrect crendentials");
  const token = jwt.sign(
    {email: req.query.email },
    "Muralivvrsn",
    {
      expiresIn: "2h",
    }
  );
  res.json(user)
};
const home = (req, res, next) => {
  res.json("Hello home")
};

const jobs = async(req,res,next)=>{
  Jobs.find().then((data)=>{
    res.send(data)
  }).catch((err)=>res.send("Something Went Wrong"))
}




module.exports = {
  register,
  login,
  home,
  jobs,
};
