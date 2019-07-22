import * as Yup from 'yup';
import School from '../models/School';
import User from '../models/User';

class SchoolController {
  async index(req, res) {
    const user = await User.findByPk(req.userId);
    const school = await School.findAll({
      where: { id: user.school_id },
      attributes: ['id', 'name'],
    });

    return res.json(school);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
    });
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }
    const { id, name, user_id } = await School.create({
      ...req.body,
      user_id: req.userId,
    });
    return res.json({ id, name, user_id });
  }
}

export default new SchoolController();
