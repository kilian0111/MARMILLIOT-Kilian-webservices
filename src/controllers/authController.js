import authService from '#src/services/authService'
import usersService from '#src/services/usersService'
import {signJwt, verifyJwt} from '#src/utils/jwtoken'

const exposeController = {

    login: async (req, res) => {
        try {
            const {body} = req
            if (!body.email || !body.password) {
                return res.status(400).json({error: 'email and password are required'}).send()
            }
            const user = await usersService.findOneUserByEmail(body)

            if (!user) return res.sendStatus(401)
            const comparePwd = await authService.comparePassword({
                password: body.password,
                storedPassword: user.password
            })
            const tokenPayload = {
                id: user._id,
                lastName: user.lastName,
                firstName: user.firstName,
                email: user.email
            }
            if (comparePwd) {
                const token = signJwt({payload: tokenPayload, expiresIn: '1d'})
                const refreshToken = signJwt({payload: tokenPayload, expiresIn: '7d'})
                const accessToken = {access_token: token, token_type: 'Bearer'}
                const updateRefresh = await usersService.updateUserToken({userId: user._id, refreshToken})
                return res.cookie('refreshToken', refreshToken, {httpOnly: true, sameSite: 'strict'}).json(accessToken)
            }
            return res.sendStatus(401)
        } catch (error) {
            return res.sendStatus(500)
        }
    },
    refreshToken: async (req, res) => {
        const {cookies} = req
        if (!cookies?.refreshToken) return res.sendStatus(401)
        const refreshToken = cookies.refreshToken
        res.clearCookie('refreshToken', {httpOnly: true, sameSite: 'None', secure: true})
        // is refreshToken still valid on our side?

        const foundUser = await usersService.findUserByRefreshToken({refreshToken})
        if (!foundUser) return res.sendStatus(403)
        try {
            const decoded = verifyJwt(refreshToken)
            const tokenPayload = {
                id: foundUser._id,
                lastName: foundUser.lastName,
                firstName: foundUser.firstName,
                email: foundUser.email

            }
            if (decoded.email !== foundUser.email) return res.sendStatus(403)
            const accessToken = signJwt({payload: tokenPayload, expiresIn: '1d'})
            return res.json({accessToken, token_type: 'Bearer'})
        } catch (error) {
            console.log(error)
            return res.sendStatus(401); // expired refresh token
        }
    }


}

export default exposeController
