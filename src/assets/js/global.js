export function throttle(func,wait){
    let previous = 0;
    return function() {
        let now = +new Date();
        let context = this;
        if (now - previous >= wait) {
            func.apply(context, arguments);
            previous = now; // 执行后更新 previous 值
        }
    }
}