function postedBy(parent, args, context) {
    return context.prisma.article.findUnique({
        where: { id: parent.id },
    })
    .postedBy();
}

export default {
    postedBy,
};