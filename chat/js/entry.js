((doc) => {
  const oUserName = doc.querySelector('#userName');
  const oEnterBtn = doc.querySelector('#enter');

  const init = () => {
    bindEvent();
  };
  init();

  function bindEvent() {
    oEnterBtn.addEventListener('click', handleEnterClick, false);
  }
  function handleEnterClick() {
    const userName = oUserName.value.trim();

    if (userName.length < 6) {
      alert('用户名不小于6位');
      return;
    }

    localStorage.setItem('userName', userName);
    location.href = 'index.html';
  }
})(document);
