document.addEventListener('DOMContentLoaded', function(){
  if(!localStorage.getItem('cookieConsent')){
    const div = document.createElement('div');
    div.id = 'cookie-banner';
    div.style = 'position:fixed;bottom:0;left:0;width:100%;background:#333;color:white;padding:12px;z-index:999;text-align:center;font-size:14px';
    div.innerHTML = `
      Ye website cookies use karti hai taake aapko behtar experience mile. 
      <button id="acceptCookies" style="margin-left:12px;padding:4px 8px;border:none;border-radius:4px;background:#1e88e5;color:white;cursor:pointer">Accept</button>
      <button id="declineCookies" style="margin-left:6px;padding:4px 8px;border:none;border-radius:4px;color:black;background:#aaa;border-radius:4px;cursor:pointer">Decline</button>
      <a href="privacy.html" style="margin-left:12px;color:#1e88e5;text-decoration:underline;">Privacy Policy</a>
    `;
    document.body.appendChild(div);

    document.getElementById('acceptCookies').onclick = function(){
      localStorage.setItem('cookieConsent','accepted');
      div.remove();
    };
    document.getElementById('declineCookies').onclick = function(){
      localStorage.setItem('cookieConsent','declined');
      div.remove();
    };
  }
});
