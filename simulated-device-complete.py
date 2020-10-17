import wiotp.sdk.device
import asyncio
import time
import random as rand

# CONFIGURAÇÃO DO DISPOSITIVO
myConfig = { 
    "identity": {
        "orgId": "sua org",
        "typeId": "type-id",
        "deviceId": "device-id"
    },
    "auth": {
        "token": "token do dispositivo"
    }
}
ventilador = False
def CommandCallback(cmd):
  print(cmd.data)

  data = cmd.data
  global ventilador

  if data['ventilador'] == 'liga':
    ventilador = True
  else:
    ventilador = False

# IMPLEMENTAR CONEXÃO
client = wiotp.sdk.device.DeviceClient(config=myConfig)
client.commandCallback = CommandCallback

client.connect()
while True:
  data = {
    "iluminacao": rand.randint(500, 999),
    "temperatura": rand.randint(27, 30),
    "ventilador": ventilador
  }
  client.publishEvent(eventId="status", msgFormat="json", data=data)
  time.sleep(1)

client.disconnect()
