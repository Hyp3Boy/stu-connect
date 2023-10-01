# **Stu-connect**

## Integrantes

- Renzo
- Jimena
- Lenin

## :star: Descripción del proyecto

<p align="justify">
Esta aplicación web se basará en una interfaz pragmática, sencilla de comprender y utilizar. Contaremos con un sistema de reconocimiento facial y asismismo funcionará tanto para imágenes como videos. El uso de deep learning nos ayudará a predecir e identificar los rostros.
</p>

## :pushpin: **Objetivos y características principales**

### Objetivos

<p align="justify">
    Un mejor registro en el horario de nuestro personal será un punto benificioso en la comodidad de ellos. La empresa que evaluaremmos tiene un registro de horario de ingreso y salida a papel, usted firma y registra su horario de entrada y salida en la hoja de trabajo de cada día, con nuestro algoritmo implementado se reducirá eso tiempo con tan solo mostrar tu imagen facial. Además de ello, la interacción entre cliente - aplicación web se plantea ser amigable y productiva para el trabajador.
</p>

### Características

<p align="justify">
    La interfaz de nuestra aplicación web contará con la carga de imágenes faciales, tal cual fuera mostrar un carné de identificación por el cual registrarás el horario de estadía del personal. SQLAlchemy registrará todos las imágenes cargadas en nuestra base de datos con la cual se podrá identificar y darle uso al algoritmo. Todo esto sucederá a tiempo real, las predicciones serán precisas y rápidas para ahorrar el mayor tiempo posible.
</p>

### Visión del proyecto

<p align="justify">
    Buscamos aprovechar a lo máximo el uso de las redes neuronales y así innovar con el algoritmo implementado. De esta manera, poder ofrecer una tecnología muy eficaz a aquellos que la adquieran. El uso de nuestro proyecto será ventajoso en el manejo de registros tanto en asistencia como la fecha de horario y salida.
</p>

### :calendar: Planificación del proyecto

<p align="justify">
    Este estará divido en 7 puntos distintos, en los cuales se realizará este proyecto:
    
        1. Uso de las librerías FLASK y FLASK-SQLALCHEMY en python, para poder conectarnos al servidor desde nuestro kocalchost y guardar todos los datos en nuestra base de datos (carpeta instance). [HECHO]
    
        2. Creación del interfaz html, será el index de nuestro proyecto. Uso de css para crear un index llamativo (carpeta templates). El archivo script.js se encargará de mostrar la cámara del dipositivo por el cual se            reconocerá las emociones mediante nuestro algoritmo. [FALTA script.js]
    
        3. Nuestro archivo algoritmo.cpp ocupará las librerías UUID , openCV y TensorFlow para entrenar nuestro algoritmo, ambos trabajarán en conjunto y harán uso de Convolutional Neural Networks (CNN).  [HECHO]
    
        4. TensorFlow recibirá todos los datos de entrenamiento (imágenes tanto de personas que deseemos reconocer y cada una con el gesto que indica una emoción). [FALTA]
    
        5. OpenCV funciona como un detector facial, y es a tiempo real, con ayuda de TensorFlow no solo funcionará con imágenes, sino también con la cámara web del dispositvo. [FALTA]
    
        6. Por último, UUID generará un identificador (id) para cada persona que esté registrada en nuestra base de datos (mediante los patrones de su rostro). [FALTA]
    
        7. Nuestro algoritmo funcionará correctamente, se procederá a comenzar con las grabaciones del video, basados en un guió, además se realizará el informe respectivo. [FALTA]
</p>

## :file_folder: Librerías a aplicar

1. Flask

2. SQLAlchemy

3. UUID

4. TensorFlow

5. OpenCV

## :rocket: Despegar Web (Temporal)

<p align="justify">
    
    1. Debemos crear nuestro ambiente virtual para correr en nuestra máquina, instalamos el módulo 'pip install virtualenv'. Luego creamos el entorno desde nuestra terminal 'python3 -m denv env', el nombre de nuestro entorno virtual será env. Finalmente la activamos con el siguiente comando en nuestro terminal 'env\Scripts\Activate'.
    
    2. A continuación por ahora instalamos los módulos correspondientes con el siguiente comando en la terminal 'pip install -r requirements.txt'.
    
    3. Ingresamos a nuestro postgresql por terminal en nuestro VSCODE mediante el comando: 'psql -U postgres'.
    
    4. Creamos nuestra base de datos llamada 'database_db', utilizando el comando 'CREATE DATABASE database_db;', luego conectamos nuestra tabla.
    
    5. Finalmente corremos el programa principal 'flask -app proyecto.py run'
    
    
## :wrench: Guía de prueba en ambiente local
# Para realizar la respectiva instalación, necesitamos tener activo nuestro virtual environmen , si no tienes instalado realiza lo siguiente:

1. Crea tu env con el siguiente código: py -m venv env, si posees env en tu IDE selecciona en la esquina inferior derecha en el selector de lenguaje el env.
2. Activa la ruta de tu env en la terminal con el siguiente código: .\env\Scripts\activate
3. Ahora procederás a actualizar tu pip a la última versión (si es necesario) con el siguiente código: python.exe -m pip install --upgrade pip
4. Procede a instalar todas las librerías.
5. Para correr el programa, usarás el código con flask para conectarte al servidor: flask --app proyecto.py run

## :page_facing_up: Instrucciones o reglas de uso

# []

## Licencia De Uso

# []

## :bar_chart: Diagramas

# []

## :tv: Link del video

# []
