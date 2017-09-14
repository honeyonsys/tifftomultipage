var express = require("express");
var app = express();
//var formidable = require("formidable");
var multer= require('multer');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now()+'-'+file.originalname);
  }
})
 
var upload = multer({ storage: storage });

var mp = require('tiff-multipage');

const OUTPUT_PATH = 'uploads/merge/';

app.set('view engine', 'ejs');
app.listen(5050);
console.log('Server running at http://127.0.0.1:5050/');


app.get('/', function(req, res) {
    res.render('index');
});


app.post('/uploadimages',upload.array('tiffimages',4), function(req, res){
	
	var file = [];
		var file_array=[];
		var file_arr=[];
		var file_array_implode=[];
	if(req.files)
	{
		var filelength=req.files.length;
		
		for(var i=0;i<filelength;i++){
			var file=req.files[i];
			var file_arr=file.fieldname + '-' +file.originalname;
			file_array.push(file_arr);
		}
		var mergerfilename = Date.now()+'.tiff';
		mp.joinAsync(mergefilename, file_array, function (err) {
		    if (err){
		    	console.log(err);	
		    } else {
		    	res.redirect("/uploads/"+mergefilename);
			}
		});
		//console.log(file_array);
		
		
				
	}
	
});
