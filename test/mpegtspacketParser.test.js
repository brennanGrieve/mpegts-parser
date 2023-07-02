import * as parser from "../web/mpegtspacketParser.js";

import { emptyStream } from './testData/emptyStream.json'
import { incompletePIDBytes } from './testData/incompletePIDBytes.json'
import { validIncompletePacket } from './testData/validIncompletePacket.json'
import { missingSyncByte } from './testData/missingSyncByte.json'
import { validPacket } from './testData/validPacket.json'
  
describe('mpegTS Packet Parser', () => {
    const mockExit = jest.spyOn(process, 'exit').mockImplementation(() => {});
    const mpegtsPacketParser = jest.spyOn(parser, 'mpegtsPacketParser')
    
    afterEach(() => {
        jest.clearAllMocks()
    })
    test(`
        Given an incoming MPEGTS packet
        When the packet is valid
        Then the parser should successfully process the packet
    `, () => {
        let seq = 0
        mpegtsPacketParser(validPacket, validPacket.length, seq)
        expect(mockExit).not.toHaveBeenCalled()
    })
    test(`
        Given an incoming MPEGTS packet
        When the packet is valid but incomplete
        Then the parser should return null
    `, () => {
        let seq = 0
        const parsed = mpegtsPacketParser(validIncompletePacket, validIncompletePacket.length, seq)
        expect(parsed).toBeNull()
    })
    test(`
        Given an incoming MPEGTS packet
        When the packet is #2 or greater and is missing its Sync Byte
        Then the process should exit with an error
    `, () => {
        let seq = 1
        let streamOffset = 376
        mpegtsPacketParser(missingSyncByte, streamOffset, seq)
        expect(mockExit).toHaveBeenCalled()
    })
    test(`
        Given an incoming MPEGTS packet
        When the packet is the first of its stream and is missing its Sync Byte
        Then the parser should still process the packet successfully
    `, () => {
        let seq = 0
        let streamOffset = 0
        mpegtsPacketParser(missingSyncByte, streamOffset, seq)
        expect(mockExit).not.toHaveBeenCalled()
    })
    test(`
        Given an incoming MPEGTS stream
        When the PID is incomplete
        Then exit the process with an error
    `, () => {
        let seq = 0
        mpegtsPacketParser(incompletePIDBytes, incompletePIDBytes.length, seq)
        expect(mockExit).toHaveBeenCalled()
    })
    test(`
        Given an incoming MPEGTS stream
        When the buffer has no data
        Then the parser will not be invoked, or return null
    `, () => {
        let seq = 0
        const parsed = mpegtsPacketParser(emptyStream, emptyStream.length, seq)
        expect(parsed).toBeNull()
    })
})