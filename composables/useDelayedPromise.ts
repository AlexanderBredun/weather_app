import { FunctionArgs } from '@vueuse/core'

export async function useDelayedPromise<T extends FunctionArgs>(
    fn: T,
    delay: number
): Promise<ReturnType<T>> {
    await new Promise(function (resolve) {
        setTimeout(resolve, delay)
    })
    const resolvedPromises = await fn()
    
    return resolvedPromises as ReturnType<T>
}