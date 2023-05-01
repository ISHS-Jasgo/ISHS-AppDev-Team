export class UserDatabase {
    mysql = require('mysql');
    db = this.mysql.createConnection({
        host: '210.114.22.146',
        user: 'root',
        password: 'ishs123!',
        database: 'test'
    });   
    constructor() {
        this.db.connect((err: any) => {
            if (err) {
                throw err;
            }
            console.log('Connected to database');
        });
    }

    signUp(key: number, name: string, privilege: number, password: string) {
        if (!this.userExists(key)) {
            this.db.query(`INSERT INTO users (\`key\`, name, privilege, password) VALUES (${key}, '${name}', ${privilege}, '${password}')`, (err: any, result: any) => {
                if (err) {
                    throw err;
                }
                console.log(result);
            });
        }
    }

    login(key: number, name: string, password: string) {
        this.db.query(`SELECT * FROM users WHERE \`key\`=${key} AND name='${name}' AND password='${password}'`, (err: any, result: any) => {
            if (err) {
                throw err;
            }
            console.log(result);
        });
    }

    getUsers() {
        this.db.query('SELECT * FROM users', (err: any, result: any) => {
            if (err) {
                throw err;
            }
            console.log(result);
        });
    }

    getUser(key: number) {
        this.db.query(`SELECT * FROM users WHERE \`key\`=${key}`, (err: any, result: any) => {
            if (err) {
                throw err;
            }
            console.log(result);
        });
    }

    removeUser(key: number) {
        this.db.query(`DELETE FROM users WHERE \`key\`=${key}`, (err: any, result: any) => {
            if (err) {
                throw err;
            }
            console.log(result);
        });
    }

    updateUser(key: number, name: string, privilege: number, password: string) {
        this.db.query(`UPDATE users SET name='${name}', privilege=${privilege}, password='${password}' WHERE \`key\`=${key}`, (err: any, result: any) => {
            if (err) {
                throw err;
            }
            console.log(result);
        });
    }

    userExists(key: number): boolean {
        this.db.query(`SELECT * FROM users WHERE \`key\`=${key}`, (err: any, result: any) => {
            if (err) {
                throw err;
            }
            console.log(result);
            return result.length > 0;
        });
        return false;
    }

    updateUserKey(key: number, name: string, password: string) {
        this.db.query(`UPDATE users SET \`key\`=${key} WHERE name='${name}' AND password='${password}'`, (err: any, result: any) => {
            if (err) {
                throw err;
            }
            console.log(result);
        });
    }

    close() {
        this.db.end();
    }
}

