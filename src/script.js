import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    const newArticle = await prisma.article.create({
        data: {
            url: "hoge",
            title: 'The Awakening',
            author: 'Kate Chopin',
        }
    })
    const allArticles = await prisma.article.findMany();
    console.log(allArticles)
}

main()
    .catch((e) => {
        throw e;
    })
    .finally(async () => {
        prisma.$disconnect;
    });