const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.close-modal');
const btnAddProject = document.querySelector('.add_project_modal');

const closeModal = function(){
    modal.classList.add('hidden')
    overlay.classList.add('hidden')
}

const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

btnAddProject.addEventListener('click', openModal)
overlay.addEventListener('click', closeModal)
btnCloseModal.addEventListener('click', closeModal)

document.addEventListener('keydown', function (e) {
    // console.log(e.key);

    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
      closeModal();
    }
  });