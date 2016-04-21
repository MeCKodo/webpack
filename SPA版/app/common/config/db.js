'use strict';
/**
 * db config
 * @type {Object}
 */exports.__esModule = true;exports.default = 
{ 
  type: 'mongo', 
  log_sql: true, 
  log_connect: true, 
  adapter: { 
    mongo: { 
      host: 'localhost', 
      port: '27017', 
      database: 'kodo_test', 
      user: 'kodo_blog', 
      password: '123123', 
      prefix: 'think_', 
      encoding: 'utf8' } } };