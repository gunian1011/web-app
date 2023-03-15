window.addEventListener('load', function () {
    // this.alert('你好');
    // 1.获取元素
    var focus = document.querySelector('.focus');
    var ul = focus.children[0];
    // 获取focus的宽度
    var w = focus.offsetWidth;
    var ol = focus.children[1];
    // 2.利用定时器自动轮播图图片
    var index = 0;
    var timer = setInterval(function () {
        index++;
        var translatex = -index * w;
        // 添加动画过度
        ul.style.transition = 'all .3s'
        ul.style.transform = 'translateX(' + translatex + 'px)';
    }, 2000);
    // 等过度完之后 再去判断 监听过渡事件 transiyionend
    ul.addEventListener('transitionend', function () {
        // 无缝滚动
        if (index >= 3) {
            index = 0;
            // 去掉过度效果 实现快速回到第一页
            ul.style.transition = 'none';
            // 利用最新的索引号乘以段杜 去滚动图片
            var translatex = -index * w;
            ul.style.transform = 'translateX(' + translatex + 'px)';
        } else if (index < 0) {
            index = 2;
            var translatex = -index * w;
            ul.style.transform = 'translateX(' + translatex + 'px)';
        }
        // 3.小圆点跟随变化
        // 把ol里li带有current类名选出来去掉remove
        // ol.querySelector('.current').classList.remove('.current');
        ol.querySelector('.current').classList.remove('current');
        // 让当前索引号的小li加上current add
        ol.children[index].classList.add('current');
    });
    // 4.手指滑动轮播图
    // 触摸元素 touchstart 获取手指初始坐标
    var startX = 0;
    var moveX = 0;
    var flag = false;
    ul.addEventListener('touchstart', function (e) {
        startX = e.targetTouches[0].pageX;
        // 手指触摸到的时候就停止定时器
        clearInterval(timer);
    });
    // 移动手指 touchmove 计算手指的滑动距离 并且移动盒子
    ul.addEventListener('touchmove', function (e) {
        // 计算移动距离
        moveX = e.targetTouches[0].pageX - startX;
        // 移动盒子  盒子原来的位置 + 手指移动的距离
        var translatex = -index * w + moveX;
        // 手指拖动的时候 不需要邓华效果 需要取消过度
        ul.style.transition = 'none';
        ul.style.transform = 'translateX(' + translatex + 'px)';
        flag = true;  // 如果用户手指移动过再去判断否则不作判断效果
        e.preventDefault(); // 阻止滚动屏幕行为
    });
    // 手指离开 根据移动距离去判断是回弹还是播放上一张下一张
    ul.addEventListener('touchend', function (e) {
        if (flag) {
            // 如果移动距离大于50px 就切换
        if (Math.abs(moveX) > 50) {
            // 如果是右划就是 播放上一张 moveX 是正值
            if (moveX > 0) {
                index--;
            } else {
                // 如果是左滑就是  播放下一张 moveX 是负值
                index++;
            }
            var translatex = -index * w;
            ul.style.transition = 'all .3s';
            ul.style.transform = 'translateX(' + translatex + 'px)';
        } else {
            // 如果小于50像素就会弹
            var translatex = -index * w;
            ul.style.transition = 'all .3s';
            ul.style.transform = 'translateX(' + translatex + 'px)';
        }
        }
        // 手指离开的时候就开启定时器
        clearInterval(timer);
        timer = setInterval(function() {
            index++;
            var translatex = -index * w;
            ul.style.transition = 'all .3s';
            ul.style.transform = 'translateX(' + translatex + 'px)';
        },2000);
    });

    // 返回顶部
    var goBack = document.querySelector('.goBack');
    var nav = document.querySelector('nav');
    window.addEventListener('scroll',function() {
        if(window.pageYOffset >= nav.offsetTop) {
            goBack.style.display = 'block';
        } else {
            goBack.style.display = 'none';
        }
    });
    goBack.addEventListener('click',function() {
        // window.scroll(0,0);
        // 因为是窗口滚动 所以对象是window
        animate(window,0);
    })
    function animate(obj,target,callback) {
        // 先清除以前的定时器  只保留当前的一个定时器执行
        clearInterval(obj.timer);
        obj.timer = setInterval(function() {
            // 步长值写到定时器的里面
            // 把步长值改为整数 不要出现小数
            var step = (target - window.pageYOffset) / 10;
            step  = step > 0 ? Math.cell(step) : Math.floor(step);
            if (window.pageYOffset == target) {
                // 停止动画 本质是停止定时器
                clearInterval(obj.timer);
                callback && callback();
            }
            // 把每次加1 这个步长值改为一个慢慢变小的值 步长公式:(目标值 - 现在的位置)
            window.scroll(0,window.pageYOffset + step);
        },15);
    }
})