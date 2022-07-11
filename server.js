const express = require('express');
const cors = require('cors');
const app = express();

let corsOptions = {
    origin: 'http://localhost:8081'
}

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// 간단한 경로
app.get("/", (req, res) => {
    res.json({message: "연결 성공"})
})

require("./app/routes/product.routes")(app);

// 포트를 정하고 리슨에 요청
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`${PORT}에서 서버시작`);
});