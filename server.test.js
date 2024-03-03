const request = require('supertest');
const app = require('./server.js'); // Импортируем ваше приложение

// Тесты для эндпоинта POST /getForm
describe('POST /getForm', () => {
    it('should save form data successfully', async () => {
        const formData = {
            first_name: 'John',
            last_name: 'Doe',
            email: 'john.doe@example.com'
        };
        const response = await request(app)
            .post('/getForm')
            .send(formData);
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('message', 'Данные успешно сохранены в базе данных.');
    });

    it('should return 200 status on error', async () => {
        const response = await request(app)
            .post('/getForm')
            .send({}); // Sending empty data to intentionally trigger an error
        expect(response.statusCode).toBe(200);
    });
});

// Тесты для эндпоинта POST /signUp
describe('POST /signUp', () => {
    it('should register a new user successfully', async () => {
        const userData = {
            first_name: 'fewjfnew',
            last_name: 'Dofewfwefwefe',
            email: 'john.do12312312e@example.com',
            phone_number: '76548392324',
            username: 'johndoe123123',
            password: 'password'
        };
        const response = await request(app)
            .post('/signUp')
            .send(userData);
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('message', 'Пользователь успешно зарегистрирован.');
    });

    it('should return 400 status if user already exists', async () => {
        const existingUser = {
            first_name: 'Jane',
            last_name: 'Doe',
            email: 'jane.doe@example.com',
            phone_number: '9876543210',
            username: 'janedoe',
            password: 'password'
        };
        await request(app)
            .post('/signUp')
            .send(existingUser); // Registering an existing user
        const response = await request(app)
            .post('/signUp')
            .send(existingUser); // Trying to register the same user again
        expect(response.statusCode).toBe(400);
    });

    it('should return 500 status on error', async () => {
        const response = await request(app)
            .post('/signUp')
            .send({}); // Sending empty data to intentionally trigger an error
        expect(response.statusCode).toBe(500);
    });
});

// Тесты для эндпоинта POST /login
describe('POST /login', () => {
    it('should log in a user successfully', async () => {
        const userData = {
            username: 'johndoe',
            password: 'password'
        };
        const response = await request(app)
            .post('/login')
            .send(userData);
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('message', 'Вход выполнен успешно.');
        expect(response.body).toHaveProperty('token');
        // Добавьте другие ожидаемые свойства в ответе, если есть
    });

    it('should return 401 status if credentials are incorrect', async () => {
        const invalidUserData = {
            username: 'nonexistentuser',
            password: 'invalidpassword'
        };
        const response = await request(app)
            .post('/login')
            .send(invalidUserData);
        expect(response.statusCode).toBe(401);
        expect(response.body).toHaveProperty('message', 'Неверное имя пользователя или пароль.');
    });
    // Другие тесты для случаев ошибок и т. д.
});

// Тесты для эндпоинта GET /getUserProfile
describe('GET /getUserProfile', () => {
    it('should return user profile successfully', async () => {
        // Здесь можно добавить код для создания пользователя и получения его токена для аутентификации
        token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlJ1YnlsbGllejEyMzQiLCJ1c2VySWQiOiI2NWUzYTc0NDhhMzMwYmY4N2JiZWYzMGQiLCJpYXQiOjE3MDk0NTAzNjcsImV4cCI6MTcwOTQ1Mzk2N30.Sei3670l8mJd0EMiY7AlLNLDUnqA8qIsA_FadKI9Wqg"
        const response = await request(app)
            .get('/getUserProfile')
            .set('Authorization', `Bearer ${token}`); // Подставьте здесь действующий JWT токен
        expect(response.statusCode).toBe(200);
        // Добавьте ожидаемые свойства пользователя в ответе, если есть
    });
    // Другие тесты для случаев ошибок и т. д.
});

// Тесты для эндпоинта PUT /updateUserData
describe('PUT /updateUserData', () => {
    it('should update user data successfully', async () => {
        token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlJ1YnlsbGllejEyMzQiLCJ1c2VySWQiOiI2NWUzYTc0NDhhMzMwYmY4N2JiZWYzMGQiLCJpYXQiOjE3MDk0NTAzNjcsImV4cCI6MTcwOTQ1Mzk2N30.Sei3670l8mJd0EMiY7AlLNLDUnqA8qIsA_FadKI9Wqg"
        // Здесь можно добавить код для создания пользователя и получения его токена для аутентификации
        const updatedUserData = {
            email: 'newemail@example.com'
        };
        const response = await request(app)
            .put('/updateUserData')
            .set('Authorization', `Bearer ${token}`) // Подставьте здесь действующий JWT токен
            .send(updatedUserData);
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('message', 'Данные пользователя успешно обновлены.');
    });
    // Другие тесты для случаев ошибок и т. д.
});

// Тесты для эндпоинта POST /pay
describe('POST /pay', () => {
    it('should process payment successfully', async () => {
        token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlJ1YnlsbGllejEyMzQiLCJ1c2VySWQiOiI2NWUzYTc0NDhhMzMwYmY4N2JiZWYzMGQiLCJpYXQiOjE3MDk0NTAzNjcsImV4cCI6MTcwOTQ1Mzk2N30.Sei3670l8mJd0EMiY7AlLNLDUnqA8qIsA_FadKI9Wqg"
        // Здесь можно добавить код для создания тестовых данных о корзине и пользователя
        const paymentData = {
            cartItems: ["Cheesy Pizza"],
            totalPrice: 100 // Подставьте сюда тестовые данные о товарах и общей сумме
        };
        const response = await request(app)
            .post('/pay')
            .set('Authorization', `Bearer ${token}`) // Подставьте здесь действующий JWT токен
            .send(paymentData);
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('message', 'Payment successful!');
        // Добавьте другие ожидаемые свойства в ответе, если есть
    });
    // Другие тесты для случаев ошибок и т. д.
});

// Тесты для эндпоинта GET /orderHistory
describe('GET /orderHistory', () => {
    it('should return user order history successfully', async () => {
        token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlJ1YnlsbGllejEyMzQiLCJ1c2VySWQiOiI2NWUzYTc0NDhhMzMwYmY4N2JiZWYzMGQiLCJpYXQiOjE3MDk0NTAzNjcsImV4cCI6MTcwOTQ1Mzk2N30.Sei3670l8mJd0EMiY7AlLNLDUnqA8qIsA_FadKI9Wqg"
        // Здесь можно добавить код для создания пользователя и получения его токена для аутентификации
        const response = await request(app)
            .get('/orderHistory')
            .set('Authorization', `Bearer ${token}`); // Подставьте здесь действующий JWT токен
        expect(response.statusCode).toBe(200);
        // Добавьте ожидаемые свойства заказов в ответе, если есть
    });
    // Другие тесты для случаев ошибок и т. д.
});
