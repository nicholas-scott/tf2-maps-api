import { AuthPayload, Context, Credentials } from "../../types"
import validator from "validator"
import bcrypt from "bcryptjs"
import JWT from "jsonwebtoken"

function signToken(id: string) {
	return JWT.sign(
		{
			userId: id,
		},
		"PLACEMENT_SIGNATURE",
		{ expiresIn: 3600 }
	)
}

const authResolvers = {
	signIn: async (
		_: any,
		{ email, password }: Credentials,
		{ prisma }: Context
	): Promise<AuthPayload> => {
		const isEmail = validator.isEmail(email)

		const user = await prisma.user.findUnique({ where: { email: email } })

		if (!user) {
			return {
				userErrors: [{ message: "Invalid Credentials" }],
				token: null,
			}
		}

		const isMatched = await bcrypt.compare(password, user.password)

		if (!isMatched) {
			return {
				userErrors: [{ message: "Invalid Credentials" }],
				token: null,
			}
		}

		return {
			userErrors: [],
			token: signToken(user.id),
		}
	},
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

		return { userErrors: [], token: signToken(user.id) }
	},
}

export default authResolvers
