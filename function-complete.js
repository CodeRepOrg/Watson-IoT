const request = require('request');
const client = require('ibmiotf');
function main(params) {
    if (params.cmd == true) {
        return new Promise((resolve, reject) => {
            const config = {
                org: "sua org",
                id: "um id qualuqer",
                domain: "internetofthings.ibmcloud.com",
                "auth-key": "sua auth-key",
                "auth-token": "seu auth-token"
            };
            let appClient = new client.IotfApplication(config);
            appClient.connect();
            appClient.on('connect', function () {
                const data = {
                    ventilador: params["status"]
                };
                appClient.publishDeviceCommand('device-type', 'device-id', 'ventilador', "json", data);
                appClient.disconnect()
                resolve({
                    err: false,
                    msg: 'Comando enviado'
                })
            })
        });
    } else {
        const username = 'IOT username'; // IoT Platfom Application username (from API Key)
        const password = 'IOT passwaord'; // IoT Platfom Application password (from API Key)
        //Change the paths from this url
        const url = 'https://{org}.internetofthings.ibmcloud.com/api/v0002/device/types/{device-type}/devices/{device-id}/events/status'

        //This will build auth header for request
        const auth = {
            user: username,
            pass: password
        };
        let qs = null
        let options = {
            method: 'GET',
            url,
            qs,
            auth
        };
        return new Promise((resolve, reject) => {
            request(options, (error, response, body) => {
                if (!error && response.statusCode === 200) {
                    let j = JSON.parse(body);
                    //Iot platform return a base64 object that we have to decode (glad we have a Cloud Function to do that!)
                    payload_string = Buffer.from(j.payload, 'base64').toString('ascii');
                    console.log(payload_string)
                    payload = JSON.parse(payload_string)
                    if (params.type == 'iluminacao') {
                        resolve({
                            iluminacao: payload.iluminacao
                        })
                    } else if (params.type == 'temperatura') {
                        resolve({
                            temperatura: payload.temperatura
                        })
                    } else {
                        resolve({
                            ventilador: (payload.ventilador == true) ? "Ligado" : "Desligado"
                        })
                    }
                    //  resolve(payload);
                } else {
                    reject({
                        error: error,
                        response: response,
                        body: body
                    });
                }
            });
        });
    }
}
