/**
 * 게시물 Read
 * @author 이건욱
 * @param (id: ID!)
 * @returns {Post}
 * type Post {
        id: ID!
        title: String!
        content: String!
        companyName: String
        gradeName: String!
        authorName: String!
        updatedAt: Date!
        likeCount: Int!
        commentCount: Int!
    }
* getPostById(id: ID!): Post!
 */

const models = require('../../../models');
const { NotFoundError } = require('../../errors/errors');

module.exports = async ({ id }, { departmentId }) => {
    const query = `
                    select p.id, p.title, p.content, uc.companyName, ug.gradeName, u.userName as authorName, p.updatedAt, cg.categoryName, ifnull(ppl.likeCount, 0) as likeCount, ifnull(pc.commentCount, 0) as commentCount
                    from post p
                        join user u on p.authorId = u.id
                        left join category cg on p.categoryId = cg.id
                        left join (select count(*) as commentCount, postId from comment c where c.isDeleted = 0 and c.postId = 1) as pc on p.id = pc.postId
                        left join (select count(*) as likeCount, postId from post_like pl where pl.isDeleted = 0) as ppl on p.id = ppl.postId
                        join (select g.gradeName from grade g join user u on u.studentGradeId = g.id) as ug
                        join (select c.companyName, c.id from company c left join user u on u.companyId = c.id) as uc
                    where u.companyId = uc.id
                    and p.id:=id
                    and p.departmentId=:departmentId
                    group by p.id;
                    `;
    return await models.sequelize
        .query(query, {
            replacements: {
                id,
                departmentId,
            },
        })
        .spread(
            (result) => JSON.parse(JSON.stringify(result[0])),
            () => NotFoundError('There is no post corresponding to the id'),
        );
};
