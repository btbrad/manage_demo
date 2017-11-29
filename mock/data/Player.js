import Mock from 'mockjs'

let PlayerList = [];
for(let i =1;i<=100;i++){
    PlayerList.push(Mock.mock({
        // id:Mock.Random.integer(20171128,20179999),
        id:10000+Mock.Random.increment(),
        username:Mock.Random.cname(),
        sex:Mock.Random.string( '男女', 1 ),
        password:Mock.Random.string(6,11)
    }))
}

export {PlayerList}
