import * as Yup from 'yup';
import User from '../models/User';
import File from '../models/File';
import School from '../models/School';

class UserController {
  async index(req, res) {
    const user = await User.findAll({
      attributes: ['id', 'name', 'email', 'avatar_id', 'school_id'],
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['name', 'path', 'url'],
        },
        {
          model: School,
          as: 'school',
          attributes: ['name'],
        },
      ],
    });

    return res.json(user);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email('Endereço de e-mail inválido')
        .required(),
      password: Yup.string()
        .required()
        .min(6, 'A senha deve possuir pelo menos 6 caracteres'),
    });

    try {
      await schema.validate(req.body, { abortEarly: true });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }

    const userExist = await User.findOne({ where: { email: req.body.email } });

    if (userExist) {
      return res.status(422).json({
        error: 'O e-mail digitado já está sendo utilizado',
      });
    }

    const user = await User.create(req.body);
    const { id, name, email, kind } = user;

    return res
      .status(201)
      .json({ id, name, email, kind, token: user.generateToken() });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email('Endereço de e-mail inválido'),
      oldPassword: Yup.string().min(
        6,
        'A senha deve possuir pelo menos 6 caracteres'
      ),
      password: Yup.string()
        .min(6, 'A senha deve possuir pelo menos 6 caracteres')
        .when('oldPassword', (oldPassword, field) =>
          oldPassword
            ? field.required('Você deve digitar a senha antiga')
            : field
        ),
      confirmPassword: Yup.string().when('password', (password, field) =>
        password
          ? field
              .required('Você deve confirmar a senha')
              .oneOf([Yup.ref('password')])
          : field
      ),
    });

    try {
      await schema.validate(req.body, { abortEarly: true });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }

    const { email, oldPassword } = req.body;

    const user = await User.findByPk(req.userId);

    if (email !== undefined && email !== user.email) {
      const userExist = await User.findOne({
        where: { email },
      });
      if (userExist) {
        return res
          .status(422)
          .json({ error: 'O e-mail digitado já está sendo utilizado' });
      }
    }

    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      return res.status(401).json({ error: 'Senha antiga incorreta' });
    }
    const { id, name, kind } = await user.update(req.body);
    return res.json({ id, name, email, kind });
  }
}

export default new UserController();
