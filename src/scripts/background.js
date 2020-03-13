function start() {
    function step(dt) {
        this.y += this.speedY * dt;
        this.x += this.speedX * dt;
        this.z += this.speedZ * dt;
        this.r = a.r * this.z;
        if (this.y > a.height || this.y < 0) {
            this.speedY = -this.speedY
        }
        if (this.x < 0 || this.x > a.width) {
            this.speedX = -this.speedX
        }
        if (this.z > 1 || this.z < 0.2) {
            this.speedZ = -this.speedZ
        }
        this.distance = a.getDistance(this)


    }

    function draw(n) {
        a.ctx.globalAlpha = this.z
            // a.ctx.fillStyle = color;
            // a.ctx.strokeStyle = color;
        a.ctx.beginPath();
        a.ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI, true)
        a.ctx.stroke()
        a.ctx.closePath()
        a.ctx.fill()

        for (let i = n; i < gameObject.length; i++) {
            if (this.distance[i] < a.linkDistance) {
                a.ctx.beginPath()
                a.ctx.globalAlpha = (1 - this.distance[i] / a.linkDistance) * this.z
                a.ctx.moveTo(this.x, this.y)
                a.ctx.lineTo(gameObject[i].x, gameObject[i].y)
                a.ctx.stroke()
                a.ctx.closePath()
            }
        }
    }
    var gameObject
    var canvasBody = function() {
        this.time = 0;
        this.lastTime = 0;
        this.maxtime = 1 / 30;
        gameObject = []
        this.initialize = function(divName) {
            var mainDiv = document.getElementById("contain")
            console.log(mainDiv)
            this.maincanvas = document.createElement("canvas")
            mainDiv.appendChild(this.maincanvas)
            this.width = mainDiv.clientWidth || mainDiv.offsetWidth || window.innerWidth;
            this.height = mainDiv.clientHeight || mainDiv.offsetHeight || window.innerHeight;
            this.maincanvas.width = this.width
            this.maincanvas.height = this.height
            this.linkDistance = this.width > this.height ? this.width * this.width / 64 : this.height * this.height / 64
            this.maincanvas.style.background = "#fff"
            this.maincanvas.style.padding = 0;
            this.maincanvas.style.margin = 0;
            this.maincanvas.style.position = 'absolute'
            this.maincanvas.style.top = 0;
            this.maincanvas.style.zIndex = -1
            var color = "rgb(147, 203, 248)";
            this.ctx = this.maincanvas.getContext('2d')
            this.ctx.fillStyle = color;
            this.ctx.strokeStyle = color;
            this.ctx.lineWidth = 0.4
            this.addObject(mouse)
            for (let i = 0; i < 100; i++) {
                var x = ~~(Math.random() * this.width);
                var y = ~~(Math.random() * this.height)
                var speedX = ~~(Math.random() * 20 - 10)
                var speedY = ~~(Math.random() * 20 - 10)
                this.r = 3
                this.addObject(new sphere(x, y, this.r, speedX, speedY, color))
            }
            this.loop()
        }
        this.getDistance = function(object) {
            var arr = new Array()
            for (let i = 0; i < gameObject.length; i++) {

                if (object === gameObject[i]) {
                    arr.push(99999999);

                } else {
                    arr.push((object.x - gameObject[i].x) * (object.x - gameObject[i].x) + (object.y - gameObject[i].y) * (object.y - gameObject[i].y))


                }

            }
            return arr;
        }
        this.indexOf = function(val) {
            for (let i = 0; i < this.length; i++) {
                if (this[i] == val) return i;
            }
            return -1;
        };
        this.remove = function(val) {
            var index = canvasBody.indexOf(val);
            if (index > -1) {
                this.gameObject.splice(index, 1);
            }
        };
        this.loop = function() {
            background.draw()
            this.time = new Date().getTime()
            var dt = this.time - this.lastTime / 1000;
            if (dt > this.maxtime) {
                dt = this.maxtime
            }
            for (var i = 0; i < gameObject.length; i++) {
                gameObject[i].step(dt)
                gameObject[i].draw(i)
            }
            this.lastTime = this.time


            window.requestAnimationFrame(function() {
                a.loop()
            })



        }
        this.remove = function(object) {

        }
        this.addObject = function(object) {
            gameObject.push(object)
        }

    }
    var background = new function() {
        this.draw = function() {
            a.ctx.clearRect(0, 0, a.width, a.height)
        }
    }
    var sphere = function(x, y, r, speedX, speedY) {
        this.x = x;
        this.y = y;
        this.z = (1 - Math.random() * 0.8)
        this.r = r * this.z;
        this.speedX = speedX;
        this.speedY = speedY;
        this.speedZ = 0.02;
        this.distance = [];
        this.lineOpacity = 100;

    }
    sphere.prototype.step = step
    sphere.prototype.draw = draw
    var mouse = new function() {
        this.effectRange = 10000;
        this.GM = 1000000;
        this.draw = function(n) {
            for (var i = n; i < gameObject.length; i++) {
                if (this.distance[i] < a.linkDistance) {
                    a.ctx.beginPath()
                    a.ctx.globalAlpha = (1 - this.distance[i] / a.linkDistance)
                    a.ctx.moveTo(this.x, this.y)
                    a.ctx.lineTo(gameObject[i].x, gameObject[i].y)
                    a.ctx.stroke()
                    a.ctx.closePath()
                }
            }
        }
        this.step = function() {
            this.distance = a.getDistance(this)
        }
        this.step1 = function(dt) {
            if (this.x === undefined) {
                return 0;
            }

            for (var i = 0; i < gameObject.length; i++) {
                if (this === gameObject[i]) {
                    continue;
                } else {
                    var deltaX = this.x - gameObject[i].x;
                    var deltaY = this.y - gameObject[i].y;
                    var sqareX = deltaX * deltaX
                    var sqareY = deltaY * deltaY;
                    var sqareD = sqareX + sqareY;
                    if (sqareD < 1000) {
                        gameObject[i].speedX = 0;
                        gameObject[i].speedY = 0
                        continue;
                    }
                    if (sqareD > this.effectRange) {
                        continue;
                    }
                    if (deltaX < 0) {
                        gameObject[i].speedX -= (this.GM / sqareD) * Math.sqrt((sqareX / sqareD)) * dt

                    } else {
                        gameObject[i].speedX += (this.GM / sqareD) * Math.sqrt((sqareX / sqareD)) * dt

                    }
                    if (deltaY < 0) {
                        gameObject[i].speedY -= (this.GM / sqareD) * Math.sqrt((sqareY / sqareD)) * dt

                    } else {
                        gameObject[i].speedY += (this.GM / sqareD) * Math.sqrt((sqareY / sqareD)) * dt

                    }

                }
            }
        }
    }

    window.onmousemove = function(e) {
        e = event || window.event;
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    }
    var a = new canvasBody();
    a.initialize("contain");
}
export {
    start
}