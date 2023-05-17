export class QueryChecker {
    
    notNull(...params: any[]) {
        let result = true;
        params.forEach((element: any) => {
            if (element == null) {
                result = false;
            }
        });
        return result;
    }

    hasInvalidString(...params: string[]) {
        let injectionRegex = new RegExp(/#|-|\/|\\|\"|\'|;/g);
        let result = true;
        params.forEach((element: string) => {
            if (injectionRegex.test(element)) {
                result = false;
            }
        });  
        return result;
    }
}
        