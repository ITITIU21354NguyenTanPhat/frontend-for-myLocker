// craco.config.js
// const { TARGET_CLS } = require('antd/es/_util/wave/interface');
const CracoLessPlugin = require('craco');

module.exports = {
  devServer:{
    port: 3000,
    proxy:{
      "/v":{
        target: "http://localhost:8080",
        changeOrigin: true,
        secure: false
      }
    }
  },
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: { '@primary-color': '#f15a22' }, 
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
