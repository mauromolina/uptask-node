import axios from 'axios';
import Swal from 'sweetalert2'
import { updateProgress } from '../functions/progress';

const tasks = document.querySelector('.listado-pendientes');

if(tasks){

    tasks.addEventListener('click', e => {
        if(e.target.classList.contains('fa-check-circle')){
            const icon = e.target;
            const idTask = icon.parentElement.parentElement.dataset.task;
            const url = `${location.origin}/tasks/${idTask}`;
            axios.patch(url, {
                idTask
            }).then( function(response){
                if(response.status === 200){
                    icon.classList.toggle('completo');
                    updateProgress();
                }
            })

        };
        if(e.target.classList.contains('fa-trash')){
            const htmlTask = e.target.parentElement.parentElement;
            const idTask = htmlTask.dataset.task;
            Swal.fire({
                title: 'Estás seguro de borrar esta tarea?',
                text: "Una tarea eliminada no se puede recuperar!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, borrar!',
                cancelButtonText: 'No, cancelar'
            }).then((result) => {
                if (result.isConfirmed) {
                    const url = `${location.origin}/tasks/${idTask}`;
                    axios.delete(url, { params: { idTask }})
                    .then(function(response){
                        if(response.status === 200){
                            htmlTask.parentElement.removeChild(htmlTask);
                        }
                        Swal.fire(
                            'Perfecto!',
                            response.data,
                            'success'
                            ).then(() =>{
                                updateProgress();
                                window.location.reload();
                            });
                    });
                }    
        });
    };

    }
    )}

export default tasks;