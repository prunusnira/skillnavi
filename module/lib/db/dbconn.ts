import { Sequelize } from 'sequelize';
import mariadb from 'mariadb';

const DBHOST = process.env.NEXT_PUBLIC_DBHOST || '';
const DBNAME = process.env.NEXT_PUBLIC_DBNAME || '';
const DBUSER = process.env.NEXT_PUBLIC_DBUSER || '';
const DBPW = process.env.NEXT_PUBLIC_DBPW;

export const sequelize = new Sequelize(DBNAME, DBUSER, DBPW, {
    host: DBHOST,
    port: 3306,
    dialect: 'mariadb',
    dialectModule: mariadb,
});
