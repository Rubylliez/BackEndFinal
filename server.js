const express = require('express');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());
// Подключение к MongoDB
const uri = "mongodb+srv://owner:A0920051959@cluster0.3haama1.mongodb.net/<form_for_contact>?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function connectDB() {
    try {
        await client.connect();
        console.log('Connected to the database');
    } catch (error) {
        console.error('Error connecting to the database:', error);
        process.exit(1);
    }
}

connectDB();

// Выбор базы данных и коллекций
const db = client.db(process.env.DB_NAME);
const usersCollection = db.collection('users');
const ordersCollection = db.collection('orders');


// Промежуточное ПО для обработки JSON-данных
app.use(bodyParser.json());

// Эндпоинт для обработки формы (POST-запрос)
app.post('/getForm', async (req, res) => {
    try {
        const { first_name, last_name, email } = req.body;
        await db.collection('formData').insertOne({ first_name, last_name, email });
        res.status(200).json({ message: 'Данные успешно сохранены в базе данных.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Произошла ошибка при сохранении данных.' });
    }
});

// Эндпоинт для регистрации нового пользователя (signUp)
app.post('/signUp', async (req, res) => {
    try {
        const { first_name, last_name, email, phone_number, username, password } = req.body;
  
        const existingUser = await usersCollection.findOne({ username });
  
        if (existingUser) {
            return res.status(400).json({ message: 'Пользователь с таким именем уже существует.' });
        }
  
        // Хеширование пароля перед сохранением в базе данных
        const hashedPassword = await bcrypt.hash(password, 10);
  
        // Сохранение нового пользователя в базе данных
        await usersCollection.insertOne({ first_name, last_name, email, phone_number, username, password: hashedPassword });

        res.status(200).json({ message: 'Пользователь успешно зарегистрирован.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Произошла ошибка при регистрации пользователя.' });
    }
});

// Эндпоинт для входа пользователя (login)
app.post('/login', async (req, res) => {
  try {
      const { username, password } = req.body;
      const user = await usersCollection.findOne({ username });

      if (!user) {
          return res.status(401).json({ message: 'Неверное имя пользователя или пароль.' });
      }

      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
          return res.status(401).json({ message: 'Неверное имя пользователя или пароль.' });
      }

      const token = jwt.sign({ username: user.username, userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.status(200).json({ message: 'Вход выполнен успешно.', token, bonuses: user.bonuses });

  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Произошла ошибка при входе.' });
  }
});

// Промежуточное ПО для проверки JWT токена
app.use((req, res, next) => {
  try {
      const token = req.headers.authorization.split(' ')[1];
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      req.userData = { username: decodedToken.username, userId: decodedToken.userId };
      next();
  } catch (error) {
      return res.status(401).json({ message: 'Ошибка аутентификации.' });
  }
});

// Эндпоинт для получения данных о пользователе
app.get('/getUserProfile', async (req, res) => {
    try {
        const username = req.userData.username; // Получаем имя пользователя из JWT токена
        const user = await usersCollection.findOne({ username });

        if (!user) {
            return res.status(404).json({ message: 'Пользователь не найден' });
        }

        // Отправляем данные о пользователе клиенту
        res.status(200).json({
            firstName: user.first_name,
            lastName: user.last_name,
            email: user.email,
            phoneNumber: user.phone_number,
            username: user.username
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Произошла ошибка при получении данных о пользователе' });
    }
});

// Эндпоинт для обновления данных пользователя
app.put('/updateUserData', async (req, res) => {
    try {
        const userId = req.userData.userId; // Получаем идентификатор пользователя из JWT токена
        const { email, password } = req.body; // Получаем новые данные из запроса
        console.log('UserID из JWT токена:', req.userData.userId);
        console.log("Я получил данные")
    
        // Проверяем, чтобы хотя бы одно поле было заполнено
        if (!email && !password) {
            return res.status(400).json({ message: 'Необходимо указать хотя бы одно поле для обновления.' });
        }
        console.log("Провел проверку на поля")
    
        // Обновляем данные пользователя в базе данных
        const updateFields = {};
        if (email) {
            updateFields.email = email;
        }
        console.log("Добавь email")
        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            updateFields.password = hashedPassword;
        }
        console.log("Добавил email")
        console.log("Теперь изменил данные")
    
        // Логи для отладки
        console.log("userId:", userId);
        console.log("updateFields:", updateFields);
    
        // Выполняем обновление данных пользователя
        const objectId = new ObjectId(userId);
        console.log("ObjectId создан");
    
        const result = await usersCollection.updateOne({ _id: new ObjectId(userId) }, { $set: updateFields });
        console.log('Результат обновления:', result);
        console.log("Выполняю обновление")
    
        res.status(200).json({ message: 'Данные пользователя успешно обновлены.' });
        console.log("Все круто!")
    } catch (error) {
        console.error('Ошибка при обновлении данных пользователя:', error);
        res.status(500).json({ message: 'Произошла ошибка при обновлении данных пользователя.' });
    }    
});

app.post('/pay', async (req, res) => {
    console.log("Я тут")
    try {
        // Получаем данные о корзине и общей сумме заказа из тела запроса
        const { cartItems, totalPrice } = req.body;

        // Получаем JWT токен из заголовка запроса
        const token = req.headers.authorization.split(' ')[1];
        
        // Распарсим JWT токен и извлечем userId
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET); // замените 'your_secret_key' на ваш секретный ключ
        const userId = decodedToken.userId;

        // Генерируем уникальный номер заказа
        const orderId = uuidv4();

        // Возвращаем клиенту подтверждение успешной оплаты
        res.status(200).json({ message: 'Payment successful!', orderId, cartItems, totalPrice });

        // Сохраняем заказ в коллекцию MongoDB Orders
        const result = await ordersCollection.insertOne({
            orderId: orderId,
            userId: userId, // сохраняем userId в базу данных
            cartItems: cartItems,
            totalPrice: totalPrice,
            orderDate: new Date()
        });
        console.log('Order saved successfully! Order ID:', orderId);
    } catch (error) {
        console.error('Error during payment:', error);
        res.status(500).json({ message: 'Error during payment. Please try again later.' });
    }
});

app.get('/orderHistory', async (req, res) => {
    try {
        const userId = req.userData.userId; // Получаем идентификатор пользователя из JWT токена
        console.log(userId)
        console.log(new ObjectId(userId))
        // Находим все заказы пользователя по его идентификатору
        const userOrders = await ordersCollection.find({ userId: userId }).project({ cartItems: 1, totalPrice: 1, orderDate: 1 }).toArray();  
        console.log(userOrders)
        // Отправляем информацию о заказах клиенту
        res.status(200).json({ orders: userOrders });
    } catch (error) {
        console.error('Ошибка при получении истории заказов:', error);
        res.status(500).json({ message: 'Произошла ошибка при получении истории заказов пользователя.' });
    }
});

if (!module.parent) {
    app.listen(PORT, () => {
      console.log(`Сервер запущен на порту ${PORT}`);
    });
  }
  
  module.exports = app;