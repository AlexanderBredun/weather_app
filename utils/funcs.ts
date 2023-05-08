
export function getPosition(options?: PositionOptions): Promise<any> {
    return new Promise((resolve, reject) => {
        return window.navigator.geolocation.getCurrentPosition(resolve, reject, {...options, maximumAge:0, enableHighAccuracy: true})
    });
}

export const useLocalStorage = (name: string, value?: any, rewrite?: boolean): any => {
    
    if (!value) {
        try {
            JSON.parse(localStorage.getItem(name)!);
        } catch (e) {
            return false;
        }
        return JSON.parse(localStorage.getItem(name)!)
    }
    if(rewrite){
        localStorage.setItem(name, JSON.stringify([value]));
        return;
    }
    if(JSON.parse(localStorage.getItem(name)!)){
        const valueExisted = JSON.parse(localStorage.getItem(name)!);
        valueExisted.push(value)
        localStorage.setItem(name, JSON.stringify(valueExisted))
    }
    else{
        localStorage.setItem(name, JSON.stringify([value]))
    }
  
}