/*1-para instalar gulp primero hay que descargar node.js de la pag oficial (posible fallo despues de intalar todo y que no ande usamos el comando npm install node-sass )

2-despues si queremos instalar node en nuestro proyecto seleccionamos el proyecto boton derecho abrir terminal y ponemos
npm install(con descargarlo es suficiente pero si descargamos un proyecto que ya tiene un pacjage.json con sus dependencias
  esntonces ahi si debemos instalar node para que fucione y gulp de manera global y despues de local) 

3-para instalar el ppackage.json ponemos: nmp init y establecemos la info de nuestro proyecto y a medida que descarguemos
  compiladores para pug o scss se añadiran a ese archivo como informacion para saber que tenemos

4-una ves instalado node procedemos a intalar gulp (npm istall --save-dev gulp) para usar gulp de forma local
  y tambien primero de manera global npm istall gulp-g

5-otro instalacion para poder compilar scss a css:  npm install --save-dev gulp-sass

6-otra instalacion el autoprefixed sirve para poner los autoprefijos propietarios a los navegadores para indicar que esa 
propiedad de css esta en desarrollo: npm install --save-dev gulp-autoprefixer  

7- instalar pug: pug es escribir codigo html mas cencillo pero con el compilador lo combierte a html para que el navegador lo lea
  npm install --save-dev gulp-pug (--save-dev se refiere a guardarlo en la carpeta dev que es donde desarrollamos el codigo)

8.browser synk es para que se recarge sola la pagina automaticamente a la hora de guardar un cambio como de css
  https://browsersync.io/docs/gulp#gulp-sass-css - explicaion de codigo para instalarlo por consola y como hacer la funcion
  codigo npm install browser-sync gulp --save-dev

9-babel para compilar javascript npm install --save-dev gulp-babel @babel/core @babel/cli @babel/preset-env

10- el modulo contact conseguimos tener varios scripts en desarrollo y a la hs de subirlo a produccion poenrlo todos en un solo
    archivo para q al servidor le sea mas facil leer: npm install npm install --save-dev gulp-concat

11- comprimir los archivos resultantes de js: npm install --save-dev gulp-uglify

12- modulo plumber para evitar que cuando aya un error en gulp se finalice y tener que levantarlo de nuevo
    npm install --save-dev gulp-plumber



  EL ORDEN SERIA
  1-descargar node.js
  2-instalar gulp de manera global y despues de manera local
  3-instalamos sass y autoprefixer
  4-instalamos pug
  5-instalamos babel despues concat y despues uglify y plumber

*/