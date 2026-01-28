// {
//   "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImlhdCI6MTY3Mjc2NjAyOCwiZXhwIjoxNjc0NDk0MDI4fQ.kCak9sLJr74frSRVQp0_27BY4iBCgQSmoT3vQVWKzJg",
//   "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImlhdCI6MTY3Mjc2NjAyOCwiZXhwIjoxNjcyODAyMDI4fQ.P1_rB3hJ5afwiG4TWXLq6jOAcVJkvQZ2Z-ZZOnQ1dZw"
// }

export interface LoginResponse {
    access_token: string;
    refresh_token: string;
}

// {
//   "id": 1,
//   "email": "john@mail.com",
//   "password": "changeme",
//   "name": "Jhon",
//   "role": "customer",
//   "avatar": "https://api.lorem.space/image/face?w=640&h=480&r=867"
// }

export interface UserProfile {
    id: number;
    email: string;
    password: string;
    name: string;
    role: string;
    avatar: string;
}
