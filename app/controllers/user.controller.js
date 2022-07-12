const User = require("../models/user.model")

exports.create = (req, res) => {
    
    if (!req.body) {
        res.status(400).send({
            message: "내용이 비어있으면 안됨~"
        })
    }

    const user = new User({
        userid: req.body.userid,
        username: req.body.username,
        userpassword: req.body.userpassword,
        useremail: req.body.useremail
    });

    User.create(user, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "user 테이블에 넣는데 에러났음"
            });
        else res.send(data);
    })
};

exports.find = (req, res) => {
    User.find(req.params.id, req.params.password, (err, data) => {
        if(err) {
            if(err.kind === "not_found") {
                res.status(404).send({
                    message: `id가 포함된 product를 찾을 수 없음 ${req.params.id}, ${req.params.password}`
                })
            } else {
                    res.status(500).send({
                        message: "id, password" + req.params.id + req.params.password
                    })
            }
        } else res.send(data)
    })
}