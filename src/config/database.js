module.exports = {
  dialect: 'postgres',
  host: 'localhost',
  username: 'postgres',
  password: 'docker',
  database: 'school',
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};
