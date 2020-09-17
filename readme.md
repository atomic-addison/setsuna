# Setsuna
[![](https://img.shields.io/npm/v/setsuna?label=Latest%20Version&style=for-the-badge&logo=npm&color=informational)](https://www.npmjs.com/package/setsuna)
[![](https://img.shields.io/static/v1?label=Creator&message=atomic-addison&color=informational&style=for-the-badge)](https://github.com/atomic-addison)
[![](https://img.shields.io/static/v1?label=Helper&message=GHOST&color=informational&style=for-the-badge)](https://github.com/ghostdevv)

## Install
```js
npm i setsuna --save
```

## Quick example

```js
const Setsuna = require("setsuna");

var setsuna = new Setsuna();

setsuna.set("property", "value", ({ error }) => {
    if (error) return console.log("ERROR", error);

    setsuna.get("property", ({ data, error }) => {
        if (error) return console.log("ERROR", error);

        console.log(data); // data = "value"
    });
});
```

## Setup

In order to use Setsuna in your project you first need to import it:

```js
const Setsuna = require("setsuna");
```

Next, declare a variable, and set up the settings that you need, for example:

```js
var setsuna = new Setsuna({
	setting:'parameter' ...
});
```

Here are all the available settings:

* `dirname` : A directory name which will contain all the files Setsuna generates.

    (**Default**: Setsuna will name the directory `<YOUR-PROJECT-NAME>_settings`.)
* `dirpath` : Location of Setsuna's file directory.

    (**Default**: Setsuna stores the settings in the current user's home directory.)
* `persistent` : Enable\Disable saving Setsuna's data to files.

    (**Default**: `true`. Setsuna writes all the data to files.)

Once you set up all your settings, you are ready to work with Setsuna. You have a choice between using Setsuna in syncrhonous and asynchronous modes.

### Here is a list of all asynchronous methods:

`setsuna.init`
```js
setsuna.init({ error } => {
    if (error) return console.log("ERROR", error);
});
```
In order to work, Setsuna needs to create a working directory and a default settings file. Call `setsuna.init` at the start of the project in order to prepare Setsuna for work.

Outside of persistent mode `setsuna.init` creates the default objects for temporary data storage;

`setsuna.set`

```js
setsuna.set("property", "value", ({ error }) => {
    if (error) return console.log("ERROR", error);
});
```

To save any data to the default settings file, you need to call `setsuna.set`. This method creates a property with your data. Specify the **property** and the **value** you want it to have.

`setsuna.unset`

```js
setsuna.unset("property", ({ error }) => {
    if (error) return console.log("ERROR", error);
});
```

To remove any data from the default settings file, you need to call `setsuna.unset`. This method deleted the **property** you have specified.

`setsuna.get`
```js
setsuna.get("property", ({ data, error }) => {
    if (error) return console.log("ERROR", error);

    console.log(data);
});
```

To get the data you saved to Setsuna, you need to call `setsuna.get` and specify the property name that you used to save said data.

`setsuna.writeData`
```js
setsuna.writeData({ 
    data: {"your" : "data_to_write"}, 
    force: false, 
    filename: "filename.json"
}, ({ error }) => {
    if (error) return console.log("ERROR", error);
});
```

Setsuna can also write your data to a separate file. Call `setsuna.writeData` and pass it an object where you specify the **filename** you want to create with your **data**. The **force** option enables you to overwrite the file if it exists when the option is set to **true**.

`setsuna.readData`
```js
setsuna.readData("filename.json", ({ data, error }) => {
    if (error) return console.log("ERROR", error);

    console.log(data);
});
```

To read your created files, simply call `setsuna.readData` and pass it the **filename** you have previously created.

`setsuna.deleteData`
```js
setsuna.deleteData("filename.json", ({ error }) => {
    if (error) return console.log("ERROR", error);

    console.log(data);
});
```

If you need to remove your created file, call `setsuna.deleteData` and pass it the **filename** you have previously created.

### Here is a list of all synchronous methods:

`setsuna.init`
```js
setsuna.initSync();
```

Just like the asynchronous method, but no callback.

`setsuna.setSync`
```js
setsuna.setSync("parameter", "value");
```

Just like the asynchronous method, but no callback.

`setsuna.unsetSync`
```js
setsuna.unsetSync("parameter");
```

Just like the asynchronous method, but no callback.

`setsuna.getSync`
```js
setsuna.getSync("parameter");
```

Just like the asynchronous method, but no callback.

`setsuna.writeDataSync`
```js
setsuna.writeDataSync({ 
    data: {"your" : "data_to_write"}, 
    force: false, 
    filename: "filename.json"
});
```

Just like the asynchronous method, but no callback.

`setsuna.readDataSync`
```js
setsuna.readDataSync("filename.json");
```

Just like the asynchronous method, but no callback.

`setsuna.deleteDataSync`
```js
setsuna.deleteDataSync("filename.json");
```

Just like the asynchronous method, but no callback.

And that's pretty much it! Have fun!