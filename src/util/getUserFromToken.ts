import JWT from "jsonwebtoken"

export function getUserFromToken(token: string) {
	try {
		return JWT.verify(token, "PLACEMENT_SIGNATURE") as { userId: string }
	} catch (error) {
		return null
	}
}
