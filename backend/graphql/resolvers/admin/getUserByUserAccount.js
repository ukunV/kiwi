/**
 * 유저 정보 Read by userAccount
 * @author 이건욱
 * @returns {User}
 * @params (userAccount: String!)
 * type User {
        id: ID!
        userAccount: String!
        userName: String!
        studentNumber: String!
        studentGradeId: ID!
        grade: String
        email: String
        departmentId: ID!
        department: String
        status: Int
        type: Int
    }
* getUserByUserAccount(userAccount: String!): User!
 */

const models = require('../../../models');
const { NotFoundError } = require('../../errors/errors');
const isAdmin = require('../../middlewares/isAdmin');

module.exports = async ({ userAccount }, { id: userId }) => {
    await isAdmin(userId);
    const user = await models.user.findOne({
        attributes: [
            'id',
            'userAccount',
            'userName',
            'studentNumber',
            'studentGradeId',
            'email',
            'departmentId',
            'type',
            'status',
        ],
        include: [
            {
                model: models.department,
                attributes: [['deptName', 'department']],
            },
            {
                model: models.grade,
                attributes: [['gradeName', 'grade']],
            },
        ],
        where: { userAccount },
        raw: true,
    });
    if (!user) {
        throw NotFoundError('user not exists');
    }
    return {
        id: user.id,
        userAccount: user.userAccount,
        userName: user.userName,
        email: user.email,
        studentNumber: user.studentNumber,
        studentGradeId: user.studentGradeId,
        departmentId: user.departmentId,
        type: user.type,
        department: user['department.department'],
        grade: user['grade.grade'],
    };
};
