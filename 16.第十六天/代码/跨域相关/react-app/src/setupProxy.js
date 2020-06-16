const proxyTable = require('http-proxy-middleware');

module.exports = function(app){
    app.use(proxyTable('/api',{
            target: 'http://localhost:7892',
            changeOrigin: true,
            pathRewrite: {
                "^/api" : ""
            }            
        }
    ))

}
