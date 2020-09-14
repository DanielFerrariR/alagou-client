import EventEmitter from 'eventemitter3'

let eventEmitterInstance: EventEmitter<string | symbol, any>

const startEventEmitter = (): void => {
  eventEmitterInstance = new EventEmitter()
}

export { eventEmitterInstance, startEventEmitter }
