import { NewDevice ,NonEmptyString} from '../types'
import { CustomError } from '../utils/CustomError';

export const toDeviceEntry = (object: unknown): NewDevice => {
  if (!object || typeof object !== 'object') {
    throw new CustomError('Incorrect or missing data')
  }

  if ('name' in object && 'model' in object && 'storage' in object) {
    
    if (!isNonEmptyString(object.name)) {
      throw new CustomError('Device name cannot be empty');
    }
    if (!isNonEmptyString(object.storage)) {
      throw new CustomError('Device storage cannot be empty');
    }
    if (!isNonEmptyString(object.model)) {
      throw new CustomError('Device model cannot be empty');
    }

    const newDevice: NewDevice = {name:  object.name as string,
        model: object.model as string
        ,storage: object.storage as string
    }

    return newDevice
  }

  throw new CustomError('Incorrect data: some fields are missing')
}

 const isNonEmptyString = (str: unknown): str is NonEmptyString => {
  const strValue = str as string;
  return strValue.trim().length > 0;
};