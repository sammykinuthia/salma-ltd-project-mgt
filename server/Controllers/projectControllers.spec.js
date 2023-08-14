import {  getProject, getProjects } from "./projectControllers";
import mssql from "mssql"
import { DB } from "../DatabaseHelpers/index.js"

jest.mock("../DatabaseHelpers/index")


const res= {
    status: jest.fn(() => res),
    json: jest.fn()

    
    
};



  jest.mock('mssql', () => ({
    connect: jest.fn(() => ({
      connected: true,
      request: jest.fn().mockReturnThis(),
    })),
  }));

describe("TESTS FOR PROJECT CONTROLLER",()=>{

    


    describe("Get Projects EndPoint",()=>{
        it("returns authorization error when the request is made by a non admin",async()=>{
            const req = {
                info: {
                  is_admin: false
                }
              };

              await getProjects(req,res)
              expect(res.status).toHaveBeenCalledWith(401);
              expect(res.json).toHaveBeenCalledWith({
                status: 'Error',
                message: 'No Access to view projects'
              });
        });


        it('returns 404 when no projects are found', async () => {
          const req = {
            info: {
              is_admin: true
            }
          };

          jest.spyOn(mssql,"connect").mockResolvedValueOnce({
            connected: true,
            request: jest.fn().mockReturnThis(),
            execute: jest.fn().mockResolvedValueOnce(
              {
                recordset: []
              }
            )

          
          })

          await getProjects(req,res);

          expect(res.status).toHaveBeenCalledWith(404);           
            
          
            
          });
        
        
        
    })


    describe("getProject Function and Endpoint",()=>{
      it("returns 404 and project not found if not found",async()=>{
        const mockResponse =  
          {
              "id": "62e2a8a6-9d13-4470-96e4-2ec738d68c3c",
              "name": "This is a dope project",
              "description": "rhwwn this and that this and that tthen thisnjisbntrjb wtrheuhtfj fnklwjnc fnvwbfvjrtng cjnwbjfnw vbjsrjkfcb vrwjnrbg5jrvkc wvnjtkh2c4nw gj2vwbtcfnwrjhtwvg5n4wrjktvhu2",
              "created_at": "2023-08-07T00:00:00.000Z",
              "start_date": "2023-08-16T00:00:00.000Z",
              "end_date": "2023-08-31T00:00:00.000Z",
              "completed_on": null,
              "is_completed": false
          }
          const req = {
            params:{
              id:  "62e2a8a6-9d13-4470-96e4-2ec738d68c3c"
            }
          }
            
          
          await getProject(req,res)

          DB.exec.mockResolvedValueOnce({id});

          expect(res.json).toHaveBeenCalledWith({
            
              status: "success",
              project: mockResponse
          
          })


        

        
        

      })
    })


    describe("Create Projects",()=>{
      it()
    })
})