const stream = weex.requireModule('stream') || {};
const modal = weex.requireModule('modal') || {};


export function getBaseURL() {
    return "https://www.easy-mock.com/mock/5c75f1b3ce20c029e6dca80a";
}

export function getEntryUrl(name) {
    let arr = weex.config.bundleUrl.split('/');
    arr.pop();
    arr.pop();
    arr.push('dist/'+name + '.js');
    console.log(arr.join('/'));


    // console.log(arr)
    // arr.push("dist/" + name + '.js');
    // 判断当前的环境，适配web端
    if (weex.config.env.platform === "Web") {
        return '/' + name + '.html'
    } else {
        let arr = weex.config.bundleUrl.split('/');
        arr.pop();
        arr.pop();
        arr.push('dist/'+name + '.js');
        modal.toast({
            message: arr.join('/'),
            duration: 13
        });
        return arr.join('/');
    }
}

export function httpPost(path, body, done = () => {
}, fail = () => {
}) {
    try {
        stream.fetch({
            url: getBaseURL() + path,
            method: 'post',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            type: 'json',
            body: body
        }, res => {
            if (res.ok && res.data) {
                done(res.data)
            } else {
                fail(res)
            }
        })
    } catch (err) {
        console.error(err);
        fail(err);
    }
}

export function httpGet(path, body, done = () => {
}, fail = () => {
}) {
    try {
        stream.fetch({
            url: getBaseURL() + path,
            method: 'get',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            type: 'json',
            body: body
        }, res => {
            if (res.ok && res.data) {
                done(res.data)
            } else {
                fail(res)
            }
        })
    } catch (err) {
        console.error(err);
        fail(err)
    }
}