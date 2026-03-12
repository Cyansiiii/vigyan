var u=(o,e)=>()=>(e||o((e={exports:{}}).exports,e),e.exports);var f=u((h,a)=>{console.log("📦 User Panel v3.0 - Simple localStorage-only version");window.renderUserPanelDirect=function(o){console.log("⚡ Rendering user panel with data:",o);const e=document.getElementById("navLoginPlaceholder");if(!e){console.warn("⚠️ navLoginPlaceholder not found in DOM");return}const s=o.email||"",t=o.rollNumber||"N/A",i=o.tests||[];if(console.log("📊 Panel data:",{email:s,rollNumber:t,tests:i}),!s){console.log("👤 No user data - Rendering Login Button"),e.innerHTML=`
        <a href="signinpage.html?v=clean_v4" class="btn-login">Login</a>
    `;return}e.innerHTML=`
    <div class="relative">
      <button id="profileButton" class="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-500 flex items-center justify-center shadow-lg focus:outline-none hover:scale-110 transition-transform">
        <span class="text-white font-bold text-sm">${(s[0]||"U").toUpperCase()}</span>
      </button>
      <div id="profileDropdown" class="hidden absolute right-0 mt-3 w-72 bg-[#020617] border border-white/10 rounded-2xl shadow-2xl p-4 z-50">
        <div class="mb-4">
          <p class="text-xs text-gray-400 uppercase font-bold">Signed in as</p>
          <p class="text-sm text-white font-semibold truncate">${s}</p>
          <p class="text-[11px] text-blue-400 mt-1 font-semibold">Roll No: ${t}</p>
        </div>
        
        ${i.length>0?`
          <a href="student-calendar.html" class="block mb-3 p-3 bg-gradient-to-r from-green-500/20 to-blue-500/20 border border-green-500/30 rounded-xl hover:border-green-500/50 transition group">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition">
                <i class="fas fa-calendar-alt text-green-400 text-lg"></i>
              </div>
              <div class="flex-1">
                <p class="text-white font-bold text-sm">📅 My Test Calendar</p>
                <p class="text-gray-400 text-[11px]">View upcoming tests</p>
              </div>
              <i class="fas fa-chevron-right text-gray-500 text-xs"></i>
            </div>
          </a>
        `:""}
        
        <div class="border-t border-white/10 pt-3 mb-3">
          <p class="text-[11px] text-gray-400 uppercase font-bold mb-2">Purchased Tests</p>
          ${i.length>0?i.map(n=>`
            <div class="flex items-center justify-between text-xs mb-2">
              <span class="${n==="iat"?"text-green-400":n==="nest"?"text-purple-400":n==="isi"?"text-pink-400":"text-blue-400"} font-semibold">
                <i class="fas fa-check-circle mr-1"></i> ${n.toUpperCase()} Series
              </span>
            </div>
          `).join(""):'<p class="text-xs text-gray-500">No tests purchased</p>'}
        </div>
        <button id="logoutBtn" class="w-full py-2 rounded-xl bg-red-600 text-white text-xs font-bold uppercase tracking-widest hover:bg-red-700 transition">
          <i class="fas fa-sign-out-alt mr-2"></i> Logout
        </button>
      </div>
    </div>
  `,m(),console.log("✅ User panel rendered successfully!")};window.refreshUserDashboard=async function(){console.log("🔄 refreshUserDashboard called - background verification active");const o=localStorage.getItem("userEmail"),e=localStorage.getItem("userRollNumber"),s=localStorage.getItem("purchasedTests"),t=localStorage.getItem("userToken");if(console.log("📂 localStorage data:",{email:o,rollNumber:e,hasPurchasedTests:!!s,hasToken:!!t}),!t||t==="null"||t==="undefined"||t.length<10){console.warn("❌ No valid token found. Clearing potential ghost session."),(o||e)&&(localStorage.clear(),console.log("🧹 Cleared stale localStorage data")),window.renderUserPanelDirect({email:"",rollNumber:"",tests:[]});return}if(o&&e){const i=s?JSON.parse(s):[];if(window.renderUserPanelDirect({email:o,rollNumber:e,tests:i}),t)try{console.log("🔍 Verifying session with backend...");const n=window.API_BASE_URL||"",r=await fetch(`${n}/api/user/profile?cb=${Date.now()}`,{method:"GET",headers:{Authorization:`Bearer ${t}`,Accept:"application/json","Content-Type":"application/json"}});if(console.log(`📡 Background verification response: ${r.status} ${r.statusText}`),r.ok){const d=r.headers.get("content-type");if(!d||!d.includes("application/json"))throw console.error("❌ Expected JSON but got:",d),new Error("Invalid response type");const l=await r.json();l.success&&(localStorage.setItem("userEmail",l.email),localStorage.setItem("userRollNumber",l.rollNumber||""),localStorage.setItem("purchasedTests",JSON.stringify(l.purchasedTests||[])),window.renderUserPanelDirect({email:l.email,rollNumber:l.rollNumber,tests:l.purchasedTests}))}else throw new Error(`Server returned ${r.status}`)}catch(n){console.warn("❌ Session verification failed- Logout Forced:",n.message),localStorage.clear(),sessionStorage.clear();try{window.handleLogout&&window.handleLogout()}catch(r){console.error("Error in handleLogout:",r)}setTimeout(()=>{window.location.href="index.html?v=logout_sync"},100)}}else console.log("ℹ️ User not logged in (missing email or rollNumber)")};function m(){const o=document.getElementById("profileButton"),e=document.getElementById("profileDropdown"),s=document.getElementById("logoutBtn");o&&e&&(o.addEventListener("click",t=>{t.stopPropagation(),e.classList.toggle("hidden")}),document.addEventListener("click",t=>{!o.contains(t.target)&&!e.contains(t.target)&&e.classList.add("hidden")})),s&&s.addEventListener("click",()=>{console.log("🚪 Logging out..."),localStorage.clear(),window.location.href="index.html"})}function c(){console.log("🚀 Initializing user panel..."),window.refreshUserDashboard&&window.refreshUserDashboard()}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",c):c();window.addEventListener("load",c);typeof a<"u"&&a.exports&&(a.exports={refreshUserDashboard:window.refreshUserDashboard,renderUserPanelDirect:window.renderUserPanelDirect});console.log("🔐 Auth.js loaded - Unified system");document.addEventListener("DOMContentLoaded",()=>{console.log("🔐 Auth: Checking login status..."),g()});function g(){const o=localStorage.getItem("isLoggedIn"),e=localStorage.getItem("userEmail"),s=localStorage.getItem("userToken"),t=localStorage.getItem("purchasedTests");console.log("🔐 Auth state:",{isLoggedIn:o,userEmail:e,userToken:s,purchasedTests:t}),o==="true"&&e?(console.log("✅ User is logged in - Calling unified refreshUserDashboard()"),s&&localStorage.getItem("userRollNumber"),window.refreshUserDashboard?window.refreshUserDashboard():console.error("❌ refreshUserDashboard not found - user-panel.js not loaded?")):console.log("ℹ️ User not logged in")}window.handleLogout=function(){console.log("🚪 Logging out..."),localStorage.removeItem("isLoggedIn"),localStorage.removeItem("userEmail"),localStorage.removeItem("userToken"),localStorage.removeItem("userRollNumber"),localStorage.removeItem("userName"),localStorage.removeItem("purchasedTests"),localStorage.removeItem("tempTestId"),localStorage.removeItem("tempAmount"),console.log("✅ Logged out successfully"),window.location.href="index.html"};window.triggerLogout=window.handleLogout;typeof a<"u"&&a.exports&&(a.exports={initializeAuth:g,handleLogout})});export default f();
