(function (config) {
    var canvas = document.getElementById('todo5'),
        context = canvas.getContext('2d');
    var rect = config; 
    var drag = false;
    var before = {};
    function w2c(canvas, wx, wy) {
        if(!canvas) return false;
        var b = canvas.getBoundingClientRect();
        return {
            x: (wx || 0) - b.left * (canvas.width / b.width),
            y: (wy || 0) - b.top * (canvas.height / b.height)
        }
    }
    function isDrag(c) {
        return c.x >= rect.x && c.x <= rect.x + rect.width 
            && c.y >= rect.y && c.y <= rect.y + rect.height
    }

    context.fillStyle = '#383838';
    context.fillRect(rect.x, rect.y, rect.width, rect.height);
    canvas.onmousedown = function (e) {
        before = w2c(canvas, e.clientX, e.clientY);
        drag = isDrag(before);
    };
    canvas.onmousemove = function (e) {
        if(drag && before) {
            var after = w2c(canvas, e.clientX, e.clientY);
            context.clearRect(0, 0, canvas.width, canvas.height);
            context.save();
            context.fillRect(rect.x + (after.x - before.x), rect.y + (after.y - before.y), rect.width, rect.height);
            context.restore();
        }
        
    }
    document.onmouseup = function (e) {
        context.save();
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.fillRect(rect.x, rect.y, rect.width, rect.height);
        context.restore();
        drag = false;
    }
    canvas.onmouseup = function (e) {
        var fina = w2c(canvas, e.clientX, e.clientY);
        rect.x += fina.x - before.x;
        rect.y += fina.y - before.y;
        drag = false;
        e.stopPropagation();
    }
})({
    'x': 0,
    'y': 0,
    'width': 200,
    'height': 200
});
