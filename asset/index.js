define(['zepto'], function (undef) {


    var bindEvent = function (conf) {
        var startX, startY, deltaX = 0, deltaY = 0,
            that = this,
            wrap = this.wrap,

            screenWidth = $('body').on('touchend touchmove', function (e) {
                if (!that.operating) {
                    return true;
                }
                //console.log('touch', e.type,e)
                var touch0 = e.touches[0];
                switch (e.type) {
                    /*
                     case 'touchstart':
                     startX=touch0.clientX;
                     startY=touch0.clientY;
                     wrap.children('.'+conf.classes.flipWindow).removeClass(conf.classes.transition)
                     break
                     */
                    case 'touchend':
                        //console.log('de',deltaX)
                        wrap.children('.' + conf.classes.flipWindow).removeAttr('style').addClass(conf.classes.transition)
                        if (Math.abs(deltaX) > screenWidth / 2) {
                            // console.log('gogogo',deltaX)
                            that.go(-deltaX);

                        }
                        deltaX = 0;
                        deltaY = 0;
                        that.operating = false;
                        break
                    case 'touchmove':
                        deltaX = touch0.clientX - startX;
                        deltaY = touch0.clientY - startY;
                        //console.log('deltaX',deltaX)
                        var percent = -100 * (that.currentIndex - deltaX / screenWidth);
                        wrap.children('.' + conf.classes.flipWindow).css({
                            transform: 'translate(' + percent + '%, 0)'
                        });
                        break
                }

                return false
            }).width();

        wrap.on('touchstart', function (e) {
            that.operating = true;
            var touch0 = e.touches[0];
            startX = touch0.clientX;
            startY = touch0.clientY;
            wrap.children('.' + conf.classes.flipWindow).removeClass(conf.classes.transition)

        })
    };

    var constructor = function (conf) {

        this.wrap = conf.wrap;

        this.count = conf.wrap.find('.' + conf.classes.flipPage).length;


        bindEvent.call(this, conf);

    };
    constructor.prototype = {

        go: function (direction) {
            if (!this.count) return this;
            direction = (direction || 1) > 0 ? 1 : -1;

            var currentIndex = this.wrap.attr('data-on') - 1;

            currentIndex = Math.max(0, Math.min(this.count - 1, currentIndex + direction))
            this.currentIndex = currentIndex;

            this.wrap.attr('data-on', currentIndex + 1);
        },
        currentIndex: 0,
        playCounter: 0,
        play: function () {
            if (!this.count) return this;

            var _this = this;


            setTimeout(function () {
                _this.play()
            }, 100);

            if (this.operating) {
                this.playCounter = 0;
                return this
            }

            if ((++this.playCounter) > 30) {
                this.playCounter = 0;
                var currentIndex = _this.wrap.attr('data-on') - 1;
                currentIndex = (++currentIndex) % _this.count;

                _this.currentIndex = currentIndex;

                _this.wrap.attr('data-on', (currentIndex + 1));
            }


            return this;
        }
    }
    return {
        init: function (mod, conf) {

            var conf = $.extend({
                classes: {
                    flipPage: 'flip-page',
                    flipWindow: 'flip-window',
                    transition: 'transition'
                }
            }, conf || {});
            conf.wrap = conf.wrap || mod.children('div');

            return new constructor(conf)


        }
    }
})
