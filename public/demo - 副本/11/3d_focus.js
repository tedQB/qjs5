(function($,$$){

	var focus3d=K.focus3d=function(args){

		return new _focus3d(args);

	}

	var _focus3d = function(args){

		this.Pic = args.Pic;

		this.L = args.L;

		this.R = args.R;

		this.arr =[];

		this.Time=args.Time || 3000;

		this.isAuto = true;

		var _this = this;

		$$(args.Pic).each(function(o,i){

			o.node.id = "Kfocus_3D_"+i;

			_this.arr[i]={};

			_this.arr[i].w = o.node.offsetWidth+"px"; 

			_this.arr[i].h = o.node.offsetHeight+"px";

			_this.arr[i].t = o.node.offsetTop+"px";

			_this.arr[i].l = o.node.offsetLeft+"px";

			_this.arr[i].op = o.attr("data_opacity");

			_this.arr[i].z = o.attr("data_z_index");

		});

		$(this.R).click(function(){

			_this.Slid(false);

		});

		$(this.R).hover(

			function(){_this.isAuto = false;},

			function(){_this.isAuto = true;_this.AutoPlay()}

		);

		$(this.L).hover(

			function(){_this.isAuto = false;},

			function(){_this.isAuto = true;_this.AutoPlay()}

		);

		$(this.L).click(function(){

			_this.Slid(true);

		});

		this.AutoPlay();

	}

	_focus3d.prototype = {

		Slid:function(dir){

			dir?this.arr.push(this.arr.shift()):this.arr.unshift(this.arr.pop());//”µ½M²Ù×÷

			$.A.each(this.arr,function(o,i){

				$("Kfocus_3D_"+i).go({width:o.w,height:o.h,left:o.l,top:o.t,zIndex:o.z,opacity:o.op},'defaults','easeIn')

			});

		},

		AutoPlay:function(){

			var _this = this;

			(function(){

			if(_this.isAuto){

				_this.Slid(true);

				setTimeout(arguments.callee,_this.Time);

			}

			})()

		}

	}

})(K,KK);
