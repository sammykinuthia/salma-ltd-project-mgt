import { sqlConfig } from "../../server/Config/config.js";

import mssql from 'mssql'



export class DB {

    static async exec(storedProcedure, data = {}) {
        try {
            let request = await (await mssql.connect(sqlConfig)).request();
            request = this.addData(request, data);
            console.log("called");
            return request.execute(storedProcedure);
        } catch (error) {
            console.log(error);
            return error
        }
    }

    static addData(req, data = {}) {
        const keys = Object.keys(data);

        keys.forEach((keyName) => {
            req.input(keyName, data[keyName]);
        });

        return req;

    }

}