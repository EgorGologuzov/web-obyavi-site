import ads from './db/ads.json';
import users from './db/users.json';
import props from './db/props.json';
import { filterUndefinedProps, mapAdPropsFromObjToList } from '../utils/utils';

export function useAdService() {
    return fakeService;
}

export function getPrototype() {
    return { ...prototype }
}

const pageSize = 8;

let idCount = 1000;

const prototype = {
    "id": undefined,
    "owner": undefined,
    "main": {
        "header": undefined,
        "status": undefined,
        "avatar": undefined,
        "category": undefined,
        "shortDesc": undefined
    },
    "price": {
        "value": 0,
        "currency": "₽"
    },
    "adress": {
        "country": undefined,
        "state": undefined,
        "city": undefined,
        "district": undefined,
        "street": undefined,
        "house": undefined,
        "apartment": undefined,
        "comment": undefined
    },
    "meta": {
        "create": undefined,
        "change": undefined
    },
    "images": [],
    "desc": undefined,
    "properties": []
}

const fakeService = {
    getMyAds({ page, userId }) {
        const myAds = ads.filter((ad) => Number(ad.owner) === Number(userId)).reverse();
        const start = (page - 1) * pageSize;
        const end = start + pageSize;

        const result = {
            totalPages: Math.ceil(myAds.length / pageSize),
            list: myAds.slice(start, end).map((ad) => JSON.parse(JSON.stringify(ad)))
        };

        return new Promise((resolve, _) => setTimeout(() => resolve(result), 500));
    },

    publish({ idList }) {
        return new Promise((resolve, _) => {
            setTimeout(() => {
                ads.forEach((ad) => {
                    if (idList.includes(ad.id)) {
                        ad.main.status = "published";
                    }
                })
                resolve({ result: "ok" });
                console.log("Publish", idList);
            }, 500);
        })
    },

    unpublish({ idList }) {
        return new Promise((resolve, _) => {
            setTimeout(() => {
                ads.forEach((ad) => {
                    if (idList.includes(ad.id)) {
                        ad.main.status = "unpublished";
                    }
                })
                resolve({ result: "ok" });
                console.log("Unpublish", idList);
            }, 500);
        })
    },

    delete({ idList }) {
        return new Promise((resolve, _) => {
            setTimeout(() => {
                ads = ads.filter((ad) => !idList.includes(ad.id));
                resolve({ result: "ok" });
                console.log("Delete", idList);
            }, 500);
        })
    },

    getById({ id }) {
        const result = ads.find((ad) => ad.id == id);
        return new Promise((resolve, reject) => 
            setTimeout(() => result ? resolve(result) : reject(new Error("Объявление не найдено")), 500));
    },

    getByIds({idArray}){
        const result = ads.filter((ad) => idArray.includes(ad.id));
        return new Promise((resolve, _) => setTimeout(() => resolve(result), 500));
    },

    getOwner({ ownerId }) {
        const result = users.find((user) => user.id == ownerId);
        return new Promise((resolve, _) => setTimeout(() => resolve(result), 500));
    },

    getByTitle(title){
        const result = ads.filter((ad)=>ad.main.header.includes(title.newValue))
        console.log(result);
        return new Promise((resolve, _) => setTimeout(() => resolve(result), 500));
    },

    getAds({page}){
        const start = (page - 1) * pageSize;
        const end = start + pageSize;

        const result = {
            totalPages: Math.ceil(ads.length / pageSize),
            list: ads.slice(start, end).map((ad) => JSON.parse(JSON.stringify(ad)))
        };

        return new Promise((resolve, _) => setTimeout(() => resolve(result), 500));
    },
  
    getAllProps({ categoryStr }) {
        const categoryList = categoryStr ? categoryStr.split(">") : [];
        const allProps = []
        categoryList.forEach((cat, _) => {
            let propsForCat = props[cat]
            if (propsForCat) {
                propsForCat = propsForCat.map((prop) => { return { ...prop } });
                allProps.push(...propsForCat);
            }
        })
        
        return new Promise((resolve, _) => setTimeout(() => resolve(allProps), 500));
    },

    async update({ updateData }) {
        updateData = { ...updateData };

        const allPropsList = await this.getAllProps({ categoryStr: updateData.main.category });
        updateData.properties = mapAdPropsFromObjToList({ objProp: updateData.properties, allPropsList });
        updateData.properties = filterUndefinedProps({ propsList: updateData.properties });

        const old = ads.find((ad) => ad.id == updateData.id);
        const updatedAd = { ...old, ...updateData }
        const index = ads.indexOf(old);
        ads[index] = updatedAd;

        await new Promise((resolve, _) => setTimeout(resolve, 500));

        return updatedAd;
    },

    async create({ createData }) {
        const createdAd = { ...createData };

        const allPropsList = await this.getAllProps({ categoryStr: createdAd.main.category });
        let properties = mapAdPropsFromObjToList({ objProp: createdAd.properties, allPropsList });
        properties = filterUndefinedProps({ propsList: properties });
        createdAd.properties = properties;
        

        createdAd.id = ++idCount;
        ads.push(createdAd);

        console.log(createdAd.properties);

        await new Promise((resolve, _) => setTimeout(resolve, 500));

        return createdAd;
    }
}