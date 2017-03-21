Combo container - both frontend and api code
===============================================

[![Greenkeeper badge](https://badges.greenkeeper.io/starlightgroup/combo.svg?token=1278a17b535383fe9884d33c6f75d28f3778b1d6a145915037ba8251dbd7d301)](https://greenkeeper.io/)



Tunnable configuration parameters
===============================================

They are loaded from process environment and include

- `NODE_ENV`, default - `development`, or `production` - affects logging to stdout

- `HOST`, default - `0.0.0.0` - api listening on all available addresses

- `PORT`, default - 3000, api listens on 3000 port, like 95% expressJS applications

- `SECRET`, random string to make tampering sessions more hard

- `REDIS_URL` -  redis connection string, default is `redis://localhost:6379` - good idea to add protection to it - `redis://usernameIgnored:someRealyLongStringAsPassword@localhost:6379`
 
 
Build with docker
===============================================

``
  # docker build -t sl-combo .

``

