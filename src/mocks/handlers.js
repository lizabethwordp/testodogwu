/* istanbul ignore file */
import { rest } from 'msw';

export const handlers = [
    rest.get('http://localhost:3030/api/items', (req, res, ctx) => {
        return res(ctx.status(200), ctx.json([
            {
                "id": 1,
                "firstName": "Paulo",
                "lastName": "Walker",
                "bvn": "90876543212",
                "dateOfBirth": "2019-02-05",
                "phoneNumber": "09012345679",
                "email": "paulsw@gmail.com",
                "password": "12345",
                "confirmPassword": "12345",
                "acctType": "Savings",
                "role": null
            },
            {
                "id": 2,
                "firstName": "Paulett",
                "lastName": "Walker",
                "bvn": "90876543212",
                "dateOfBirth": "2019-02-05",
                "phoneNumber": "09012345679",
                "email": "paulsw@gmail.com",
                "password": "12345",
                "confirmPassword": "12345",
                "acctType": "Savings",
                "role": null
            },
            {
                "id": 5,
                "firstName": "Paulette",
                "lastName": "Walker",
                "bvn": "90876543212",
                "dateOfBirth": "2019-02-05",
                "phoneNumber": "09012345679",
                "email": "paulette@gmail.com",
                "password": "12345",
                "confirmPassword": "12345",
                "acctType": "Savings",
                "role": null
            },
            {
                "id": 7,
                "firstName": "Paule",
                "lastName": "Walker",
                "bvn": "90876543212",
                "dateOfBirth": "2019-02-05",
                "phoneNumber": "09012345679",
                "email": "paule@gmail.com",
                "password": "12345",
                "confirmPassword": "12345",
                "acctType": "Savings",
                "role": null
            },
            {
                "id": 8,
                "firstName": "Pauler",
                "lastName": "Walker",
                "bvn": "90876543212",
                "dateOfBirth": "2019-02-05",
                "phoneNumber": "09012345679",
                "email": "pauler@gmail.com",
                "password": "12345",
                "confirmPassword": "12345",
                "acctType": "Savings",
                "role": null
            },
            {
                "id": 9,
                "firstName": "Dele",
                "lastName": "Dolu",
                "bvn": "21346578909",
                "dateOfBirth": "2000-06-06",
                "phoneNumber": "09012354678",
                "email": "dele@gmail.com",
                "password": "123456",
                "confirmPassword": "123456",
                "acctType": "Savings",
                "role": "admin"
            },
            {
                "id": 10,
                "firstName": "Samuel",
                "lastName": "Adeyongo",
                "bvn": "21346578909",
                "dateOfBirth": "2023-05-01",
                "phoneNumber": "07045597018",
                "email": "samueladeyongo@gmail.com",
                "password": "12345",
                "confirmPassword": "12345",
                "acctType": "Savings",
                "role": null
            },
            {
                "id": 11,
                "firstName": "Maryam",
                "lastName": "Modibbo",
                "bvn": "89012345678",
                "dateOfBirth": "2017-02-09",
                "phoneNumber": "09087654321",
                "email": "maryam@gmail.com",
                "password": "123456",
                "confirmPassword": "123456",
                "acctType": "Savings",
                "role": null
            },
            {
                "id": 12,
                "firstName": "Iveren",
                "lastName": "Adeyongo",
                "bvn": "09876543210",
                "dateOfBirth": "2023-05-02",
                "phoneNumber": "08127987654",
                "email": "iveren@gmail.com",
                "password": "12345",
                "confirmPassword": "12345",
                "acctType": "Current",
                "role": null
            },
            {
                "id": 13,
                "firstName": "donk",
                "lastName": "Dev",
                "bvn": "90876543212",
                "dateOfBirth": "2018-06-05",
                "phoneNumber": "09012345678",
                "email": "donk@gmail.com",
                "password": "12345",
                "confirmPassword": "12345",
                "acctType": "Savings",
                "role": null
            }
        ]))
    }),
    rest.get('http://localhost:3030/api/items/1', (req, res, ctx) => {
        return res(ctx.status(200), ctx.json([
            {
                "id": 1,
                "firstName": "Paulo",
                "lastName": "Walker",
                "bvn": "90876543212",
                "dateOfBirth": "2019-02-05",
                "phoneNumber": "09012345679",
                "email": "paulsw@gmail.com",
                "password": "12345",
                "confirmPassword": "12345",
                "acctType": "Savings",
                "role": null
            }
        ]))
    })
    // rest.put(`http://localhost:3030/api/items/${id}`, (req, res, ctx) => {
    // rest.post('http://localhost:3030/api/items', (req, res, ctx) => {
    //     const { firstName, lastName, bvn, dateOfBirth, phoneNumber, email, password, confirmPassword, acctType } = req.body
    
    //     return res(
    //       ctx.json({
    //         "id": 1,
    //         "firstName": "Paulo",
    //         "lastName": "Walker",
    //         "bvn": "90876543212",
    //         "dateOfBirth": "2019-02-05",
    //         "phoneNumber": "09012345679",
    //         "email": "paulsw@gmail.com",
    //         "password": "12345",
    //         "confirmPassword": "12345",
    //         "acctType": "Savings",
    //         "role": null
    //     })
    //     )
    //   }),
]