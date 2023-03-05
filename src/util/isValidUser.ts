export async function isValidUser(userId: string | undefined, prisma: any) {
	if (!userId) return false

	const user = await prisma.user.findUnique({ where: { id: userId } })

	return user ? true : false
}
