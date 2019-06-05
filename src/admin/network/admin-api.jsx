export default class AdminApi {
    static checkLogin() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve({
                    isLogin: true,
                    userInfo: {
                        name: 'Nguyen Tran Hau',
                        email: 'test@dev.com',
                        password: 'somerandompassword'
                    }
                })
            }, 1000)
        })
    }
}