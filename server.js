const express = require('express');
const cors = require('cors');
const cookieSession = require("cookie-session")
const app = express();

let corsOptions = {
    origin: 'http://localhost:8081'
}


app.use(cors(corsOptions));

// session 파트
app.use(
    cookieSession({
        name: "session",
        secret: "secret-key",
        httpOnly: true
    })
)

// sequelize 연결
const db = require("./app/models");

db.sequelize.sync()

// sequelize 테이블 드랍하고 다시 만들기
// db.sequelize.sync({force: true}).then(() => {
//     console.log('Drop and Resync Db');
// });

app.use(express.json());
app.use(express.urlencoded({extended: true}));

// 간단한 경로
app.get("/", (req, res) => {
    res.json({message: "연결 성공"})
})

// routes 연결
require("./app/routes/product.routes")(app);
require("./app/routes/user.routes")(app);
require("./app/routes/auth.routes")(app);
require("./app/routes/user.sequelize.routes")(app);
require("./app/routes/orders.routes")(app);

// 포트를 정하고 리슨에 요청
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`${PORT}에서 서버시작`);
});