const sendEmail = require('../utils/sendMail')
const AuthCode = require('./AuthCode')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const User = require('./User')
const Role = require('./Role')
const Company = require('./Company')

const {jwtOptions} = require('./passport')
const passport = require('passport')

const sendVerificationEmail = (req, res) => {
    // console.log(req.body);

    const code = "HH" + Date.now();

    AuthCode.create({
        email: req.body.email,
        code: code,
        valid_till: Date.now() + 120000
    })
    sendEmail(req.body.email, "Код авторизации ss.kz", code)

    res.status(200).end();
}

const verifyCode = async(req, res) => {
    console.log( );
    console.log(req.body);

    const authCode = await AuthCode.findOne({
        where: {email: req.body.email},
        order: [['valid_till', 'DESC']],
    })

    // const authCode = await AuthCode.findOne({where: {email: req.body.email}})
    if(!authCode){
        res.status(401).send({error: "code is invalid 1"});
    } else if(new Date(authCode.valid_till).getTime() < Date.now()){
        res.status(401).send({error: "code is invalid 2"});
    } else if(authCode.code !== req.body.code){
        res.status(401).send({error: "code is invalid 3"}); 
    } else {

        let user = await User.findOne({where: {email: req.body.email}})
        const role = await Role.findOne({where: {name: 'user'}});
        if(!user){
            
            user = await User.create({
                roleId: role.id,
                email: req.body.email
            })
        }


        const token = jwt.sign({ 
            id: user.id, 
            email: user.email, 
            full_name: user.full_name,
            phone: user.phone,
            role: {
                id: role.id,
                name: role.name
            },
        }, jwtOptions.secretOrKey, {
            expiresIn: 24 * 60 * 60 * 365
        });
        res.status(200).send({token});
    }

    // res.status(200).end();
}

const signUp = async (req, res) => {
    // Находим роль "user"
    let role = await Role.findOne({
        where: {
            name: 'user'
        }
    });

    let company = null;

    // Проверяем, указаны ли данные компании
    if (req.body.company_name && req.body.company_description && req.body.company_address) {
        // Если данные компании указаны, то регистрируем пользователя как менеджера
        const managerRole = await Role.findOne({
            where: {
                name: 'manager'
            }
        });

        // Создаем новую компанию
        company = await Company.create({
            name: req.body.company_name,
            description: req.body.company_description,
            address: req.body.company_address
        });

        // Устанавливаем роль менеджера
        role = managerRole;
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    await User.create({
        email: req.body.email,
        password: hashedPassword,
        full_name: req.body.full_name,
        roleId: role.id,
        companyId: company ? company.id : null // Если компания создана, устанавливаем ее ID
    });

    res.status(200).end();
}

const logIn = async (req, res) => {
    if(!req.body.email || req.body.email.length === 0 || !req.body.password || req.body.password.length === 0) {

        res.status(401).send({message: "Bad Credentials"})
    }else{
        const user = await User.findOne({
            where: {
                email: req.body.email
            }
        })

        if(!user) return res.status(401).send({message: "User with that email is not exists"})

        const isMatch = await bcrypt.compare(req.body.password, user.password)

        if(isMatch) {
            const role = await Role.findByPk(user.roleId)
            const token = jwt.sign({ 
                id: user.id, 
                email: user.email, 
                full_name: user.full_name,
                phone: user.phone,
                role: {
                    id: role.id,
                    name: role.name
                },
            }, jwtOptions.secretOrKey, {
                expiresIn: 24 * 60 * 60 * 365
            });

            res.status(200).send({token});
        } else {
            res.status(401).send({message: "Password is incorrect"})
        }
    }
}

const logout = (req, res) => {
    res.json({ message: "Logged out successfully" });
};

const getUserByEmail = async (req, res) => {
    try {
        const email = req.params.email; 
        const user = await User.findOne({ where: { email: email } });
        
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = {
    sendVerificationEmail,
    verifyCode,
    signUp,
    logIn, 
    logout,
    getUserByEmail
}

// HH1687512634708
