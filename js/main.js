const btn = document.querySelectorAll('[data-modal-open]'),
      modal = document.querySelector('.modal-container'),
      modalWindow = document.querySelector('.modal-window'),
      forms = document.querySelectorAll('form'),
      modalClose = document.querySelector('.modal-close');



btn.forEach(el=>{
    el.addEventListener('click', ()=>{
       modal.style.display = 'block';
    })
})
modal.addEventListener('click', (e)=>{
  if(e.target === modal || e.target === modalClose){
    closeModal()
  }
})


function closeModal(){
   modal.style.display = 'none';
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
    thanksModal.classList.add('modal-thanks');
    thanksModal.innerHTML = `<div class ="modal-title">${message}</div>`
    modal.append(thanksModal);

    modalWindow.style.visibility = 'hidden'

    
    setTimeout(()=>{
        thanksModal.remove();
         modalWindow.style.visibility = 'visible'
        closeModal()
    },2000);
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

  
