import redis from 'redis'

let redisClient = null

const initializeRedisClient = async () => {
    redisClient = redis.createClient({
        legacyMode: true,
        socket: {
            port: 6379,
            host: 'redis-cache',
        }
    })
    try {
        // connect to the Redis server
        await redisClient.connect();
        console.log(`🟥 Connected to Redis successfully!`);
    } catch (e) {
        console.error(`Connection to Redis failed with error:`);
        console.error(e);
    }
};

const get = async (redisKey) => {
    return new Promise(resolve => {
        redisClient.get(redisKey, (err, res) => {
            if (err) console.error(err);
            resolve(res)
        })
    })
}

const set = async (redisKey, value) => {
    return new Promise(resolve => {
        redisClient.set(redisKey, value, (err, res) => {
            if (err) console.error(err);
            resolve(res)
        })
    })
}

const getAllKeyStartingWith = async (prefix) => {
    return new Promise(resolve => {
        redisClient.keys(prefix + '*', (err, res) => {
            if (err) console.error(err);
            resolve(res)
        })
    })
}

const setex = async (redisKey, value, expiration) => {
    return new Promise(resolve => {
        redisClient.setEx(redisKey, expiration, value, (err, res) => {
            if (err) console.error(err);
            resolve(res)
        })
    })
}

const del = async (redisKey) => {
    return new Promise(resolve => {
        redisClient.del(redisKey, (err, res) => {
            if (err) console.error(err);
            resolve(res)
        })
    })
}

const delAllKeyStartingWith = async (prefix) => {
    const keys = await getAllKeyStartingWith(prefix)
    keys.forEach(async key => {
        await del(key)
    })
}


export {
    initializeRedisClient,
    redisClient,
    get,
    set,
    setex,
    del,
    delAllKeyStartingWith
}
