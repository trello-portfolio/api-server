import Sequelize from 'sequelize';
import _ from 'lodash';
import fs from 'fs';
import os from 'os';

let instance = null;

export default class Database {
  constructor(config, callback) {
    if (instance) return instance;
    const sequelize = Database.initDatabase(config);

    this.initModels(sequelize)
      .then(() => {
        sequelize.sync();
      })
      .then(() => {
        console.info('DB connection successful!');
        if (_.isFunction(callback)) callback(sequelize);
      })
      .catch(err => console.error(err));
    instance = sequelize;
    return sequelize;
  }

  static initDatabase(config) {
    config = config ||
      {
        name: 'trello_dev',
        username: os.userInfo().username || 'postgres',
        password: '',
        options: {
          host: 'localhost',
          dialect: 'postgres'
        }
      };
    return new Sequelize(config.name, config.username, config.password, config.options);
  }
  initModels(sequelize) {
    return new Promise(resolve => {
      const path = `${__dirname}/../api/models/`;

      fs.readdir(path, (err, files) => {
        if (err) console.error(err);
        files.forEach(file => {
          const model = require(path + file)(sequelize);
          const [fileName] = file.split('.');

          this[fileName.toLowerCase()] = model;
        });
        resolve(sequelize);
      });
    });
  }
}
