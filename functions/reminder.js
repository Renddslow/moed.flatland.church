const fauna = require('faunadb');

const q = fauna.query;
const client = new fauna.Client({
    secret: process.env.FAUNA_KEY || '',
    domain: 'db.fauna.com',
    scheme: 'https',
});

const handler = async (event) => {
    const { email } = JSON.parse(event.body);

    try {
        await client.query(q.Create(q.Collection('reminders'), { data: {
            email
        }}));
    } catch (e) {}

    return {
        statusCode: 200,
    }
}

exports.handler = handler;