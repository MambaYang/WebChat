// import * as LibGenerateTestUserSig from "./lib-generate-test-usersig.min.js"

const SDKAPPID = 1400746817

/**
 * Signature expiration time, which should not be too short
 * Time unit: second
 * Default time: 7 * 24 * 60 * 60 = 604800 = 7days
 *
 * 签名过期时间，建议不要设置的过短
 * 时间单位：秒
 * 默认时间：7 x 24 x 60 x 60 = 604800 = 7 天
 */
const EXPIRETIME = 604800

const SECRETKEY =
    "3fc63c69159a1a6aaabe787b7f9d21d409d63a857f9b478bc4bc0baaa18a33ae"

const genTestUserSig = (userID) => {
    const generator = new LibGenerateTestUserSig(
        SDKAPPID,
        SECRETKEY,
        EXPIRETIME
    )
    const userSig = generator.genTestUserSig(userID)

    return {
        sdkAppID: SDKAPPID,
        userSig,
    }
}

export default genTestUserSig

export { SDKAPPID, EXPIRETIME }
