import Butter from 'buttercms'

const butter = Butter('2fa7babaa7064c23b2cb90171957b2add0333e77')

export default butter

butter.post.list({page: 1, page_size: 10}).then(function(response) {
    console.log(response)
  })
