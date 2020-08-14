const { Point } = require('@influxdata/influxdb-client')

const { influxDB, grabarData } = require('../modules/influxdb')
const db = require('../modules/db')

exports.getSensores = async (req, res, next) => {
  console.log(req.query)
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

    await grabarData(punto)

    res.status(200).send('ok')
  } catch(error) {
    next(error)
  }
}
