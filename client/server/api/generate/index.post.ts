export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig()
    const BASE_URL = config.BASE_URL
    const {url} = await readBody(event)
    try {
        const res = await $fetch(`${BASE_URL}/generate`,
            {
                method: "POST",
                body: {
                    url: url
                }
            }
        )
        return res
    } catch (error) {
        console.log(error)
        throw new Error
    }
})