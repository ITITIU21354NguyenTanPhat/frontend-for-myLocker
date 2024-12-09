
import CracoLessPlugin from 'craco';

export const devServer = {
  port: 3000,
  proxy: {
    "/v": {
      target: "http://localhost:8080",
      changeOrigin: true,
      secure: false
    }
  }
};
export const plugins = [
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
];
