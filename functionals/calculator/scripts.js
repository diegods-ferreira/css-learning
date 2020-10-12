const screen = document.getElementById('calculator-screen');
const buttonsContainerHTML = document.getElementById('buttons-container');
const buttonsHTML = document.querySelectorAll('div#buttons-container > button');
const buttons = {};

buttonsHTML.forEach(function(button) {
  Object.assign(buttons, {
    [button.id]: button
  });
});

buttonsContainerHTML.addEventListener('click', function(event) {
  const buttonTarget = buttons[event.target.id];
  
  if (!buttonTarget) {
    return;
  }

  if (buttonTarget.getAttribute('data-target') === 'ce') {
    screen.innerHTML = '';
    return;
  }

  if (buttonTarget.getAttribute('data-target') === 'sqrt') {
    if (Number.isNaN(Number(screen.innerHTML))) {
      return;
    }

    try {
      const currentValueOnScreen = Number(screen.innerHTML);
      const sqrt = Math.sqrt(currentValueOnScreen);
      screen.innerHTML = sqrt.toString();
    } catch (err) {
      screen.innerHTML = '#ERRO!';
    }

    return;
  }

  if (buttonTarget.getAttribute('data-target') === 'equal') {
    try {
      const result = eval(screen.innerHTML);
      screen.innerHTML = result.toString();
    } catch (err) {
      screen.innerHTML = '#ERRO!';
    }
    
    return;
  }

  if (screen.innerText.trim() === '' && Number.isNaN(Number(buttonTarget.innerText))) {
    return;
  }

  screen.innerHTML += buttonTarget.getAttribute('data-target');
});