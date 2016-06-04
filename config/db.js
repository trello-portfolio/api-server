import Sequelize from "sequelize";
import _ from "lodash";
import fs from "fs";

let instance = null;

export default class Database {
  constructor(config, callback) {
    if(instance) return instance;
    let sequelize = Database.initDatabase(config);
    this.initModels(sequelize)
      .then(() => {
        return sequelize.sync();
      })
      .then(() => {
        console.log("DB connection successful!");
        if(_.isFunction(callback)) {
          callback(sequelize);
        }
      })
      .catch(err => console.log(err));
    instance = sequelize;
    return sequelize;
  }

  static initDatabase(config){
    config = config ||
      {
        name: 'trello_dev',
        username: 'kepthx',
        password: '',
        options: {
          host: 'localhost',
          dialect: 'postgres'
        }
      };
    return new Sequelize(config.name, config.username, config.password, config.options);
  }
  initModels(sequelize){
    return new Promise((resolve, reject) => {
      let path = __dirname + '/../api/models/';
      fs.readdir(path, (err, files) => {
        files.forEach(file => {
          let model = require(path + file)(sequelize);
          let [fileName] = file.split('.');
          console.log(model);
          this[fileName.toLowerCase()] = model;
        });
        resolve(sequelize);
      });
    });
  }
}