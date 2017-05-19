/*RESTful API demo
config info for this project
 --- @author Weiwei Zhang*/

module.exports = {
    name: 'RESTFUL_API',
    version: '0.0.1',
    env: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 3000,
    base_url: process.env.BASE_URL || 'http://localhost:3000',
    db: {
        uri: 'mongodb://localhost:27017/restful_api',
    },
}
