const { mkdir, mkdirSync, existsSync, writeFileSync, open, writeFile, readFile, readFileSync, unlink, unlinkSync } = require('fs');
const { join, basename } = require('path');
const { homedir } = require('os');

module.exports = class Setsuna {
	constructor(data) {
		this.home_dir;
		this.dirpath = data.dirpath || homedir();

		this.persistent = data.persistent == undefined ? true : false;

		this.dirname = data.dirname || '.' + basename(process.argv[1]) + '_settings';
		this.home_dir = join(this.dirpath, this.dirname);
	}

	init(callback){
		if (!callback) {
			return new Promise((resolve, reject) => {
				this._init(({ success, error }) => {
					if (error) return reject(new Error(error));
					resolve(success);
				});
			});
		} else {
			if (callback && typeof callback != 'function') throw new TypeError(`Recieved type ${typeof(callback)} expected function`);
			return this._init(callback);
		};
	}

	_init(callback) {
		if(!this.persistent) {
			this.settings = {};
			
			if (callback) callback({ success: true });
			return;
		};

		mkdir(this.home_dir, { recursive: true }, (err) => {
			this.writeData({
				data: {},
				force: false,
				filename: "settings.json"
			}, () => callback({ success: true }));
		});
	}

	initSync(){
		if(!this.persistent) {
			this.settings = {};
			
			return;
		}

		if (!fs.existsSync(this.home_dir)){
		    fs.mkdirSync(this.home_dir);
		}

		this.writeDataSync({
			data: {},
			force: false,
			filename: "settings.json"
		});
	}
	
	writeDataSync(rules){
		if(!this.persistent) return this.settings.files[rules.filename] = rules.data;
		
		if(!existsSync(join(this.home_dir, rules.filename)) || rules.force) {
			writeFileSync(join(this.home_dir, rules.filename), JSON.stringify(rules.data));
		}
	}

	readDataSync(filename){
		if(!this.persistent) return this.settings.files[filename];

		return JSON.parse(readFileSync(join(this.home_dir, filename)));
	}
	
	deleteDataSync(filename){
		if(!this.persistent) delete this.settings.files[filename];
		
		if(existsSync(join(this.home_dir, filename))) {
			unlinkSync(join(this.home_dir, filename));
		}
	}

	writeData(rules, callback){
		if (!callback) {
			return new Promise((resolve, reject) => {
				this._writeData(rules, ({ success, error }) => {
					if (error) return reject(new Error(error));
					resolve(data);
				});
			});
		} else {
			if (callback && typeof callback != 'function') throw new TypeError(`Recieved type ${typeof(callback)} expected function`);
			return this._writeData(rules, callback);
		};
	}

	_writeData(rules, callback){
		if(!this.persistent) {
			this.settings.files[rules.filename] = rules.data;

			callback({ success: true });
			return;
		}

		open(join(this.home_dir, rules.filename), 'r', (err, fd) =>{
			if (err) {
				writeFile(join(this.home_dir, rules.filename), JSON.stringify(rules.data), error => {
					if(error) callback({ error });

					if (callback) callback({ success: true });
				});
			}
			else {
				if (rules.force) {
					writeFile(join(this.home_dir, rules.filename), JSON.stringify(rules.data), error => {
						if(error) callback({ error });

						if (callback) callback({ success: true });
					});

					return;
				}
				
				if (callback) callback({ success: true });
			}
		});
	}

	readData(filename, callback){
		if (!callback) {
			return new Promise((resolve, reject) => {
				this._readData(filename, ({ data, error }) => {
					if (error) return reject(new Error(error));
					resolve(data);
				});
			});
		} else {
			if (callback && typeof callback != 'function') throw new TypeError(`Recieved type ${typeof(callback)} expected function`);
			return this._readData(filename, callback);
		};
	}

	_readData(filename, callback) {
		if(!this.persistent) {
			callback({ data: this.settings.files[filename] });
			return;
		};

		readFile(join(this.home_dir, filename), 'utf8', (error, contents) => {
			if (error) callback({ error });
			try{
				callback({ data: JSON.parse(contents) });
			}
			catch {
				callback({ error: 'Unable to parse to object' });
			};
		});
	}

	deleteData(filename, callback){
		if (!callback) {
			return new Promise((resolve, reject) => {
				this._deleteData(filename, ({ success, error }) => {
					if (error) return reject(new Error(error));
					resolve(data);
				});
			});
		} else {
			if (callback && typeof callback != 'function') throw new TypeError(`Recieved type ${typeof(callback)} expected function`);
			return this._deleteData(filename, callback);
		};
	}

	_deleteData(filename, callback){
		if(!this.persistent) {
			delete this.settings.files[filename];

			callback({ success: true });
			return;
		}

		unlink(join(this.home_dir, filename), error => {            
			if(error) callback({ error });
			
			if (callback) callback({ success: true });
		});  
	}

	set(parameter, value, callback){
		if (!callback) {
			return new Promise((resolve, reject) => {
				this._set(parameter, value, ({ success, error }) => {
					if (error) return reject(new Error(error));
					resolve();
				});
			});
		} else {
			if (callback && typeof callback != 'function') throw new TypeError(`Recieved type ${typeof(callback)} expected function`);
			return this._set(parameter, value, callback);
		};
	}

	_set(parameter, value, callback){
		if(!this.persistent) {
			this.settings[parameter] = value;

			callback({ success: true });

			return;
		}

		this.readData('settings.json', ({ data, error }) => {
			data[parameter] = value;
			this.writeData({
				data: data,
				force: true,
				filename: "settings.json"
			}, () => {
				callback({ success: true });
			});
		});
	}

	unset(parameter, callback){
		if (!callback) {
			return new Promise((resolve, reject) => {
				this._unset(parameter, ({ success, error }) => {
					if (error) return reject(new Error(error));
					resolve();
				});
			});
		} else {
			if (callback && typeof callback != 'function') throw new TypeError(`Recieved type ${typeof(callback)} expected function`);
			return this._unset(parameter, callback);
		};
	}

	_unset(parameter, callback){
		if(!this.persistent) {
			delete this.settings[parameter];

			callback({ success: true });

			return;
		}

		this.readData('settings.json', ({ data, error }) => {
			delete data[parameter];

			this.writeData({
				data: data,
				force: true,
				filename: "settings.json"
			}, () => {
				callback({ success: true });
			});
		});
	}

	get(parameter, callback){
		if (!callback) {
			return new Promise((resolve, reject) => {
				this._get(parameter, ({ data, error }) => {
					if (error) return reject(new Error(error));
					resolve(data);
				});
			});
		} else {
			if (callback && typeof callback != 'function') throw new TypeError(`Recieved type ${typeof(callback)} expected function`);
			return this._get(parameter, callback);
		};
	}

	_get(parameter, callback){
		if(!this.persistent) {
			callback({ data: this.settings[parameter] });
			return;
		};

		this.readData('settings.json', ({ data, error }) => {
			if (error) return callback({ error });
			callback({ data: data[parameter] });
		});
	}
	
	setSync(parameter, value){
		if(!this.persistent) return this.settings[parameter] = value;

		var data = this.readDataSync('settings.json');

		data[parameter] = value;

		this.writeDataSync({
			data: data,
			force: true,
			filename: "settings.json"
		});
	}
	
	unsetSync(parameter){
		if(!this.persistent) delete this.settings[parameter];

		var data = this.readDataSync('settings.json');

		delete data[parameter];

		this.writeDataSync({
			data: data,
			force: true,
			filename: "settings.json"
		});
	}

	getSync(parameter){
		if(!this.persistent) return this.settings[parameter];

		return this.readDataSync('settings.json')[parameter];
	}
}