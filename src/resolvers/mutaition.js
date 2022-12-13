import { bcrypt } from 'bcryptjs'
import { jwt } from 'jsonwebtoken'

const APP_SECRET = require("../utils")

async function signup(parent, args, context) {
    const password = await bcrypt.hash(args.password, 10);

    const user = await context.prisma.user.create({
        data: {
            ...args,
            password,
        },
    });

    const token = jwt.sign({ userId: user.id }, APP_SECRET);

    return {
        token,
        user,
    };
}

async function login(parent, args, context) {
    const user = await context.prisma.user.findUnique({
        where: { email: args.email },
    });
    if(!user) {
        throw new Error("ユーザー情報が存在しません");
    }

    const valid = await bcrypt.compare(args.password, user.password);
    if (!valid) {
        throw new Error("無効なパスワードです。");
    }

    const token = jwt.sign({ userId: user.id }, APP_SECRET);

    return {
        token,
        user,
    };
}

async function post(parent, args, context) {
    const { userId } = context;
    const newArticle = await context.prisma.article.create({
        data: {
            url: args.url,
            title: args.title,
            author: args.author,
            postedBy: { connect: { id: userId }},
        }
    });
    return newArticle
}

export default {
    signup,
    login,
    post,
};