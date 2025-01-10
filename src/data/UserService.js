import { cleanPhone } from "../utils/utils";
import users from "./db/users.json"

export function useUserService() {
    return fakeService;
}

const fakeAccounts = users;

const fakeRecovaryRequests = {}

const fakeService = {
    signIn({ login }) {
        login = cleanPhone(login);

        return new Promise((resolve, reject) => {
            const user = fakeAccounts.find((account) => account.phone === login);
            setTimeout(() => {
                if (!user) {
                    reject(new Error("Неверный логин или пароль"));
                    return;
                }

                resolve(user);
                console.log("Авторизация", user);

            }, 500);
        })
    },

    signOut() {
        return;
    },

    reg(data) {
        const user = {
            ...data,
            id: Math.round(Math.random() * 100_000_000_000),
            role: "client",
            theme: "light",
            phone: cleanPhone(data.phone),
            location: undefined,
            regDate: Date().toString(),
            birthDate: undefined,
            description: undefined,
            rating: 0,
            favoriteAds: []
        }

        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const findUser = fakeAccounts.find((element) => element.phone === user.phone);

                if (findUser) {
                    reject(new Error("Аккаунт с этим номером уже существует"));
                    return;
                } 

                fakeAccounts.push(user);
                resolve(user);
                console.log("Регистрация", user);

            }, 500);
        })
    },

    sendRecoveryRequest({ phone }) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const findUser = fakeAccounts.find((element) => element.phone === cleanPhone(phone));

                if (!findUser) {
                    reject(new Error("Аккаунт с этим номером не найден"));
                    return;
                } 

                const newRecoveryRequest = {
                    phone: cleanPhone(findUser.phone),
                    recoveryCode: Math.round(Math.random() * 100_000_000_000)
                }

                fakeRecovaryRequests[cleanPhone(phone)] = (newRecoveryRequest);

                resolve({ email: findUser.email });

                alert("Код восстановления: " + newRecoveryRequest.recoveryCode);

            }, 500);
        })
    },

    finishRecovery({ phone, recoveryCode }) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const findRequest = fakeRecovaryRequests[cleanPhone(phone)];

                if (!findRequest) {
                    reject(new Error("На этот номер не поступало запросов восстановления"));
                    return;
                }

                if (findRequest.recoveryCode.toString() !== recoveryCode.toString()) {
                    reject(new Error("Код не совпадает"));
                    return;
                } 

                fakeRecovaryRequests[cleanPhone(phone)] = undefined;
                resolve({ success: true });

            }, 500);
        })
    },

    changePassword({ phone, newPassword }) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const findUser = fakeAccounts.find((element) => element.phone === cleanPhone(phone));

                if (!findUser) {
                    reject(new Error("Аккаунт с этим номером не найден"));
                    return;
                }

                resolve({ login: findUser.phone });

            }, 500);
        })
    },

    getUsers(){
        return fakeAccounts;
    },

    getUserById(id){
        return fakeAccounts.find((user)=>user.id==id);
    }
}