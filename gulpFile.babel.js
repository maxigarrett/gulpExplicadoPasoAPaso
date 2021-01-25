/*  gulp.task -> crea una tarea -> gulp.task('nombre de la tarea', ()=>{lo que va hacer la tarea})  
    gulp.src -> origen del documento odende tiene que agarrar los archivos -> gulp.src('ruta del origen del archivo')
    gulp.pipe -> union de las diferentes secciones de la tarea -> pipe(seccion)
    gulp.dest -> destino del documento -> gulp.dest('ruta de destino del archivo')
    gulp.watch -> vigilar los cambios en la ruta que le digamos -> gulp.watch(ruta a vigilar',['tarea']

    sass andmite parametros como: 
    outputstyle:'nested':salida por defecto el css no cambia 
    outputstyle:'compact':compacta todo el css 
    outputstyle:'expanded':lo deja igual que iria css normal con las llaves una arriba y otra abajo
    outputstyle:'compresed':comprime todo lo posible elimina espacios en vlanco y coemtarios
*/


//creamos constante para acceder al paquete de gulp
const gulp= require('gulp');
// import gulp from 'gulp'; la nueva documentacion lo pide asi
const sass= require('gulp-sass');
const autoprefixer= require('gulp-autoprefixer');
const pug=require('gulp-pug');
const babel=require('gulp-babel');
const concat=require('gulp-concat');
const uglify=require('gulp-uglify');
const plumber=require('gulp-plumber');

//nos permite usar todos los metodos del metodo create de browser-sync este lo que hace es recargar la pagina cada ves que
// guardamos automaticamente
const browsersync=require('browser-sync');
const server=browsersync.create()

//creamos la primera tarea con task entre parentesis y comillas el nombre de la tarea y despues una funcion anonima
// gulp.task('tarea1',(done)=>
// {
//     console.log('hola mundo')
        // done(); es posible que tire mensajes de error porque gulp es asincrono asiq ponemos nombre en la funcion y llamamos
// })

// para que ejecute la tarea por defecto en el nombre de la tarea ponemos defoult y por consola no hace fatla poner
// gulp y tara1 ya solo con gulp anda
// gulp.task('defoult',()=>
// {
//     console.log('hola mundo');
//     console.log('adios mundo');
// })
// -------------------------------------------fin crear tareas de ejemplo-----------------------


//--------------------TAREAS PARA EL PROYECTO-------------------------
gulp.task("styles",()=>
{
    //escogemos el archivo de la carpeta dev donde se desarrolla el proyecto
    gulp.src('./dev/scss/styles.scss')
    .pipe(plumber())//para que si hay error de sintaxis gulp npo se cierre y aya que ejecutarlo otra ves
    
    //le decimos que tiene que hacer con ese archivo con pipe()-> esto se usa para unir un modulo a otro osea agarra el archivo
    // SCSS y lo une con la funcion sass y despues une tambien al modulo de autoprefixer. Despues le decios que genere el archivo
    // resusltante en el directorio que querramos y para eso esta gulp.dest(le decimos donde quiere dejar el archivo)
    .pipe(sass({outputStyle:'compact'}))
    .pipe(autoprefixer({
        browsers:['last 3 versions']//por parametro le pasamos una propiedad browser y le pasamos la version anterior que q
                                    // quremos que autoprefije y desde la version actual del navegador hasta tres versiones atras
                                    // va a añadir los prefijos esto anda mal se hace ponieendo autoprefixer en pakage.json unos codigos
    }))
    .pipe(gulp.dest('./public/css'))//pondra el codigo de scss a css
    .pipe(server.stream())//inyecta la nueva hoja de estilos cada ves que se hace un cambio en scss y ver en timpo real
})

// TAREA PARA CODIGO PUG
gulp.task("pug",()=>
{
    gulp.src('./dev/pug/*.pug')//escogemos todos los archivos pug ya que pusimos un asterisco
    .pipe(plumber())
    .pipe(pug({
        pretty:true//por defecto es false si ponemos true en el html de public se compila con sus saltos de linea y sangrias
    }))
    .pipe(gulp.dest('./public/'))
})

//TAREA PARA PARA CODIGO JS
// pasa codigo emc6 a codigo para todos los navegadores
gulp.task("babel",()=>
{
    gulp.src('./dev/js/*.js')
    .pipe(plumber())
    .pipe(babel({presets:["env"]}))
    .pipe(concat('scripts-comprimido.js'))//a concat le pasamos el archvio donde compilara todo
    .pipe(uglify())//comprime todo los archivos js
    .pipe(gulp.dest('./public/js/'))
})




//TAREA PARA BROWSER-SYNC 
// se jecuta solo llamando a gulp 
gulp.task("default",()=>
{
    //para levantar el servidor y poder ver esa ventana
    server.init({
        //ruta a levantar va hacer nuestra carpeta publica y levantara nuestro index.html
        server:"./public"
    })

      // cada cambio que se realiza en el scss para pasarlo al css usamos el watch para q siempre mire y el asterisco es para 
    // que mire todos los archivos que termineen en ese nombre y como segundo parametro un array de tareas es decir todas las
    // tarea que queremos que ejecute cuando exista un cambio en ese directorio y como solo tenemos una tarea llamada sass le 
    // pasamos ese nombre al array
    gulp.watch('./dev/scss/styles.scss',gulp.series("styles"));//si despues de la coma pongo[sass] no anda pero con series si

    // on es un metodo que hace recargar la venatana disparando el metodo change y como segundo parametro se ejecutara cada
    // ves que se ejecute un cambio con browser.reload cada cambio se captura con evento change
    gulp.watch('./dev/pug/*.pug',gulp.series("pug")).on('change', server.reload);
    gulp.watch('./dev/js/*.js',gulp.series("babel")).on('change', server.reload);
})







