export const port = 8888

export const uriMongo = 'mongodb://localhost:27017/streamlife'

export const tokenSeed = "top_secret"

export const ioServerPort = 3000


export const mediaServerConfig = {
    rtmp: {
      port: 1935,
      chunk_size: 60000,
      gop_cache: true,
      ping: 30,
      ping_timeout: 60
    },
    http: {
      port: 8000,
      allow_origin: '*'
    }
  };
