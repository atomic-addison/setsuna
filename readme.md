# Setsuna
[![](https://img.shields.io/npm/v/setsuna?label=Latest%20Version&style=for-the-badge&logo=npm&color=informational)](https://www.npmjs.com/package/setsuna)
[![](https://img.shields.io/static/v1?label=Creator&message=atomic-addison&color=informational&style=for-the-badge)](https://github.com/atomic-addison)
[![](https://img.shields.io/static/v1?label=Helper&message=GHOST&color=informational&style=for-the-badge)](https://github.com/ghostdevv)

## Install
```js
npm i setsuna --save
```

## Setup

In order to use Setsuna in your project you first need to import it:

```js
const Setsuna = require("setsuna");
```

Next, declare a variable, and set up the settings that you need, for example:

```js
var setsuna = new Setsuna({
	setting:'paramter' ...
});
```

Here are all the available settings:

* `dirname` : A directory name which will contain all the files Setsuna generates 

    (**Default**: By default, Setsuna will name the directory \<YOUR-PROJECT-NAME\>_settings)
* `dirpath` : Location of Setsuna's file directory

    (**Default**: By default, Setsuna stores the settings in the current user's home directory)
