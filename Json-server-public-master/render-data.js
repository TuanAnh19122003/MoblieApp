const faker = require('faker');
const fs = require('fs');
faker.locale = "vi";

const randomUserList = (n) => {
    if (n <= 0) return [];
    return Array.from(new Array(n)).map(() => ({
        id: faker.datatype.uuid(),
        name: `${faker.name.lastName()} ${faker.name.firstName()}`,
        email: faker.internet.email(),
        phone: faker.phone.phoneNumber(),
        address: faker.address.streetAddress(),
        avatar: faker.image.avatar(),
        password: faker.internet.password(8)
    }));
};

const randomCategoryList = (n) => {
    if (n <= 0) return [];
    return Array.from(new Array(n)).map(() => ({
        id: faker.datatype.uuid(),
        name: faker.commerce.department()
    }));
};

const randomProductList = (categories, perCategory) => {
    const productList = [];
    for (const cat of categories) {
        Array.from(new Array(perCategory)).forEach(() => {
            productList.push({
                id: faker.datatype.uuid(),
                name: faker.commerce.productName(),
                price: Number(faker.commerce.price()),
                description: faker.commerce.productDescription(),
                image: faker.image.imageUrl(400, 400),
                category_id: cat.id,
                isHot: faker.datatype.boolean()
            });
        });
    }
    return productList;
};


const randomOrderList = (users, perUser) => {
    const orders = [];
    for (const user of users) {
        Array.from(new Array(perUser)).forEach(() => {
            orders.push({
                id: faker.datatype.uuid(),
                user_id: user.id,
                createdAt: faker.date.past().toISOString(),
                status: faker.random.arrayElement(["pending", "completed", "canceled"])
            });
        });
    }
    return orders;
};

const randomOrderItemList = (orders, products, itemsPerOrder = 2) => {
    const orderItems = [];
    for (const order of orders) {
        for (let i = 0; i < itemsPerOrder; i++) {
            const product = faker.random.arrayElement(products);
            orderItems.push({
                id: faker.datatype.uuid(),
                order_id: order.id,
                product_id: product.id,
                quantity: faker.datatype.number({ min: 1, max: 5 }),
                price: product.price
            });
        }
    }
    return orderItems;
};

(() => {
    const users = randomUserList(10);
    const categories = randomCategoryList(5);
    const products = randomProductList(categories, 5);
    const orders = randomOrderList(users, 2);
    const orderItems = randomOrderItemList(orders, products);

    const db = {
        users,
        categories,
        products,
        orders,
        orderItems
    };

    fs.writeFile('./db.json', JSON.stringify(db, null, 2), () => {
        console.log('Write successfully');
    });
})();
