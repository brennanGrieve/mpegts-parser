import { webLayerSimulator } from "./web/index.js"

const fileName = process.argv[2]

if(!fileName) {
 console.log('Missing Input Arg: fileName')
 process.exit(1)
}

webLayerSimulator(fileName)