import { Device, NewDevice ,UpdateDevice } from '../types'
import {pool} from '../db';
import { RowDataPacket ,ResultSetHeader } from 'mysql2';


const getAllDevices = async (): Promise<Device[]> => {
  const [rows] = await pool.query("SELECT * FROM device")
  return rows as Device[];
}

const getDeviceById = async (id: number): Promise<Device | undefined> => {
  const [rows] = await pool.query<RowDataPacket[] & Device[]>('SELECT * FROM device WHERE id = ?', [id]);
  return rows[0];
    
}

const createDevice = async (newDevice: NewDevice): Promise<Device> => {
  const [result] = await pool.query<ResultSetHeader>("INSERT INTO device set ?", [newDevice]);

  return  {
    id: result.insertId,
    ...newDevice
  }
}

const updateDevice = async (id: number, deviceData: UpdateDevice):  Promise<Device | undefined> => {
  const [result] =  await pool.query<ResultSetHeader>("UPDATE device set ? WHERE id = ?", [deviceData, id]);

  if( result.affectedRows > 0) {
    return {
      id:id,
      name:deviceData.name,
      model:deviceData.model,
      storage:deviceData.storage
  }   as Device;
  }
  return undefined

}

const deleteDevice = async (id: number): Promise<boolean> => {
  const [result] = await pool.query<ResultSetHeader>('DELETE FROM device WHERE id = ?', [id]);
  return result.affectedRows > 0;

}

export default {
    getAllDevices,
    getDeviceById,
    createDevice,
    updateDevice,
    deleteDevice
  }
  