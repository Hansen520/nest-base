/*
 * @Date: 2025-01-20 15:33:51
 * @Description: description
 */
const OSS = require('ali-oss')

async function main() {

    const config = {
        region: 'oss-cn-beijing',
        bucket: 'han-9999',
        accessKeyId: 'LTAI5tSTLV79YuBAUGM8ENeT',
        accessKeySecret: 'OOMVHrhInwLXUEcXrXT1M1IT1ecPJc',
    }

    const client = new OSS(config);
    
    const date = new Date();
    
    date.setDate(date.getDate() + 1);
    
    const res = client.calculatePostSignature({
        expiration: date.toISOString(),
        conditions: [
            ["content-length-range", 0, 1048576000], //设置上传文件的大小限制。      
        ]
    });
    
    console.log(res);
    
    const location = await client.getBucketLocation();
    
    const host = `http://${config.bucket}.${location.location}.aliyuncs.com`;

    console.log(host);
}

main();

