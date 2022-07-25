const Product = require("../models/product.model");

// 상품 넣기
exports.create = (req, res) => {
    
    if (!req.body) {
        res.status(400).send({
            message: "내용이 비어있으면 안됨~"
        })
    }

    const product = new Product({
        productname: req.body.productname,
        productdes: req.body.productdes,
        productimg: req.body.productimg,
        productprice: req.body.productprice
    });

    Product.create(product, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "product 테이블에 넣는데 에러났음"
            });
        else res.send(data);
    })
};

// 상품 다 보여주기
exports.findAll = (req, res) => {
    const productname = req.query.productname;
    Product.getAll(productname, (err, data) => {
        if(err)
            res.status(500).send({
                message:
                    err.message || "product 검색에 에러났음"
            });
        else res.send(data);
    });
};

// 조건을 포함해서 검색
exports.findOne = (req, res) => {
    Product.findById(req.params.id, (err, data) => {
        if(err) {
            if(err.kind === "not_found") {
                res.status(404).send({
                    message: `id가 포함된 product를 찾을 수 없음 ${req.params.id}`
                });
            } else {
                res.status(500).send({
                    message: "id 에러" + req.params.id
                })
            }
        } else res.send(data);
    })
}

// 경로 잘못되었을 때 대비 업데이트
exports.update = (req, res) => {
    // 요청 확인
    if (!req.body) {
        res.status(400).send({
            message: "내용이 비어있으면 안됩니다."
        })
    }
    console.log(req.body);
    Product.updateById(
        req.params.id,
        new Product(req.body),
        (err, data) => {
            if (err) {
                if(err.kind === "not_found"){
                    res.status(404).send({
                        message: `id가 포함된 product를 찾을 수 없음 ${req.params.id}`
                    })
                } else {
                    res.status(500).send({
                        message: "id update 에러" + req.params.id
                    })
                }
            } else res.send(data);
        }
    )
}

// 상품 구매 시 상품 개수 업데이트
exports.buy = (req, res) => {
    if(!req.body) {
        res.status(400).send({
            message: "내용이 비어있습니다"
        })
    }
    console.log(req.body)
    Product.buy(
        new Product(req.body),
        (err, data) => {
        if(err) {
            if(err.kind === "not_found") {
                res.status(404).send({
                    message: "값을 찾을 수 없습니다."
                })
            } else {
                res.status(500).send({
                    message: "update 에러"
                })
            }
        } else res.send(data);
      }
    )
}

// 지우기
exports.delete = (req, res) => {
    Product.remove(req.params.id, (err, data) => {
        if(err) {
            if(err.kind === "not_found") {
                res.status(404).send({
                    message: `id가 포함된 product를 찾을 수 없음 ${req.params.id}`
                })
            } else {
                res.status(500).send({
                    message: "id delete 에러" + req.params.id
                })
            }
        } else res.send({ message: `성공적으로 삭제했습니다.`})
    })
}

