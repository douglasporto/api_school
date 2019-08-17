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
      name: Yup.string().required('O nome é obrigatório'),
    });
    try {
      await schema.validate(req.body, { abortEarly: true });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
    const { id, name } = await School.create(req.body);
    const user = await User.findByPk(req.userId);
    await user.update(
      { school_id: [id, ...user.school_id] },
      { where: { id: req.userId } }
    );
    return res.status(201).json({ id, name });
  }

  async update(req, res) {
    const { kind } = await User.findByPk(req.userId);
    const school = await School.findByPk(req.params.id);
    if (!school)
      return res
        .status(401)
        .json({ error: 'Escola não encontrada para alterar' });

    if (kind !== 'adm')
      return res.status(400).json({ error: 'User not permission' });

    const { id, name } = await school.update(req.body);
    return res.json({ id, name });

    /* aqui faz update */
  }
}

export default new SchoolController();
