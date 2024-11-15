import { Router, Request, Response } from 'express'
import deviceService from '../services/deviceService'
import { toDeviceEntry } from '../utils/util'
import {DEVICE_NOT_FOUND} from '../utils/constants'
import { CustomError } from '../utils/CustomError';

const router = Router()

router.get('/',  async  (req: Request, res: Response) => {
    try {
      
    const devices = await  deviceService.getAllDevices()
    res.status(200).json(devices);
} catch (err: any) {
    res.status(500).json({ message: `Error fetching devices: ${ err.message}` });
}
})

router.get('/:id', async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id, 10);
        const device = await deviceService.getDeviceById(id)

        if (device) {
            res.status(200).json(device);
        } else {
            res.status(404).json({ message: DEVICE_NOT_FOUND })
        }
    }catch (err: any) {
        res.status(500).json({ message: `Error fetching device: ${ err.message}` });
    }
})

router.post('/', async (req: Request, res: Response) => {
    try {
        const newDevice = toDeviceEntry(req.body)
        const device = await deviceService.createDevice(newDevice)
        res.status(201).json({ message: `Device created`, data: device });

    } catch (err: unknown) {
        if (err instanceof CustomError) {
          res.status(400).json({ message: `Error  ${ err.message}` })
        }else if(err instanceof Error){
            res.status(500).json({ message: `Error creating device ${ err.message}` });
        }
      }
});

router.put('/:id', async (req: Request, res: Response) => {
    try {
    const id = parseInt(req.params.id, 10)
    const deviceData =toDeviceEntry(req.body)
    const updatedDevice = await deviceService.updateDevice(id, deviceData)

    if (updatedDevice) {
        res.status(200).json({ message: `Device with ID: ${id} updated`, data: updatedDevice });
    } else {
        res.status(404).json({ message: DEVICE_NOT_FOUND });
    }
} catch (err: unknown) {
    if (err instanceof CustomError) {
        res.status(400).json({ message: `Error  ${ err.message}` })
      }else if(err instanceof Error){
          res.status(500).json({ message: `Error updating device ${ err.message}` });
      }
    }
});

router.delete('/:id', async (req: Request, res: Response) => {
    try {   
    const id = parseInt(req.params.id, 10);
        const isDeleted = await deviceService.deleteDevice(id)
    
        if (isDeleted) {
            res.status(200).json({ message: `Device with ID: ${id} deleted` });
        } else {
            res.status(404).json({ message: DEVICE_NOT_FOUND });
        }
    }catch (err: any) {
        res.status(500).json({ message: `Error erasing device: ${ err.message}` });
    }
    }
);

export default router
