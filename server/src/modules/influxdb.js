const { InfluxDB } = require('@influxdata/influxdb-client')

const username = 'admin'
const password = 'admin'

const database = 'sensores'
const retentionPolicy = 'default'

const bucket = `${database}/${retentionPolicy}`

const clientOptions = {
  // url: 'http://influxdb:8086',
  url: 'http://localhost:8086',
  token: `${username}:${password}`,
}

const influxDB = new InfluxDB(clientOptions)

const escribirInflux = api => {
  console.log('escribir-influx')
  return new Promise((resolve, reject) => {
    api
      .close()
      .then(() => resolve())
      .catch(error => reject(error))
  })
}

exports.influxDB = influxDB

exports.grabarData = async puntos => {
  try {
    let writeAPI = influxDB.getWriteApi('', bucket)
 
    writeAPI.writePoints(puntos)
    await escribirInflux(writeAPI)
  } catch(error) {
    throw error
  }
}
