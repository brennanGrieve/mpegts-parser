/**
 * The purpose of this file is to simulate packet-by-packet transfer of MPEGTS data over the network
 * by staggering the streaming of the input files according to the protocol. By performing this abstraction and writing the parser to accept streams packet-by-packet, it can be moved to operate on a real
 * network stream with less modification, depending on the web framework used.
 */

import { createReadStream } from 'fs'
import { mpegtsPacketParser } from './mpegtspacketParser.js'

const webLayerSimulator = (fileName) => {
  const pidList = new Set()
  let seq  = 0
  let offset = 0
  const fileData = ""
  try{
    var inputStream = createReadStream(fileName, { highWaterMark: 188 })
    inputStream.on('error', ({message}) => {
      console.log(message)
      process.exit(1)
    })

    inputStream.on('data', (packet) => {
      const parsed = mpegtsPacketParser(packet, offset, seq)
      if(parsed) {
        fileData.concat(parsed.payload)
        pidList.add(parsed.pid) 
        offset += packet.length
        ++seq 
      }
    })

    inputStream.on('end', () => {
      Array.from(pidList).sort().map((elem) => console.log(`0x${elem.toString(16)}`))
      inputStream.removeAllListeners()
      process.exit(0)
    })
  } catch (ex) {
    console.log(ex)
  }
}

export { webLayerSimulator }