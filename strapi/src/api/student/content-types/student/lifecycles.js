const bcrypt = require('bcryptjs')

const HASH_ROUNDS = 10

const hashMobile = async (mobile) => {
  if (!mobile) {
    return mobile
  }
  return bcrypt.hash(mobile, HASH_ROUNDS)
}

module.exports = {
  async beforeCreate(event) {
    const { data } = event.params
    if (data?.mobile) {
      data.mobile = await hashMobile(data.mobile)
    }
  },

  async beforeUpdate(event) {
    const { data } = event.params
    if (data?.mobile) {
      data.mobile = await hashMobile(data.mobile)
    }
  },
}