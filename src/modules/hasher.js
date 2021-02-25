import bcrypt from 'bcryptjs'

const apiKey = "RGAPI-cf91cb71-2632-4cf4-8006-6c516e0f3f12"
const rondas = 10

function getApiKey() {
        bcrypt.hash(apiKey, rondas, (error, apiKey) => {
            if (error) {
                console.log(error.message)
            }else {
                return apiKey
            }
        })
    return apiKey
}

export default{
    getApiKey
}