## Known Issues

### HMR

Set `DISABLE_V8_COMPILE_CACHE=1` to fix HMR issue `Invalid host defined options` https://github.com/webpack/webpack-cli/issues/3005.

Create symbolic link to `node_modules` in `web`

```shell
ln -s /Users/vZavoruev/IdeaProjects/munchkin-material/node_modules /Users/vZavoruev/IdeaProjects/munchkin-material/web/node_modules
```
