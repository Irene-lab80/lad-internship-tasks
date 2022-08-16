const formElement = document.forms['formElement'];

formElement.addEventListener('focusin', (evt) => {
  const activeElement = formElement.querySelector('.focused');
	if (activeElement) {
	  activeElement.classList.remove('focused');
  }
  evt.target.classList.add('focused');
})


formElement.addEventListener('focusout', () => {
	const activeElement = formElement.querySelector('.focused');
  if (activeElement) {
   	activeElement.classList.remove('focused');   
  }
})
