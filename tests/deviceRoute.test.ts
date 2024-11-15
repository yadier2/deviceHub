
import request from 'supertest'
import app from '../src/index';  
import deviceService from '../src/services/deviceService'

jest.mock('../src/services/deviceService');

const mockDevices = [
  { id: 1, name: 'Xiaomi', model: '2017', storage: '120g' }
];

describe('GET /', () => {
  it('debería devolver una lista de los dispositivos', async () => {
  
    (deviceService.getAllDevices as jest.Mock).mockReturnValue(mockDevices);

    const response = await request(app).get('/api/devices');

    expect(response.status).toBe(200);

    expect(response.body).toEqual(mockDevices);

    expect(deviceService.getAllDevices).toHaveBeenCalledTimes(1);
  });
});
