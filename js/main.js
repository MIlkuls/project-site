const btn = document.querySelectorAll('[data-modal-open]'),
      buttonSubmit = document.querySelectorAll('[data-modal-submit]')
      modal = document.querySelector('.modal-container'),
      modalWindow = document.querySelector('.modal-window')
      inputNumber = document.querySelector('#input-number'),
      inputName = document.querySelector('#input-name'),
      forms = document.querySelectorAll('form'),
      modalClose = document.querySelector('.modal-close');



btn.forEach(el=>{
    el.addEventListener('click', ()=>{
       modal.style.display = 'block';
    })
})

modalClose.addEventListener('click', closeModal)

function closeModal(data){
   data.style.display = 'none';
}



const postData = async (url,data) =>{
    const res = await fetch(url,{
       method:"POST",
       headers:{
                'Content-type':'application/json'
            },
        body: data
    });
    return await res.json();
};


  function showThanksModal(message){


    const thanksModal = document.createElement('div')
    thanksModal.classList.add('modal-dialog');
    thanksModal.innerHTML = `<div class ="modal-title">${message}</div>`
    modal.append(thanksModal);

    

    setTimeout(()=>{
        thanksModal.remove();
        closeModal(modal)
    },4000);
  }

forms.forEach( i =>{
    bindPostData(i);
})
 

  function bindPostData(form){
    form.addEventListener('submit',(e)=>{
        e.preventDefault();

           const formData = new FormData(form);

           const json = JSON.stringify(Object.fromEntries(formData.entries()));

        postData('http://localhost:3000/requests',json)
        .then(data => {
          showThanksModal('Thanks!!!')
        }).finally(()=>{
          console.log('fdsfsdf')
        });
    });
  }

  
