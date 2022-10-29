const FULFILLED ="fulfilled";
const PENDING = "pending";
const REJECTED="rejected";



class  MyPromise {
    constructor(executor) {
    this.state = PENDING;
    this.result = undefined;
    this.onFulfilledFn=[];
    this.onRejectedFn=[];

    const resolve=(value)=>{
        if (this.state===PENDING){
            this.state=FULFILLED;
            this.result=value;
            this.onFulfilledFn.forEach((fn)=>fn(value));
        }

    };

    const reject = (error)=>{
        if (this.state===PENDING){
            this.state=REJECTED;
            this.result=error;
            this.onRejectedFn.forEach((fn)=>fn(error))
        }
    }
    try {
        executor(resolve,reject)
        } catch (error){
        reject(error);
        }
    }
    then(onFulfilled,onRejected){
        return new MyPromise((resolve,reject)=>{
            if(this.state===PENDING){
                if(onFulfilled){
                    this.onFulfilledFn.push(()=>{
                        try{
                            const newResult = onFulfilled(this.result);
                            if(newResult instanceof MyPromise){
                                newResult.then(resolve,reject);
                            } else {
                                resolve(newResult)
                            }
                        } catch (error){
                            reject(error)
                        }

                    });
                }
                if(onRejected){
                    this.onRejectedFn.push(()=>{
                        try{
                            const newResult = onRejected(this.result);
                            if(newResult instanceof MyPromise){
                                newResult.then(resolve,reject);
                            } else {
                                resolve(newResult)
                            }
                        } catch (error){
                            reject(error)
                        }
                    });
                }
                return;
            }
            if(onFulfilled && this.state===FULFILLED){
                    try{
                        const newResult = onFulfilled(this.result);
                        if(newResult instanceof MyPromise){
                            newResult.then(resolve,reject);
                        } else {
                            resolve(newResult)
                        }

                    } catch (error){
                        reject(error)
                    }
                return;
            }
            if(onFulfilled && this.state===REJECTED){
                try{
                    const newResult = onFulfilled(this.result);
                    if(newResult instanceof MyPromise){
                        newResult.then(resolve,reject);
                    } else {
                        resolve(newResult)
                    }
                } catch (error){
                    reject(error)
                }
                return;
            }
        }
        )}

    catch(onRejected){
        return this.then(null,onRejected);
    }
}


//1. Конструтор на вход которого прерходит executor в свойствах которого две функции для успеха и ошибки которые можно выполнить и изменить состояние
/*const promise = new MyPromise((resolve,reject)=>{
     resolve("success");
 });

console.log(promise)*/

//2. Использовать для отложеного кода
/*
const promise = new MyPromise((resolve,reject)=>{
    setTimeout(()=> reject('success'),1000);
});
console.log(promise);
setTimeout(()=>console.log(promise),1001);
*/


//3.Resolve, Reject можно вызать только один раз
/*
const promise = new MyPromise((resolve,reject)=>{
    setTimeout(()=> reject('error'),100);
    setTimeout(()=>resolve("success"),200);
      resolve("success")
  })
  setTimeout(()=>{
      console.log(promise)
  },400);
*/
//4. Чтобы перехватить значение используется метод then
/*const promise = new MyPromise((resolve,reject)=>{
setTimeout(()=>resolve("success"),2000)
}).then((value)=>{
    console.log(value)
});
*/

//5. Чтобы перехваитить ошибку также можно использовать метод then
/*
const promise = new MyPromise((resolve,reject)=>{
    setTimeout(()=>reject(new Error("OHIBKA")),1000);
}).then((value)=>{
    console.log(value)
}, (error)=>{
    console.log(2,error)
});
*/
//6. Чтобы перехватить ошибку можно использовать метод catch
/*const promise = new MyPromise((resolve,reject)=>{
    setTimeout(()=> reject(new Error("OHIBKA")),1000);
}).catch((error)=>{
    console.log(error)
});*/

//7 . Можно вызывать then сколько угодно раз на одном и том же промисе и получить один и то же результат
/*const promise = new MyPromise((resolve,reject)=>{
    setTimeout(()=> resolve("success"),1000);
});
promise.then((value)=> console.log(value));
promise.then((value)=> console.log(value));
promise.then((value)=> console.log(value));
promise.then((value)=> console.log(value));*/

//8. Еси вызывть then когда уже состояние было установлено, все равно получим значение.
/*
const promise = new MyPromise((resolve,reject)=>{
    setTimeout(()=>resolve("success"),1000);
})
setTimeout(()=>{
    promise.then((value)=>console.log(value));
    promise.then((value)=>console.log(value));
    promise.then((value)=>console.log(value));
    promise.then((value)=>console.log(value));
},2000)
*/
//9. Можно мспользовать цепочки промисов
/*
const  promise = new MyPromise((resolve,reject)=>{
    setTimeout(()=> resolve("success"),1000);
}).then((value)=>{
    return value + " first then";
}).then((value)=>{
    return value + " second then";
}).then((value)=>{
   console.log(value)
});
*/
//10. Можно возвращать в then новыйпромис и в then мы получим пезультат успеха
/*const promise = new MyPromise((resolve,reject)=>{
    resolve("success");
}).then((value)=>{
    console.log(value);
    return new MyPromise((resolve,reject)=>{
        setTimeout(()=> resolve(value+ " new promise"),2000)
        console.log(value);
    });
}).then((value)=>{
    console.log(11,value)
})*/
let name="maria";

const sayname = ()=>{
    console.log(name);
}

setTimeout(()=>{
    let name = "Cock";
    sayname();
},1000)