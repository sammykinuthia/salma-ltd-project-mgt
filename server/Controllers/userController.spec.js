import bcrypt from 'bcrypt';
import mssql from 'mssql';
import { v4 } from "uuid";
import { sqlConfig } from "../Config/config.js"
import dotenv from 'dotenv';
const jwt = require ("jsonwebtoken")
import { DB } from "../DatabaseHelpers/index.js"
import { createUser, getUsers , verifyEmail} from './usersControllers';

dotenv.config()

const req ={
    body :{

        full_name: " peter peter",
        username : "peter",
        email: "jidraphkimachia1@gmail.com", 
        password: 'pass'
    }
}

const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis(),
}

describe('Create a user', () => {
    it('should create a new user successfully', async () => {
        jest.mock('uuid', () => ({
            v4: jest.fn(() => 'mocked-id-or-code'),
        }));

        jest.spyOn(bcrypt, 'hash').mockResolvedValueOnce('mocked-hash');

        const mockedInput = jest.fn().mockReturnThis();

        const mockedExecute = jest.fn().mockResolvedValue({
            recordset: [{ id: 'user-id' }],
        });

        const mockedRequest = {
            input: mockedInput,
            execute: mockedExecute,
        };

        const mockedPool = {
            request: jest.fn().mockReturnValue(mockedRequest),
        };

        jest.spyOn(mssql, 'connect').mockResolvedValue(mockedPool);

        await createUser(req, res);

        // expect(mockedInput).toHaveBeenCalledWith('email', mssql.VarChar, 'jidraphkimachia1@gmail.com')
        // expect(mockedInput).toHaveBeenCalledWith('password', mssql.VarChar, 'pass')
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith({
            status: 'success',
            data: [{ id: 'user-id' }],
        });

        expect(mockedExecute).toHaveBeenCalledWith('uspCreateUser');
        expect(mockedInput).toHaveBeenCalledWith('id', expect.any(String));
    });


    // it('Fails if the email provided is already in use', async () => {
    //     const request = {
    //         body: {
    //             full_name: "peter peter",
    //             email: "jidraphkimachia1@gmail.com",
                
    //         }
    //     };

    //     const mockDBExec = jest.spyOn(DB, 'exec').mockRejectedValueOnce({
    //         number: 2627 // Simulate the unique constraint violation error
    //     });

    //     const res = {
    //         status: jest.fn().mockReturnThis(),
    //         json: jest.fn()
    //     };

    //     await createUser(request, res);

    //     expect(mockDBExec).toHaveBeenCalledWith('uspCreateUser', {
    //         id: expect.any(String),
    //         full_name: 'peter peter',
            
    //     });
    //     expect(res.status).toHaveBeenCalledWith(400);
    //     expect(res.json).toHaveBeenCalledWith({
    //         message: "A user with this username or email exists. Use a different one"
    //     });
    // });
});


describe('get all users', () => {
    it('should fail to get users if it does not connect to db', async () => {
        const mockUsersData = [
            { full_name: "Peter Peter", 
            username: "peter", 
            email: "peter@example.com", 
            password: 'pass' },
            
        ];

        const mockedExecute = jest.fn().mockResolvedValue({ recordset: mockUsersData });
        const mockedRequest = {
            execute: mockedExecute,
        };

        const req = { info: { is_admin: true } }; 

        jest.spyOn(mssql, "connect").mockResolvedValueOnce({
            request: jest.fn().mockReturnThis(),
            execute: mockedExecute
        });

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        await getUsers(req, res);

        expect(res.json).toHaveBeenCalledWith({ Error: "couldn't connect to db"});
        // expect(res.json).toHaveBeenCalledWith({ uspGetUsers });

        // expect(res.status).toHaveBeenCalledWith(200); // Assuming the success status is 200
        // expect(mockedExecute).toHaveBeenCalledWith('uspGetUsers');

    });
});



describe('verifyEmail', () => {
    it('should verify email successfully with valid email and code', async () => {
        const req = {
            body: {
                email: 'valid@example.com',
                code: 'valid_code'
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        
        const mockExec = jest.spyOn(DB, 'exec').mockResolvedValueOnce({
            recordset: [{ id: 'valid_token_id' }]
        });

        await verifyEmail(req, res);

        expect(mockExec).toHaveBeenCalledWith('uspVerifyTokenExists', { email: 'valid@example.com', code: 'valid_code' });
        expect(mockExec).toHaveBeenCalledWith('uspUpdateVerificationTokenVerifiedAt', { token_id: 'valid_token_id' });
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            status: "success",
            message: "Account Verified Successfully"
        });
    });

    it('should return error with invalid code', async () => {
        const req = {
            body: {
                email: 'invalid@example.com',
                code: 'invalid_code'
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
    
        
        const mockExec = jest.spyOn(DB, 'exec').mockResolvedValueOnce({
            recordset: [] 
        });
    
        await verifyEmail(req, res);
    
        expect(mockExec).toHaveBeenCalledWith('uspVerifyTokenExists', { email: 'invalid@example.com', code: 'invalid_code' });
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({
            status: "error",
            message: "Invalid Code"
        });
    });
    it('should handle database error', async () => {
        const req = {
            body: {
                email: 'valid@example.com',
                code: 'valid_code'
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
    
    
        const mockExec = jest.spyOn(DB, 'exec').mockRejectedValueOnce(new Error("Database error"));
    
        await verifyEmail(req, res);
    
        expect(mockExec).toHaveBeenCalledWith('uspVerifyTokenExists', { email: 'valid@example.com', code: 'valid_code' });
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            status: "Error",
            message: "Error Processing Code"
        });
    });
});


