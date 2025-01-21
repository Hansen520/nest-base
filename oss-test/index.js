/*
 * @Date: 2025-01-20 15:16:21
 * @Description: description
 */
const OSS = require('ali-oss')

const client = new OSS({
    region: 'oss-cn-beijing',
    bucket: 'han-9999',
    accessKeyId: 'LTAI5tSTLV79YuBAUGM8ENeT',
    accessKeySecret: 'OOMVHrhInwLXUEcXrXT1M1IT1ecPJc',
});

async function put() {
    try {
        const result = await client.put('cat1.jpg', './mao.jpg');
        console.log(result)
    } catch(e) {
        console.log(e)
    }
}

put();