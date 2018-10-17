function move(ele, attr, target) {
	
    if (typeof ele == 'string') {
        ele = document.querySelector(ele);
    }
    clearInterval(ele.timer);
    var init = parseFloat(getStyle(ele, attr));
    if (attr == 'opacity') {
        init *= 100;
    }
    var speed=8;
    if(init>target){
    	speed*=-1;
    }
    ele.timer = setInterval(function () {
        init += speed
        if ((speed >0 && init > target) || (speed < 0 && init < target)) {
            init = target;
            clearInterval(ele.timer);
        }
        if (attr == 'opacity') {
            ele.style[attr] = init / 100;
        } else {
            ele.style[attr] = init + 'px';
        }
    }, 10)

}

function getStyle(ele, attr) {
    if (window.getComputedStyle) {
        return window.getComputedStyle(ele, null)[attr];
    }
    return ele.currentStyle[attr];
}