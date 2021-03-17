/**
 * 유저 정보 Read
 * @author 이건욱 - modified by zini
 * @returns {User}
 * type User {
        id: ID!
        userAccount: String!
        userName: String!
        studentNumber: String!
        department: String
        grade: String
        company: String
    }
* getUserById: User!
 */

const models = require('../../../models');
const { NotFoundError } = require('../../errors/errors');

module.exports = async ({}, { id }) => {
    const user = await models.user.findOne({
        attributes: ['id', 'userAccount', 'userName', 'studentNumber'],
        include: [
            {
                model: models.department,
                attributes: [['deptName', 'department']],
            },
            {
                model: models.grade,
                attributes: [['gradeName', 'grade']],
            },
            { model: models.company, attributes: [['companyName', 'company']] },
        ],
        where: { id },
        raw: true,
    });
    if (!user) {
        throw NotFoundError('user not exists');
    }
    return {
        id: user.id,
        userAccount: user.userAccount,
        userName: user.userName,
        studentNumber: user.studentNumber,
        department: user['department.department'],
        grade: user['grade.grade'],
        company: user['company.company'],
    };
};