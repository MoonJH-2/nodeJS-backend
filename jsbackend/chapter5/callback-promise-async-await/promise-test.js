const DB = [];
function saveDB(user) {
    const oldDBSize = DB.length;
    DB.push(user);
    console.log(`save ${user.name} to DB`);
    return new Promise((resolve, reject) => { // 콜백 대신 Promise 객체 반환
        if (DB.length > oldDBSize) {
            resolve(user); // 성공 시 유저 정보 반환
        } else {
            reject(new Error("Save DB Error!")); // 실패 시 에러 발생
        }
    });
}

function sendEmail(user) {
    console.log(`email to ${user.name}`);
    return new Promise((resolve) => { // Promise 객체를 반환. 실패 처리 없음
        resolve(user);
    });
}

function getResult(user) {
    return new Promise((resolve, reject) => { // Promise 객체 반환
        resolve(`success register ${user.name}`); // 성공 시 성공 메시지와 유저명 반환
    });
}

function registerByPromise(user) {
    // 비동기 호출이지만, 순서를 지켜서 실행
    const result = saveDB(user)
        .then(sendEmail)
        .then(getResult)
        .catch(error => new Error(error))

        // 성공, 실패 여부에 관계없이 실행. 자원 회수 관련된 코드를 finally()에 넣어두면 편리함.
        .finally(() => console.log("완료!"));

    console.log(result);
    return result;
}

const myUser = { email: "moon@test.com", password: "1234", name: "moon" };

// 동시에 여러 Promise 객체 호출하고 싶다면,
//const result = registerByPromise(myUser);
//result.then(console.log); // 결과값이 Promise이므로 then() 메서드에 함수를 넣어서 결괏값을 볼 수 있음

allResult = Promise.all([saveDB(myUser), sendEmail(myUser), getResult(myUser)]);
allResult.then(console.log);




// ----------then() 함수 사용법----------
// then(onFulfilled)
// then(onFulfilled, onRejected)

// then(
//     (value) => { /* fulfillment handler */ },
//     (reason) => { /* rejection handler */ }
// )
// -----------------------------------