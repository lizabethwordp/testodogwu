

const customer = {
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
};

// const dogImagesResponse = {
//     message: [
//         "https://images.dog.ceo/breeds/cattledog-australian/IMG_1042.jpg ",
//         "https://images.dog.ceo/breeds/cattledog-australian/IMG_5177.jpg",
//     ],
// };

export default async function mockFetch(url) {
    switch (url) {
        case `http://localhost:3030/api/items/${id}`: {
            return {
                ok: true,
                status: 200,
                json: async () => customer,
                // json: async () => breedsListResponse,
            };
        }
        default: {
            throw new Error(`Unhandled request: ${url}`);
        }
    }
}