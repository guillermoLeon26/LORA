const { InfluxDB, Point } = require('@influxdata/influxdb-client')

const db = require('../modules/db')

const username = 'admin'
const password = 'admin'

const database = 'sensores'
const retentionPolicy = 'siempre'

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

exports.getSensores = async (req, res, next) => {
  try {
    let id = req.query.id
    let temperatura = req.query.temp
    let humedad = req.query.hum

    const dataSensor = db.find(sensor => sensor.id == id)

    let punto = new Point('sensor')
      .tag('id', dataSensor.id)
      .tag('codigo', dataSensor.codigo)
      .tag('rack', dataSensor.rack)
      .tag('fila', dataSensor.fila)
      .floatField('temperatura', temperatura)
      .floatField('humedad', humedad)

    
    let writeAPI = influxDB.getWriteApi('', bucket)

    writeAPI.writePoint(punto)
    await escribirInflux(writeAPI)
    
    res.status(200).send('ok')
  } catch(error) {
    next(error)
  }
}
