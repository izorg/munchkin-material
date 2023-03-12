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
- Service worker static for static caching

### Known Issues

#### React Refresh

Create symbolic links to `node_modules` folder to fix `react-refresh` issue.

macOS

```shell
ln -s <absolute_psth_to_project>/node_modules <absolute_psth_to_project>/web/node_modules
```

Windows

```shell
mklink /D "<absolute_psth_to_project>\node_modules" "<absolute_psth_to_project>\web\node_modules"
```
