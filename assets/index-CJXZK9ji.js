(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e={selectedServices:new Set,currentHotel:null,guestCount:1,guests:new Map,carCount:1,cars:new Map,golfGuests:[],busRoutes:{hcmToHt:!1,htToHcm:!1},isA171Mode:!1,a171WithRoom:!1,a171GuestCount:0,a171SubjectType:`patron`,generatedEmail:null};function t(){e.selectedServices.clear(),e.currentHotel=null,e.guestCount=1,e.guests.clear(),e.carCount=1,e.cars.clear(),e.golfGuests=[],e.busRoutes={hcmToHt:!1,htToHcm:!1},e.isA171Mode=!1,e.a171WithRoom=!1,e.a171GuestCount=0,e.a171SubjectType=`patron`,e.generatedEmail=null}function n(t){return e.selectedServices.has(t)?(e.selectedServices.delete(t),!1):(e.selectedServices.add(t),!0)}function r(t){return e.selectedServices.has(t)}var i={hotels:{IC:{name:`IC`,displayName:`InterContinental`,roomTypes:[{types:[`KDXN`,`KDXS`,`TDXN`,`TDXS`,`KLON`,`KLOS`,`TLON`,`TLOS`],promotion:188},{types:[`KOTS`,`KOTN`,`TOTS`,`TOTN`],promotion:188},{types:[`KVUS`,`KVUN`,`TVUS`,`TVUN`],promotion:388},{types:[`XEXS`,`XEXN`,`XOTS`,`XOTN`,`XVUS`,`XVUN`],promotion:3188},{types:[`XFTS`,`XFTN`,`XLOS`,`XLON`],promotion:3888}],quickTypes:[`KOTS`,`KVUS`,`TVUS`,`TOTS`]},HIR:{name:`HIR`,displayName:`Ho Tram`,roomTypes:[{types:[`TSTS`,`TSTN`,`KPUS`,`TPUN`,`TPU`],promotion:188},{types:[`TVUN`,`TVUS`,`KLON`,`KLOS`],promotion:188},{types:[`KOTS`,`TOTS`],promotion:388},{types:[`XOTN`,`XOTS`,`XFTN`,`XFTS`,`XLOS`,`XCIS`],promotion:888},{types:[`X2ON`,`X2OS`,`XDBS`],promotion:1888},{types:[`XVUN`,`XVUS`],promotion:2188},{types:[`X2AN`,`X2AS`],promotion:3188}],quickTypes:[`KLOS`,`TVUS`,`KLON`,`TSTS`]},IXORA:{name:`IXORA`,displayName:`Ixora`,roomTypes:[{types:[`1BACC`,`1BSC`,`1BDO`],promotion:188},{types:[`1BPG`],promotion:188},{types:[`2BPO`],promotion:3188},{types:[`2BVP`],promotion:5188},{types:[`2BBV`],promotion:7188},{types:[`3BPV`],promotion:8188},{types:[`3BBV`],promotion:9188}],quickTypes:[`1BACC`,`1BPG`,`2BPO`,`2BVP`]}},agents:{quickSelect:[{code:`IM`,name:`IM`},{code:`A03`,name:`A03 Tun Naing`},{code:`A40`,name:`A40 Wang Kan`},{code:`A111`,name:`A111`},{code:`A165`,name:`A165`},{code:`A171`,name:`A171`},{code:`A173`,name:`A173`}]},services:{room:{enabled:!0,icon:`🏨`,title:`Room Booking`},car:{enabled:!0,icon:`🚗`,title:`Car Service`},golf:{enabled:!0,icon:`⛳`,title:`Golf Booking`},bus:{enabled:!0,icon:`🚌`,title:`Bus Service`}}},{hotels:a}=i;function o(){return a}function s(e){let t=a[e];return t?t.quickTypes:[]}function c(e,t){let n=a[e];if(!n)return null;for(let e of n.roomTypes)if(e.types.includes(t))return e.promotion;return null}function l(){return i.agents.quickSelect}function u(e){if(!e)return``;let t=new Date(e+`T00:00:00`);return`${t.getDate().toString().padStart(2,`0`)}-${[`Jan`,`Feb`,`Mar`,`Apr`,`May`,`Jun`,`Jul`,`Aug`,`Sep`,`Oct`,`Nov`,`Dec`][t.getMonth()]}-${t.getFullYear()}`}function d(e){if(!e)return``;let t=new Date(e+`T00:00:00`),n=t.getDate();return`${n+(n===1?`st`:n===2?`nd`:n===3?`rd`:`th`)}-${[`Jan`,`Feb`,`Mar`,`Apr`,`May`,`Jun`,`Jul`,`Aug`,`Sep`,`Oct`,`Nov`,`Dec`][t.getMonth()]}`}function f(){let e=new Date;return`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,`0`)}-${String(e.getDate()).padStart(2,`0`)}`}function p(){let e=new Date;return e.setDate(e.getDate()+1),`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,`0`)}-${String(e.getDate()).padStart(2,`0`)}`}function m(e,t){let n=(e||``).trim(),r=(t||``).trim(),i=r&&r.toLowerCase()!==`new`,a=n&&n.toLowerCase()!==`new`;return i?r:a?n:`New`}var h=1,g=null;function _(){ee(),v(),y(),te(),w();let e=document.getElementById(`btn-add-guest`);e&&e.addEventListener(`click`,()=>w())}function ee(){let e=document.getElementById(`agent-selector`);if(!e)return;let t=l();e.innerHTML=`
    <div class="form-row" style="align-items: flex-end; gap: 1rem;">
      <div class="form-group" style="flex: 0 0 200px;">
        <input list="agentList" id="agentName" placeholder="Agent" class="form-input" onclick="this.select()">
        <datalist id="agentList">
          ${t.map(e=>`<option value="${e.name}">`).join(``)}
        </datalist>
      </div>
      <div class="form-group" style="flex: 1;">
        <div class="quick-select">
          ${t.map(e=>`
            <button type="button" class="quick-btn agent-btn" data-agent="${e.code}" onclick="window.app.setAgent('${e.code}', '${e.name}')">
              ${e.code}
            </button>
          `).join(``)}
        </div>
      </div>
    </div>
  `}function v(){let e=document.getElementById(`hotel-selector`);if(!e)return;let t=o();e.innerHTML=Object.entries(t).map(([e,t])=>`
    <button type="button" class="quick-btn hotel-btn" data-hotel="${e}" onclick="window.app.selectHotel('${e}')">
      ${e}
    </button>
  `).join(``)}function y(){let e=document.getElementById(`date-selector`);e&&(e.innerHTML=`
    <div class="form-row">
      <div class="form-group" style="flex: 1;">
        <label>Stay Dates</label>
        <input type="text" id="dateRangePicker" placeholder="Select dates..." readonly class="form-input" style="cursor: pointer;">
        <input type="hidden" id="checkIn" value="${f()}">
        <input type="hidden" id="checkOut" value="${p()}">
        <div id="dateRangeDisplay" style="font-size: 0.8rem; color: var(--primary); font-weight: 600; margin-top: 0.5rem;"></div>
      </div>
    </div>
  `,setTimeout(()=>b(),0))}function te(){let e=document.getElementById(`authorizer-selector`);e&&(e.innerHTML=`
    <div class="form-group">
      <label>Authorizer</label>
      <input list="authorizerList" id="authorizer" value="Jian.Xu" placeholder="Select or type name" class="form-input" onclick="this.select()">
      <datalist id="authorizerList">
        <option value="Kevin Loh">
        <option value="IMHUYT">
        <option value="Nan.Hao">
        <option value="Kingz Chock">
        <option value="Jian.Xu">
      </datalist>
    </div>
  `)}function b(){let e=document.getElementById(`dateRangePicker`),t=document.getElementById(`checkIn`),n=document.getElementById(`checkOut`);if(!(!e||!t||!n)){if(x(t.value,n.value),window.Litepicker===void 0){setTimeout(()=>b(),500);return}try{g&&g.destroy(),g=new window.Litepicker({element:e,singleMode:!1,startDate:t.value,endDate:n.value,format:`DD MMM YYYY`,delimiter:` → `,tooltipText:{one:`night`,other:`nights`},tooltipNumber:e=>e-1,setup:e=>{e.on(`selected`,(e,r)=>{t.value=e.format(`YYYY-MM-DD`),n.value=r.format(`YYYY-MM-DD`),x(t.value,n.value)})}})}catch(r){console.error(`Litepicker error:`,r),e.style.display=`none`;let i=document.createElement(`div`);i.className=`form-row`,i.innerHTML=`
      <div class="form-group">
        <label>Check In</label>
        <input type="date" id="checkInNative" value="${f()}" class="form-input">
      </div>
      <div class="form-group">
        <label>Check Out</label>
        <input type="date" id="checkOutNative" value="${p()}" class="form-input">
      </div>
    `,e.parentNode.appendChild(i),document.getElementById(`checkInNative`)?.addEventListener(`change`,e=>{t.value=e.target.value}),document.getElementById(`checkOutNative`)?.addEventListener(`change`,e=>{n.value=e.target.value})}}}function x(e,t){let n=document.getElementById(`dateRangePicker`),r=document.getElementById(`dateRangeDisplay`);if(!e||!t)return;let i=new Date(e+`T00:00:00`),a=new Date(t+`T00:00:00`),o=Math.round((a-i)/(1e3*60*60*24)),s=e=>{let t=new Date(e);return`${t.getDate()} ${[`Jan`,`Feb`,`Mar`,`Apr`,`May`,`Jun`,`Jul`,`Aug`,`Sep`,`Oct`,`Nov`,`Dec`][t.getMonth()]}`};n&&(n.value=`${s(i)} → ${s(a)}`),r&&o>0?r.textContent=`${o} night${o>1?`s`:``}`:r&&(r.textContent=``)}function S(e,t){let n=document.getElementById(`agentName`);n&&(n.value=t),document.querySelectorAll(`.agent-btn`).forEach(t=>{t.classList.toggle(`active`,t.dataset.agent===e)})}function C(t){e.currentHotel=t,document.querySelectorAll(`.hotel-btn`).forEach(e=>{e.classList.toggle(`active`,e.dataset.hotel===t)}),ie(t)}function w(){let t=document.getElementById(`guests-container`);if(!t)return;let n=h++;e.guests.set(n,{id:n,sharers:[]});let r=document.createElement(`div`);return r.className=`guest-card`,r.id=`guest-${n}`,r.innerHTML=`
    <div class="guest-header">
      <div style="display: flex; align-items: center; gap: 0.75rem;">
        <div class="guest-number">${n}</div>
        <span class="guest-title">Guest ${n}</span>
      </div>
      <button type="button" class="btn btn-danger btn-sm" onclick="window.app.removeGuestForm(${n})">
        Remove
      </button>
    </div>
    <div class="guest-fields">
      <div class="form-row">
        <div class="form-group">
          <label>Old PID</label>
          <div class="pid-input-wrapper">
            <input type="text" id="guestOldPID-${n}" class="pid-input" placeholder="Old PID"
                   oninput="window.app.searchPID('guestOldPID-${n}', 'guestNewPID-${n}', 'guestName-${n}', 'pidInfo-${n}')">
            <span class="pid-status-icon" id="oldPidIcon-${n}"></span>
          </div>
        </div>
        <div class="form-group">
          <label>New PID</label>
          <div class="pid-input-wrapper">
            <input type="text" id="guestNewPID-${n}" class="pid-input" placeholder="New PID"
                   oninput="window.app.searchPID('guestOldPID-${n}', 'guestNewPID-${n}', 'guestName-${n}', 'pidInfo-${n}')">
            <span class="pid-status-icon" id="newPidIcon-${n}"></span>
          </div>
          <div id="pidInfo-${n}" class="pid-info-box"></div>
        </div>
        <div class="form-group">
          <label>Guest Name *</label>
          <input type="text" id="guestName-${n}" class="required-field" placeholder="Guest Name"
                 oninput="this.value = this.value.toUpperCase()">
        </div>
      </div>
      <div class="form-group">
        <label>Room Type *</label>
        <input type="hidden" id="roomType-${n}">
        <div class="quick-roomtype-buttons" id="roomTypeButtons-${n}" style="display: flex; gap: 0.5rem; flex-wrap: wrap; margin-bottom: 0.5rem;">
          <!-- Room type buttons will be generated here -->
        </div>
        <select id="roomTypeSelect-${n}" class="form-input" onchange="window.app.setRoomTypeFromSelect(${n}, this.value)">
          <option value="">Select Room Type</option>
        </select>
      </div>
    </div>
    <div class="sharer-section" id="sharerSection-${n}" style="margin-top: 0.75rem; padding-top: 0.75rem; border-top: 1px solid var(--border);">
      <div id="sharerContainer-${n}"></div>
      <button type="button" class="btn-sharer" onclick="window.app.addSharerForm(${n})" style="margin-top: 0.5rem;">
        <span class="sharer-icon">👥</span> Add Sharer
      </button>
    </div>
  `,t.appendChild(r),e.currentHotel&&E(n,e.currentHotel),n}function T(t){let n=document.getElementById(`guest-${t}`);n&&(n.remove(),e.guests.delete(t))}function ne(t){let n=e.guests.get(t);if(!n)return;let r=n.sharers.length+1;n.sharers.push(r);let i=document.getElementById(`sharerContainer-${t}`);if(!i)return;let a=document.createElement(`div`);a.className=`sharer-form`,a.id=`sharer-${t}-${r}`,a.style.cssText=`background: #f8f9fa; padding: 0.75rem; border-radius: 0.375rem; margin-bottom: 0.5rem;`,a.innerHTML=`
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
      <span style="font-weight: 600; color: var(--primary);">Sharer #${r}</span>
      <button type="button" class="btn btn-danger btn-sm" onclick="window.app.removeSharerForm(${t}, ${r})">×</button>
    </div>
    <div class="form-row">
      <div class="form-group">
        <label>Old PID</label>
        <div class="pid-input-wrapper">
          <input type="text" id="sharerOldPID-${t}-${r}" class="pid-input" placeholder="Old PID"
                 oninput="window.app.searchPID('sharerOldPID-${t}-${r}', 'sharerNewPID-${t}-${r}', 'sharerName-${t}-${r}', 'sharerPidInfo-${t}-${r}')">
          <span class="pid-status-icon" id="sharerOldPidIcon-${t}-${r}"></span>
        </div>
      </div>
      <div class="form-group">
        <label>New PID</label>
        <div class="pid-input-wrapper">
          <input type="text" id="sharerNewPID-${t}-${r}" class="pid-input" placeholder="New PID"
                 oninput="window.app.searchPID('sharerOldPID-${t}-${r}', 'sharerNewPID-${t}-${r}', 'sharerName-${t}-${r}', 'sharerPidInfo-${t}-${r}')">
          <span class="pid-status-icon" id="sharerNewPidIcon-${t}-${r}"></span>
        </div>
        <div id="sharerPidInfo-${t}-${r}" class="pid-info-box"></div>
      </div>
      <div class="form-group">
        <label>Name</label>
        <input type="text" id="sharerName-${t}-${r}" placeholder="Auto-filled from PID">
      </div>
    </div>
  `,i.appendChild(a)}function re(t,n){let r=document.getElementById(`sharer-${t}-${n}`);r&&r.remove();let i=e.guests.get(t);i&&(i.sharers=i.sharers.filter(e=>e!==n))}function E(e,t){let n=document.getElementById(`roomTypeButtons-${e}`),r=document.getElementById(`roomTypeSelect-${e}`);if(!n||!r)return;let i=s(t),a=o()[t];n.innerHTML=i.map(t=>`
    <button type="button" class="quick-btn room-type-btn" onclick="window.app.setRoomType(${e}, '${t}')">
      ${t}
    </button>
  `).join(``),r.innerHTML=`<option value="">Select Room Type</option>`,a&&a.roomTypes&&a.roomTypes.forEach(e=>{let t=document.createElement(`optgroup`);t.label=`${e.promotion} pts`,e.types.forEach(n=>{let r=document.createElement(`option`);r.value=n,r.textContent=`${n} (${e.promotion} pts)`,r.dataset.promotion=e.promotion,t.appendChild(r)}),r.appendChild(t)})}function ie(t){e.guests.forEach((e,n)=>{E(n,t)})}function D(e,t){let n=document.getElementById(`roomType-${e}`);n&&(n.value=t);let r=document.getElementById(`roomTypeButtons-${e}`);r&&r.querySelectorAll(`.quick-btn`).forEach(e=>{e.classList.toggle(`active`,e.textContent.trim()===t)});let i=document.getElementById(`roomTypeSelect-${e}`);i&&(i.value=t)}function ae(e,t){t&&D(e,t)}var O=null;function k(e,t,n,r){clearTimeout(O);let i=document.getElementById(e),a=document.getElementById(t),o=document.getElementById(n),s=document.getElementById(r);if(!i||!a||!o)return;let c=i.value.trim(),l=a.value.trim();if(i.classList.remove(`pid-found`,`pid-not-found`,`pid-searching`),a.classList.remove(`pid-found`,`pid-not-found`,`pid-searching`),s&&(s.style.display=`none`,s.className=`pid-info-box`),!c&&!l){o.value=``,o.readOnly=!1;return}if(!window.pidDatabaseLoaded){s&&(s.className=`pid-info-box warning`,s.innerHTML=`⚠️ Please import PID database first`,s.style.display=`block`),o.readOnly=!1;return}c&&i.classList.add(`pid-searching`),l&&a.classList.add(`pid-searching`),O=setTimeout(()=>{let e=null,t=``;if(c&&window.oldPIDIndex){let n=window.oldPIDIndex.get(c);n&&window.pidDatabase&&(e=window.pidDatabase.get(n),t=`old`)}if(!e&&l&&window.newPIDIndex){let n=window.newPIDIndex.get(l);n&&window.pidDatabase&&(e=window.pidDatabase.get(n),t=`new`)}i.classList.remove(`pid-searching`),a.classList.remove(`pid-searching`),e?(i.classList.add(`pid-found`),a.classList.add(`pid-found`),e.oldPID&&!c&&(i.value=e.oldPID),e.newPID&&!l&&(a.value=e.newPID),o.value=e.name.toUpperCase(),o.readOnly=!0,s&&(s.className=`pid-info-box success`,s.innerHTML=`✅ Found by ${t===`old`?`Old PID`:`New PID`}: <strong>${e.name}</strong>`,s.style.display=`block`)):(i.classList.add(`pid-not-found`),a.classList.add(`pid-not-found`),o.value=``,o.readOnly=!1,s&&(s.className=`pid-info-box warning`,s.innerHTML=`⚠️ PID not found in database`,s.style.display=`block`))},300)}function A(){let t=document.getElementById(`agentName`)?.value?.trim(),n=e.currentHotel,r=document.getElementById(`authorizer`)?.value?.trim()||`Jian.Xu`,i=document.getElementById(`checkIn`)?.value,a=document.getElementById(`checkOut`)?.value;if(!t)throw Error(`Please enter agent name`);if(!n)throw Error(`Please select a hotel`);if(!i||!a)throw Error(`Please select check-in and check-out dates`);let o=u(i),s=u(a),l=[],d=[],f=[],p=``,h=``;if(e.guests.forEach((e,t)=>{if(!document.getElementById(`guest-${t}`))return;let r=document.getElementById(`guestName-${t}`)?.value?.trim(),i=document.getElementById(`guestOldPID-${t}`)?.value?.trim()||``,a=document.getElementById(`guestNewPID-${t}`)?.value?.trim()||``,o=document.getElementById(`roomType-${t}`)?.value;if(!r||!o)return;let s=m(i,a);h||=(p=s,r);let u=`${r} - ${s}`;e.sharers.forEach(e=>{let n=document.getElementById(`sharerName-${t}-${e}`)?.value?.trim();if(n){let r=m(document.getElementById(`sharerOldPID-${t}-${e}`)?.value?.trim()||``,document.getElementById(`sharerNewPID-${t}-${e}`)?.value?.trim()||``);u+=`\n(Sharer: ${n} - ${r})`}}),l.push(u),d.push(`${r} - ${o}`);let g=c(n,o);g&&!f.includes(g)&&f.push(g)}),l.length===0)throw Error(`Please add at least one complete guest`);let g=`[${t}] ${p} ${h} ${n} Hotel Room Booking on ${o}`,_=f.join(`/`);return`Subject: ${g}

Dear @Concierge Services @Front Desk

Please kindly arrange room booking as follows:

Agent: ${t}
Hotel: ${n}

Guest name: ${l.join(`
`)}

Room type: ${n}
${d.join(`
`)}

Check in: ${o}
Check out: ${s}
Rate code: CASBAR
Promotion: ${_}
Deposit: No
Trip authorizer: ${r}

Thank you`}function j(){let t=[];document.getElementById(`agentName`)?.value?.trim()||t.push(`Agent name is required`),e.currentHotel||t.push(`Please select a hotel`);let n=document.getElementById(`checkIn`)?.value,r=document.getElementById(`checkOut`)?.value;(!n||!r)&&t.push(`Check-in and check-out dates are required`);let i=!1;return e.guests.forEach((e,t)=>{if(!document.getElementById(`guest-${t}`))return;let n=document.getElementById(`guestName-${t}`)?.value?.trim(),r=document.getElementById(`roomType-${t}`)?.value;n&&r&&(i=!0)}),i||t.push(`Please add at least one complete guest with name and room type`),t}var M=1;function N(){let t=!e.selectedServices.has(`room`),n=document.getElementById(`car-tip`);if(n&&!t&&(n.style.display=`block`),t){let e=document.getElementById(`car-section`);if(e){let t=document.createElement(`div`);t.className=`form-row`,t.style.marginBottom=`1rem`,t.innerHTML=`
        <div class="form-group">
          <label>Agent</label>
          <input list="carAgentList" id="carAgent" placeholder="Select or type agent name" class="form-input" onclick="this.select()">
          <datalist id="carAgentList">
            ${l().map(e=>`<option value="${e.name}">`).join(``)}
          </datalist>
        </div>
      `,e.insertBefore(t,document.getElementById(`cars-container`))}}P();let r=document.getElementById(`btn-add-car`);r&&(r.onclick=()=>P())}function P(){let t=document.getElementById(`cars-container`);if(!t)return;let n=M++;e.cars.set(n,{id:n});let r=!e.selectedServices.has(`room`),i=document.getElementById(`checkIn`)?.value||new Date().toISOString().split(`T`)[0],a=``;if(!r){let e=document.getElementById(`guestName-1`)?.value;e&&(a=e)}let o=document.createElement(`div`);return o.className=`item-group`,o.id=`car-${n}`,o.innerHTML=`
    <div class="item-header">
      <span class="item-number">Car #${n}</span>
      <button type="button" class="btn btn-danger btn-sm" onclick="window.app.removeCarForm(${n})">Remove</button>
    </div>
    ${r?`
    <div class="form-row">
      <div class="form-group">
        <label>Old PID</label>
        <div class="pid-input-wrapper">
          <input type="text" id="carOldPID-${n}" class="pid-input" placeholder="Old PID"
                 oninput="window.app.searchPID('carOldPID-${n}', 'carNewPID-${n}', 'carName-${n}', 'carPidInfo-${n}')">
          <span class="pid-status-icon"></span>
        </div>
      </div>
      <div class="form-group">
        <label>New PID</label>
        <div class="pid-input-wrapper">
          <input type="text" id="carNewPID-${n}" class="pid-input" placeholder="New PID"
                 oninput="window.app.searchPID('carOldPID-${n}', 'carNewPID-${n}', 'carName-${n}', 'carPidInfo-${n}')">
          <span class="pid-status-icon"></span>
        </div>
        <div id="carPidInfo-${n}" class="pid-info-box"></div>
      </div>
      <div class="form-group">
        <label>Guest Name</label>
        <input type="text" id="carName-${n}" value="${a}" placeholder="Auto-filled from PID" class="form-input">
      </div>
    </div>
    `:`
    <div class="form-row">
      <div class="form-group">
        <label>Guest Name</label>
        <input type="text" id="carName-${n}" value="${a}" class="form-input">
      </div>
    </div>
    `}
    <div class="form-row">
      <div class="form-group">
        <label>Car Type</label>
        <select id="carType-${n}" class="form-input">
          <option value="limo">Limo</option>
          <option value="sedan">Sedan</option>
          <option value="SUV">SUV</option>
        </select>
      </div>
      <div class="form-group">
        <label>Number of Guests</label>
        <input type="number" id="carGuests-${n}" value="4" class="form-input">
      </div>
      <div class="form-group">
        <label>Phone</label>
        <input type="text" id="carPhone-${n}" value="0343222771" class="form-input">
      </div>
    </div>
    <div class="form-row">
      <div class="form-group">
        <label>Date</label>
        <input type="date" id="carDate-${n}" value="${i}" class="form-input">
      </div>
      <div class="form-group">
        <label>Time</label>
        <input type="time" id="carTime-${n}" value="12:00" class="form-input">
      </div>
    </div>
    <div class="form-row">
      <div class="form-group">
        <label>Pick Up Point</label>
        <input type="text" id="carPickup-${n}" placeholder="Enter location" list="pickupLocations-${n}" class="form-input location-input">
        <datalist id="pickupLocations-${n}">
          <option value="Main Lobby">
          <option value="TSN Airport">
        </datalist>
        <div class="quick-select" style="margin-top: 0.5rem;">
          <button type="button" class="quick-btn" onclick="window.app.setLocation('carPickup-${n}', 'Main Lobby')">Main Lobby</button>
          <button type="button" class="quick-btn" onclick="window.app.setLocation('carPickup-${n}', 'TSN Airport')">TSN Airport</button>
        </div>
      </div>
      <div class="form-group">
        <label>Drop Off Point</label>
        <input type="text" id="carDropoff-${n}" placeholder="Enter location" list="dropoffLocations-${n}" class="form-input location-input">
        <datalist id="dropoffLocations-${n}">
          <option value="Main Lobby">
          <option value="TSN Airport">
        </datalist>
        <div class="quick-select" style="margin-top: 0.5rem;">
          <button type="button" class="quick-btn" onclick="window.app.setLocation('carDropoff-${n}', 'Main Lobby')">Main Lobby</button>
          <button type="button" class="quick-btn" onclick="window.app.setLocation('carDropoff-${n}', 'TSN Airport')">TSN Airport</button>
        </div>
      </div>
    </div>
    <div class="form-row">
      <div class="form-group">
        <label>Payment</label>
        <select id="carPayment-${n}" class="form-input">
          <option value="Free Comp (If guest enough 2000 points)">Free Comp (2000+ points)</option>
          <option value="Guest Comp">Guest Comp</option>
          <option value="GOA">GOA</option>
        </select>
      </div>
      <div class="form-group">
        <label>Authorizer</label>
        <input type="text" id="carAuthorizer-${n}" value="xujian" class="form-input">
      </div>
    </div>
  `,t.appendChild(o),n}function F(t){let n=document.getElementById(`car-${t}`);n&&(n.remove(),e.cars.delete(t))}function I(e,t){let n=document.getElementById(e);n&&(n.value=t)}function L(){let t=[];if(e.cars.forEach((e,n)=>{if(!document.getElementById(`car-${n}`))return;let r=document.getElementById(`carType-${n}`)?.value,i=document.getElementById(`carName-${n}`)?.value,a=document.getElementById(`carGuests-${n}`)?.value,o=document.getElementById(`carPhone-${n}`)?.value,s=document.getElementById(`carDate-${n}`)?.value,c=document.getElementById(`carTime-${n}`)?.value,l=document.getElementById(`carPickup-${n}`)?.value,u=document.getElementById(`carDropoff-${n}`)?.value;if(!i||!s||!c)return;let f=d(s);t.push(`${n}, Car Type: ${r}

Name: ${i}

Number of guests: ${a}

Phone: ${o}

Date & time: ${c} ${f}

Pick up point: ${l}

Drop off point: ${u}`)}),t.length===0)throw Error(`Please add at least one car booking`);let n=document.getElementById(`carPayment-1`)?.value||`Free Comp (If guest enough 2000 points)`,r=document.getElementById(`carAuthorizer-1`)?.value||`xujian`,i=!e.selectedServices.has(`room`),a=`VIP Car Service Request`;if(i){let e=document.getElementById(`carAgent`)?.value?.trim()||``,t=m(document.getElementById(`carOldPID-1`)?.value?.trim()||``,document.getElementById(`carNewPID-1`)?.value?.trim()||``),n=document.getElementById(`carName-1`)?.value?.trim()||``,r=d(document.getElementById(`carDate-1`)?.value);e&&n&&(a=`[${e}] ${t} ${n} Car Service ${r}`)}return`Subject: ${a}

Dear @Concierge Services

Please kindly arrange a VIP car as the followings:

${t.join(`

`)}

Payment: ${n}
Authorizer: ${r}

Thank you`}var R=1;function z(){let t=document.getElementById(`golf-section`);if(!t)return;if(e.selectedServices.has(`room`)){let e=document.createElement(`div`);e.id=`golf-sync-section`,e.innerHTML=`
      <div class="tip-box" style="margin-bottom: 1rem;">
        Guest list will be auto-filled from room booking
      </div>
      <button type="button" class="btn btn-secondary" onclick="window.app.syncGolfGuests()" style="width: 100%; margin-bottom: 1rem;">
        📋 Sync Room Guests
      </button>
    `,t.insertBefore(e,t.children[1])}else{let e=document.createElement(`div`);e.id=`golf-agent-section`,e.innerHTML=`
      <div class="form-row" style="margin-bottom: 1rem;">
        <div class="form-group">
          <label>Agent</label>
          <input list="golfAgentList" id="golfAgent" placeholder="Select or type agent name" class="form-input">
          <datalist id="golfAgentList">
            ${l().map(e=>`<option value="${e.name}">`).join(``)}
          </datalist>
        </div>
      </div>
    `,t.insertBefore(e,t.children[1])}let n=document.createElement(`div`);n.id=`golf-guests-container`,t.insertBefore(n,document.getElementById(`golf-pax`)?.parentNode?.parentNode),B();let r=document.createElement(`button`);r.type=`button`,r.className=`btn btn-outline`,r.innerHTML=`<span>+</span> Add Golf Guest`,r.onclick=()=>B(),t.appendChild(r)}function B(){let t=document.getElementById(`golf-guests-container`);if(!t)return;let n=R++;e.golfGuests.push(n);let r=document.createElement(`div`);return r.className=`guest-group`,r.id=`golfGuest-${n}`,r.innerHTML=`
    <div class="guest-header">
      <span class="guest-number">Guest #${n}</span>
      <button type="button" class="btn btn-danger btn-sm" onclick="window.app.removeGolfGuestForm(${n})">Remove</button>
    </div>
    <div class="form-row">
      <div class="form-group">
        <label>Old PID</label>
        <div class="pid-input-wrapper">
          <input type="text" id="golfGuestOldPID-${n}" class="pid-input" placeholder="Old PID"
                 oninput="window.app.searchPID('golfGuestOldPID-${n}', 'golfGuestNewPID-${n}', 'golfGuestName-${n}', 'golfPidInfo-${n}')">
          <span class="pid-status-icon" id="golfOldPidIcon-${n}"></span>
        </div>
      </div>
      <div class="form-group">
        <label>New PID</label>
        <div class="pid-input-wrapper">
          <input type="text" id="golfGuestNewPID-${n}" class="pid-input" placeholder="New PID"
                 oninput="window.app.searchPID('golfGuestOldPID-${n}', 'golfGuestNewPID-${n}', 'golfGuestName-${n}', 'golfPidInfo-${n}')">
          <span class="pid-status-icon" id="golfNewPidIcon-${n}"></span>
        </div>
        <div id="golfPidInfo-${n}" class="pid-info-box"></div>
      </div>
      <div class="form-group">
        <label>Guest Name</label>
        <input type="text" id="golfGuestName-${n}" placeholder="Auto-filled from PID"
               oninput="this.value = this.value.toUpperCase(); window.app.updateGolfPax()">
      </div>
    </div>
  `,t.appendChild(r),H(),n}function V(t){let n=document.getElementById(`golfGuest-${t}`);n&&(n.remove(),e.golfGuests=e.golfGuests.filter(e=>e!==t),H())}function H(){let t=document.getElementById(`golf-pax`);if(!t)return;let n=e.golfGuests.filter(e=>document.getElementById(`golfGuestName-${e}`)?.value?.trim()).length;n>0&&(t.value=n)}function U(){let t=document.getElementById(`golf-guests-container`);t&&(t.innerHTML=``,e.golfGuests=[],e.guests.forEach((t,n)=>{if(!document.getElementById(`guest-${n}`))return;let r=document.getElementById(`guestName-${n}`)?.value,i=document.getElementById(`guestOldPID-${n}`)?.value||``,a=document.getElementById(`guestNewPID-${n}`)?.value||`New`;if(r){B();let t=e.golfGuests[e.golfGuests.length-1];document.getElementById(`golfGuestName-${t}`).value=r,document.getElementById(`golfGuestOldPID-${t}`).value=i,document.getElementById(`golfGuestNewPID-${t}`).value=a}t.sharers.forEach(t=>{let r=document.getElementById(`sharerName-${n}-${t}`)?.value;if(r){let i=document.getElementById(`sharerOldPID-${n}-${t}`)?.value||``,a=document.getElementById(`sharerNewPID-${n}-${t}`)?.value||`New`;B();let o=e.golfGuests[e.golfGuests.length-1];document.getElementById(`golfGuestName-${o}`).value=r,document.getElementById(`golfGuestOldPID-${o}`).value=i,document.getElementById(`golfGuestNewPID-${o}`).value=a}})}),H(),window.app&&window.app.showToast&&window.app.showToast(`✓ Room guests synced successfully!`,`success`))}function oe(){let t=document.getElementById(`golf-datetime`)?.value,n=document.getElementById(`golf-pax`)?.value,r=document.getElementById(`golf-payment`)?.value,i=document.getElementById(`golf-authorizer`)?.value||`Jian.Xu`,a=document.getElementById(`golf-note`)?.value||`Casino Rate (If guests show CSN membership)`;if(!t)throw Error(`Please select date and time for golf booking`);let o=[];if(e.golfGuests.forEach(e=>{let t=document.getElementById(`golfGuestName-${e}`)?.value?.trim(),n=document.getElementById(`golfGuestOldPID-${e}`)?.value?.trim()||``,r=document.getElementById(`golfGuestNewPID-${e}`)?.value?.trim()||``;t&&o.push(`${t} - ${m(n,r)}`)}),o.length===0)throw Error(`Please add at least one golf guest`);let s=new Date(t).toLocaleTimeString(`en-US`,{hour:`2-digit`,minute:`2-digit`,hour12:!0}),c=d(t.split(`T`)[0]),l=!e.selectedServices.has(`room`),u=`Golf Booking Request`;if(l){let t=document.getElementById(`golfAgent`)?.value?.trim()||``,n=e.golfGuests[0],r=m(document.getElementById(`golfGuestOldPID-${n}`)?.value?.trim()||``,document.getElementById(`golfGuestNewPID-${n}`)?.value?.trim()||``),i=document.getElementById(`golfGuestName-${n}`)?.value?.trim()||``;t&&i&&(u=`[${t}] ${r} ${i} Golf Booking ${c}`)}return`Subject: ${u}

Dear @The Bluffs Ho Tram - Bookings

Guest's name:

${o.join(`
`)}

Date & Time: ${c} ${s}

No. of pax: ${n}

Note: ${a}

Payment: ${r}

Authorizer: ${i}

Thank you`}function W(){let t=document.getElementById(`bus-section`);if(!t)return;let n=!e.selectedServices.has(`room`);if(n){let e=document.createElement(`div`);e.id=`bus-agent-section`,e.innerHTML=`
      <div class="form-row" style="margin-bottom: 1rem;">
        <div class="form-group">
          <label>Agent</label>
          <input list="busAgentList" id="busAgent" placeholder="Select or type agent name" class="form-input">
          <datalist id="busAgentList">
            ${l().map(e=>`<option value="${e.name}">`).join(``)}
          </datalist>
        </div>
        <div class="form-group">
          <label>Old PID</label>
          <input type="text" id="busGuestOldPID" class="pid-input" placeholder="Old PID">
        </div>
        <div class="form-group">
          <label>New PID</label>
          <input type="text" id="busGuestNewPID" class="pid-input" placeholder="New PID">
        </div>
      </div>
    `,t.insertBefore(e,t.children[1])}else{let e=document.createElement(`div`);e.className=`tip-box`,e.style.marginBottom=`1rem`,e.textContent=`Passenger name will be auto-filled from room booking`,t.insertBefore(e,t.children[1])}let r=document.getElementById(`btn-hcm-ht`),i=document.getElementById(`btn-ht-hcm`);if(r&&r.addEventListener(`click`,()=>G(`hcmToHt`)),i&&i.addEventListener(`click`,()=>G(`htToHcm`)),!n){let e=document.getElementById(`guestName-1`)?.value;if(e){let t=document.getElementById(`bus-passenger`);t&&(t.value=e)}}}function G(t){e.busRoutes[t]=!e.busRoutes[t];let n=t===`hcmToHt`?`bus-form-hcm-ht`:`bus-form-ht-hcm`,r=t===`hcmToHt`?`btn-hcm-ht`:`btn-ht-hcm`,i=document.getElementById(n),a=document.getElementById(r);i&&(i.style.display=e.busRoutes[t]?`block`:`none`),a&&a.classList.toggle(`active`,e.busRoutes[t])}function K(){let t=document.getElementById(`bus-passenger`)?.value,n=document.getElementById(`bus-authorizer`)?.value||`Jian.Xu`;if(!t)throw Error(`Please enter passenger name`);if(!e.busRoutes.hcmToHt&&!e.busRoutes.htToHcm)throw Error(`Please select at least one route`);let r=[];if(e.busRoutes.hcmToHt){let e=document.getElementById(`time-hcm-ht`)?.value||`12:00 pm`,t=document.getElementById(`date-hcm-ht`)?.value,n=document.getElementById(`seats-hcm-ht`)?.value||`5`;if(!t)throw Error(`Please select date for HCM → HT route`);r.push({route:`HCM to HT`,time:e,date:d(t),seats:n})}if(e.busRoutes.htToHcm){let e=document.getElementById(`time-ht-hcm`)?.value||`14:00 pm`,t=document.getElementById(`date-ht-hcm`)?.value,n=document.getElementById(`seats-ht-hcm`)?.value||`5`;if(!t)throw Error(`Please select date for HT → HCM route`);r.push({route:`HT to HCM`,time:e,date:d(t),seats:n})}let i=!e.selectedServices.has(`room`),a=`Bus Service Request`;if(i){let e=document.getElementById(`busAgent`)?.value?.trim()||``,n=m(document.getElementById(`busGuestOldPID`)?.value?.trim()||``,document.getElementById(`busGuestNewPID`)?.value?.trim()||``),i=t,o=r[0]?.date||``;e&&i&&(a=`[${e}] ${n} ${i} Bus Service ${o}`)}let o=r.map(e=>`
Route: ${e.route} ${e.time} ${e.date}
Seats: ${e.seats}`).join(`
`);return`Subject: ${a}

Hi @Grand Service

Please help to arrange bus seats as below:

Name: ${t}
${o}

Authorizer: ${n}

Thank you`}var q={room:{enabled:!0,icon:`🏨`,title:`Room Booking`},car:{enabled:!0,icon:`🚗`,title:`Car Service`},golf:{enabled:!0,icon:`⛳`,title:`Golf Booking`},bus:{enabled:!0,icon:`🚌`,title:`Bus Service`}};function se(){return q}var J=`3.0.0`;function ce(){t(),le(),ue(),me(),window.pidDatabase=new Map,window.oldPIDIndex=new Map,window.newPIDIndex=new Map,window.pidDatabaseLoaded=!1,console.log(`Booking App v${J} initialized`)}function le(){let e=document.querySelector(`.app-header`);e&&(e.innerHTML=`
      <h1>🏨 Hotel Service Booking System</h1>
      <div class="version">v${J} | Modular Vite Architecture</div>
    `)}function ue(){let e=document.getElementById(`service-selector`);if(!e){console.error(`Service selector container not found`);return}try{let t=se();if(console.log(`Services loaded:`,t),!t||typeof t!=`object`){console.error(`Invalid services data:`,t),e.innerHTML=`<p style="color:red">Error loading services</p>`;return}let n=Object.entries(t).filter(([e,t])=>t&&t.enabled);if(console.log(`Filtered services:`,n),n.length===0){e.innerHTML=`<p>No services available</p>`;return}e.innerHTML=n.map(([e,t])=>`
      <div class="service-card" data-service="${e}" onclick="window.app.selectService('${e}')">
        <span class="icon">${t.icon||`🔹`}</span>
        <span class="title">${t.title||e}</span>
      </div>
    `).join(``),console.log(`Service selector rendered successfully`)}catch(t){console.error(`Error rendering service selector:`,t),e.innerHTML=`<p style="color:red">Error: ${t.message}</p>`}}function de(e){let t=document.querySelector(`[data-service="${e}"]`);n(e)?(t.classList.add(`selected`),fe(e),Y(e)):(t.classList.remove(`selected`),pe(e))}function fe(e){let t=document.getElementById(`${e}-section`);t&&(t.style.display=`block`,t.classList.add(`fade-in`),setTimeout(()=>{t.scrollIntoView({behavior:`smooth`,block:`start`})},100))}function pe(e){let t=document.getElementById(`${e}-section`);t&&(t.style.display=`none`,t.classList.remove(`fade-in`))}function Y(e){switch(e){case`room`:_();break;case`car`:N();break;case`golf`:z();break;case`bus`:W();break}}function me(){let e=document.getElementById(`btn-generate`);e&&e.addEventListener(`click`,X);let t=document.getElementById(`btn-copy`);t&&t.addEventListener(`click`,Z);let n=document.getElementById(`btn-send`);n&&n.addEventListener(`click`,Q)}function X(){let t=document.getElementById(`email-preview`),n=[];if(e.selectedServices.has(`room`)){let e=j();e.length>0&&n.push(...e)}if(n.length>0){$(n[0],`error`);return}let i=[],a=``;try{if(r(`room`)){let e=A();i.push(e);let t=e.match(/Subject:\s*(.+?)\n/);a=t?t[1].trim():`Booking Request`}if(r(`car`)){let e=L();if(i.push(e),!a){let t=e.match(/Subject:\s*(.+?)\n/);a=t?t[1].trim():`Car Service Request`}}if(r(`golf`)){let e=oe();if(i.push(e),!a){let t=e.match(/Subject:\s*(.+?)\n/);a=t?t[1].trim():`Golf Booking Request`}}if(r(`bus`)){let e=K();if(i.push(e),!a){let t=e.match(/Subject:\s*(.+?)\n/);a=t?t[1].trim():`Bus Service Request`}}if(i.length===0){t.textContent=`Please select at least one service.`;return}let e=``;if(i.length===1)e=i[0];else{let t=i.map(e=>e.replace(/^Subject:\s*.+?\n+/m,``).trim());e=`Subject: ${a}\n\n${t.join(`

---

`)}`}window.generatedEmail=e,t.innerHTML=e.replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`).replace(/\r?\n/g,`<br>
`),$(`✓ Email generated!`,`success`),document.getElementById(`email-preview-section`)?.scrollIntoView({behavior:`smooth`})}catch(e){$(e.message||`Error generating email`,`error`),console.error(e)}}async function Z(){if(!window.generatedEmail){$(`Please generate email first`,`warning`);return}let e=window.generatedEmail;if(navigator.clipboard&&navigator.clipboard.write)try{let t=`<!DOCTYPE html><html><body><p style="font-family:Arial,sans-serif;font-size:14px;line-height:1.6;white-space:pre-wrap;">${e.replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`).replace(/\n/g,`<br>`)}</p></body></html>`,n=new ClipboardItem({"text/plain":new Blob([e],{type:`text/plain`}),"text/html":new Blob([t],{type:`text/html`})});await navigator.clipboard.write([n]),$(`✓ Copied! Paste directly into Outlook/Gmail`,`success`);return}catch{}try{await navigator.clipboard.writeText(e),$(`✓ Email copied to clipboard!`,`success`)}catch{let t=document.createElement(`textarea`);t.value=e,t.style.cssText=`position:fixed;opacity:0;top:0;left:0;`,document.body.appendChild(t),t.select();try{document.execCommand(`copy`),$(`✓ Email copied to clipboard!`,`success`)}catch{$(`Copy failed. Please copy manually.`,`error`)}finally{document.body.removeChild(t)}}}function Q(){if(!window.generatedEmail){$(`Please generate email first`,`warning`);return}let e=window.generatedEmail.match(/Subject:\s*(.+?)\n/),t=e?e[1].trim():`Booking Request`,n=encodeURIComponent(window.generatedEmail.replace(/^Subject:\s*.+?\n+/m,``).trim());window.location.href=`mailto:concierge@thegrandhotram.com,Front.Desk@thegrandhotram.com?subject=${encodeURIComponent(t)}&body=${n}`,$(`Opening email client...`,`info`)}function $(e,t=`info`){let n=document.querySelector(`.toast`);n&&n.remove();let r=document.createElement(`div`);r.className=`toast ${t}`,r.textContent=e,document.body.appendChild(r),requestAnimationFrame(()=>{r.classList.add(`show`)}),setTimeout(()=>{r.classList.remove(`show`),setTimeout(()=>r.remove(),300)},3e3)}function he(e){let t=e.target.files[0];if(!t)return;if($(`📖 Reading PID database...`,`info`),typeof XLSX>`u`){$(`XLSX library not loaded. Please include sheetjs.`,`error`);return}let n=new FileReader;n.onload=function(e){try{let t=new Uint8Array(e.target.result),n=XLSX.read(t,{type:`array`}),r=n.Sheets[n.SheetNames[0]],i=XLSX.utils.sheet_to_json(r);window.pidDatabase.clear(),window.oldPIDIndex.clear(),window.newPIDIndex.clear();let a=0;i.forEach(e=>{let t=String(e[`Old PID`]||``).trim(),n=String(e[`New PID`]||``).trim(),r=String(e[`Player Name`]||``).trim();if(r&&(t||n)){let e=n||t;window.pidDatabase.set(e,{oldPID:t||null,newPID:n||null,name:r}),t&&window.oldPIDIndex.set(t,e),n&&window.newPIDIndex.set(n,e),a++}}),window.pidDatabaseLoaded=!0,$(`✓ ${a.toLocaleString()} PID records loaded`,`success`)}catch(e){console.error(`Error reading PID file:`,e),$(`❌ Error reading Excel file`,`error`)}},n.readAsArrayBuffer(t)}window.app={selectService:de,setAgent:S,selectHotel:C,addGuestForm:w,removeGuestForm:T,addSharerForm:ne,removeSharerForm:re,setRoomType:D,setRoomTypeFromSelect:ae,searchPID:k,addCarForm:P,removeCarForm:F,setLocation:I,addGolfGuestForm:B,removeGolfGuestForm:V,updateGolfPax:H,syncGolfGuests:U,toggleBusRoute:G,generateAllEmails:X,copyToClipboard:Z,sendEmail:Q,showToast:$,handlePIDImport:he,formatDate:u,formatDateShort:d,getTodayStr:f,getTomorrowStr:p,resolvePID:m},document.addEventListener(`DOMContentLoaded`,ce);