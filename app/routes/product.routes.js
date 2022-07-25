module.exports = app => {
    const product = require("../controllers/product.controller.js");
    var router = require("express").Router();

    // 새로운 Product 제작
    router.post("/", product.create);

    // Product 모든 리스트
    router.get("/", product.findAll);

    // Product 원하는 값 검색
    router.get("/:id", product.findOne);

    // Product colunm 업데이트
    router.put("/:id", product.update);

    // Product 상품 개수 업데이트
    router.put("/", product.buy);

    // Product colunm 삭제
    router.delete("/:id", product.delete);

    app.use('/api/product', router);
}