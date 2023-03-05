import { AuthPayload, Context, Credentials } from "../../types"
import validator from "validator"
import bcrypt from "bcryptjs"
import JWT from "jsonwebtoken"

const authResolvers = {
	signUp: async (
		_: any,
		{ email, password }: Credentials,
		{ prisma }: Context
	): Promise<AuthPayload> => {
		const isEmail = validator.isEmail(email)

		if (!isEmail) {
			return { userErrors: [{ message: "Invalid Email" }], token: null }
		}

		if (password.length < 8) {
			return {
				userErrors: [
					{ message: "Password must be at least 8 characters" },
				],
				token: null,
			}
		}

		const hashedPass = await bcrypt.hash(password, 10)

		const user = await prisma.user.create({
			data: { email, password: hashedPass },
		})

		const token = await JWT.sign(
			{
				userId: user.id,
			},
			"PLACEMENT_SIGNATURE",
			{ expiresIn: 3600 }
		)

		return { userErrors: [], token: token }
	},
}

export default authResolvers
