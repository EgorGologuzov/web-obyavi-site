import myAds from './db/my-ads.json'

export function useAdService(){
    return fakeService;
}

const fakeService={
    getAds(){
        return myAds
    },
    getAdsByTitle(title){
        return myAds.filter((item)=>item.main.header==title);
    }
}