function feed(parent, args, context) {
    return context.prisma.article.findMany();
}

export default {
    feed,
};