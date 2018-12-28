import mongoose from 'mongoose';
var Schema = mongoose.Schema;

// 标题、作者、摘要、正文、添加时间、最后修改时间、点赞数、踩数、评论、收藏、感谢
export default new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    abstract: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    articleBody: {
        type: String,
        required: true
    },
    createDate: {
        type: Date,
        default: Date.now
    },
    lastUpdateDate: {
        type: Date,
        default: Date.now
    },
    praise: {
        type: Number,
        default: 0
    },
    notPraise: {
        type: Number,
        default: 0
    }
});