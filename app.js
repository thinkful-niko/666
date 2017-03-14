console.log(Date.now())
	var diameter = 1000,
	radius = diameter / 2,
	innerRadius = radius - 120;

	var cluster = d3.layout.cluster()
	.size([360, innerRadius])
.sort(null)
	.value(function(d) { return d.size; });

	var bundle = d3.layout.bundle();

var line = d3.svg.line.radial()
	.interpolate("bundle")
	.tension(.85)
	.radius(function(d) { return d.y; })
	.angle(function(d) { return d.x / 180 * Math.PI; });

	var svg = d3.select("body")

	.append("svg")
	.attr("width", '100%')
	.attr("height", '100%')
	.attr("width", '700px')
	.attr("height", '700px')

	.attr('viewBox','0 0 '+ diameter +' '+ diameter )
	.attr('preserveAspectRatio','xMinYMin')
	.append("g")
	.attr("transform", "translate(" + radius + "," + radius + ")");

	var link = svg.append("g").selectAll(".link"),
	node = svg.append("g").selectAll(".node");

d3.json("readme-flare-imports.json", function(error, classes) {
	if (error) throw error;

	var nodes = cluster.nodes(packageHierarchy(classes)),
	links = packageImports(nodes);

link = link
	.data(bundle(links))
	.enter().append("path")
	.each(function(d) { d.source = d[0], d.target = d[d.length - 1]; })
	.attr("class", "link")
	.attr("d", line);

node = node
	.data(nodes.filter(function(n) { return !n.children; }))
	.enter().append("text")
	.attr("class", "node")
	.attr("dy", ".31em")
	.attr("transform", function(d) { return "rotate(" + (d.x - 90) + ")translate(" + (d.y + 8) + ",0)" + (d.x < 180 ? "" : "rotate(180)"); })
	.style("text-anchor", function(d) { return d.x < 180 ? "start" : "end"; })
	.text(function(d) { return d.key; })
	.on("mouseover", mouseovered)
	.on("mouseout", mouseouted);
});

function mouseovered(d) {
	node
		.each(function(n) { n.target = n.source = false; });

	link
		.classed("link--target", function(l) { if (l.target === d) return l.source.source = true; })
		.classed("link--source", function(l) { if (l.source === d) return l.target.target = true; })
		.filter(function(l) { return l.target === d || l.source === d; })
		.each(function() { this.parentNode.appendChild(this); });

	node
		.classed("node--target", function(n) { return n.target; })
		.classed("node--source", function(n) { return n.source; });
}

function mouseouted(d) {
	link
		.classed("link--target", false)
		.classed("link--source", false);

	node
		.classed("node--target", false)
		.classed("node--source", false);
}

d3.select(self.frameElement).style("height", diameter + "px");

// Lazily construct the package hierarchy from class names.
function packageHierarchy(classes) {
	var map = {};

	function find(name, data) {
		var node = map[name], i;
		if (!node) {
			node = map[name] = data || {name: name, children: []};
			if (name.length) {
				node.parent = find(name.substring(0, i = name.lastIndexOf(".")));
				node.parent.children.push(node);
				node.key = name.substring(i + 1);
			}
		}
		return node;
	}

	classes.forEach(function(d) {
		find(d.name, d);
	});

	return map[""];
}

// Return a list of imports for the given array of nodes.
function packageImports(nodes) {
	var map = {},
	    imports = [];

	// Compute a map from name to node.
	nodes.forEach(function(d) {
		map[d.name] = d;
	});

	// For each import, construct a link from the source to target node.
	nodes.forEach(function(d) {
		if (d.imports) d.imports.forEach(function(i) {
			imports.push({source: map[d.name], target: map[i]});
		});
	});

	return imports;
}
/*

var timestamp = null;
var lastMouseX = null;
var lastMouseY = null;

document.body.addEventListener("mousedown", function(e) {
	if (timestamp === null) {
		timestamp = Date.now();
		lastMouseX = e.screenX;
		lastMouseY = e.screenY;
		return;
	}

	var now = Date.now();
	var dt =  now - timestamp;
	var dx = e.screenX - lastMouseX;
	var dy = e.screenY - lastMouseY;
	var speedX = Math.round(dx / dt * 100);
	var speedY = Math.round(dy / dt * 100);

	console.log(speedX, speedY);
	var obj = {'transform':'rotate('+-1*speedX*speedY+'deg)'}
	$('svg').css(obj)

	timestamp = now;
	lastMouseX = e.screenX;
	lastMouseY = e.screenY;
});

document.body.addEventListener("touchmove", function(e) {
	alert(e.screenX);
	if (timestamp === null) {
		timestamp = Date.now();
		lastMouseX = e.screenX;
		lastMouseY = e.screenY;
		return;
	}

	var now = Date.now();
	var dt =  now - timestamp;
	var dx = e.screenX - lastMouseX;
	var dy = e.screenY - lastMouseY;
	var speedX = Math.round(dx / dt * 100);
	var speedY = Math.round(dy / dt * 100);

	console.log(speedX, speedY);
	var obj = {'transform':'rotate('+-1*speedX*speedY+'deg)'}
	$('svg').css(obj)

	timestamp = now;
	lastMouseX = e.screenX;
	lastMouseY = e.screenY;
});

*/

$("body").on({
    ontouchmove : function(e) {
        e.preventDefault(); 
    }
});

function BlockElasticScroll(event) {
    event.preventDefault();
}





$(function() {
  $.fn.swipe = function( callback ) {
    var touchDown = false,
      originalPosition = null,
      $el = $( this );

    function swipeInfo( event ) {
      var x = event.originalEvent.pageX,
        y = event.originalEvent.pageY,
        dx, dy;

      dx = ( x > originalPosition.x ) ? "right" : "left";
      dy = ( y > originalPosition.y ) ? "down" : "up";

      return {
        direction: {
          x: dx,
          y: dy
        },
        offset: {
          x: x - originalPosition.x,
          y: originalPosition.y - y
        }
      };
    }

    $el.on( "touchstart mousedown", function ( event ) {
      touchDown = true;
      originalPosition = {
        x: event.originalEvent.pageX,
        y: event.originalEvent.pageY
      };
    } );

    $el.on( "touchend mouseup", function () {
      touchDown = false;
      originalPosition = null;
    } );

    $el.on( "touchmove mousemove", function ( event ) {
      if ( !touchDown ) { return;}
      var info = swipeInfo( event );
      callback( info.direction, info.offset );
    } );

    return true;
  };
});


$(function() {

$("body").swipe(function( direction, offset ) {
  console.log( "Moving", direction.x, "and", direction.y );
  console.log( "Touch moved by", offset.x, "horizontally and", offset.y, "vertically" );    


  var obj = {'transform':'rotate('+offset.x+'deg)'}
  $('svg').css(obj)
  
  //alert(offset.x)
});

})


$(function() {

	$('body').on('mouseup touchend',function(){
		console.log($('.node--target').html(), $('.node--source').html())
		$('.results').text($('.node--target').html() + ' ' + $('.node--source').html())
	})
})
