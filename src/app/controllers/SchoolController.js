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
    const { id, name } = await School.create(req.body);
    const user = await User.findByPk(req.userId);
    const { school_id } = await user.update(
      { school_id: id },
      { where: { id: req.userId } }
    );
    if (school_id !== id)
      return res
        .status(403)
        .json({ error: 'Not possible update the user', user });
    return res.json({ id, name });
  }

  async update(req, res) {
    const { kind } = await User.findByPk(req.userId);
    const school = await School.findByPk(req.params.id);
    if (!school) return res.status(401).json({ error: 'School not found' });

    if (kind !== 'adm')
      return res.status(400).json({ error: 'User not permission' });

    const { id, name } = await school.update(req.body);
    return res.json({ id, name });

    /* aqui faz update */
  }
}

export default new SchoolController();
