/**
 * Created by shengqing on 5/30/16.
 */

define(['zepto'],function(undef){
    var bindEvent=function(){
        var startX,startY,deltaX=0,deltaY= 0,
            that=this,
            wrap=this.wrap,

            screenWidth= $('body').on('touchstart touchend touchmove',function(e){
                //console.log('touch', e.type,e)
                var touch0= e.touches[0];
                switch (e.type){
                    case 'touchstart':
                        startX=touch0.clientX;
                        startY=touch0.clientY;
                        wrap.children('.flip-window').removeClass('transition')
                        break
                    case 'touchend':
                        //console.log('de',deltaX)
                        wrap.children('.flip-window').removeAttr('style').addClass('transition')
                        if(Math.abs(deltaX)>screenWidth/2){
                            // console.log('gogogo',deltaX)
                            that.go(-deltaX);
                            /**
                             * todo: go 从滑动点开始，而不是从起点开始
                             * */
                        }
                        deltaX=0;
                        deltaY=0;
                        break
                    case 'touchmove':
                        deltaX=touch0.clientX-startX;
                        deltaY=touch0.clientY-startY;
                        var percent= -100*(that.currentIndex -  deltaX/screenWidth);
                        wrap.children('.flip-window').css({
                            transform:'translate('+percent+'%, 0)'
                        });
                        break
                }

                return false


            }).width();


    })