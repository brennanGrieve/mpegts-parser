import { logger } from '../utils/logger.js'

export const mpegtsPacketParser = (packet, streamOffset, seq) => {
    if(packet.length === 0) return null
    if(packet[0] !== 0x47 && seq > 0) { 
      logger(`Error: No Sync Byte present in Packet ${seq} at offset ${streamOffset}.`) 
      process.exit(1)
    }
    if(packet[1] === undefined || packet[2] === undefined) {
        logger(`Error: Incomplete PID in Packet ${seq} at offset ${streamOffset}`)
        process.exit(1)
    }
    if(packet.length < 188 && seq === 0) return null
    const lsb5 = packet[1] & parseInt('00011111', 2)
    const pid = parseInt(lsb5.toString(2) + packet[2].toString(2).padStart(8, '0'), 2)
    return { pid, payload: packet }
  }
  