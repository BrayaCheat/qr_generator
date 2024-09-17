export const validateUrl = (url: string): boolean => {
    if(!url){
        return false
    }
    const regexp = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/\S*)?$/;
    return regexp.test(url)
}