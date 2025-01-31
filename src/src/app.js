import express from 'express';
import cookieParser from 'cookie-parser';
import colors from 'colors';
import moment from 'moment';
import { fork } from "child_process"
import os from 'os';
import handlebars from 'express-handlebars'
import compress from "express-compression"
import zlib from "zlib"
import swaggerJSDocs from 'swagger-jsdoc';
import SwaggerUiOpts from 'swagger-ui-express';

import { config, mode, debug } from './config/config.js';
import { DAO } from './dao/factory.js';
import { generateAdopt, middLog, logger } from './utils/utils.js';
import { errorHandler } from './middleware/ErrorsHandlers/errorHandler.js';

import usersRouter from './routes/users.router.js';
import petsRouter from './routes/pets.router.js';
import adoptionsRouter from './routes/adoption.router.js';
import sessionsRouter from './routes/sessions.router.js';
import mocksRouter from './routes/mocks.router.js';
import loggerTestRouter from "./routes/loggerTest.router.js";


console.time(`\x1b[34mTiempo de Carga de Aplicacion\x1b[0m`);

const PORT = config.PORT;
const app = express();

const swaggerOptions = {
    definition: {
        openapi: "3.0.1",
        info: {
            title: "Documentacion API / AdoptMe",
            version: "1.4.0",
            description: "API de documentacion para el sistema de Adopcion de Mascotas."
        },
        servers: [
            {
                url: 'http://localhost:8080',
                description: "Development"
            },
            {
                url: 'http://localhost:3001',
                description: "Testing (Disabled)"
            },
            {
                url: 'http://localhost:3000',
                description: "Production"
            },
        ],
    },
    apis: ["./src/docs/*.yaml"]
}



const swaggerSpecs = swaggerJSDocs(swaggerOptions);
app.use("/api-docs", SwaggerUiOpts.serve, SwaggerUiOpts.setup(swaggerSpecs));

app.use(middLog);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(compress({ brotli: { enabled: true, } }));
app.use(cookieParser(config.CookieParser_SECRET));

app.use(express.static("./src/public"));
app.engine('handlebars', handlebars.engine())
app.set('view engine', 'handlebars')
app.set('views', './src/views')

app.use('/api/users', usersRouter);
app.use('/api/pets', petsRouter);
app.use('/api/adoptions', adoptionsRouter);
app.use('/api/sessions', sessionsRouter);
app.use('/api/mocks', mocksRouter);
app.use("/", loggerTestRouter);
app.get('/', (req, res) => {
    res.setHeader('Content-Type', 'text/plain');
    res.status(200).send('OK');
})

app.use(errorHandler);

let servername = process.env.COMPUTERNAME;
let oscpu = os.cpus()[0].model
let numCPUs = os.cpus().length;
let osnet = Object.values(os.networkInterfaces())
    .flat()
    .filter((iface) => iface && (iface.family === 'IPv4' || iface.family === 'IPv6'))
    .map((iface) => ({ family: iface.family, address: iface.address }));
let osname = os.platform() === 'win32' ? 'Windows' : 'Otro';
let osArch = os.arch();
let osrelease = os.release();
let osRAM = (os.totalmem() / 1024 / 1024 / 1024).toFixed(2);
let nodeversion = process.version;
let modversion = process.versions;
let pid = process.pid;
let apppath = process.cwd();
let memusage = process.memoryUsage();
let memttl = memusage.heapTotal / 1024 / 1024;
let memused = memusage.heapUsed / 1024 / 1024;
let procarg = `${process.argv.slice(1)} ${process.argv.slice(4)}`;
let platform = process.platform;
let envvariab = process.env;
let logonServer = envvariab.LOGONSERVER ? `\\\\${envvariab.LOGONSERVER.replace(/\\\\/g, '').replace(/\\/g, '')}` : 'No disponible';
let username = envvariab.USERNAME || 'No disponible';
let horahhmmss = moment().format('DD/MM/yyyy hh:mm:ss A');

app.listen(PORT, () => {
    console.log(`
******************************************************************************
*                   Servidor en linea sobre puerto \x1b[37m${PORT}\x1b[33m                      *
******************************************************************************
# Url: http://localhost:${PORT} || Documentacion: http://localhost:${PORT}/api-docs/

# Iniciado el ${horahhmmss}, con proceso principal Id ${pid} en plataforma ${platform}
# Sistema Operativo ${osname} ${osrelease} ${osArch}, Servidor ${servername}, Dominio\\Usuario ${logonServer}\\${username}
# Procesador: ${oscpu}, ${numCPUs} Nucleos, RAM: ${osRAM} Gb
# IP's: ${osnet.map((net) => `${net.family}: ${net.address}`).join(' - ')}    
# Desde la ruta: ${apppath}, con Modo de ejecución: ${mode} y modo Debug: ${debug}
# Con argumentos en linea de comandos: ${procarg}    
# con uso de memoria: ${memused.toFixed(2)} MB de ${memttl.toFixed(2)} MB
# usando version de:    NodeJS: ${nodeversion}   /   OpenSSL: ${JSON.stringify(modversion.openssl, null, 5)}    
******************************************************************************`.yellow);

});
console.timeEnd(`\x1b[34mTiempo de Carga de Aplicacion\x1b[0m`);

setTimeout(() => {

}, 32);



process.on('exit', code => {
    console.log(`
> Saliendo de la App...
******************************************************************************
******************************************************************************`.blue);
    logger.error(`Saliendo de la App...`);
});


