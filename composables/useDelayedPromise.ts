

export async function useDelayedPromise(
    fn: any,
    delay: number
): Promise<any> {
    await new Promise(function (resolve) {
        setTimeout(resolve, delay)
    })
    const resolvedPromises = await fn()
    
    return resolvedPromises
}