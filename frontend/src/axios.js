import axios from 'axios'

export default axios.create({
  headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` }
})
