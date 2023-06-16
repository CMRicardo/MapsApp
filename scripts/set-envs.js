import { config } from 'dotenv'
import { mkdirSync, writeFileSync } from 'fs'

config()

const targetFolder = './src/environments'
const targetPath = `${targetFolder}/environment.ts`

const envFileContent = `
export const environment = {
  mapbox_key: "${process.env['MAPBOX_KEY']}",
}
`

mkdirSync(targetFolder, { recursive: true })

writeFileSync(targetPath, envFileContent)
