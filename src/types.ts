export interface Device {
    id: number
    name: string
    model: string
    storage: string
  }

export type NewDevice = Omit<Device, 'id'>

export type UpdateDevice = Partial<Omit<Device, 'id'>>

export type NonEmptyString = string & { __brand: 'NonEmptyString' }
