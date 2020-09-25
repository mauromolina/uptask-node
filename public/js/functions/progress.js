import Swal from 'sweetalert2'
export const updateProgress = () => {

    const tasks = document.querySelectorAll('li.tarea');

    if(tasks.length){
        const taskContainer = document.querySelector('#listado');
        const completeTasks = document.querySelectorAll('i.completo');
        const progress = Math.round(( completeTasks.length / tasks.length) * 100);
        const percentage = document.querySelector('#porcentaje');
        const percentageP = document.querySelector('p.progress');
        percentageP.innerHTML = progress + '%';
        percentage.style.width = progress+'%';
        if(progress === 100) {
            Swal.fire(
                'Felicidades!',
                'Este proyecto está completo!',
                'success'
                )
        }

    }

}