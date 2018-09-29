var express = require('express');
var router = express.Router();
var path = require('path');
var userModel = require('../modules/User.js');

// 注册
router.post('/register', function(req, res, next) {
    /**
     *  params: statusCode
     *  1000:注册成功、1001：注册失败
     */
    userModel.find({userName: req.body.userName}, function(err, item) {
        if (err) return console.error(err);
        if (item && item.length) {
            
            // 清除session和cookie
            req.session.destroy();
            res.clearCookie('userName');
            res.clearCookie('connect.sid');

            res.json({
                statusCode: 1000,
                message: 'There are already users',
                data: {
                }
            });
        } else {
            var newUser = new userModel({
                userName: req.body.userName,
                password: req.body.password
            });
            newUser.save(function(err) {
                if(err) console.error(err);

                // 设置session
                req.session.userInfo = {
                    userName: req.body.userName,
                    password: req.body.password
                }

                // 设置cookie
                res.cookie('userName', req.body.userName);
                res.json({
                    statusCode: 1001,
                    data: {
                        userName: req.body.userName
                    }
                });
            });
        }
    });
});

// 登录
router.post('/loginin', function(req, res, next) {
    // console.log('req.url', req.url);
    // console.log('req.baseUrl', req.baseUrl);
    // console.log('body', req.body);
    // console.log('req.params', req.params);
    // console.log('req.query', req.query);
    // console.log('req.method', req.method);


    /**
     *  params: statusCode
     *  1000:登录成功、1001：未注册、1002：已注册，密码错误
     */
    userModel.find({userName: req.body.userName}, function(err, items) {
        if (err) return console.error(err);
        if (items && items.length) {
            items.forEach(function(val, index, array) {
                if (val.password == req.body.password) {

                    // 设置session
                    req.session.userInfo = {
                        userName: req.body.userName,
                        password: req.body.password
                    }

                    // 设置cookie
                    res.cookie('userName', req.body.userName);
                    res.json({
                        statusCode: 1000,
                        message: '登录成功',
                        data: {

                        }
                    });
                } else {
                                
                    // 清除session和cookie
                    req.session.destroy();
                    res.clearCookie('userName');
                    res.clearCookie('connect.sid');

                    res.json({
                        statusCode: 1002,
                        message: '密码错误',
                        data: {

                        }
                    });
                }
            });
        } else {
            
            // 清除session和cookie
            req.session.destroy();
            res.clearCookie('userName');
            res.clearCookie('connect.sid');

            res.json({
                statusCode: 1001,
                message: '登录失败，请先注册',
                data: {

                }
            });
        }
    });
    // next();
});

// 登出
router.post('/loginout', function(req, res, next) {
    console.log('req.session', req.session);

    // 清除session和cookie
    req.session.destroy();
    res.clearCookie('userName');
    res.clearCookie('connect.sid');

    /**
     *  params: statusCode
     *  1000:退出成功
     */
    res.json({
        statusCode: 1000,
        message: '退出成功',
        data: {}
    });
});

module.exports = router;