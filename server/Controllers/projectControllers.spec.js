import {  getProjects } from "./projectControllers";
import mssql from "mssql"

const res = {
    status: jest.fn(() => res),
    json: jest.fn()
  };

jest.mock('mssql', () => {
    const mockRequest = {
      execute: jest.fn()
};
    
const mockPool = {
      request: jest.fn(() => mockRequest),
      connected: true
    };
  
return {
      connect: jest.fn(),
      Pool: jest.fn(() => mockPool),
      close: jest.fn()
    };


});

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
            
            const mockExecute = jest.fn((_, callback) => {
                callback(null, { recordset: [] });
              });
          
              const mockRequest = {
                execute: mockExecute
              };
          
              mssql.Pool.mockImplementation(() => ({
                request: jest.fn(() => mockRequest),
                connected: true
              }));
          
              await getProjects(req, res);
          
              expect(mockExecute).toHaveBeenCalledWith('uspGetProjects', expect.any(Function));
              expect(res.status).toHaveBeenCalledWith(404);
              expect(res.json).toHaveBeenCalledWith({ message: 'no projects' });




           
        
            
          });
        
        
        
    })
})