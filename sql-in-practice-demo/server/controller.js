const db = require('./database')
const userId = 4
const clientId = 3
module.exports ={
    getUserInfo: (req, res) => {
        db.query(`
        select * from cc_clients AS c
        JOIN cc_users AS u
        ON c.user_id = u.user_id
        WHERE u.user_id = ${userId};
        `)
        .then((dbRes) => {
            res.status(200).send(dbRes[0])
        })
    }, 
    updateUserInfo:(req, res) => {
        let{firstName, lastName, phoneNumber, email, address, city, state, zipCode} = req.body
        db.query(`
            UPDATE cc_users
            SET first_name ='${firstName}',
            last_name = '${lastName}',
            email = '${email}',
             phone_number = ${phoneNumber}
            WHERE user_id = ${userId};

            update cc_clients set address = '${address}',
            city = '${city}',
            state = '${state}',
            zip_code = ${zipCode}
            WHERE user_id =${userId};
        `)
        .then((deRes) => {
            res.sendStatus(200)
        })
    },
    getUserAppt:(req, res) =>{
        db.query(`
        SELECT * FROM cc_appointments
        WHERE client_id = ${clientId}
        ORDER BY date DESC;
        `)
        .then((dbRes) => {
            res.status(200).send(dbRes[0])
        })
    },
    requestAppointment:(req, res) =>{
        let{date, service} = req.body
        db.query(`
        INSERT INTO cc_appointments (client_id, date, service_type, notes, approved, completed)
        VALUES(${clientId}, '${date}', '${service}','', false, false)
        RETURNING *;
        `)
        .then((dbRes) => {
            res.status(200).send(dbRes[0])
        })
    }
}