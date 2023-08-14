import { describe, it, vi } from "vitest";
import mssql from 'mssql'
import { getProject, getProjects } from "./projectControllers";

describe("Get all projects",()=>{
    it("it should get all projects", async()=>{
        const req = {
            info:{is_admin:true},
        }
        const res = {

        }
        const poolMock = vi.spyOn(mssql, 'connect').mockResolvedValueOnce({
            request:vi.fn().mockReturnThis(),
            execute:vi.fn().mockReturnThis(),
            error:vi.fn().mockReturnThis(),
            records:vi.fn().mockResolvedValueOnce({
                recordset:{}
            }),
            connected:true,
        })
        poolMock.request().execute

    })

})