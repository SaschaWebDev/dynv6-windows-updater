# dynv6-windows-updater

A nodejs windows application to update your IPv6 address to dynv6.com (IPv6 DynDNS)

## 💡 Motivation

After my ISP switched the Internet connection to [DS-Lite](https://avm.de/service/wissensdatenbank/dok/FRITZ-Box-6690-Cable/1611_Was-ist-DS-Lite-und-wie-funktioniert-es) without my knowledge, I noticed that all devices were no longer remotely reachable from IPv4 clients, such as the smartphone or hotel wifi. Looking for a solution I discovered Dynv6.com as an DynDNS provider for IPv6 addresses. The device which the DynDNS should run on uses Windows but the only officially linked IPv6 DynDNS Windows software called [Dynephant](https://github.com/chriv/dynephant) is deprecated since years and does not work anymore. So I decided to write my own application running on Windows which is directly connected to the Dyn6.com API.

## ✨ Features

- Lightweight Nodejs server
- Fetches the external IPv6 of the executing device, checks for validity and updates Dynv6.com Zone Record data
- Can be run as Windows service on every system start
- Runs as cronjob every 10 minutes

## 🏠 How to use

### ⏹️ Prerequisites

The following applications should be installed before running this software

```javascript
Git
Node 16+
NPM 8.11+
```

### 🔒 APIs

- The following APIs and third-party services should be set up before using the system:
  - [Dynv6.com](https://dynv6.com)
    - Get HTTP-Token (e.g. JeyhvdRXBuuqrvfCs241SxoWnbg3tb)
    - Get Hostname (e.g. xy.dynv6.net or your custom domain)

### 🔧 Environment variables

There are some environment variables that are required. Create a .env in root directory of this repository.

```bash
PORT=<desired port number here, default is 8000>
DYNV6_TOKEN=<Dynv6.com HTTP-Token here>
DYNV6_HOST_NAME=<Dynv6.com Hostname here>
```

### 🐢 Start manually (Will not restart after Windows Shutdown)

```java
Be in folder where your repositories are stored
git clone https://github.com/SaschaWebDev/dynv6-windows-updater.git
cd /dynv6-windows-updater
npm install // Install dependencies
npm run start // Start server executing cron job every 10 min
Visit http://localhost:8000/ within browser to check execution status
```

### 🚀 Start as Windows service (Will start with Windows)

```java
!USE POWERSHELL AS ADMIN!
Be in folder where your repositories are stored
git clone https://github.com/SaschaWebDev/dynv6-windows-updater.git
cd /dynv6-windows-updater

npm install // Install dependencies
npm run build // Start server executing cron job every 10 min
npm install -g qckwinsvc // Install easy Windows service creation software

Set-ExecutionPolicy RemoteSigned //Allow unsigned .ps1 Scripts like qckwinsvc
Press J/Y to accept

Get-Location // Copy current absolute directory path from PowerShell
qckwinsvc // Start Windows service creation
For Service name enter: IPvSixDynDNS
For Service description enter: IPv6 DynDNS Windows updater
For Service script path enter: <copied path>\dist\index.js
Accept with y to start immediately
```

### 🗑️ Uninstall Windows service

```java
!USE POWERSHELL AS ADMIN!
Be in folder where your repositories are stored
cd /dynv6-windows-updater
Get-Location // Copy current absolute directory path from PowerShell
qckwinsvc --uninstall
For Service name enter: IPvSixDynDNS
For Service script path enter: <copied path>\dist\index.js
Set-ExecutionPolicy Default
Press J/Y to accept
```

## 🤖 Technologies

- [Nodejs](https://nodejs.org) / [express](https://expressjs.com)
- [node-cron](https://github.com/node-cron/node-cron)
- [ip](https://github.com/indutny/node-ip)
- [node-fetch](https://github.com/node-fetch/node-fetch)
- [rimraf](https://github.com/isaacs/rimraf)
- [concurrently](https://github.com/open-cli-tools/concurrently)
- [typescript](https://www.typescriptlang.org)
- [dotenv](https://github.com/motdotla/dotenv)
- [helmet](https://helmetjs.github.io)
- [morgan](https://github.com/expressjs/morgan)
- [nodemon](https://nodemon.io)

## 🔑 License

MIT License
