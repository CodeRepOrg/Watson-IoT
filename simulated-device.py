import wiotp.sdk.device
import asyncio
import time
import random as rand

# CONFIGURAÇÃO DO DISPOSITIVO
myConfig = { 
    "identity": {
        "orgId": "ORG",
        "typeId": "TYPEID",
        "deviceId": "DEVICEID"
    },
    "auth": {
        "token": "TOKEN"
    }
}

# IMPLEMENTAR CONEXÃO