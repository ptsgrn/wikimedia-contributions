
# wikimedia-contributions

All user scripts that I have created.

## How to use

### In devlopment

1. Install needed dependencies:
```bash
pnpm i # or yarn or npm i
```
2. Run script on your localhost: 
```bash
pnpm run start
# or run at port 3245 for example
pnpm run start -- --port 3245
```
3. Place this loader to your prefered user js page:
```javascript
// this is default port, you can set it in 
mw.loader.load("http://localhost:8080/staged.js")
```
You can now add any loader script to ./staged.js file.
