import fs from 'fs';
import camelCase from 'camelcase';
import path from 'path';
 
interface Controllers {
  [key: string]: any;
}

const fileName: string = path.basename(__filename);
const controllers: Controllers = {};

fs.readdirSync(__dirname)
  .filter((file: string) => {
    return file.indexOf('.') !== 0 && file !== fileName && file.slice(-3) === '.ts';
  })
  .forEach((file: string) => {
    const controllerName: string[] = file.split('.');
    const converterCamelCase: string = camelCase(controllerName[0]);
    const module = require(path.join(__dirname, file));
    controllers[converterCamelCase] = module;
  });

export default controllers;
