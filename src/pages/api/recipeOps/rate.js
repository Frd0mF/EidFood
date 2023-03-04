import { getSession } from "next-auth/react";

export default async function handler(req, res) {
    const { recipeId, rating } = req.body;
    //get loged in user
    const userSession = await getSession({ req });
    const user = await prisma.user.findUnique({
        where: {
            email: userSession?.user?.email
        }
    })
    if (!user) {
        return res.status(401).json({ message: 'Not authenticated' });
    }
    const recipe = await prisma.recipe.findUnique({
        where: {
            id: recipeId
        }
    })
    if (!recipe) {
        return res.status(404).json({ message: 'Recipe not found' });
    }
    const ratingExists = await prisma.rating.findUnique({
        where: {
            userId_recipeId: {
                userId: user.id,
                recipeId: recipeId
            }
        }
    })
    if (ratingExists) {
        await prisma.rating.update({
            where: {
                userId_recipeId: {
                    userId: user.id,
                    recipeId: recipeId
                }
            },
            data: {
                rating: rating
            }
        })
    } else {
        await prisma.rating.create({
            data: {
                userId: user.id,
                recipeId: recipeId,
                rating: rating
            }
        })
    }
    res.status(200).json({ message: "Recipe rated" });


}