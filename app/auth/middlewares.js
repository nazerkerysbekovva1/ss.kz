const Role = require('./Role')
const User = require('./User')

// const isAuth = (req, res, next) => {
//     if(req.user) next()
//     else res.status(403).send({message: "Unauthorized"})
// }

const isUser = async (req, res, next) => {
    if(req.user) {
        if (req.user.roleId === 1) { // Проверяем, что у пользователя roleId равен 1 для роли 'user'
            next();
        } else {
            res.status(403).send({ message: "Access denied" });
        }
    }
    else res.status(403).send({message: "Unauthorized"})
}

const isManager = async (req, res, next) => {
    if(req.user) {
        if (req.user.roleId === 2) { // Проверяем, что у пользователя roleId равен 2 для роли 'manager'
            next();
        } else {
            res.status(403).send({ message: "Access denied" });
        }
    }
    else res.status(403).send({message: "Unauthorized"})
}

const validateSignUp = async (req, res, next) => {
    console.log(req.body.email );
    let errors = {}

    if(!req.body.email || req.body.email.length === 0){
        errors.email = "Поле Email оюязательное"
    }
    if(!req.body.full_name || req.body.full_name.length === 0){
        errors.full_name = "Поле Имя и Фамилия оюязательное"
    }
    if(!req.body.password || req.body.password.length === 0){
        errors.password = "Поле Пароль оюязательное"
    }
    if(!req.body.password2 || req.body.password2.length === 0){
        errors.password2 = "Поле Потвердить пароль оюязательное"
    }

    if(req.body.password !== req.body.password2){
        errors.password2 = "Пароли не совпадают"
    }

    const user = await User.findOne({
        where: {
            email: req.body.email
        }
    })

    if(user){
        errors.email = "Пользователь с таким email ужу зарегистрирован"
    }

    // Если роль пользователя "user", не проверять поле company_name
    if (req.user && req.user.roleId === 1) {
        if (!req.body.company_name || req.body.company_name.length === 0) {
            errors.company_name = "Поле Имя компании обязательное";
        }
    }
    
    if(JSON.stringify(errors) !== JSON.stringify({})) res.status(400).send(errors);
    else next();
}

module.exports = {
    // isAuth,
    isUser,
    isManager,
    validateSignUp
}