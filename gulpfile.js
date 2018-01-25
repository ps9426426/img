var fs =require('fs');
var path =require('path');
var gulp  = require('gulp');
var webserver = require('gulp-webserver');


gulp.task('server',function(){
	gulp.src('.')
	    .pipe(webserver({
	    	host:'localhost',
	    	port:8060,
	    	open:true,
	    	fallback:"index.html",
	    	middleware:function(req,res,next){
	    		if(req.url==='/favicon.ico'){
	    			return
	    		}
	    		if(req.url==='/data'){
	    			res.writeHead(200,{
	    				'access-control-allow-origin':'*'
	    			})
	    			res.end(fs.readFileSync(path.join(__dirname,'js/data.json')))
	    		}else{
	    			next()
	    		}
	    	}
	    }))
})

gulp.task('default',['server'])