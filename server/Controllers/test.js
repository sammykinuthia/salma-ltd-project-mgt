import mssql from 'mssql'
import { sqlConfig } from '../Config/config.js'

async function test(){
    let pool = await mssql.connect(sqlConfig)
    console.log(pool);
}
test()