import PocketBase from 'pocketbase'

const pb_url = import.meta.env.VITE_POCKETBASE_URL
const pb = new PocketBase(pb_url)

export default pb