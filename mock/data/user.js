import Mock from 'mockjs'

const Admin = [
    {
        id:Mock.Random.guid(),
        username:'GM1001',
        password:'123456',
        type:'super',
        email:'kushner@vue.com'
    },
    {
        id:Mock.Random.guid(),
        username:'GM2002',
        password:'123456',
        type:'normal',
        email:'tomholland@vue.com'
    },
    {
        id:Mock.Random.guid(),
        username:'GM3003',
        password:'123456',
        type:'normal',
        email:'tuonishidake@vue.com'
    },
];

export {
    Admin
};
