const ApiError = require('../error/ApiError');
const { User } = require('../models/models');
const uuid = require('uuid');
const path = require('path');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const generateJwt = ({ id, name, email, role, image }) => {
  return jwt.sign({ id, email, role, name, image }, process.env.SECRET_KEY, { expiresIn: '24h' });
};

class UserController {
  async registration(req, res, next) {
    const { email, password, userName } = req.body;
    console.log(req.body);
    let role = 'USER';
    const candidate = await User.findOne({ where: { email } });
    const candidate2 = await User.findOne({ where: { userName } });
    if (candidate) {
      return res.json({ message: 'User with such Email already exists' });
    }
    if (candidate2) {
      return res.json({ message: 'User with sucn name already exists' });
    }
    if (req.body.role) {
      role = req.body.role;
    }

    const userImage = 'default.jpg';

    const hashPassword = await bcrypt.hash(password, 6);

    const user = await User.create({ email, password: hashPassword, userName, userImage, role });
    const token = generateJwt({
      id: user.id,
      role: user.role,
      email: user.email,
      name: userName,
      image: user.userImage,
    });
    return res.status(200).json(token);
  }

  async login(req, res, next) {
    const { userName, password } = req.body;
    const user = await User.findOne({ where: { userName } });
    if (!user) {
      return res.json({ message: 'User not found' });
    }
    let comparePassword = bcrypt.compareSync(password, user.password);

    if (!comparePassword) {
      return res.json({ message: 'Incorrect password' });
    }
    const token = generateJwt({
      id: user.id,
      role: user.role,
      email: user.email,
      name: userName,
      image: user.userImage,
    });
    return res.json(token);
  }

  async check(req, res, next) {
    return res.status(200).json({
      id: req.user.id,
      email: req.user.email,
      role: req.user.role,
      name: req.user.name,
      image: req.user.image,
    });
  }

  async changeInfo(req, res) {
    const { password, email, userImage, newPassword } = req.body;
    let user = await User.findOne({ where: { userName: req.user.name } });
    let change = '';
    if (!user) {
      return res.json({ message: 'User not found.' });
    }
    let comparePassword = bcrypt.compareSync(password, user.password);
    if (!comparePassword) {
      return res.json({ message: 'Incorrect password' });
    }
    if (newPassword) {
      const hashPassword = await bcrypt.hash(newPassword, 6);
      await User.update({ password: hashPassword }, { where: { id: user.id } });
      change = 'Password';
    }
    if (email) {
      await User.update({ email }, { where: { id: user.id } });
      change = 'Email';
    }
    user = await User.findOne({ where: { userName: req.user.name } });
    const token = generateJwt({
      id: user.id,
      role: user.role,
      email: user.email,
      name: user.userName,
      image: user.userImage,
    });
    return res.json({ succesMessage: token });
  }

  async getOne(req, res) {
    const { id } = req.query;
    const user = await User.findOne({ where: { id } });
    return res.json(user);
  }
}

module.exports = new UserController();
