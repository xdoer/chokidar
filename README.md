# Webpack-plugin-Chokidar

## eg

```js
new WebPackPluginChokidar({
  chokidarConfigList: [
    {
      file: '../src/pages/**/index.tsx',
      opt: { persistent: true, ignoreInitial: true },
      actions: {
        on: {
          add: (_, path) => {
            console.log(`File ${path} has been added`);
          },
        },
      },
    },
  ],
});
```
