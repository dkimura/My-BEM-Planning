var browserSync = require('browser-sync'); //ブラウザを自動リロード
var gulp = require('gulp'); //gulp本体
var concat = require('gulp-concat'); //複数ファイルを結合
var frontnote = require('gulp-frontnote'); //ドキュメン化
var imagemin = require('gulp-imagemin'); //画像の軽量化
//var pleeease = require('gulp-pleeease'); //ベンダープレフィックスを自動で付与と、圧縮
var plumber = require('gulp-plumber'); //gulpでwatch中にエラーが出た時にエラーメッセージを通知
var runSequence = require('gulp-run-sequence'); //依存関係を設定せずに順序を指定
var sass = require('gulp-sass'); //sassを使用
var uglify = require('gulp-uglify'); //JSの軽量化
var rimraf = require('rimraf'); //余分なファイル・ディレクトリを削除
//var jshint = require('gulp-jshint'); //JSの構文チェック
var autoprefixer = require("gulp-autoprefixer");
var cssmin = require('gulp-cssmin');
var rename = require('gulp-rename');

/*gulp.task('clean', function(cb){
	rimraf('./app/', cb);
});*/

gulp.task('sass', function() {
	gulp.src('./app/sass/**/*.scss')
		.pipe(frontnote({
			title:'Style Guide',
			//overview: './app/README.md',
			out:'./app/style_guide',
			css:'../css/style.min.css'
		}))
		.pipe(sass())
		.pipe(cssmin())
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest('./app/css/'))/*
		.pipe(pleeease({
			autoprefixer: {
				browsers: ['last 2 versions', 'ie 8', 'ie 9']
			},
			minifier: true
		}));
		.pipe(plumber({errorHandler: notify.onError('Error: ')}));*/
		.pipe(autoprefixer());
});

gulp.task('imagemin', function(){
	gulp.src('./app/img/**/*')
		.pipe(imagemin({svgoPlugins: [{removeViewBox: false}]}))
		.pipe(gulp.dest('./app/img/'));
});

gulp.task('javascript', function() {
	gulp.src('./app/js/**/*.js')
		//.pipe(jshint())
		// .pipe(concat('script.js'))
		// .pipe(uglify({preserveComments: 'some'})) //著作権コメント残す
		// .pipe(gulp.dest('./app/dist/js/'))
		//.pipe(browserSync.reload({stream: true}));
});

gulp.task('browser-sync', function(){
	browserSync({server: {baseDir: './app/'}
	,open: false
	});
});

gulp.task('bs-reload', function () {
    browserSync.reload();
});

gulp.task('default', ['browser-sync'], function(){
	gulp.watch(['./app/sass/**/*.scss'], ['sass', 'bs-reload']);
	gulp.watch(['./app/css/**/*.css'], ['bs-reload']);
	gulp.watch(['./app/js/**/*.js'], ['javascript', 'bs-reload']);
	gulp.watch(['./app/**/*.html'], ['bs-reload']);
});

/*gulp.task('build', ['clean'], function(){
	runSequence('clean', ['sass', 'javascript', 'imagemin']);
})*/

gulp.task('dist', function(){
	gulp.src('./app/css/**/*.css')
		.pipe(gulp.dest('./dist/css/'));
	gulp.src('./app/img/**/*')
		.pipe(gulp.dest('./dist/img/'));
	gulp.src('./app/js/**/*.js')
		.pipe(gulp.dest('./dist/js/'));
	gulp.src('./app/**/*.html')
		.pipe(gulp.dest('./dist/'));
});