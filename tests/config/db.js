import chai from "chai";
import Database from '../../config/db';
import Sequelize from "sequelize";

let expect = chai.expect;

describe('Database', () => {
  it('Create new database instance should return sequilize instance', () => {
    let dbInstance = new Database();
    expect(dbInstance instanceof Sequelize).to.be.true;
  });
  it('Database should be singleton', () => {
    let dbInstance = new Database();
    let instance = new Database();
    expect(dbInstance).equal(instance);
  });

  it('Should be user model in instance', () => {
    new Database(null, dbInstance => expect(dbInstance.user).to.exist);
  });
});