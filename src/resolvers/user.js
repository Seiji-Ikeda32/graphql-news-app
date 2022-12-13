function article(parent, args, context) {
    return context.prisma.article.findUnique({
        where: { id: parent.id },
   })
   .article();
}

export default {
    article,
};