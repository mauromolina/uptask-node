import Swal from 'sweetalert2';
import axios from 'axios';

const deleteBtn = document.querySelector('#delete');

if(deleteBtn){
    deleteBtn.addEventListener('click', e => {
        const urlProject = e.target.dataset.projectUrl;
        Swal.fire({
            title: 'Estás seguro de borrar este proyecto?',
            text: "Un proyecto eliminado no se puede recuperar!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, borrar!',
            cancelButtonText: 'No, cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
            
                const url = `${location.origin}/projects/${urlProject}`;
                console.log('URL1: ', url);
                axios.delete(url, {params: {urlProject}})
                .then(function(response){
                    Swal.fire(
                        'Perfecto!',
                        response.data,
                        'success'
                    ).then(() =>{
                        window.location.href = '/';
                    });
                })
                .catch( () => {
                    Swal.fire({
                        type: 'error',
                        title: 'Ocurrió un error',
                        text: 'No se pudo eliminar el proyecto'
                    })
                });
            }
        });
    });
}

export default deleteBtn;