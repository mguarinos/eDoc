# eDoc

Este caso plantea el desarrollo de un sistema para gestión electrónica de las evaluaciones
que los estudiantes realizan a los profesores de las asignaturas que cursan. Los alumnos
tendrán la posibilidad de responder a distintas cuestiones para evaluar la labor docente del
profesor, a la vez que todos los usuarios podrán ver resultados agregados con distinto nivel
de detalle.

Funcionalidad del servicio.

La evaluación de la actividad docente de los profesores universitarios es un elemento
fundamental en los procesos de mejora de calidad de Escuelas y Facultades. Hasta fechas
recientes, esta tarea se realizaba en papel con el consiguiente impacto medioambiental, y la
ineficiente gestión que el proceso manual acarrea. Por ello, se hace necesario una
herramienta que de soporte a este proceso, automatizando tareas tediosas a la vez que
aportando conocimiento y garantías en el proceso. Aunque recientemente se han
introducido algunas de estas herramientas, su funcionalidad es todavía muy limitada.
Con este sistema, cualquier alumno matriculado en una asignatura podrá utilizar la
aplicación Web para valorar la docencia recibida. El sistema permitirá ofrecer la opinión del
alumno en diversos parámetros, a la vez que ofrece a los profesores los resultados
individualizados de su docencia. Además, permitirá la publicación en abierto de
información agregada, protegiendo la privacidad tanto de alumnos como de profesores.

Propuesta de realización.

La realización de este caso de estudio requiere completar los requisitos de la aplicación,
prestando especial atención a los requisitos de privacidad.
El desarrollo de este caso implica el desarrollo de varios servicios o componentes: interfaces
de usuario para gestión de datos, lógica de aplicación en nodo servidor, así como una
solución de persistencia de datos que puede desplegarse en el mismo nodo que la lógica de
aplicación o en un nodo separado.

Este caso se asignará a un equipo de trabajo que seguirá una metodología ágil de desarrollo
basada en Scrum para desarrollar un prototipo básico con las características de Mínimo
Producto Viable que permita demostrar la funcionalidad del servicio para un escenario
típico de uso, la viabilidad del enfoque y la adecuación de la arquitectura software elegida.
La aplicación que se plantea es un sistema con requisitos básicos de seguridad como
autenticación, autorización, confidencialidad, donde el elemento más importante es la
privacidad, ya que la información recogida por el sistema (tanto la emitida por el alumno
como la recibida por el profesor) es de tipo personal y sensible.

Enlace para acceder a la aplicación web:

http://front.guarinos.xyz:3000/ 

PARA INSTALACIÓN Y ARRANQUE DEL SERVICIO :

FRONT-END : Moverse en la carpeta de frontend/front-end y con un terminal escribir los comandos "yarn install" y "yarn start"
front:yarn install, yarn start (sobre la carpeta frontend) back:mvn spring-boot:run

