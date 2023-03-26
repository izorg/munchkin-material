# Munchkin Material

Munchkin level counter inspired by Material Design

## Demo

https://web.allmunchkins.com

## Approach

This web app is an example of how I work with the code. How I implement practices.
How I work.

### Input criteria

- Client-side web app
- LocalStorage as permanent storage
- Redux store is the only source of truth
- Service worker for static caching

### Known Issues

#### React Refresh

1.  Set `DISABLE_V8_COMPILE_CACHE=1` to fix HMR issue `Invalid host defined options` https://github.com/webpack/webpack-cli/issues/3005.

2.  Create symbolic links to `node_modules` folder in `web` to fix `react-refresh` issue.

    macOS

    ```shell
    ln -s "$PWD/node_modules" "$PWD/web/node_modules"
    ```

    Windows

    ```shell
    mklink /D "<absolute_psth_to_project>\node_modules" "<absolute_psth_to_project>\web\node_modules"
    ```
