import constants from './constant';
import { execute } from './db';

export default class App {
  /**
   * check if the email exist in the DB
   *
   * @param  string email
   * @param  string role [either admin or user]
   * @return boolean
   */
  async isEmailExist(email, role) {
    let query = '';
    const data = [];
    this.email = email;
    this.role = role;
    data.push(this.email);

    switch (this.role) {
      case constants.USER:
        query = 'SELECT id_user FROM users WHERE email = $1';
        break;
      case constants.ADMIN:
        query = 'SELECT id_admin FROM admin WHERE email = $1';
        break;
      default:
        query = 'SELECT id_user FROM users WHERE email = $1';
        break;
    }

    const result = await execute(query, data);
    return result.rowCount > 0;
  }

  /**
   * return the Id using the email
   *
   * @param  string email
   * @param  string role [either admin or user]
   * @return object
   */
  async getIdByEmail(email, role) {
    let query = '';
    const data = [];
    this.email = email;
    this.role = role;
    data.push(this.email);

    switch (this.role) {
      case constants.USER:
        query = 'SELECT id_user FROM users WHERE email = $1';
        break;
      case constants.ADMIN:
        query = 'SELECT id_admin FROM admin WHERE email = $1';
        break;
      default:
        query = 'SELECT id_user FROM users WHERE email = $1';
        break;
    }

    const result = await execute(query, data);
    return result.rows[0];
  }

  /**
   * return all profile information
   *
   * @param  string id
   * @param  string role [either admin or user]
   * @return object
   */
  async getInfoById(id, role) {
    let query = '';
    const data = [];
    this.id = id;
    this.role = role;
    data.push(this.id);

    switch (this.role) {
      case constants.USER:
        query = 'SELECT id_user, first_name, last_name, email FROM users WHERE id_user = $1';
        break;
      case constants.ADMIN:
        query = 'SELECT id_admin, first_name, last_name, email FROM admin WHERE id_admin = $1';
        break;
      default:
        query = 'SELECT id_user, first_name, last_name, email FROM users WHERE id_user = $1';
        break;
    }
    const result = await execute(query, data);
    return result.rows[0];
  }
}
