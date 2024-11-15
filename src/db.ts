import { createPool } from "mysql2/promise";
import { config } from "dotenv";

config();

export const pool = createPool({
  port: 3306 ,
  host: 'db',
  user:  'root',
  password:  'ejemplo_contraseña',
  database:  'mi_base_de_datos'
});

